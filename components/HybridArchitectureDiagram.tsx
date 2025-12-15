
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimationState } from '../types';
import { Cloud, User, FileText, Lock, LockOpen, Filter, ArrowRight, Play, Pause, RotateCcw, Cpu, Server, ShieldCheck, Database, ScanLine, ListFilter, Workflow, Package, Grid, Link, HardDrive, Table, Plug, Share2 } from 'lucide-react';

interface Props {
  isActive: boolean;
  backendType?: 'PUBLIC' | 'PRIVATE' | 'LOCAL' | 'OPERATOR';
}

// Technical Details Mapping
const STEP_DETAILS: Record<string, { title: string; tech: string; desc: string }> = {
  [AnimationState.IDLE]: {
    title: "系统就绪 (System Ready)",
    tech: "Microservices / K8s",
    desc: "全链路监控探针已启动，Workflow 编排引擎准备就绪。"
  },
  [AnimationState.INGESTION]: {
    title: "全源解析 (Omni-Parsing)",
    tech: "OCR (Paddle) + LayoutLMv3",
    desc: "从数据集(Data)读取源文件，通过解析引擎自动提取文本、表格与图表信息，并生成元数据。"
  },
  [AnimationState.PROCESSING_LOCAL]: {
    title: "混合存储 (Hybrid Storage)",
    tech: "Milvus (Vector) + PG (Scalar)",
    desc: "非结构化向量存入 KB，结构化元数据存入 DB，构建完整的企业知识资产库。"
  },
  [AnimationState.QUERYING]: {
    title: "智能路由与召回 (Routing)",
    tech: "API Gateway -> Workflow",
    desc: "用户请求经网关鉴权后，由工作流引擎分析意图，分发至 KB(语义) 和 DB(精确) 并行召回。"
  },
  [AnimationState.RERANKING]: {
    title: "语义精排 (Reranking)",
    tech: "BCE-Reranker Model",
    desc: "对双路召回的结果进行交叉编码打分，提取最相关的 Top-Chunks。"
  },
  [AnimationState.SANITIZATION]: {
    title: "隐私清洗 (Sanitization)",
    tech: "NLP (BERT-NER) + Regex Rules",
    desc: "自动识别上下文中的敏感实体，并可调用插件(Plugins)进行数据掩码处理。"
  },
  [AnimationState.ENCRYPTION_REQUEST]: {
    title: "加密封装 (Encryption)",
    tech: "AES-256-GCM",
    desc: "对清洗后的 Prompt 进行高强度加密，准备跨越安全边界。"
  },
  [AnimationState.CLOUD_TRANSMISSION_REQUEST]: {
    title: "安全传输 (Transport)",
    tech: "mTLS (Mutual TLS 1.3)",
    desc: "通过加密隧道传输至推理节点。"
  },
  [AnimationState.CLOUD_DECRYPTION]: {
    title: "安全沙箱接收 (Decryption)",
    tech: "Secure Enclave (TEE)",
    desc: "在内存态解密数据，确保原始信息不落地。"
  },
  [AnimationState.CLOUD_INFERENCE]: {
    title: "大模型推理 (Inference)",
    tech: "Transformer / KV Cache",
    desc: "大模型结合上下文生成回答，支持调用 MCP 服务获取实时信息。"
  },
  [AnimationState.CLOUD_ENCRYPTION_RESPONSE]: {
    title: "结果加密 (Response Enc)",
    tech: "AES-256-GCM",
    desc: "生成的回答再次加密。"
  },
  [AnimationState.CLOUD_TRANSMISSION_RESPONSE]: {
    title: "结果回传 (Return)",
    tech: "HTTP/2 Stream",
    desc: "流式返回加密结果。"
  },
  [AnimationState.DECRYPTION_LOCAL]: {
    title: "本地解密 (Final Decrypt)",
    tech: "Local Key Management",
    desc: "网关解密最终答案。"
  },
  [AnimationState.DELIVERY]: {
    title: "用户交付 (Delivery)",
    tech: "SSE / WebSocket",
    desc: "实时展示回答，完成一次完整的 RAG 闭环。"
  }
};

