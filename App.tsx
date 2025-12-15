
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Database, 
  Menu,
  ChevronRight,
  ChevronDown,
  Layout,
  Network,
  Cpu,
  Globe,
  ShieldCheck
} from 'lucide-react';
import HybridArchitectureDiagram from './components/HybridArchitectureDiagram';
import Simulation from './components/Simulation';
import ManagerDashboard from './components/ManagerDashboard';
import ContactModal from './components/ContactModal';
import FooterInfoModal, { InfoType } from './components/FooterInfoModal';
import WorkbenchView from './components/WorkbenchView';
import ValueAnalysis from './components/ValueAnalysis';
import TechSpecs from './components/TechSpecs';
import ProductForms from './components/ProductForms';
import { 
  COMPANY_NAME, 
  PRODUCT_NAME,
  PRODUCT_NAME_EN, 
  HERO_TITLE,
  HERO_SUBTITLE,
  BENEFITS,
  MOCK_AGENTS,
  FAQ_ITEMS,
  BRAND_PHILOSOPHY
} from './constants';
import { ViewMode } from './types';

// Tech Cube Logo Component (Updated to 3D Cube with Rotation and Resizable)
const OmniCubeLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className={`relative ${className} flex items-center justify-center group perspective-1000 cursor-pointer`}>
    <div className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:rotate-[360deg] transform-style-3d">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cubeGradientTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="cubeGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
             <stop offset="0%" stopColor="#3b82f6" />
             <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="cubeGradientRight" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#6366f1" />
             <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
        </defs>
        
        {/* Top Face */}
        <path d="M50 15 L85 35 L50 55 L15 35 Z" fill="url(#cubeGradientTop)" stroke="#c4b5fd" strokeWidth="0.5" />
        
        {/* Right Face */}
        <path d="M50 55 L85 35 V75 L50 95 Z" fill="url(#cubeGradientRight)" stroke="#4f46e5" strokeWidth="0.5" />
        
        {/* Left Face */}
        <path d="M50 55 L15 35 V75 L50 95 Z" fill="url(#cubeGradientLeft)" stroke="#3b82f6" strokeWidth="0.5" />
        
        {/* Inner Edges Highlight */}
        <path d="M50 55 V95" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M50 55 L85 35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M50 55 L15 35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
      </svg>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.LANDING);
  
  // Contact Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Info Modal State (Docs/About/Privacy)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<InfoType>('ABOUT');

  // Animation State for Logo Click
  const [logoClickEffect, setLogoClickEffect] = useState(false);

  // Ensure scroll to top whenever view changes or app loads
  // Use useLayoutEffect to ensure this happens before paint to avoid visual jumping
  useLayoutEffect(() => {
    // 1. Disable browser's automatic scroll restoration (which causes starting in middle on reload)
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Force scroll to top immediately with 'instant' behavior to bypass smooth scroll CSS
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // 3. Fallback: Ensure top position after a tiny delay (helps with some layout shifts or async rendering)
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

    return () => clearTimeout(timer);
  }, [view]);

  const openInfoModal = (type: InfoType) => {
    setInfoModalType(type);
    setIsInfoModalOpen(true);
  };
  const closeInfoModal = () => setIsInfoModalOpen(false);

  const navigateTo = (mode: ViewMode) => {
    setView(mode);
  };

  const goHome = () => {
      setLogoClickEffect(true);
      setView(ViewMode.LANDING);
      // Reset the animation state after it completes
      setTimeout(() => setLogoClickEffect(false), 800);
  };

  // Render Full Page Views
  if (view === ViewMode.WORKBENCH) return <WorkbenchView onBack={goHome} />;
  if (view === ViewMode.ADMIN) return <ManagerDashboard isFullPage={true} onBack={goHome} />;
  if (view === ViewMode.VALUE) return <ValueAnalysis onBack={goHome} />;
  if (view === ViewMode.TECH) return <TechSpecs onBack={goHome} />;
  if (view === ViewMode.FORMS) return <ProductForms onBack={goHome} />;

  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-800 scroll-smooth">
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      <FooterInfoModal isOpen={isInfoModalOpen} onClose={closeInfoModal} type={infoModalType} />
      
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group relative" onClick={goHome}>
            {/* Logo Icon */}
            <OmniCubeLogo />
            
            {/* Brand Text (Updated: Larger, Bolder, Click Effect) */}
            <div className="flex flex-col justify-center ml-1 relative">
               <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 leading-none transition-colors group-hover:text-slate-800">
                 {PRODUCT_NAME}
               </h1>
               <span className="text-sm md:text-base font-extrabold text-[#6366f1] leading-none mt-1 font-sans tracking-wide">
                 {PRODUCT_NAME_EN}
               </span>
               
               {/* Colorful Bar Animation */}
               <div className={`absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out ${logoClickEffect ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-base font-bold text-slate-700">
             <button onClick={() => navigateTo(ViewMode.FORMS)} className="hover:text-blue-600 transition-colors">产品形态</button>
             <button onClick={() => navigateTo(ViewMode.VALUE)} className="hover:text-blue-600 transition-colors">核心价值</button>
             <button onClick={() => navigateTo(ViewMode.WORKBENCH)} className="hover:text-blue-600 transition-colors">用户体验</button>
             <button onClick={() => navigateTo(ViewMode.ADMIN)} className="hover:text-blue-600 transition-colors">知识资产</button>
             <button onClick={() => navigateTo(ViewMode.TECH)} className="hover:text-blue-600 transition-colors">技术原理</button>
          </div>
          <button 
            onClick={openModal}
            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
          >
            预约演示
          </button>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="pt-36 pb-20 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-blue-100/50 via-indigo-50/30 to-white rounded-full blur-3xl -z-10" />

         <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mb-6 border border-blue-100">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
               </span>
               亚康华创 x 感易智能 联合发布
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
               {HERO_TITLE}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto">
               {HERO_SUBTITLE}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button 
                  onClick={() => navigateTo(ViewMode.VALUE)}
                  className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-lg font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  探索核心价值 <ArrowRight size={18} />
               </button>
               <button 
                  onClick={() => openInfoModal('WHITEPAPER')}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-lg font-bold hover:bg-slate-50 transition-all active:scale-95"
                >
                  下载技术白皮书
               </button>
            </div>
         </div>
      </section>

      {/* === VALUE PROPS === */}
      <section id="value" className="py-20 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                  高质量知识库建设是企业级AI落地的必经之路
               </h2>
               <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                  基于金融行业成熟的数据治理经验，重新定义企业知识库建设标准。<br className="hidden md:block" />
                  我们致力于解决传统行业的高复杂度非结构化数据难题，为企业智能化转型构建坚实可信的数据底座。
               </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               {BENEFITS.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                           <Icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm mb-6">{b.description}</p>
                        <button 
                           onClick={() => navigateTo(ViewMode.VALUE)}
                           className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all"
                         >
                           查看详细对比 <ArrowRight size={14} />
                        </button>
                    </div>
                  );
               })}
            </div>
         </div>
      </section>

      {/* === BRAND PHILOSOPHY (SYMMETRICAL) === */}
      <section className="py-16 bg-slate-900 relative overflow-hidden text-center">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
            
            {/* Unified Brand Logo (Replaced BrandGraphic) */}
            <OmniCubeLogo className="w-24 h-24 mb-8" />
            
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest mb-10">
               元立方 <span className="text-blue-500">OMNI CUBE</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 w-full mb-10">
                 {/* Yuan Card */}
                 <div className="relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/50 transition-colors">
                     <div className="flex flex-col items-center">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400 mb-4">{BRAND_PHILOSOPHY.yuan.title}</span>
                        <div className="h-px w-12 bg-slate-600 mb-4"></div>
                        <h4 className="text-white font-bold text-lg mb-2">{BRAND_PHILOSOPHY.yuan.subtitle}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                           {BRAND_PHILOSOPHY.yuan.desc}
                        </p>
                     </div>
                 </div>

                 {/* Cube Card (Previously Omni) */}
                 <div className="relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm group hover:bg-slate-800/50 transition-colors">
                     <div className="flex flex-col items-center">
                        <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-fuchsia-400 mb-4">{BRAND_PHILOSOPHY.cube.title}</span>
                        <div className="h-px w-12 bg-slate-600 mb-4"></div>
                        <h4 className="text-white font-bold text-lg mb-2">{BRAND_PHILOSOPHY.cube.subtitle}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                           {BRAND_PHILOSOPHY.cube.desc}
                        </p>
                     </div>
                 </div>
            </div>

            {/* Vision / Footer of Section */}
            <div className="max-w-2xl mx-auto relative">
                <p className="text-lg font-light text-slate-300 leading-relaxed">
                   AI时代，企业从应用驱动转向<span className="text-white font-bold">数据先行</span>，沉淀恒定知识资产，构筑不可逾越的护城河。
                </p>
            </div>

        </div>
      </section>

      {/* === FEATURE 1: USER EXPERIENCE (WORKSTATION) === */}
      <section id="experience" className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
               <div className="lg:w-1/2 space-y-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                     员工的 AI 工作台<br/>
                     <span className="text-blue-600">开箱即用，所见即所得</span>
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                     无需复杂的配置，我们预装了适配财务、法务、HR 等场景的 50+ 种 AI 智能体。员工可以通过统一的入口，无缝调用企业知识库，快速完成文档审查、标书生成等工作。
                  </p>
                  <ul className="space-y-4">
                     {['预置 50+ 行业 Agent', '统一身份认证 SSO', '支持多模态输入 (文档/语音)'].map(item => (
                        <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                           <CheckCircle size={20} className="text-emerald-500" />
                           {item}
                        </li>
                     ))}
                  </ul>
                  <button 
                     onClick={() => navigateTo(ViewMode.WORKBENCH)}
                     className="px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                     <Layout size={16} />
                     进入 AI 工作台演示
                  </button>
               </div>

               {/* Live Demo Wrapper */}
               <div className="lg:w-1/2 w-full">
                  <div className="relative group cursor-pointer" onClick={() => navigateTo(ViewMode.WORKBENCH)}>
                     {/* Decorative Elements */}
                     <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                     
                     <div className="relative bg-slate-900 p-2 rounded-[1.5rem] shadow-2xl ring-1 ring-slate-800 transition-transform group-hover:scale-[1.01]">
                        {/* Mock Browser UI */}
                        <div className="bg-slate-100 rounded-[1.2rem] overflow-hidden flex flex-col h-[500px] pointer-events-none">
                           <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-4">
                              <div className="flex gap-1.5">
                                 <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                                 <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                              </div>
                              <div className="flex-1 bg-slate-100 rounded-md h-6 w-1/2 mx-4 flex items-center px-3 text-[10px] text-slate-400">
                                 ai-workbench.yuanlifang.com
                              </div>
                           </div>
                           <div className="flex flex-1 overflow-hidden">
                              {/* Sidebar Mock */}
                              <div className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-4 gap-4 hidden sm:flex">
                                 <div className="w-8 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20"></div>
                                 <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                                 <div className="w-8 h-8 bg-slate-100 rounded-lg"></div>
                                 <div className="mt-auto w-8 h-8 rounded-full bg-slate-200"></div>
                              </div>
                              {/* Chat Area */}
                              <div className="flex-1 bg-slate-50 p-4">
                                 <Simulation activeAgent={MOCK_AGENTS[0]} />
                              </div>
                           </div>
                        </div>
                        {/* Overlay to indicate clickability */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]">
                            <div className="bg-white/90 backdrop-blur text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                点击全屏体验
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* === FEATURE 2: MANAGEMENT VALUE (DASHBOARD) === */}
      <section id="management" className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
         {/* Background grid */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
               <div className="lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
                     管理者专属视角
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                     知识即资产<br/>
                     <span className="text-indigo-400">全链路监控 AI 效能</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                     知识库的构建仅仅是开始，被准确调用才是价值的体现。元立方提供完整的运营看板，帮助企业实时评估知识库质量、RAG 命中率以及敏感数据拦截情况。
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                     <div>
                        <h4 className="text-2xl font-bold text-white mb-1">98%</h4>
                        <p className="text-slate-500 text-sm">敏感数据拦截率</p>
                     </div>
                     <div>
                        <h4 className="text-2xl font-bold text-white mb-1">1.2s</h4>
                        <p className="text-slate-500 text-sm">平均检索时延</p>
                     </div>
                  </div>
                  <button 
                     onClick={() => navigateTo(ViewMode.ADMIN)}
                     className="mt-4 px-6 py-3 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                     <Database size={16} />
                     进入管理后台演示
                  </button>
               </div>

               {/* Dashboard Demo Wrapper */}
               <div className="lg:w-1/2 w-full">
                   <div 
                        className="transform rotate-1 hover:rotate-0 transition-transform duration-500 origin-center cursor-pointer relative group"
                        onClick={() => navigateTo(ViewMode.ADMIN)}
                    >
                      <div className="pointer-events-none">
                          <ManagerDashboard />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                            <div className="bg-slate-900/90 backdrop-blur text-white px-6 py-3 rounded-full font-bold shadow-lg border border-slate-700">
                                查看详情
                            </div>
                        </div>
                   </div>
               </div>
            </div>
         </div>
      </section>

      {/* === FEATURE 3: ARCHITECTURE (SVG) === */}
      <section id="tech" className="py-24 px-6 bg-slate-50">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  云边协同，安全无忧
               </h2>
               <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                  独创的物理隔离架构，本地处理高频 OCR 与脱敏，云端仅在安全沙箱中处理推理任务。原始数据永不出网。
               </p>
            </div>

            <div className="bg-slate-900 p-2 rounded-2xl shadow-2xl ring-1 ring-slate-800 relative group cursor-pointer" onClick={() => navigateTo(ViewMode.TECH)}>
               <div className="rounded-xl overflow-hidden pointer-events-none">
                  <HybridArchitectureDiagram isActive={true} />
               </div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                     <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-blue-500 transition-colors transform translate-y-4 group-hover:translate-y-0">
                        查看硬件规格与拓扑
                     </button>
               </div>
            </div>
            
            <div className="mt-12 text-center">
               <p className="text-sm text-slate-500 mb-6">支持私有化部署、混合云部署等多种交付模式</p>
               <div className="flex flex-wrap justify-center gap-4">
                  {['本地 NPU 加速', 'TLS 1.3 双向认证', '内存态安全计算', '全链路审计'].map(tag => (
                     <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-xs font-bold shadow-sm">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* === FAQ === */}
      <section className="py-20 px-6 bg-white">
         <div className="max-w-3xl mx-auto">
             <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">常见问题</h2>
             <div className="space-y-6">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                     <h3 className="font-bold text-slate-800 mb-2 flex items-start gap-3">
                        <span className="text-blue-600">Q.</span>
                        {item.q}
                     </h3>
                     <p className="text-slate-500 text-sm leading-relaxed pl-7">
                        {item.a}
                     </p>
                  </div>
                ))}
             </div>
         </div>
      </section>

      {/* === FOOTER === */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
               <div className="flex flex-col gap-1 mb-2">
                  <h3 className="font-bold text-lg text-slate-900">北京亚康华创科技有限公司</h3>
               </div>
               <p className="text-slate-500 text-sm">赋能企业智能化转型，让数据创造价值。</p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-slate-600">
               <button onClick={() => openInfoModal('DOCS')} className="hover:text-blue-600 transition-colors">产品文档</button>
               <button onClick={() => openInfoModal('ABOUT')} className="hover:text-blue-600 transition-colors">关于我们</button>
               <button onClick={openModal} className="hover:text-blue-600 transition-colors">联系销售</button>
               <button onClick={() => openInfoModal('PRIVACY')} className="hover:text-blue-600 transition-colors">隐私政策</button>
            </div>
            <div className="flex flex-col items-end gap-2">
               <button onClick={openModal} className="text-xs bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  联系售前顾问
               </button>
               <p className="text-xs text-slate-400">© 2025 Yakanghuachuang. All rights reserved.</p>
            </div>
         </div>
      </footer>

    </div>
  );
};

export default App;
