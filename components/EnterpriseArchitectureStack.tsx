
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Cpu, Layers, ArrowUp, RefreshCw, 
  AlertTriangle, TrendingUp, Lock, Shield, 
  Activity, BarChart3, Zap, Key, Scale
} from 'lucide-react';

const EnterpriseArchitectureStack: React.FC = () => {
  // Animation variants
  const pulseVariant = {
    animate: {
      opacity: [0.8, 1, 0.8],
      scale: [1, 1.02, 1],
      transition: { duration: 3, repeat: Infinity }
    }
  };

  const flowLineVariant = {
    animate: {
      y: [0, 20, 0],
      opacity: [0, 1, 0],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  };

  return (
    <div className="w-full bg-[#0B1120] rounded-3xl p-6 md:p-10 text-white border border-slate-800 shadow-2xl overflow-hidden relative">
      
      {/* Header Text */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">企业 AI 时代整体技术架构</h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
          应用层需求多变，模型层迭代迅速。唯有<span className="text-amber-400 font-bold mx-1 border-b-2 border-amber-400/30 pb-0.5">知识资产层</span>是企业最稳固的收益支点与核心护城河。
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* ================= GRID LAYOUT START ================= */}
        {/* Using CSS Grid to ensure strict alignment between Left (Tech) and Right (Value) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

            {/* --- ROW 1: APPLICATION LAYER (Volatile) --- */}
            {/* LEFT: Tech Stack */}
            <div className="lg:col-span-9 flex flex-col justify-end">
                <div className="relative border border-blue-500/30 bg-slate-900/50 rounded-2xl p-6 flex flex-col gap-4">
                    {/* Label */}
                    <div className="absolute -top-3 left-6 bg-[#0B1120] px-3 py-0.5 text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2 border border-blue-500/30 rounded-full">
                        <Zap size={14} /> 业务应用层
                    </div>

                    {/* 1.1 The Apps */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-2">
                        {['智能客服', '公文写作', '代码助手', '营销文案', '业务报表'].map((app, i) => (
                            <div key={i} className="bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-lg p-4 text-center transition-colors group cursor-default shadow-sm">
                                <div className="text-sm md:text-base font-bold text-white group-hover:text-blue-300">{app}</div>
                            </div>
                        ))}
                    </div>

                    {/* 1.2 The Governance Gateway (New Requirement) */}
                    <div className="bg-[#162032] border-t-2 border-blue-600/30 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-2 text-blue-200 text-base font-bold">
                            <Shield size={18} /> 应用统一鉴权与治理网关
                        </div>
                        <div className="flex gap-3 w-full md:w-auto overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                            {[
                                { label: '统一鉴权 SSO', icon: Key },
                                { label: '优先级调度', icon: Scale },
                                { label: 'Token 计费', icon: BarChart3 },
                                { label: '效果监控', icon: Activity }
                            ].map((item, i) => (
                                <div key={i} className="flex-1 md:flex-none flex flex-col items-center justify-center bg-black/20 rounded-lg px-4 py-2 border border-slate-700/50 min-w-[80px]">
                                    <item.icon size={16} className="text-slate-400 mb-1"/>
                                    <span className="text-xs text-slate-200 font-medium whitespace-nowrap">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Arrow Connector */}
                <div className="h-8 flex justify-center items-center text-slate-600"><ArrowUp className="rotate-180 animate-bounce" size={24}/></div>
            </div>

            {/* RIGHT: Value Analysis */}
            <div className="lg:col-span-3 flex flex-col">
                <div className="flex-1 bg-red-900/10 border border-red-500/30 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-20"><AlertTriangle size={64} className="text-red-500"/></div>
                    <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                        <AlertTriangle size={20}/> 高风险投资区
                    </h4>
                    <ul className="text-base text-red-100/90 space-y-3 list-disc list-inside font-medium">
                        <li>业务需求高度个性化</li>
                        <li>应用场景变化极快</li>
                        <li><span className="opacity-80 text-sm font-normal">过早重资投入易成沉没成本</span></li>
                    </ul>
                </div>
                {/* Spacer to match arrow height */}
                <div className="h-8"></div>
            </div>


            {/* --- ROW 2: KNOWLEDGE ASSET LAYER (The Anchor) --- */}
            {/* LEFT: Tech Stack */}
            <div className="lg:col-span-9 flex flex-col justify-center relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full"></div>
                
                <motion.div 
                    variants={pulseVariant}
                    animate="animate"
                    className="relative bg-gradient-to-br from-slate-900 to-[#1a1500] border-2 border-amber-500/60 rounded-2xl p-6 md:p-8 shadow-[0_0_40px_rgba(245,158,11,0.15)] z-10"
                >
                    <div className="absolute -top-3 left-6 bg-amber-600 px-4 py-1 rounded-full text-sm font-bold text-white uppercase tracking-wider shadow-lg flex items-center gap-2">
                        <Database size={16} /> 知识资产全链路管理
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center mt-2">
                        {/* 2.1 Data Sources */}
                        <div className="w-full md:w-1/3 flex flex-col gap-3">
                            <div className="text-sm font-bold text-slate-400 uppercase mb-1">多模态资产沉淀</div>
                            <div className="bg-black/30 rounded-lg p-3 border border-amber-500/20 flex items-center justify-between">
                                <span className="text-base font-medium text-slate-200">结构化数据</span>
                                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">DB / ERP</span>
                            </div>
                            <div className="bg-black/30 rounded-lg p-3 border border-amber-500/20 flex items-center justify-between">
                                <span className="text-base font-medium text-slate-200">非结构化文档</span>
                                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">PDF / Word</span>
                            </div>
                            <div className="bg-black/30 rounded-lg p-3 border border-amber-500/20 flex items-center justify-between">
                                <span className="text-base font-medium text-slate-200">PC 分散资产</span>
                                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">IM / Email</span>
                            </div>
                        </div>

                        {/* Middle Arrow */}
                        <div className="hidden md:block text-amber-500/50"><ArrowUp className="rotate-90" size={28}/></div>

                        {/* 2.2 Asset Operations (Metrics) - New Requirement */}
                        <div className="flex-1 w-full bg-amber-500/10 rounded-xl border border-amber-500/30 p-5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-amber-500/20 px-3 py-1 rounded-bl-lg text-xs text-amber-300 font-bold">
                                资产运营看板
                            </div>
                            <div className="grid grid-cols-2 gap-6 mt-2">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">98<span className="text-lg text-amber-400">%</span></div>
                                    <div className="text-sm text-amber-100/80">知识解析准确率</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">1.2<span className="text-lg text-amber-400">s</span></div>
                                    <div className="text-sm text-amber-100/80">平均检索时延</div>
                                </div>
                                <div className="text-center border-t border-amber-500/20 pt-3">
                                    <div className="text-xl font-bold text-white mb-1">高热度</div>
                                    <div className="text-sm text-amber-100/80">资产使用频率</div>
                                </div>
                                <div className="text-center border-t border-amber-500/20 pt-3">
                                    <div className="text-xl font-bold text-white mb-1">三级等保</div>
                                    <div className="text-sm text-amber-100/80">数据安全分级</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                {/* Arrow Connector */}
                <div className="h-8 flex justify-center items-center text-slate-600"><ArrowUp className="rotate-180 animate-bounce" size={24}/></div>
            </div>

            {/* RIGHT: Value Analysis */}
            <div className="lg:col-span-3 flex flex-col">
                <div className="flex-1 bg-emerald-900/20 border-2 border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-center relative shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="absolute top-0 right-0 p-2 opacity-20"><Lock size={64} className="text-emerald-500"/></div>
                    <h4 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
                        <Lock size={24}/> 资产恒定区
                    </h4>
                    <div className="space-y-5">
                        <div className="text-base text-emerald-100 font-medium border-l-4 border-emerald-500 pl-4">
                            数据治理越早越好
                        </div>
                        <div className="text-base text-emerald-100 font-medium border-l-4 border-emerald-500 pl-4">
                            知识沉淀永久增值
                        </div>
                        <div className="mt-6 pt-4 border-t border-emerald-500/30 text-emerald-400 font-bold text-center text-lg">
                            "投资不会打水漂"
                        </div>
                    </div>
                </div>
                {/* Spacer */}
                <div className="h-8"></div>
            </div>


            {/* --- ROW 3: INFRASTRUCTURE (Models + Scheduler + Hardware) --- */}
            {/* LEFT: Tech Stack */}
            <div className="lg:col-span-9 flex flex-col gap-4">
                
                {/* 3.1 Model Layer (Volatile but Abstracted) */}
                <div className="relative border border-purple-500/30 bg-slate-900/50 rounded-xl p-5 flex items-center justify-between gap-4">
                    <div className="absolute -top-3 left-6 bg-[#0B1120] px-3 py-0.5 text-sm font-bold text-purple-400 uppercase tracking-wider border border-purple-500/30 rounded-full">
                        大模型服务层 (MaaS)
                    </div>
                    <div className="flex-1 flex gap-3 overflow-hidden opacity-90 mt-2">
                        {['DeepSeek-V3', 'Qwen-2.5', 'GLM-4', 'GPT-4o'].map((m, i) => (
                            <span key={i} className="text-sm font-mono text-purple-200 bg-purple-900/40 px-4 py-2 rounded-lg border border-purple-500/20 whitespace-nowrap">
                                {m}
                            </span>
                        ))}
                    </div>
                    <div className="text-xs text-purple-400 font-bold border-l-2 border-purple-500/30 pl-4 hidden md:block">
                        模型能力迭代<br/>按月更新
                    </div>
                </div>

                {/* Arrow */}
                <div className="h-4 flex justify-center items-center text-slate-700"><ArrowUp className="rotate-180" size={20}/></div>

                {/* 3.2 Scheduler Layer */}
                <div className="bg-[#111827] border border-blue-800/50 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(37,99,235,0.1)_50%,transparent_75%)] bg-[length:10px_10px]"></div>
                    <div className="flex items-center gap-3 text-sm md:text-base text-blue-300 font-bold z-10">
                        <Layers size={18} /> 算力统一调度与优化平台
                    </div>
                </div>

                {/* Arrow */}
                <div className="h-4 flex justify-center items-center text-slate-700"><ArrowUp className="rotate-180" size={20}/></div>

                {/* 3.3 Hardware Layer */}
                <div className="bg-black border-t-4 border-slate-700 rounded-b-xl rounded-t-lg p-5">
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Cpu size={14} /> 底层异构硬件
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {[
                            { name: 'NVIDIA', color: 'text-green-500' },
                            { name: '昇腾 Ascend', color: 'text-red-500' },
                            { name: '寒武纪', color: 'text-blue-400' },
                            { name: '摩尔线程', color: 'text-orange-400' },
                            { name: '沐熙 MetaX', color: 'text-purple-400' }
                        ].map((hw, i) => (
                            <div key={i} className="bg-slate-900/80 rounded-lg py-3 border border-slate-800 flex flex-col items-center justify-center hover:bg-slate-800 transition-colors">
                                <span className={`text-xs font-bold ${hw.color}`}>{hw.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: Value Analysis (Corresponding to Infra) */}
            <div className="lg:col-span-3">
                <div className="h-full bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex flex-col justify-center text-center">
                    <div className="flex flex-col items-center gap-4">
                        <TrendingUp size={40} className="text-slate-500" />
                        <h4 className="text-lg font-bold text-slate-400">基础设施层</h4>
                        <div className="text-sm text-slate-400 leading-relaxed text-left space-y-3">
                            <p>⚠️ <strong>模型迭代快：</strong><br/>主流模型可能快速被淘汰，需避免单一技术栈锁定。</p>
                            <p>📉 <strong>算力商品化：</strong><br/>硬件仅是消耗品，通过调度平台实现异构屏蔽。</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        {/* ================= GRID LAYOUT END ================= */}

      </div>
    </div>
  );
};

export default EnterpriseArchitectureStack;