const HybridArchitectureDiagram: React.FC<Props> = ({ isActive, backendType = 'PUBLIC' }) => {
  const [state, setState] = useState<AnimationState>(AnimationState.IDLE);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const isLocalMode = backendType === 'LOCAL';

  const steps = isLocalMode 
    ? [
        AnimationState.IDLE,
        AnimationState.INGESTION,
        AnimationState.PROCESSING_LOCAL,
        AnimationState.QUERYING,
        AnimationState.RERANKING,
        AnimationState.CLOUD_DECRYPTION,
        AnimationState.CLOUD_INFERENCE,
        AnimationState.DELIVERY
      ]
    : [
        AnimationState.IDLE,
        AnimationState.INGESTION,
        AnimationState.PROCESSING_LOCAL,
        AnimationState.QUERYING,
        AnimationState.RERANKING,
        AnimationState.SANITIZATION,
        AnimationState.ENCRYPTION_REQUEST,
        AnimationState.CLOUD_TRANSMISSION_REQUEST,
        AnimationState.CLOUD_DECRYPTION,
        AnimationState.CLOUD_INFERENCE,
        AnimationState.CLOUD_ENCRYPTION_RESPONSE,
        AnimationState.CLOUD_TRANSMISSION_RESPONSE,
        AnimationState.DECRYPTION_LOCAL,
        AnimationState.DELIVERY
      ];

  const currentStepIndex = steps.indexOf(state);

  const nextStep = useCallback(() => {
    const nextIndex = (currentStepIndex + 1) % steps.length;
    setState(steps[nextIndex]);
  }, [currentStepIndex, steps]);

  const reset = () => {
    setState(AnimationState.IDLE);
    setIsAutoPlay(false);
  };

  useEffect(() => { reset(); }, [backendType]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAutoPlay) {
      let duration = 2000;
      if (state === AnimationState.CLOUD_DECRYPTION) duration = 2500;
      if (state === AnimationState.INGESTION) duration = 2500;
      timer = setTimeout(() => { nextStep(); }, duration);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlay, state, nextStep]);

  const c = {
    edgeBg: 'rgba(30, 41, 59, 0.5)',
    edgeStroke: '#334155',
    cloudBg: 'rgba(75, 85, 99, 0.1)',
    cloudStroke: '#9ca3af',
    raw: '#ef4444',
    clean: '#10b981',
    enc: '#6366f1',
    text: '#94a3b8',
    activeNode: 'rgba(59, 130, 246, 0.2)',
    activeStroke: '#3b82f6'
  };

  const currentInfo = STEP_DETAILS[state] || { title: "Waiting...", tech: "...", desc: "..." };

  // --- NODE COMPONENT ---
  const Node = ({ x, y, label, icon: Icon, active, color = "text-slate-400", subLabel }: any) => (
    <foreignObject x={x} y={y} width="60" height="60">
        <div className={`w-full h-full border rounded-lg flex flex-col items-center justify-center transition-all duration-500 ${
            active 
            ? 'bg-blue-900/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110 z-10' 
            : 'bg-slate-800 border-slate-600'
        }`}>
            <Icon size={20} className={active ? "text-blue-400" : color} />
            <span className={`text-[8px] mt-1 text-center leading-tight font-bold ${active ? "text-blue-100" : "text-slate-400"}`}>
                {label}
            </span>
            {subLabel && <span className="text-[6px] text-slate-500 leading-none">{subLabel}</span>}
        </div>
    </foreignObject>
  );

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="flex-1 relative w-full bg-slate-950 overflow-hidden font-sans">
        <div className="absolute inset-0 bg-grid-slate-800/[0.2] bg-[length:32px_32px]" />

        {/* LEGEND */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-slate-900/90 p-3 rounded-lg border border-slate-800 backdrop-blur shadow-lg">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-slate-400">原始数据流</span>
           </div>
           {!isLocalMode && (
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-[10px] text-slate-400">加密/脱敏数据</span>
             </div>
           )}
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-[10px] text-slate-400">控制指令流</span>
           </div>
        </div>

        <svg className="w-full h-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
            
            {/* === LEFT: DATA FOUNDATION (New Layout) === */}
            <g>
                <rect x="20" y="40" width="400" height="380" rx="16" fill={c.edgeBg} stroke={c.edgeStroke} strokeWidth="2" />
                <text x="40" y="70" fill="#94a3b8" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🔒 元立方：知识数据底座</text>

                {/* 1. Workflow (Top Center) */}
                <Node x={190} y={60} label="工作流 Flow" icon={Workflow} active={state === AnimationState.QUERYING || state === AnimationState.IDLE} color="text-slate-400" />
                
                {/* 2. Data Source (Top Left) */}
                <Node x={40} y={120} label="数据集 Data" icon={Package} active={state === AnimationState.INGESTION} color="text-slate-400" />

                {/* 3. Parser (Next to Data) */}
                <Node x={120} y={120} label="解析 Parser" icon={ScanLine} active={state === AnimationState.INGESTION} color="text-slate-400" />
                
                {/* 4. Storage Group (Middle Row) */}
                <Node x={100} y={200} label="知识库 KB" subLabel="Vector" icon={Database} active={[AnimationState.INGESTION, AnimationState.PROCESSING_LOCAL, AnimationState.QUERYING].includes(state)} color="text-emerald-500" />
                <Node x={180} y={200} label="数据库 DB" subLabel="SQL" icon={Table} active={[AnimationState.INGESTION, AnimationState.PROCESSING_LOCAL, AnimationState.QUERYING].includes(state)} color="text-cyan-500" />

                {/* 5. Rerank (Below Storage) */}
                <Node x={140} y={280} label="精排 Rerank" icon={ListFilter} active={state === AnimationState.RERANKING} color="text-purple-500" />

                {/* 6. Extensions (Right Side) */}
                <g>
                    <rect x={260} y={190} width="100" height="150" rx="8" fill="rgba(0,0,0,0.2)" stroke="#334155" strokeDasharray="4 2" />
                    <text x={270} y={185} fill="#64748b" fontSize="8" fontWeight="bold">扩展能力</text>
                    <Node x={280} y={200} label="MCP 服务" icon={Share2} active={state === AnimationState.QUERYING} color="text-amber-500" />
                    <Node x={280} y={270} label="插件 Plugins" icon={Plug} active={state === AnimationState.SANITIZATION} color="text-orange-500" />
                </g>

                {/* 7. Filter (Bottom) */}
                <Node x={140} y={350} label="脱敏 Filter" icon={Filter} active={state === AnimationState.SANITIZATION} color="text-yellow-500" />

                {/* 8. Gateway (Bottom Right) */}
                <Node x={340} y={350} label="网关 Gateway" icon={ShieldCheck} active={[AnimationState.ENCRYPTION_REQUEST, AnimationState.DECRYPTION_LOCAL, AnimationState.QUERYING, AnimationState.DELIVERY].includes(state)} color="text-indigo-500" />

                {/* --- Static Connections --- */}
                {/* Data -> Parser */}
                <path d="M 100 150 L 120 150" stroke={c.edgeStroke} strokeWidth="1" />
                {/* Parser -> KB/DB */}
                <path d="M 150 180 L 140 200" stroke={c.edgeStroke} strokeWidth="1" />
                <path d="M 150 180 L 200 200" stroke={c.edgeStroke} strokeWidth="1" />
                {/* Flow -> KB/DB (Control) */}
                <path d="M 220 120 L 210 200" stroke={c.edgeStroke} strokeWidth="1" strokeDasharray="2 2" />
                <path d="M 220 120 L 140 200" stroke={c.edgeStroke} strokeWidth="1" strokeDasharray="2 2" />
                {/* KB/DB -> Rerank */}
                <path d="M 130 260 L 150 280" stroke={c.edgeStroke} strokeWidth="1" />
                <path d="M 210 260 L 190 280" stroke={c.edgeStroke} strokeWidth="1" />
                {/* Rerank -> Filter */}
                <path d="M 170 340 L 170 350" stroke={c.edgeStroke} strokeWidth="1" />
                {/* Filter -> Gateway */}
                <path d="M 200 380 L 340 380" stroke={c.edgeStroke} strokeWidth="1" />
                {/* Gateway -> Flow (Request) */}
                <path d="M 370 350 C 370 100, 300 90, 250 90" stroke={c.edgeStroke} strokeWidth="1" fill="none" strokeDasharray="4 2" />
            </g>

            {/* === BARRIER === */}
            <g opacity={isLocalMode ? 0.2 : 1} className="transition-opacity duration-500">
                <line x1="430" y1="20" x2="430" y2="430" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />
                <rect x="410" y="210" width="40" height="40" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                <foreignObject x="415" y="215" width="30" height="30">
                    <div className="flex items-center justify-center w-full h-full">
                         <Lock size={18} className="text-red-500" />
                    </div>
                </foreignObject>
            </g>

            {/* === RIGHT: INFERENCE ZONE (Shifted) === */}
            <g transform="translate(20, 0)">
                <rect x="440" y="40" width="320" height="380" rx="16" fill={c.cloudBg} stroke={c.cloudStroke} strokeWidth="2" />
                <text x="460" y="70" fill="#e2e8f0" fontSize="14" fontWeight="bold" fontFamily="sans-serif">🧠 推理大脑 (Inference)</text>

                {/* Cloud Header */}
                <rect x="480" y="90" width="240" height="30" rx="6" fill="rgba(0,0,0,0.3)" />
                <foreignObject x="480" y="95" width="240" height="20">
                    <div className="flex justify-between px-3 text-[9px] text-slate-500 font-mono">
                        <span className={backendType === 'PUBLIC' ? 'text-blue-400 font-bold' : ''}>公有云</span>
                        <span className={backendType === 'OPERATOR' ? 'text-amber-400 font-bold' : ''}>运营商</span>
                        <span className={backendType === 'PRIVATE' ? 'text-indigo-400 font-bold' : ''}>私有云</span>
                        <span className={backendType === 'LOCAL' ? 'text-emerald-400 font-bold' : ''}>本机</span>
                    </div>
                </foreignObject>

                {/* Context */}
                <Node x={500} y={160} label="上下文 Context" icon={Server} active={[AnimationState.CLOUD_DECRYPTION].includes(state)} color="text-blue-400" />

                {/* LLM */}
                <Node x={640} y={160} label={isLocalMode ? '本地 LLM' : '大模型 API'} icon={Cpu} active={state === AnimationState.CLOUD_INFERENCE} color="text-purple-400" />
            </g>

            {/* === ANIMATIONS === */}
            
            {/* 1. Ingestion: Data -> Parser -> KB/DB */}
            {state === AnimationState.INGESTION && (
                <g>
                    {/* Data to Parser */}
                    <motion.circle r="4" fill={c.raw} initial={{ cx: 70, cy: 150 }} animate={{ cx: 120, cy: 150 }} transition={{ duration: 0.8 }} />
                    {/* Parser to KB/DB */}
                    <motion.circle r="3" fill={c.clean} initial={{ cx: 150, cy: 150 }} animate={{ cx: 130, cy: 200 }} transition={{ delay: 0.8, duration: 0.8 }} />
                    <motion.circle r="3" fill={c.clean} initial={{ cx: 150, cy: 150 }} animate={{ cx: 210, cy: 200 }} transition={{ delay: 0.8, duration: 0.8 }} />
                </g>
            )}

            {/* 2. Processing Local (Spinning DBs) */}
            {state === AnimationState.PROCESSING_LOCAL && (
                <g>
                    <motion.circle cx="130" cy="230" r="35" stroke={c.clean} strokeWidth="1" fill="none" 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.2, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }}
                     />
                     <motion.circle cx="210" cy="230" r="35" stroke={c.clean} strokeWidth="1" fill="none" 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1.2, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5 }}
                     />
                </g>
            )}

            {/* 3. Query: User -> Gateway -> Flow -> KB/DB */}
            {state === AnimationState.QUERYING && (
                <g>
                     {/* 1. User -> Gateway (Ingress) */}
                     <motion.path d="M 50 380 L 340 380" stroke={c.activeStroke} strokeWidth="3" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }}
                     />

                     {/* 2. Gateway -> Flow (Routing Request) */}
                     <motion.path d="M 370 350 C 370 100, 300 90, 250 90" stroke={c.activeStroke} strokeWidth="2" fill="none" strokeDasharray="5 5"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8, duration: 1 }}
                     />

                     {/* 3. Flow distributing to KB/DB */}
                     <motion.path d="M 220 120 L 130 200" stroke={c.activeStroke} strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.5 }}
                     />
                     <motion.path d="M 220 120 L 210 200" stroke={c.activeStroke} strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 0.5 }}
                     />
                </g>
            )}

            {/* 4. Reranking: KB/DB -> Rerank */}
            {state === AnimationState.RERANKING && (
                <g>
                    <motion.circle r="3" fill={c.text} initial={{ cx: 130, cy: 260 }} animate={{ cx: 170, cy: 280 }} transition={{ duration: 0.8 }} />
                    <motion.circle r="3" fill={c.text} initial={{ cx: 210, cy: 260 }} animate={{ cx: 170, cy: 280 }} transition={{ duration: 0.8 }} />
                </g>
            )}

            {/* 5. Sanitization: Rerank -> Filter (with Plugin check) */}
            {state === AnimationState.SANITIZATION && !isLocalMode && (
                <g>
                     {/* Main Path */}
                     <motion.path d="M 170 310 L 170 350" stroke={c.raw} strokeWidth="2" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
                     {/* Plugin Interaction */}
                     <motion.path d="M 170 310 Q 250 310, 280 290" stroke={c.text} strokeWidth="1" fill="none" strokeDasharray="2 2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                </g>
            )}

            {/* 6. Encryption -> Gateway */}
            {state === AnimationState.ENCRYPTION_REQUEST && !isLocalMode && (
                <motion.circle r="4" fill={c.enc} initial={{ cx: 170, cy: 380 }} animate={{ cx: 340, cy: 380 }} transition={{ duration: 0.8 }} />
            )}

            {/* 7. Transmission (Cloud) */}
            {state === AnimationState.CLOUD_TRANSMISSION_REQUEST && !isLocalMode && (
                <g>
                    <path d="M 390 380 L 520 380 L 520 220" stroke={c.text} strokeWidth="2" strokeDasharray="4 4" opacity="0.2" fill="none" />
                    <motion.g initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} style={{ offsetPath: "path('M 390 380 L 520 380 L 520 220')" }} transition={{ duration: 1.5, ease: "linear" }}>
                        <rect width="20" height="20" rx="4" fill={c.enc} x="-10" y="-10" />
                        <Lock size={12} x="-6" y="-6" className="text-white" />
                    </motion.g>
                </g>
            )}

            {/* 8. Decrypt & Infer */}
            {state === AnimationState.CLOUD_DECRYPTION && (
                 <motion.circle r="20" cx="530" cy="190" stroke={c.clean} fill="none" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
            )}

            {/* 9. Inference Flow */}
            {state === AnimationState.CLOUD_INFERENCE && (
                <motion.path d="M 560 190 L 640 190" stroke={c.activeStroke} strokeWidth="3" fill="none" strokeDasharray="5 5" animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
            )}

            {/* 10. Return Path */}
            {state === AnimationState.CLOUD_TRANSMISSION_RESPONSE && !isLocalMode && (
                 <g>
                    <path d="M 520 220 L 520 380 L 390 380" stroke={c.text} strokeWidth="2" strokeDasharray="4 4" opacity="0.2" fill="none" />
                    <motion.g initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} style={{ offsetPath: "path('M 520 220 L 520 380 L 390 380')" }} transition={{ duration: 1.5, ease: "linear" }}>
                        <rect width="20" height="20" rx="4" fill={c.enc} x="-10" y="-10" />
                        <Lock size={12} x="-6" y="-6" className="text-white" />
                    </motion.g>
                </g>
            )}

            {/* 11. Delivery */}
            {state === AnimationState.DELIVERY && (
                <g>
                    {isLocalMode ? (
                        <motion.path d="M 670 190 Q 670 420, 80 420" stroke={c.clean} strokeWidth="3" fill="none" 
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                        />
                    ) : (
                        <motion.path d="M 340 380 L 80 420" stroke={c.clean} strokeWidth="3" fill="none" 
                            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
                        />
                    )}
                </g>
            )}

            {/* User Node */}
            <foreignObject x="20" y="380" width="60" height="60">
                <div className="flex flex-col items-center justify-center">
                    <User size={32} className="text-slate-200" />
                    <span className="text-xs text-slate-400 mt-1">用户</span>
                </div>
            </foreignObject>

        </svg>

        {/* STATUS OVERLAY */}
        <AnimatePresence mode="wait">
            <motion.div 
                key={state}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 right-4 max-w-sm bg-slate-900/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-2xl z-20"
            >
                 <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                        Step {currentStepIndex + 1}/{steps.length}
                    </span>
                    <h3 className="text-xs font-bold text-white">
                        {currentInfo.title}
                    </h3>
                 </div>
                 
                 <p className="text-[10px] text-slate-400 leading-relaxed">
                    {currentInfo.desc}
                 </p>
            </motion.div>
        </AnimatePresence>
      </div>

      {/* CONTROL BAR */}
      <div className="bg-slate-800 px-4 py-2 border-t border-slate-700 flex items-center justify-between flex-shrink-0">
         <div className="flex items-center gap-2">
             <button onClick={reset} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="重置">
                <RotateCcw size={14} />
             </button>
             <button onClick={nextStep} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium transition-colors shadow">
                下一步 <ArrowRight size={12} />
             </button>
         </div>
         <div>
            <button 
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${isAutoPlay ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'}`}
            >
                {isAutoPlay ? <><Pause size={12}/> 暂停</> : <><Play size={12}/> 自动播放</>}
            </button>
         </div>
      </div>

    </div>
  );
};

export default HybridArchitectureDiagram;
