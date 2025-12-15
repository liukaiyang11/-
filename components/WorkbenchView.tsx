
import React, { useState } from 'react';
import { ArrowLeft, Search, Plus, Settings, HelpCircle, User, Bot, Briefcase, Code, Scale } from 'lucide-react';
import Simulation from './Simulation';
import { MOCK_AGENTS } from '../constants';
import { Agent } from '../types';

interface Props {
  onBack: () => void;
}

const WorkbenchView: React.FC<Props> = ({ onBack }) => {
  const [activeAgentId, setActiveAgentId] = useState<string>(MOCK_AGENTS[0].id);
  
  const activeAgent = MOCK_AGENTS.find(a => a.id === activeAgentId) || MOCK_AGENTS[0];

  const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'Scale': return <Scale size={18} />;
        case 'FileCheck': return <Briefcase size={18} />;
        case 'Server': return <Code size={18} />;
        default: return <Bot size={18} />;
    }
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
             AI
           </div>
           <span className="font-bold text-white tracking-wide">AI 工作台 (Workbench)</span>
        </div>

        <div className="p-4">
            <button onClick={onBack} className="w-full flex items-center gap-2 text-xs text-slate-500 hover:text-white mb-6 transition-colors">
                <ArrowLeft size={14} /> 返回官网首页
            </button>

            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">我的智能体</div>
            <div className="space-y-1">
                {MOCK_AGENTS.map(agent => (
                    <button 
                        key={agent.id}
                        onClick={() => setActiveAgentId(agent.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${activeAgentId === agent.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800'}`}
                    >
                        {getIcon(agent.icon)}
                        <span className="flex-1 text-left">{agent.name}</span>
                        {agent.isHot && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                    </button>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 border border-dashed border-slate-700 hover:border-slate-500 hover:text-slate-400 mt-2">
                    <Plus size={18} />
                    <span>创建新助手</span>
                </button>
            </div>
        </div>

        <div className="mt-auto p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={16} />
                </div>
                <div>
                    <div className="text-sm text-white">演示用户</div>
                    <div className="text-[10px] text-slate-500">员工权限</div>
                </div>
                <Settings size={16} className="ml-auto text-slate-500 cursor-pointer hover:text-white" />
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
         {/* Top Bar */}
         <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {activeAgent.name}
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] border border-slate-200 font-normal">
                    {activeAgent.category}
                </span>
            </h2>
            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="text" placeholder="搜索历史对话..." className="pl-9 pr-4 py-1.5 rounded-full bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-slate-600" />
                </div>
                <HelpCircle size={20} className="text-slate-400 cursor-pointer hover:text-slate-600" />
            </div>
         </div>

         {/* Chat Area Container */}
         <div className="flex-1 p-6 overflow-hidden bg-slate-50">
             <div className="h-full w-full max-w-4xl mx-auto shadow-2xl rounded-xl overflow-hidden border border-slate-200">
                 <Simulation activeAgent={activeAgent} />
             </div>
         </div>
      </div>
    </div>
  );
};

export default WorkbenchView;
