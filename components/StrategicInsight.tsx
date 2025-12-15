import React from 'react';
import { 
  Database, 
  ArrowRight, 
  BrainCircuit, 
  Layers, 
  FileText, 
  Server, 
  Cloud, 
  ShieldCheck, 
  Network, 
  GitGraph, 
  MessageSquarePlus, 
  RefreshCw, 
  Activity,
  SearchCheck,
  Zap
} from 'lucide-react';

const StrategicInsight: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Header: Strictly keeping the requested copy */}
      <div className="relative z-10 text-center mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-4">
             <Database size={12} />
             核心理念：Data First
         </div>
         <h2 className="text-2xl md:text-3xl font-bold mb-4">落地范式重构：从“应用驱动”转向<span className="text-blue-400">“数据先行”</span></h2>
         <p className="text-slate-400 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            在构建复杂的智能体之前，必须先治理非结构化数据。因为模型和应用都会更新迭代，唯有经过治理的<span className="text-white font-bold">知识资产</span>才是企业不变的<span className="text-white font-bold">“护城河”</span>。
         </p>
      </div>

      {/* Main Architecture Diagram */}
      <div className="relative z-10 flex flex-col gap-6 max-w-6xl mx-auto">
         
         {/* Upper Flow: Input -> Hub -> App */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
             
             {/* 1. DATA SOURCES (Left) */}
             <div className="md:col-span-3 flex flex-col gap-3 group">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Database size={14} /> 全源数据接入
                 </div>
                 <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden hover:border-blue-500/50 transition-colors">
                     {/* Items */}
                     <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                         <div className="p-2 bg-red-500/10 text-red-400 rounded-md"><FileText size={16} /></div>
                         <div>
                             <div className="text-xs font-bold text-slate-200">非结构化数据</div>
                             <div className="text-[10px] text-slate-500">Docs / PDF / Img</div>
                         </div>
                     </div>
                     <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                         <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-md"><Server size={16} /></div>
                         <div>
                             <div className="text-xs font-bold text-slate-200">结构化数据</div>
                             <div className="text-[10px] text-slate-500">Database / SQL</div>
                         </div>
                     </div>
                     <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex items-center gap-3">
                         <div className="p-2 bg-sky-500/10 text-sky-400 rounded-md"><Cloud size={16} /></div>
                         <div>
                             <div className="text-xs font-bold text-slate-200">实时 SaaS API</div>
                             <div className="text-[10px] text-slate-500">CRM / ERP / IM</div>
                         </div>
                     </div>
                     
                     {/* Connector Dot */}
                     <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900 hidden md:block group-hover:bg-blue-500 transition-colors"></div>
                 </div>
             </div>

             {/* Arrow */}
             <div className="hidden md:flex md:col-span-1 items-center justify-center">
                 <div className="w-full h-px bg-slate-700 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600">
                         <ArrowRight size={16} />
                     </div>
                 </div>
             </div>

             {/* 2. KNOWLEDGE HUB & ENGINE (Middle - The Core) */}
             <div className="md:col-span-4 flex flex-col gap-3 relative group">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Layers size={14} /> 知识中台 & 智能引擎
                 </div>
                 <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 border border-blue-500/30 rounded-xl p-1 relative overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                     
                     {/* Internal Architecture of the Hub */}
                     <div className="h-full flex flex-col gap-1">
                         
                         {/* Layer A: Orchestration */}
                         <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 flex flex-col gap-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                                 <GitGraph size={12} /> 编排层 (Orchestration)
                             </div>
                             <div className="flex gap-2">
                                 <span className="px-2 py-1 bg-indigo-500/20 rounded text-[10px] border border-indigo-500/30 text-indigo-200 flex-1 text-center">Agent Flow</span>
                                 <span className="px-2 py-1 bg-indigo-500/20 rounded text-[10px] border border-indigo-500/30 text-indigo-200 flex-1 text-center">Model Router</span>
                             </div>
                         </div>

                         {/* Layer B: Cognitive */}
                         <div className="flex-1 bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-center gap-2">
                             <div className="flex items-center gap-2 text-xs font-bold text-blue-300">
                                 <BrainCircuit size={12} /> 认知层 (Reasoning)
                             </div>
                             <div className="grid grid-cols-2 gap-2">
                                 <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                                     <Network size={16} className="mx-auto text-blue-500 mb-1" />
                                     <span className="text-[9px] text-slate-300">知识图谱 Graph</span>
                                 </div>
                                 <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                                     <SearchCheck size={16} className="mx-auto text-blue-500 mb-1" />
                                     <span className="text-[9px] text-slate-300">混合检索+Rerank</span>
                                 </div>
                             </div>
                         </div>

                         {/* Layer C: Governance & Security */}
                         <div className="grid grid-cols-2 gap-1">
                            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 mb-1">
                                    <Activity size={10} /> 效果评测 (Eval)
                                </div>
                                <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-emerald-500 rounded-full"></div>
                                </div>
                            </div>
                            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 mb-1">
                                    <ShieldCheck size={10} /> 安全 (Security)
                                </div>
                                <div className="text-[8px] text-slate-400">PII 脱敏 / 审计</div>
                            </div>
                         </div>
                     </div>

                     {/* Connector Dot */}
                     <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900 hidden md:block group-hover:bg-blue-500 transition-colors"></div>
                     <div className="absolute top-1/2 -right-1.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900 hidden md:block group-hover:bg-blue-500 transition-colors"></div>
                 </div>
             </div>

             {/* Arrow */}
             <div className="hidden md:flex md:col-span-1 items-center justify-center">
                 <div className="w-full h-px bg-slate-700 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600">
                         <ArrowRight size={16} />
                     </div>
                 </div>
             </div>

             {/* 3. APPLICATION (Right) */}
             <div className="md:col-span-3 flex flex-col gap-3 group">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Zap size={14} /> 智能应用与反馈
                 </div>
                 <div className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden hover:border-blue-500/50 transition-colors">
                     
                     <div className="space-y-3">
                         <div className="p-3 bg-blue-600/20 border border-blue-500/50 rounded-lg text-center">
                             <div className="font-bold text-sm text-blue-200">企业级 Agent</div>
                             <div className="text-[10px] text-blue-300/60 mt-0.5">Chat / Copilot / Automation</div>
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                             <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center text-[10px] text-slate-300">
                                 业务洞察
                             </div>
                             <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center text-[10px] text-slate-300">
                                 公文写作
                             </div>
                         </div>
                     </div>

                     {/* Feedback Section */}
                     <div className="mt-4 pt-4 border-t border-slate-700/50">
                         <div className="flex items-center justify-between mb-2">
                             <span className="text-[10px] font-bold text-slate-400">Human Feedback</span>
                             <div className="flex gap-1">
                                 <div className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px]">👍</div>
                                 <div className="w-4 h-4 rounded bg-red-500/20 text-red-500 flex items-center justify-center text-[10px]">👎</div>
                             </div>
                         </div>
                         <div className="flex items-center gap-2 p-2 bg-slate-900/80 rounded border border-dashed border-slate-600 text-slate-400 text-[10px]">
                             <MessageSquarePlus size={12} />
                             <span>Bad Case 标注回流</span>
                         </div>
                     </div>

                     {/* Connector Dot */}
                     <div className="absolute top-1/2 -left-1.5 w-3 h-3 bg-slate-500 rounded-full border-2 border-slate-900 hidden md:block group-hover:bg-blue-500 transition-colors"></div>
                     <div className="absolute bottom-6 -right-1.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 hidden md:block animate-pulse"></div>
                 </div>
             </div>
         </div>

         {/* Lower Flow: The Feedback Loop */}
         <div className="relative h-16 mt-2 hidden md:block">
            {/* Curved Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                    <linearGradient id="flywheelGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {/* Path from Right Bottom back to Middle Bottom */}
                <path 
                    d="M 980 10 Q 980 50, 500 50 Q 200 50, 150 10" 
                    fill="none" 
                    stroke="url(#flywheelGradient)" 
                    strokeWidth="2" 
                    strokeDasharray="6 6"
                    className="animate-dash"
                />
                <path d="M 145 10 L 150 18 L 155 10" fill="none" stroke="#6366f1" strokeWidth="2" />
            </svg>
            
            {/* Label */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900 px-4 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg flex items-center gap-2">
                <RefreshCw size={12} />
                数据飞轮：强化学习 (RLHF) 与 知识持续迭代
            </div>
         </div>

      </div>
      
      {/* Mobile Feedback Loop Text (Instead of SVG) */}
      <div className="mt-4 md:hidden text-center">
          <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-900/50">
              <RefreshCw size={12} />
              数据飞轮：应用反馈自动回流至中台，持续优化模型
          </div>
      </div>

    </div>
  );
};

export default StrategicInsight;