
import React, { useState, useRef, useEffect } from 'react';
import { generateRAGResponse } from '../services/geminiService';
import { ChatMessage, Agent } from '../types';
import { MOCK_KNOWLEDGE_BASE, PRESET_QUESTIONS } from '../constants';
import { Send, Cpu, ShieldCheck, User, Sparkles, LayoutGrid, MessageSquarePlus, Trash2 } from 'lucide-react';

interface SimulationProps {
  activeAgent?: Agent;
}

const Simulation: React.FC<SimulationProps> = ({ activeAgent }) => {
  const defaultAgentName = activeAgent ? activeAgent.name : "元立方智能助手";
  const agentId = activeAgent?.id || 'default_general_agent';
  const storageKey = `yuanlifang_chat_history_${agentId}`;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [retrievalStatus, setRetrievalStatus] = useState<'idle' | 'searching' | 'found'>('idle');
  
  // Load history or initialize default on agent change
  useEffect(() => {
    const savedHistory = localStorage.getItem(storageKey);
    
    if (savedHistory) {
        try {
            setMessages(JSON.parse(savedHistory));
        } catch (e) {
            console.error("Failed to parse chat history", e);
            initializeDefaultMessage();
        }
    } else {
        initializeDefaultMessage();
    }
    
    setRetrievalStatus('idle');
    setIsProcessing(false);
  }, [activeAgent]); // Trigger when agent changes

  // Save history whenever messages change
  useEffect(() => {
      if (messages.length > 0) {
          localStorage.setItem(storageKey, JSON.stringify(messages));
      }
  }, [messages, storageKey]);

  const initializeDefaultMessage = () => {
    const defaultWelcome = activeAgent 
    ? `您好！我是${activeAgent.name}。我已经加载了${activeAgent.category}相关的知识库。\n请问有什么可以帮您？`
    : '您好，我是元立方通用智能助手。已连接企业知识库。\n您可以询问诸如“最新的差旅报销标准是什么？”等问题。';
    setMessages([{ id: 'init', role: 'assistant', content: defaultWelcome }]);
  };

  const handleClearHistory = () => {
      if (window.confirm('确定要清空当前的对话历史吗？')) {
          localStorage.removeItem(storageKey);
          initializeDefaultMessage();
      }
  };
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  
  // Scroll on new messages
  useEffect(() => {
      scrollToBottom();
  }, [messages, isProcessing]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);
    setRetrievalStatus('searching');

    // Simulate RAG Latency
    setTimeout(async () => {
      setRetrievalStatus('found');
      const retrievedContext = MOCK_KNOWLEDGE_BASE;
      const responseText = await generateRAGResponse(userMsg.content, retrievedContext);
      
      const botMsg: ChatMessage = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: responseText 
      };

      setMessages(prev => [...prev, botMsg]);
      setIsProcessing(false);
      setRetrievalStatus('idle');
    }, 1500); 
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden relative">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white z-10 relative">
           <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                  {activeAgent ? <Sparkles size={18} /> : <Cpu size={18} />}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{defaultAgentName}</h3>
                <div className="flex items-center gap-1">
                   <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                   <span className="text-[10px] text-slate-400">在线 | 知识库已连接</span>
                </div>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
               <div className="hidden md:flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                   <ShieldCheck size={10} />
                   Trust Zone 保护中
               </div>
               <button 
                onClick={handleClearHistory}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                title="清空历史"
               >
                   <Trash2 size={16} />
               </button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 min-h-[300px] scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                 <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-100 text-blue-600'}`}>
                    {msg.role === 'user' ? <User size={12} /> : <Cpu size={12} />}
                 </div>
                 <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap text-xs md:text-sm">{msg.content}</p>
                 </div>
              </div>
            </div>
          ))}
          {isProcessing && (
             <div className="flex justify-start ml-8">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-3 py-2 shadow-sm flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-[10px] text-slate-400">
                        {retrievalStatus === 'searching' ? "检索企业知识库..." : "云端大模型推理中..."}
                    </span>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (Presets) */}
        {!isProcessing && messages.length < 3 && (
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button 
                key={idx}
                onClick={() => handleSend(q)}
                className="flex items-center gap-1.5 whitespace-nowrap bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors shadow-sm"
              >
                <MessageSquarePlus size={12} />
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 z-10 relative">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors">
                    <LayoutGrid size={16} />
                </button>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入问题..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xs md:text-sm text-slate-800 placeholder:text-slate-400"
                    disabled={isProcessing}
                />
                <button 
                    onClick={() => handleSend()}
                    disabled={isProcessing || !input.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white p-1.5 rounded transition-colors"
                >
                    <Send size={14} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default Simulation;
