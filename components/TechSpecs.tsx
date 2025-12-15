
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Network, Server, Globe, Building2, CheckCircle2, Radio } from 'lucide-react';
import HybridArchitectureDiagram from './HybridArchitectureDiagram';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
}

// Backend Option Types
type BackendType = 'PUBLIC' | 'PRIVATE' | 'LOCAL' | 'OPERATOR';

const STORAGE_KEY_BACKEND = 'yuanlifang_tech_backend_pref';

const TechSpecs: React.FC<Props> = ({ onBack }) => {
  const [selectedBackend, setSelectedBackend] = useState<BackendType>('PUBLIC');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BACKEND);
    if (saved && ['PUBLIC', 'PRIVATE', 'LOCAL', 'OPERATOR'].includes(saved)) {
      setSelectedBackend(saved as BackendType);
    }
  }, []);

  const handleBackendChange = (type: BackendType) => {
    setSelectedBackend(type);
    localStorage.setItem(STORAGE_KEY_BACKEND, type);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} /> <span className="font-medium">返回主页</span>
        </button>

        <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">技术原理与规格参数</h2>
            <p className="text-slate-500 max-w-3xl text-lg">
                元立方定义了<span className="text-slate-900 font-bold">“存算分离”</span>的新型知识库架构。
                就像为企业安装了一个“知识阀门”，数据在本地清洗沉淀，仅将无害的上下文输送给任意大模型。
            </p>
        </div>

        {/* === 1. TOPOLOGY CONFIGURATION DEMO === */}
        <div className="mb-20 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2 text-white font-bold">
                    <Network className="text-blue-500" size={20}/> 拓扑配置演示
                </div>
                <div className="text-xs text-slate-400">点击右侧卡片切换部署模式</div>
            </div>
            
            <div className="relative w-full h-[500px] bg-white overflow-hidden">
                
                {/* Background Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                        </linearGradient>
                        <filter id="glowLine">
                             <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                             <feMerge>
                                 <feMergeNode in="coloredBlur"/>
                                 <feMergeNode in="SourceGraphic"/>
                             </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Path 1: Public (Top) - Y=130 */}
                    <path 
                        d="M 380 250 C 500 250, 500 130, 620 130" 
                        fill="none" 
                        stroke={selectedBackend === 'PUBLIC' ? '#3b82f6' : '#e2e8f0'} 
                        strokeWidth={selectedBackend === 'PUBLIC' ? 4 : 2}
                        filter={selectedBackend === 'PUBLIC' ? 'url(#glowLine)' : ''}
                        className="transition-all duration-500"
                    />

                    {/* Path 2: Operator (Upper Middle) - Y=210 */}
                    <path 
                        d="M 380 250 C 500 250, 500 210, 620 210" 
                        fill="none" 
                        stroke={selectedBackend === 'OPERATOR' ? '#f59e0b' : '#e2e8f0'} 
                        strokeWidth={selectedBackend === 'OPERATOR' ? 4 : 2}
                        filter={selectedBackend === 'OPERATOR' ? 'url(#glowLine)' : ''}
                        className="transition-all duration-500"
                    />

                    {/* Path 3: Private (Lower Middle) - Y=290 */}
                    <path 
                        d="M 380 250 C 500 250, 500 290, 620 290" 
                        fill="none" 
                        stroke={selectedBackend === 'PRIVATE' ? '#6366f1' : '#e2e8f0'} 
                        strokeWidth={selectedBackend === 'PRIVATE' ? 4 : 2}
                        filter={selectedBackend === 'PRIVATE' ? 'url(#glowLine)' : ''}
                        className="transition-all duration-500"
                    />

                    {/* Path 4: Local (Bottom) - Y=370 */}
                    <path 
                        d="M 380 250 C 500 250, 500 370, 620 370" 
                        fill="none" 
                        stroke={selectedBackend === 'LOCAL' ? '#10b981' : '#e2e8f0'} 
                        strokeWidth={selectedBackend === 'LOCAL' ? 4 : 2}
                        filter={selectedBackend === 'LOCAL' ? 'url(#glowLine)' : ''}
                        className="transition-all duration-500"
                    />
                    
                    {/* Animated Particles */}
                    {selectedBackend === 'PUBLIC' && <circle r="4" fill="#60a5fa"><animateMotion dur="1s" repeatCount="indefinite" path="M 380 250 C 500 250, 500 130, 620 130" /></circle>}
                    {selectedBackend === 'OPERATOR' && <circle r="4" fill="#fbbf24"><animateMotion dur="1s" repeatCount="indefinite" path="M 380 250 C 500 250, 500 210, 620 210" /></circle>}
                    {selectedBackend === 'PRIVATE' && <circle r="4" fill="#818cf8"><animateMotion dur="1s" repeatCount="indefinite" path="M 380 250 C 500 250, 500 290, 620 290" /></circle>}
                    {selectedBackend === 'LOCAL' && <circle r="4" fill="#34d399"><animateMotion dur="1s" repeatCount="indefinite" path="M 380 250 C 500 250, 500 370, 620 370" /></circle>}
                    
                    {/* Central Connector Node on Left Box */}
                    <circle cx="380" cy="250" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="380" cy="250" r="3" fill="#3b82f6" className="animate-pulse" />
                </svg>

                <div className="absolute inset-0 w-full h-full flex items-center justify-between px-[5%] lg:px-[10%] pointer-events-none">
                    
                    {/* LEFT: The OmniCube Box */}
                    <div className="pointer-events-auto w-[320px] transform -translate-y-4"> {/* Shift up slightly to center vertically in 500px area */}
                        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-2xl border border-slate-700 relative group">
                             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                             <div className="relative">
                                 <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-700/50">
                                     {/* Simple Icon for Topology Demo (Not the detailed visualizer) */}
                                     <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                         <Server size={20} className="text-white"/>
                                     </div>
                                     <div>
                                         <h3 className="font-bold text-lg leading-tight">元立方 OmniCube</h3>
                                         <div className="text-[10px] text-slate-400">Enterprise Edge AI Node</div>
                                     </div>
                                 </div>
                                 <div className="space-y-3">
                                     <div className="bg-slate-800 p-3 rounded text-sm flex items-center gap-3 border border-slate-700">
                                         <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                         <span>本地向量库 (2TB NVMe)</span>
                                     </div>
                                     <div className="bg-slate-800 p-3 rounded text-sm flex items-center gap-3 border border-slate-700">
                                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                         <span>PII 敏感隐私清洗</span>
                                     </div>
                                     <div className="bg-slate-800 p-3 rounded text-sm flex items-center gap-3 border border-slate-700">
                                         <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                         <span>双万兆光口 SFP+</span>
                                     </div>
                                 </div>
                             </div>
                             
                             {/* Connector Point (Visual alignment with SVG) */}
                             <div className="hidden lg:block absolute top-1/2 -right-1 w-2 h-2 bg-slate-900 rounded-full"></div>
                        </div>
                    </div>

                    {/* RIGHT: The Inference Options Stack */}
                    <div className="pointer-events-auto w-[300px] flex flex-col gap-4">
                        
                        {/* Option 1: Public Cloud */}
                        <div 
                            onClick={() => handleBackendChange('PUBLIC')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative group ${selectedBackend === 'PUBLIC' ? 'border-blue-500 bg-blue-50 shadow-md translate-x-[-10px]' : 'border-slate-100 bg-white hover:border-blue-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${selectedBackend === 'PUBLIC' ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <Globe size={18} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">公有云 API</h4>
                                </div>
                                {selectedBackend === 'PUBLIC' && <CheckCircle2 size={16} className="text-blue-500"/>}
                            </div>
                            {/* Connector Target */}
                            <div className={`hidden lg:block absolute top-1/2 -left-3 w-2 h-2 rounded-full transform -translate-y-1/2 transition-colors ${selectedBackend === 'PUBLIC' ? 'bg-blue-500' : 'bg-slate-200 group-hover:bg-blue-200'}`}></div>
                        </div>

                        {/* Option 2: Operator AI Pool */}
                        <div 
                            onClick={() => handleBackendChange('OPERATOR')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative group ${selectedBackend === 'OPERATOR' ? 'border-amber-500 bg-amber-50 shadow-md translate-x-[-10px]' : 'border-slate-100 bg-white hover:border-amber-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${selectedBackend === 'OPERATOR' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <Radio size={18} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">运营商智算专区</h4>
                                </div>
                                {selectedBackend === 'OPERATOR' && <CheckCircle2 size={16} className="text-amber-500"/>}
                            </div>
                             {/* Connector Target */}
                            <div className={`hidden lg:block absolute top-1/2 -left-3 w-2 h-2 rounded-full transform -translate-y-1/2 transition-colors ${selectedBackend === 'OPERATOR' ? 'bg-amber-500' : 'bg-slate-200 group-hover:bg-amber-200'}`}></div>
                        </div>

                        {/* Option 3: Private Cloud */}
                        <div 
                            onClick={() => handleBackendChange('PRIVATE')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative group ${selectedBackend === 'PRIVATE' ? 'border-indigo-500 bg-indigo-50 shadow-md translate-x-[-10px]' : 'border-slate-100 bg-white hover:border-indigo-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${selectedBackend === 'PRIVATE' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <Building2 size={18} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">集团私有云</h4>
                                </div>
                                {selectedBackend === 'PRIVATE' && <CheckCircle2 size={16} className="text-indigo-500"/>}
                            </div>
                             {/* Connector Target */}
                            <div className={`hidden lg:block absolute top-1/2 -left-3 w-2 h-2 rounded-full transform -translate-y-1/2 transition-colors ${selectedBackend === 'PRIVATE' ? 'bg-indigo-500' : 'bg-slate-200 group-hover:bg-indigo-200'}`}></div>
                        </div>

                        {/* Option 4: Local Server */}
                        <div 
                            onClick={() => handleBackendChange('LOCAL')}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 relative group ${selectedBackend === 'LOCAL' ? 'border-emerald-500 bg-emerald-50 shadow-md translate-x-[-10px]' : 'border-slate-100 bg-white hover:border-emerald-200'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-lg ${selectedBackend === 'LOCAL' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        <Server size={18} />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm">本地大模型</h4>
                                </div>
                                {selectedBackend === 'LOCAL' && <CheckCircle2 size={16} className="text-emerald-500"/>}
                            </div>
                             {/* Connector Target */}
                            <div className={`hidden lg:block absolute top-1/2 -left-3 w-2 h-2 rounded-full transform -translate-y-1/2 transition-colors ${selectedBackend === 'LOCAL' ? 'bg-emerald-500' : 'bg-slate-200 group-hover:bg-emerald-200'}`}></div>
                        </div>

                    </div>
                </div>

            </div>
            
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500">
                    <span className="font-bold text-slate-700">当前演示配置：</span> 
                    元立方（知识底座） 
                    <span className="mx-2 text-slate-300">———&gt;</span>
                    {selectedBackend === 'PUBLIC' && <span className="text-blue-600 font-bold">公有云 API (HTTPS)</span>}
                    {selectedBackend === 'OPERATOR' && <span className="text-amber-600 font-bold">运营商智算专区 (MEC)</span>}
                    {selectedBackend === 'PRIVATE' && <span className="text-indigo-600 font-bold">集团私有云 (Intranet)</span>}
                    {selectedBackend === 'LOCAL' && <span className="text-emerald-600 font-bold">本地推理服务器 (LAN)</span>}
                </p>
            </div>
        </div>

        {/* 2. Architecture Diagram */}
        <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-800 mb-6 pl-4 border-l-4 border-blue-600">全链路数据流向演示</h3>
            <div className="bg-slate-900 p-2 rounded-2xl shadow-2xl ring-1 ring-slate-800">
               <div className="h-[450px] w-full bg-slate-950 rounded-xl overflow-hidden">
                    <HybridArchitectureDiagram isActive={true} backendType={selectedBackend} />
               </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TechSpecs;
