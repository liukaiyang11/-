
import React, { useState } from 'react';
import { ArrowLeft, Box, AppWindow, Server, GraduationCap, CheckCircle2, Cpu, HardDrive, Layers, Network, Zap, Database, Shield, Fan, Activity, Power } from 'lucide-react';

interface Props {
  onBack: () => void;
}

// --- SUB-COMPONENT: OMNI CUBE VISUALIZATION (Moved & Updated) ---
const OmniCubeVisual = ({ viewMode }: { viewMode: 'FRONT' | 'INTERNAL' }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-52 transition-all duration-500 my-8 group perspective-1000">
        
        {/* Floating Badge */}
        <div className="absolute -top-4 right-2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md z-20 animate-bounce" style={{ animationDuration: '3s' }}>
            企业级 AI 节点 (Enterprise Node)
        </div>

        {/* Chassis Body (3D Effect Base) */}
        <div className="absolute inset-x-4 top-2 bottom-0 bg-slate-800 rounded-lg transform skew-x-3 opacity-30 translate-x-2 translate-y-1 blur-[1px]"></div>
        
        {/* MAIN DEVICE BOX */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2f38] to-[#1a1e24] rounded-lg shadow-2xl border border-slate-600/60 overflow-hidden flex flex-col relative z-10 transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl">
            
            {/* Top Bezel / Lip */}
            <div className="h-1 bg-slate-600/30 w-full border-b border-black/20"></div>

            {/* --- VIEW: FRONT PANEL (High Fidelity) --- */}
            {viewMode === 'FRONT' && (
                <div className="flex-1 relative flex items-center pl-6 pr-6 bg-[#1a1e24] gap-6">
                    {/* Metallic Grain Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
                    
                    {/* 1. Branding & Intake (Left) */}
                    <div className="flex flex-col justify-between h-3/4 w-32 border-r border-slate-700/50 pr-4 py-2 flex-shrink-0">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Unified Logo: Blue Hexagon Cube */}
                            <div className="w-6 h-6 relative flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="cubeGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#4f46e5" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M50 15 L84.6 35 V75 L50 95 L15.4 75 V35 Z" fill="url(#cubeGradientSmall)" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                                    <path d="M50 15 L84.6 35 L50 55 L15.4 35 Z" fill="#ffffff" fillOpacity="0.1" />
                                    <path d="M50 55 V95" stroke="white" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
                                    <path d="M50 55 L84.6 35" stroke="white" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
                                    <path d="M50 55 L15.4 35" stroke="white" strokeWidth="3" strokeOpacity="0.4" strokeLinecap="round" />
                                    <circle cx="50" cy="55" r="8" fill="white" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-300 leading-none">元立方</span>
                                <span className="text-[8px] font-bold text-blue-500 leading-none tracking-wider font-mono mt-0.5">OMNI CUBE</span>
                            </div>
                        </div>
                        {/* Hex Vent Grid */}
                        <div className="flex-1 w-full bg-black/40 rounded border border-slate-700/50 relative overflow-hidden grid grid-cols-6 gap-[2px] content-center p-[2px] opacity-60">
                            {Array.from({ length: 42 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-slate-600 rounded-full mx-auto"></div>
                            ))}
                        </div>
                        <span className="text-[8px] text-slate-600 font-mono mt-1">Air Intake</span>
                    </div>

                    {/* 2. Ports Cluster (Center) */}
                    <div className="flex-1 flex items-center justify-center gap-5 h-3/4">
                        
                        {/* Power Input (Industrial) */}
                         <div className="flex flex-col gap-1 items-center justify-end h-full">
                            <div className="w-12 h-10 bg-black border border-slate-600 rounded-sm flex items-center justify-center relative shadow-inner">
                                {/* C14 Socket */}
                                <div className="flex gap-1.5">
                                    <div className="w-1 h-3 bg-slate-700"></div>
                                    <div className="w-1 h-3 bg-slate-700"></div>
                                    <div className="w-1 h-3 bg-slate-700"></div>
                                </div>
                            </div>
                            <span className="text-[8px] text-slate-500 font-mono">AC IN</span>
                        </div>

                        <div className="w-[1px] h-2/3 bg-slate-700/50"></div>

                        {/* Network Stack */}
                        <div className="flex flex-col gap-2 items-center">
                            <div className="flex gap-2 p-1.5 bg-black/20 rounded-lg border border-slate-700/50">
                                {/* SFP+ x2 */}
                                <div className="flex flex-col gap-1.5">
                                    {[1, 2].map(i => (
                                        <div key={i} className="w-10 h-6 bg-[#252525] rounded-[2px] border border-slate-500 flex items-center justify-center relative shadow-sm group hover:border-blue-400/50 transition-colors">
                                            <div className="w-6 h-3 bg-black rounded-[1px] border border-slate-700"></div>
                                            <div className="absolute right-0.5 bottom-0.5 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_3px_#10b981]"></div>
                                            <div className="absolute -left-3 top-1 text-[6px] text-slate-500 font-mono -rotate-90">SFP</div>
                                        </div>
                                    ))}
                                </div>
                                {/* LAN x2 */}
                                <div className="flex flex-col gap-1.5">
                                    {[1, 2].map(i => (
                                        <div key={i} className="w-8 h-6 bg-slate-300 rounded-[2px] border border-slate-400 flex items-center justify-center relative shadow-sm overflow-hidden">
                                            <div className="w-6 h-4 bg-[#151515] rounded-[1px] mb-0.5 relative">
                                                <div className="absolute top-0 left-0.5 flex gap-[1.5px]">
                                                    {[...Array(8)].map((_,p) => <div key={p} className="w-[1px] h-1.5 bg-yellow-600"></div>)}
                                                </div>
                                            </div>
                                            <div className="absolute top-0.5 right-0.5 w-[3px] h-[3px] bg-yellow-500 rounded-full"></div>
                                            <div className="absolute top-0.5 left-0.5 w-[3px] h-[3px] bg-green-500 rounded-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <span className="text-[8px] text-slate-500 font-mono">NET IO</span>
                        </div>

                        {/* Peripherals */}
                        <div className="flex flex-col gap-2 items-center">
                             <div className="flex gap-2 items-end h-[62px]">
                                  {/* USB Stack */}
                                 <div className="flex flex-col gap-1.5 justify-end">
                                     {[1, 2].map(i => (
                                         <div key={i} className="w-3.5 h-7 bg-slate-800 rounded-[1px] border border-slate-500 flex flex-col items-center py-0.5 relative shadow-sm">
                                             <div className="w-1.5 h-full bg-blue-600/80 rounded-[1px]"></div>
                                         </div>
                                     ))}
                                 </div>
                                 {/* Console */}
                                 <div className="w-5 h-6 bg-slate-900 rounded-[4px] border border-slate-600 flex items-center justify-center">
                                     <div className="w-1 h-3 bg-black rounded-full"></div>
                                 </div>
                             </div>
                             <span className="text-[8px] text-slate-500 font-mono">USB/MGT</span>
                        </div>
                    </div>

                    {/* 3. Status & Power (Right) - COMPRESSED */}
                    <div className="flex flex-col justify-between h-3/4 border-l border-slate-700/50 pl-4 w-28 py-1 flex-shrink-0">
                        {/* Indicators */}
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {[
                                { label: 'SYS', color: 'bg-emerald-500' },
                                { label: 'ALM', color: 'bg-red-500', off: true },
                                { label: 'ACT', color: 'bg-blue-500', pulse: true },
                                { label: 'LOC', color: 'bg-blue-400', off: true },
                            ].map((led, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${led.off ? 'bg-slate-800 border border-slate-700' : led.color} ${led.pulse ? 'animate-pulse' : ''} shadow-[0_0_4px_currentColor]`}></div>
                                    <span className="text-[8px] font-bold text-slate-500">{led.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Button Cluster */}
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-600 group-hover:border-slate-400"></div>
                                <span className="text-[7px] text-slate-600">RST</span>
                            </div>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 shadow-md cursor-pointer hover:border-blue-500 hover:shadow-blue-900/20 active:scale-95 transition-all group">
                                <Power size={12} className="text-slate-400 group-hover:text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VIEW: INTERNAL STRUCTURE (Balanced Layout) --- */}
            {viewMode === 'INTERNAL' && (
                <div className="flex-1 relative bg-slate-900/95 p-5 flex gap-4">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    {/* Power Module */}
                    <div className="w-1/5 h-full bg-slate-800/80 border border-slate-600 rounded p-2 flex flex-col justify-center items-center relative">
                        <Zap size={20} className="text-yellow-500 mb-2" />
                        <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">工业级<br/>宽温电源</span>
                    </div>

                    {/* Main Board (Spacious) */}
                    <div className="flex-1 h-full bg-slate-800/80 border border-blue-500/30 rounded p-2 flex flex-col gap-2 relative overflow-hidden">
                        {/* Heat Sink */}
                        <div className="flex-1 bg-black/40 rounded border border-slate-700 flex items-center justify-between px-4 relative">
                             <div className="absolute inset-x-0 top-2 bottom-2 flex flex-col justify-between opacity-30 px-2">
                                {[1,2,3,4,5].map(i => <div key={i} className="w-full h-[1px] bg-slate-500"></div>)}
                             </div>
                             <div className="z-10 bg-slate-900/90 px-3 py-1 rounded border border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                <span className="text-[10px] font-bold text-blue-400 tracking-wide">Ascend 310P AI Core</span>
                             </div>
                             <Activity size={16} className="text-blue-500/50" />
                        </div>
                        
                        {/* Memory & Storage Strips */}
                        <div className="h-6 w-full flex gap-2">
                             <div className="flex-1 bg-green-900/20 border border-green-700/30 rounded flex items-center justify-center">
                                <div className="flex gap-1 mr-2">
                                    {[1,2,3,4].map(i => <div key={i} className="w-2 h-3 bg-green-700/40 rounded-[1px]"></div>)}
                                </div>
                                <span className="text-[8px] text-green-400 font-mono">48GB LPDDR4x</span>
                             </div>
                             <div className="w-1/3 bg-purple-900/20 border border-purple-700/30 rounded flex items-center justify-center">
                                <span className="text-[8px] text-purple-400 font-mono">2TB NVMe</span>
                             </div>
                        </div>
                    </div>

                    {/* Cooling Fans */}
                    <div className="w-12 h-full flex flex-col gap-2">
                        <div className="flex-1 bg-slate-800/80 border border-slate-600 rounded flex items-center justify-center">
                            <Fan size={16} className="text-slate-400 animate-spin" style={{ animationDuration: '2s' }} />
                        </div>
                         <div className="flex-1 bg-slate-800/80 border border-slate-600 rounded flex items-center justify-center">
                            <Fan size={16} className="text-slate-400 animate-spin" style={{ animationDuration: '2.2s' }} />
                        </div>
                    </div>

                    {/* Airflow Overlay */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent skew-x-12"></div>
                    </div>
                </div>
            )}
        </div>
        
        {/* Soft Ground Reflection */}
        <div className="absolute -bottom-3 inset-x-8 h-3 bg-blue-500/10 blur-lg rounded-[50%] opacity-40"></div>
    </div>
  );
}

const ProductForms: React.FC<Props> = ({ onBack }) => {
  const [deviceView, setDeviceView] = useState<'FRONT' | 'INTERNAL'>('FRONT');

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow border border-slate-200">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium">返回主页</span>
        </button>

        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider text-xs uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-100">灵活交付模式</span>
          <h2 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4">产品交付形态</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            无论是从零构建算力底座，还是基于现有设施升级，我们都提供适配的解决方案。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {/* Form 1: All-in-One */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-blue-400 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                    <Box size={200} className="text-blue-600" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
                        <Server size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">大模型知识库一体机</h4>
                    <p className="text-slate-500 text-base mb-8 leading-relaxed">
                        软硬一体化交付。预装元立方 OS 与全套业务软件，提供从硬件上架到系统初始化的全流程部署服务，适合从零构建算力底座的企业。
                    </p>
                    <div className="mt-auto bg-slate-50 rounded-xl p-5 border border-slate-100">
                            <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700 font-bold">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> 
                                包含高性能边缘算力节点
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-bold">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> 
                                本地化上门部署调试服务
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Form 2: Software + Services */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group hover:border-indigo-400 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                    <AppWindow size={200} className="text-indigo-600" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30">
                        <AppWindow size={28} />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-3">纯软件平台 + 治理服务</h4>
                    <p className="text-slate-500 text-base mb-8 leading-relaxed">
                        针对已有硬件资源的企业。提供知识库平台软件授权，并协助完成环境部署。重点包含专业的数据清洗与治理咨询服务，确保数据可用。
                    </p>
                    <div className="mt-auto bg-slate-50 rounded-xl p-5 border border-slate-100">
                            <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700 font-bold">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> 
                                兼容主流国产/通用服务器
                            </li>
                            <li className="flex items-center gap-3 text-slate-700 font-bold">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" /> 
                                专家级数据治理与协助部署
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* --- MOVED: Hardware Spec Sheet (OmniCube) --- */}
        <div className="max-w-7xl mx-auto mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-6 pl-4 border-l-4 border-slate-900">一体机硬件规格详情 (元立方 OmniCube)</h3>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col xl:flex-row">
                
                {/* Visual Representation - Edge Box */}
                <div className="w-full xl:w-5/12 bg-slate-100 p-8 flex flex-col border-b xl:border-b-0 xl:border-r border-slate-200">
                    
                    {/* Visual Controls */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button 
                            onClick={() => setDeviceView('FRONT')}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${deviceView === 'FRONT' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
                        >
                            前面板视图 (Front)
                        </button>
                        <button 
                             onClick={() => setDeviceView('INTERNAL')}
                             className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${deviceView === 'INTERNAL' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
                        >
                            内部结构视图 (Internal)
                        </button>
                    </div>

                    {/* The Visual Component */}
                    <OmniCubeVisual viewMode={deviceView} />

                    <div className="mt-8 text-center">
                        <h4 className="font-bold text-slate-800">元立方 OmniCube 边缘计算设备</h4>
                        <div className="flex justify-center gap-4 mt-2">
                             <div className="flex flex-col">
                                 <span className="text-[10px] text-slate-400 uppercase">Height</span>
                                 <span className="text-sm font-bold text-slate-700">65mm (1.5U)</span>
                             </div>
                             <div className="w-px bg-slate-300"></div>
                             <div className="flex flex-col">
                                 <span className="text-[10px] text-slate-400 uppercase">Width</span>
                                 <span className="text-sm font-bold text-slate-700">230mm</span>
                             </div>
                             <div className="w-px bg-slate-300"></div>
                             <div className="flex flex-col">
                                 <span className="text-[10px] text-slate-400 uppercase">Depth</span>
                                 <span className="text-sm font-bold text-slate-700">300mm</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Specs Table */}
                <div className="w-full xl:w-7/12 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        {[
                            { 
                                icon: Cpu, 
                                label: "AI 算力核心 (NPU)", 
                                val: "Ascend 310P AI Core", 
                                desc: "10个 DaVinciV200 核心 @ 1.08GHz，提供超强边缘推理算力" 
                            },
                            { 
                                icon: Layers, 
                                label: "通用计算核心 (CPU)", 
                                val: "TaishanV200 M", 
                                desc: "16核 64位 @ 1.9GHz，8个 Vector Core @ 1GHz" 
                            },
                            { 
                                icon: HardDrive, 
                                label: "高速内存", 
                                val: "48 GB LPDDR4x", 
                                desc: "384-bit 位宽，支持 ECC 校验，满足大模型上下文需求" 
                            },
                            { 
                                icon: Database, 
                                label: "本地存储", 
                                val: "2 TB NVMe SSD", 
                                desc: "PCIe 4.0 M.2 接口，海量向量索引本地高速存取" 
                            },
                            { 
                                icon: Network, 
                                label: "网络接口", 
                                val: "2x SFP+ (10G) + 2x RJ45 (1G)", 
                                desc: "光电混合组网，支持双线负载均衡与物理隔离" 
                            },
                            { 
                                icon: Zap, 
                                label: "电源与散热", 
                                val: "220V AC / 140W Max", 
                                desc: "主动式风扇散热，MW 工业级电源模块" 
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg h-fit">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-800 text-sm">{item.label}</h5>
                                    <div className="font-mono text-slate-900 font-bold text-lg my-0.5">{item.val}</div>
                                    <p className="text-xs text-slate-500 leading-tight">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-400 font-bold">操作系统 (OS)</span>
                            <span className="text-xs font-bold text-slate-700">openEuler / Linx</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-400 font-bold">工作温度 (Temp)</span>
                            <span className="text-xs font-bold text-slate-700">5°C ~ 35°C</span>
                        </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-400 font-bold">整机净重 (Weight)</span>
                            <span className="text-xs font-bold text-slate-700">Net 5.3kg</span>
                        </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-slate-400 font-bold">全栈软件 (Stack)</span>
                            <span className="text-xs font-bold text-slate-700">CANN + MindIE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Shared Service: Training */}
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-2xl relative overflow-hidden group cursor-default">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute -right-10 -bottom-10 opacity-10">
                    <GraduationCap size={150} />
                </div>
                
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center border border-yellow-500/30 text-yellow-400">
                        <GraduationCap size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-1">全链路人员培训服务</h4>
                        <p className="text-slate-400 text-sm">Empowerment & Training</p>
                    </div>
                </div>
                
                <div className="relative z-10 md:text-right max-w-md">
                    <p className="text-lg font-medium text-slate-200 leading-relaxed">
                        上述两种产品形态，均包含完整的<span className="text-yellow-400 font-bold">“人员培训服务”</span>，
                        <br className="hidden md:block"/>
                        赋能企业内部团队实现自主运营与维护。
                    </p>
                </div>
        </div>

      </div>
    </div>
  );
};

export default ProductForms;
