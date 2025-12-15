
import React, { useState } from 'react';
import { DASHBOARD_METRICS, MOCK_FILES_ENHANCED, AUDIT_LOGS, MOCK_CHUNKS, MOCK_BAD_CASES, MOCK_SECURITY_STATS, MOCK_USERS, MOCK_MODELS } from '../constants';
import { 
  FileText, CheckCircle, Clock, AlertCircle, Activity, 
  ShieldCheck, Database, Settings, PieChart, Users, ArrowLeft, 
  UploadCloud, Search, Trash2, RotateCw, Lock, Eye, EyeOff, MoreHorizontal,
  X, Tag, AlertTriangle, ArrowUpRight, Zap, CheckSquare,
  Plus, Network, UserCheck, MessageSquare, Edit3, Terminal, Ban, History,
  Cpu, Power, Loader2, HardDrive, Download
} from 'lucide-react';
import { FileStatus, EnhancedFile, BadCase, KnowledgeChunk, AuditLog, AIModel } from '../types';

interface Props {
  isFullPage?: boolean;
  onBack?: () => void;
}

type AdminRole = 'IT_ADMIN' | 'CONTENT_ADMIN';
type Tab = 'overview' | 'knowledge' | 'models' | 'quality' | 'audit' | 'users';

// Drill Down Levels
type DrillDownView = 
  | 'NONE' 
  | 'METRIC_DETAIL'      // Overview L2
  | 'FILE_DETAIL'        // Knowledge L2
  | 'CHUNK_EDITOR'       // Knowledge L3
  | 'BAD_CASE_DIAGNOSE'  // Quality L2
  | 'CASE_FIX'           // Quality L3
  | 'RISK_TYPE_DETAIL'   // Security L2
  | 'LOG_TRACE';         // Security L3

const ManagerDashboard: React.FC<Props> = ({ isFullPage = false, onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [currentRole, setCurrentRole] = useState<AdminRole>('IT_ADMIN');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  
  // Drill Down Context States
  const [drillDownView, setDrillDownView] = useState<DrillDownView>('NONE');
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [activeChunk, setActiveChunk] = useState<KnowledgeChunk | null>(null);
  const [activeBadCase, setActiveBadCase] = useState<BadCase | null>(null);
  const [activeRiskType, setActiveRiskType] = useState<string | null>(null);
  const [activeLog, setActiveLog] = useState<AuditLog | null>(null);
  
  // Model Pool State
  const [models, setModels] = useState<AIModel[]>(MOCK_MODELS);
  const [loadingModelId, setLoadingModelId] = useState<string | null>(null);

  // Modal States
  const [showImportModal, setShowImportModal] = useState(false);
  const [showBulkTagModal, setShowBulkTagModal] = useState(false);
  const [bulkTagInput, setBulkTagInput] = useState('');

  // Metrics Logic
  const metrics = DASHBOARD_METRICS;

  // Calculate VRAM Usage
  const totalVRAM = 128; // GB (e.g., 2x A100 80GB or equivalent Ascend)
  const usedVRAM = models.reduce((acc, m) => m.status === 'LOADED' ? acc + m.vramUsage : acc, 0);
  const vramPercent = Math.round((usedVRAM / totalVRAM) * 100);

  const resetView = (tab: Tab) => {
    setActiveTab(tab);
    setDrillDownView('NONE');
    setActiveFileId(null);
    setActiveBadCase(null);
    setActiveChunk(null);
    setActiveLog(null);
  };

  const handleMetricClick = (id: string, hasDrillDown: boolean) => {
    if (hasDrillDown) {
      setActiveMetricId(id);
      setDrillDownView('METRIC_DETAIL');
    }
  };

  const handleFileClick = (file: EnhancedFile) => {
    setActiveFileId(file.id);
    setDrillDownView('FILE_DETAIL');
  };

  const handleChunkClick = (chunk: KnowledgeChunk) => {
    setActiveChunk(chunk);
    setDrillDownView('CHUNK_EDITOR');
  };

  const handleBadCaseClick = (bc: BadCase) => {
    setActiveBadCase(bc);
    setDrillDownView('BAD_CASE_DIAGNOSE');
  };

  const handleFixCase = () => {
    setDrillDownView('CASE_FIX');
  };

  const handleRiskClick = (type: string) => {
    setActiveRiskType(type);
    setDrillDownView('RISK_TYPE_DETAIL');
  };

  const handleLogClick = (log: AuditLog) => {
    setActiveLog(log);
    setDrillDownView('LOG_TRACE');
  };

  const handleBulkTag = () => {
    setShowBulkTagModal(false);
    setBulkTagInput('');
    alert(`成功为 ${selectedFiles.length} 个文件添加标签。`);
    setSelectedFiles([]);
  };

  const toggleFileSelection = (id: string) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter(fid => fid !== id));
    } else {
      setSelectedFiles([...selectedFiles, id]);
    }
  };

  const toggleAllFiles = () => {
    if (selectedFiles.length === MOCK_FILES_ENHANCED.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(MOCK_FILES_ENHANCED.map(f => f.id));
    }
  };

  const toggleModelStatus = (id: string) => {
      const model = models.find(m => m.id === id);
      if (!model) return;

      if (model.status === 'LOADED') {
          // Unload immediately
          setModels(prev => prev.map(m => m.id === id ? { ...m, status: 'UNLOADED' } : m));
      } else {
          // Check VRAM
          if (usedVRAM + model.vramUsage > totalVRAM) {
              alert(`显存不足！当前剩余 ${totalVRAM - usedVRAM}GB，需要 ${model.vramUsage}GB。\n请先卸载其他模型。`);
              return;
          }
          // Simulate Loading
          setLoadingModelId(id);
          setTimeout(() => {
              setModels(prev => prev.map(m => m.id === id ? { ...m, status: 'LOADED' } : m));
              setLoadingModelId(null);
          }, 2000);
      }
  };

  // --- COMPONENT HELPERS ---

  const MetricCard = ({ data, id }: any) => (
    <div 
        onClick={() => handleMetricClick(id, data.hasDrillDown)}
        className={`bg-white p-4 rounded-xl border border-slate-100 shadow-sm transition-all relative overflow-hidden ${data.hasDrillDown ? 'cursor-pointer hover:shadow-md hover:border-blue-300 group' : ''}`}
    >
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Activity size={18} />
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${data.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {data.change}
            </span>
        </div>
        <div className="text-slate-500 text-xs font-medium mb-1">{data.label}</div>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-800">{data.value}</span>
            <span className="text-xs text-slate-400">{data.unit}</span>
        </div>
        {data.hasDrillDown && (
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={14} className="text-blue-400" />
            </div>
        )}
    </div>
  );

  const SidebarItem = ({ id, icon: Icon, label }: { id: Tab, icon: any, label: string }) => (
    <button 
        onClick={() => resetView(id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-1 ${activeTab === id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
    >
        <Icon size={16} />
        {label}
    </button>
  );

  // --- DRILL DOWN LEVEL 2: VIEWS ---

  const MetricDetailView = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
        <button onClick={() => setDrillDownView('NONE')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6">
            <ArrowLeft size={16} /> 返回大屏
        </button>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
                {activeMetricId === 'parsingRate' ? '解析成功率趋势分析' : '知识老化分布'}
            </h3>
            <div className="h-64 w-full bg-slate-50 rounded-lg flex items-end justify-between px-8 pb-4 pt-12 gap-4 border border-slate-100">
                {[45, 60, 75, 50, 80, 95, 85, 70, 90, 100, 95, 98].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end gap-2 group relative">
                        <div style={{ height: `${h}%` }} className={`w-full rounded-t-sm transition-all ${activeMetricId === 'parsingRate' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                    </div>
                ))}
            </div>
        </div>
        <h4 className="font-bold text-slate-700 mb-4">详情下钻 (Level 3)</h4>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400">
            [L3 Demo Placeholder: Specific Anomalies List]
        </div>
    </div>
  );

  const FileDetailDrawer = () => {
    const file = MOCK_FILES_ENHANCED.find(f => f.id === activeFileId);
    if (!file) return null;
    const isRestricted = file.permissionLevel === 'CONFIDENTIAL' && currentRole === 'IT_ADMIN';

    return (
        <div className="absolute inset-y-0 right-0 w-[600px] bg-white shadow-2xl border-l border-slate-200 z-20 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <button onClick={() => setDrillDownView('NONE')} className="hover:text-blue-600">知识库</button> 
                    <ArrowLeft size={12} className="rotate-180"/> 
                    <span className="font-bold text-slate-800">文档详情</span>
                </div>
                <button onClick={() => setDrillDownView('NONE')} className="p-1.5 hover:bg-slate-200 rounded-full text-slate-500">
                    <X size={20} />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* L2 Meta Info */}
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 text-lg break-all">{isRestricted ? '********_敏感数据.pdf' : file.name}</div>
                            <div className="text-xs text-slate-500 mt-1 flex gap-2">
                                <span className="px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">{file.type.toUpperCase()}</span>
                                <span>{file.size}</span>
                                <span>{file.uploadedAt}</span>
                            </div>
                        </div>
                    </div>
                    {file.tags && (
                        <div className="flex flex-wrap gap-2">
                            {file.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 text-[10px] px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                                    <Tag size={10} /> {tag}
                                </span>
                            ))}
                            <button className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-1 px-2 py-1 border border-dashed border-slate-300 rounded-full">
                                <Plus size={10} />
                            </button>
                        </div>
                    )}
                </div>

                {/* L3 Chunk List */}
                <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Zap size={14} className="text-amber-500" /> 知识切片管理 (Level 3)</span>
                        <span className="text-xs text-slate-400 font-normal">点击切片进行编辑</span>
                    </h4>
                    {isRestricted ? (
                        <div className="bg-slate-100 rounded-lg p-8 text-center text-slate-400 text-sm flex flex-col items-center gap-2 border border-slate-200 border-dashed">
                            <Lock size={24} />
                            <span>内容已加密，无权预览切片</span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {MOCK_CHUNKS.map(chunk => (
                                <div 
                                    key={chunk.id} 
                                    onClick={() => handleChunkClick(chunk)}
                                    className={`bg-slate-50 border p-3 rounded-lg text-xs leading-relaxed transition-all cursor-pointer group ${chunk.status === 'DISABLED' ? 'opacity-50 border-slate-100' : 'border-slate-100 hover:border-blue-400 hover:shadow-md'}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                                            {chunk.vectorId}
                                            {chunk.status === 'DISABLED' && <span className="bg-red-100 text-red-600 px-1 rounded">禁用</span>}
                                        </span>
                                        <Edit3 size={12} className="text-blue-400 opacity-0 group-hover:opacity-100" />
                                    </div>
                                    <p className="text-slate-600 line-clamp-3">{chunk.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {/* Graph */}
                <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Network size={14} className="text-blue-500" /> 关联图谱
                    </h4>
                    <div className="h-32 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <span className="text-[10px] text-slate-500">实体可视化 (Entity Visualization)</span>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const ChunkEditorModal = () => {
      if (!activeChunk) return null;
      return (
          <div className="absolute inset-0 z-30 bg-white flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Edit3 size={16} /> 切片编辑器 (Level 3)
                  </h3>
                  <button onClick={() => setDrillDownView('FILE_DETAIL')} className="text-slate-500 hover:text-slate-800"><X size={20}/></button>
              </div>
              <div className="flex-1 p-8 max-w-3xl mx-auto w-full">
                  <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Vector ID</label>
                      <input disabled value={activeChunk.vectorId} className="w-full bg-slate-100 border border-slate-200 rounded px-3 py-2 text-sm text-slate-500 font-mono" />
                  </div>
                  <div className="mb-6">
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Content</label>
                      <textarea className="w-full h-64 bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-inner" defaultValue={activeChunk.content} />
                  </div>
                  <div className="flex justify-between items-center">
                      <button className="text-red-500 text-sm flex items-center gap-1 hover:underline"><Ban size={14} /> 禁用此切片 (不再被召回)</button>
                      <div className="flex gap-3">
                          <button onClick={() => setDrillDownView('FILE_DETAIL')} className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">取消</button>
                          <button onClick={() => { alert('切片已更新并重新索引'); setDrillDownView('FILE_DETAIL'); }} className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-lg">保存并重算向量</button>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  const BadCaseDiagnoseView = () => {
    if (!activeBadCase) return null;
    return (
        <div className="absolute inset-0 z-20 bg-white flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button onClick={() => setDrillDownView('NONE')} className="p-1 hover:bg-slate-100 rounded text-slate-500"><ArrowLeft size={18} /></button>
                    <h3 className="font-bold text-slate-800">Bad Case 诊断归因 (Level 2)</h3>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleFixCase} className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 shadow flex items-center gap-1">
                        <Zap size={12} /> 干预修复 (Level 3)
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* User Query */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-2">用户原始提问</div>
                        <div className="text-lg font-medium text-slate-800">{activeBadCase.query}</div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                            <UserCheck size={12} /> {activeBadCase.user} • {activeBadCase.time}
                        </div>
                    </div>

                    {/* AI Response */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
                         <div className="absolute left-0 top-6 w-1 h-12 bg-red-500 rounded-r"></div>
                         <div className="text-xs font-bold text-slate-400 uppercase mb-2">模型回答</div>
                         <div className="text-slate-600 leading-relaxed">{activeBadCase.aiResponse || "无有效回答"}</div>
                         <div className="mt-4 flex gap-2">
                            <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] rounded border border-red-100 font-bold">{activeBadCase.issueType}</span>
                         </div>
                    </div>

                    {/* Root Cause Analysis */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-xs font-bold text-slate-400 uppercase mb-4">归因分析：召回切片</div>
                        {activeBadCase.retrievedChunks && activeBadCase.retrievedChunks.length > 0 ? (
                            <div className="space-y-3">
                                {activeBadCase.retrievedChunks.map(c => (
                                    <div key={c.id} className="p-3 bg-slate-50 rounded border border-slate-100 text-xs text-slate-600">
                                        <div className="mb-1 text-emerald-600 font-mono text-[10px]">Similarity: {c.similarity}</div>
                                        {c.content}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center bg-slate-50 rounded border border-dashed border-slate-300 text-slate-400 text-sm">
                                未召回到任何相关切片 (阈值 > 0.7)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const CaseFixModal = () => (
      <div className="absolute inset-0 z-30 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><Zap size={18} className="text-blue-600"/> 修复干预 (Level 3)</h3>
                  <button onClick={() => setDrillDownView('BAD_CASE_DIAGNOSE')}><X size={20}/></button>
              </div>
              <div className="p-6 space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">方案 A: 补充知识</label>
                      <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                          <UploadCloud size={16} /> 上传缺失的文档
                      </button>
                  </div>
                  <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-slate-200"></div>
                      <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">OR</span>
                      <div className="flex-grow border-t border-slate-200"></div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">方案 B: 添加问答对 (QA Pair)</label>
                      <textarea placeholder="输入标准问题..." className="w-full mb-2 p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows={2} defaultValue={activeBadCase?.query}></textarea>
                      <textarea placeholder="输入标准答案..." className="w-full p-2 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none" rows={4}></textarea>
                  </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 flex justify-end gap-2">
                  <button onClick={() => setDrillDownView('BAD_CASE_DIAGNOSE')} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800">取消</button>
                  <button onClick={() => { alert("修复已提交"); setDrillDownView('NONE'); }} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700">提交修复</button>
              </div>
          </div>
      </div>
  );

  const LogTraceView = () => {
      if (!activeLog) return null;
      return (
        <div className="absolute inset-y-0 right-0 w-[600px] bg-slate-900 text-slate-300 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-300 border-l border-slate-700">
             <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
                  <h3 className="font-bold text-white flex items-center gap-2"><Terminal size={18}/> 威胁溯源 (Level 3)</h3>
                  <button onClick={() => setDrillDownView('NONE')}><X size={20}/></button>
              </div>
              <div className="p-6 space-y-6 flex-1 overflow-y-auto font-mono text-sm">
                  <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
                      <div className="text-xs text-slate-500 mb-1">Source IP</div>
                      <div className="text-emerald-400 font-bold text-lg">{activeLog.ip}</div>
                      <div className="text-xs text-slate-500 mt-1">Location: Beijing, CN (Intranet)</div>
                  </div>
                  
                  <div>
                      <div className="text-xs text-slate-500 mb-2 uppercase">Request Header</div>
                      <div className="bg-black p-4 rounded text-xs text-slate-400 border border-slate-700">
                          User-Agent: Mozilla/5.0...<br/>
                          Authorization: Bearer eyJhbG...<br/>
                          X-Forwarded-For: {activeLog.ip}
                      </div>
                  </div>

                  <div>
                      <div className="text-xs text-slate-500 mb-2 uppercase">Malicious Payload</div>
                      <div className="bg-red-900/20 p-4 rounded text-xs text-red-300 border border-red-900/50 break-all">
                          {activeLog.payload || "No raw payload captured."}
                      </div>
                  </div>

                  <div>
                      <div className="text-xs text-slate-500 mb-2 uppercase">System Action</div>
                      <div className="flex items-center gap-2 text-white">
                          <ShieldCheck size={16} className="text-green-500" />
                          Blocked by WAF Rule #9002
                      </div>
                  </div>
              </div>
              <div className="p-4 border-t border-slate-700 bg-slate-800 flex justify-end">
                   <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-bold flex items-center gap-2">
                      <Ban size={14} /> 封禁 IP
                   </button>
              </div>
        </div>
      );
  }

  // --- MAIN RENDER ---

  return (
    <div className={`bg-slate-50 ${isFullPage ? 'h-screen flex overflow-hidden' : 'rounded-xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-full'}`}>
        
        {/* === SIDEBAR (Full Page Mode) === */}
        {isFullPage && (
            <div className="w-64 flex-shrink-0 flex flex-col border-r border-slate-800 bg-slate-900">
                <div className="h-16 flex items-center gap-2 px-4 border-b border-slate-800 text-white">
                    <ShieldCheck className="text-blue-500" />
                    <span className="font-bold tracking-tight">Admin Console</span>
                </div>
                
                {/* Role Switcher */}
                <div className="p-4 border-b border-slate-800">
                    <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">当前视角</div>
                    <div className="flex bg-slate-800 rounded p-1">
                        <button 
                            onClick={() => setCurrentRole('IT_ADMIN')}
                            className={`flex-1 py-1.5 text-xs rounded font-medium transition-colors ${currentRole === 'IT_ADMIN' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            IT 运维
                        </button>
                        <button 
                            onClick={() => setCurrentRole('CONTENT_ADMIN')}
                            className={`flex-1 py-1.5 text-xs rounded font-medium transition-colors ${currentRole === 'CONTENT_ADMIN' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        >
                            知识管理
                        </button>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500 flex gap-1 items-center">
                        <AlertCircle size={10} />
                        {currentRole === 'IT_ADMIN' ? '敏感文件内容已自动脱敏' : '可查看所有文档内容与详情'}
                    </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                    <button onClick={onBack} className="w-full flex items-center gap-2 text-xs text-slate-500 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={14} /> 返回官网首页
                    </button>

                    <div className="text-xs font-bold text-slate-600 uppercase mb-2 px-2">资产全景</div>
                    <SidebarItem id="overview" icon={PieChart} label="监控大屏" />
                    <SidebarItem id="models" icon={Cpu} label="模型大脑" />
                    <SidebarItem id="knowledge" icon={Database} label="知识库管理" />
                    
                    <div className="text-xs font-bold text-slate-600 uppercase mb-2 px-2 mt-6">质量与安全</div>
                    <SidebarItem id="quality" icon={Activity} label="效果评估" />
                    <SidebarItem id="audit" icon={ShieldCheck} label="安全审计" />
                    <SidebarItem id="users" icon={Users} label="用户与权限" />
                </div>
                
                <div className="p-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 text-center">v2.5.1 Enterprise</div>
                </div>
            </div>
        )}

        {/* === MAIN CONTENT === */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-50">
            
            {/* Fake Header */}
            {!isFullPage && (
                <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 flex-shrink-0">
                   {/* ... Window Controls ... */}
                   <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div></div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
                
                {/* Header Area */}
                {drillDownView === 'NONE' && (
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                {activeTab === 'overview' && '全域知识资产监控'}
                                {activeTab === 'knowledge' && '知识库内容管理'}
                                {activeTab === 'models' && '内置模型智算中心'}
                                {activeTab === 'quality' && '知识质量评估与优化'}
                                {activeTab === 'audit' && '安全合规审计'}
                                {activeTab === 'users' && '用户与权限配置'}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                当前身份: <span className="font-bold text-slate-700">{currentRole === 'IT_ADMIN' ? '系统管理员 (System Admin)' : '知识运营官 (Knowledge Ops)'}</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {activeTab === 'knowledge' && (
                                <button 
                                    onClick={() => setShowImportModal(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold shadow-lg hover:bg-slate-800 transition-colors"
                                >
                                    <UploadCloud size={16} /> 批量导入
                                </button>
                            )}
                            {activeTab === 'users' && (
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow hover:bg-blue-700">
                                    <Plus size={16} /> 新增用户
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* === TAB CONTENT === */}
                
                {/* 1. OVERVIEW */}
                {activeTab === 'overview' && drillDownView === 'NONE' && (
                    <div className="space-y-6 animate-in fade-in duration-500">
                        {/* Metrics L1 */}
                        <div>
                             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">资产规模</h4>
                             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <MetricCard data={metrics.assets.total} id={metrics.assets.total.id} />
                                <MetricCard data={metrics.assets.storage} id={metrics.assets.storage.id} />
                                <MetricCard data={metrics.assets.parsingRate} id={metrics.assets.parsingRate.id} />
                                <MetricCard data={metrics.assets.aging} id={metrics.assets.aging.id} />
                             </div>
                        </div>
                        <div>
                             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">服务效能</h4>
                             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <MetricCard data={metrics.usage.qps} id={metrics.usage.qps.id} />
                                <MetricCard data={metrics.usage.latency} id={metrics.usage.latency.id} />
                                <MetricCard data={metrics.usage.zeroRate} id={metrics.usage.zeroRate.id} />
                                <MetricCard data={metrics.usage.satisfaction} id={metrics.usage.satisfaction.id} />
                             </div>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-800 mb-4">知识图谱概览</h4>
                            <div className="h-48 bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                                <div className="text-slate-500 flex flex-col items-center">
                                    <Network size={32} className="mb-2 text-blue-500" />
                                    <span>实体关系图谱实时可视化 (Knowledge Graph)</span>
                                </div>
                            </div>
                         </div>
                    </div>
                )}

                {/* 2. MODELS (New Tab for Built-in Model Pool) */}
                {activeTab === 'models' && drillDownView === 'NONE' && (
                    <div className="animate-in fade-in duration-500 space-y-6">
                        {/* VRAM Status Bar */}
                        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Cpu size={120} />
                            </div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold mb-1">NPU 显存资源池 (VRAM Pool)</h3>
                                    <p className="text-sm text-slate-400">本地算力分配监控</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-mono font-bold text-emerald-400">{usedVRAM} <span className="text-sm text-slate-400">/ {totalVRAM} GB</span></div>
                                    <div className="text-xs text-slate-400">已用显存</div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="flex justify-between text-xs text-slate-400 mb-2">
                                    <span>Usage: {vramPercent}%</span>
                                    <span>Ascend 910B (64GB x 2)</span>
                                </div>
                                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${vramPercent > 80 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                                        style={{ width: `${vramPercent}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Model List Grid */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <HardDrive size={14}/> 内置模型列表 (Built-in Models)
                            </h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {models.map(model => (
                                    <div key={model.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${model.type === 'LLM' ? 'bg-indigo-50 text-indigo-600' : model.type === 'EMBEDDING' ? 'bg-amber-50 text-amber-600' : 'bg-purple-50 text-purple-600'}`}>
                                                        <Cpu size={20} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-sm">{model.name}</h4>
                                                        <div className="flex gap-2 mt-1">
                                                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-mono">{model.parameters}</span>
                                                            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-mono">{model.contextWindow} Ctx</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-bold text-slate-700">{model.vramUsage} GB</div>
                                                    <div className="text-[10px] text-slate-400">VRAM</div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-slate-500 mb-4 leading-relaxed h-8 line-clamp-2">
                                                {model.description}
                                            </p>
                                            <div className="flex flex-wrap gap-1 mb-6">
                                                {model.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] px-2 py-0.5 border border-slate-100 text-slate-400 rounded-full">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${model.status === 'LOADED' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                                <span className="text-xs font-bold text-slate-600">{model.status === 'LOADED' ? 'Running' : 'Stopped'}</span>
                                            </div>
                                            
                                            <button 
                                                onClick={() => toggleModelStatus(model.id)}
                                                disabled={loadingModelId !== null}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                                    model.status === 'LOADED' 
                                                    ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' 
                                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow'
                                                } ${loadingModelId !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {loadingModelId === model.id ? (
                                                    <><Loader2 size={12} className="animate-spin" /> 处理中...</>
                                                ) : model.status === 'LOADED' ? (
                                                    <><Power size={12} /> 卸载模型</>
                                                ) : (
                                                    <><Download size={12} /> 加载模型</> // Fixed: lucide-react import needed for Download if used, utilizing Power/Zap metaphor instead or existing icons
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. KNOWLEDGE */}
                {activeTab === 'knowledge' && drillDownView === 'NONE' && (
                    <div className="animate-in fade-in duration-500">
                        {/* Bulk Action Bar L1 */}
                        {selectedFiles.length > 0 && (
                            <div className="mb-4 bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center justify-between animate-in slide-in-from-top-2">
                                <span className="text-sm text-blue-800 font-medium px-2">已选中 {selectedFiles.length} 个文件</span>
                                <div className="flex gap-2">
                                    <button onClick={() => alert("模拟：已提交重解析任务")} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs font-medium hover:text-blue-600 flex items-center gap-1">
                                        <RotateCw size={12}/> 重新解析
                                    </button>
                                    <button onClick={() => setShowBulkTagModal(true)} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs font-medium hover:text-blue-600 flex items-center gap-1">
                                        <Tag size={12}/> 批量标签
                                    </button>
                                    <button onClick={() => { setSelectedFiles([]); alert("模拟：已删除"); }} className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded text-xs font-medium hover:bg-red-100 flex items-center gap-1">
                                        <Trash2 size={12}/> 删除
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                             <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 w-10">
                                            <input type="checkbox" onChange={toggleAllFiles} checked={selectedFiles.length === MOCK_FILES_ENHANCED.length} />
                                        </th>
                                        <th className="px-4 py-3 font-medium">文档名称</th>
                                        <th className="px-4 py-3 font-medium">权限范围</th>
                                        <th className="px-4 py-3 font-medium">所属部门</th>
                                        <th className="px-4 py-3 font-medium">状态</th>
                                        <th className="px-4 py-3 font-medium text-right">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_FILES_ENHANCED.map(file => {
                                        const isRestricted = file.permissionLevel === 'CONFIDENTIAL' && currentRole === 'IT_ADMIN';
                                        const displayTitle = isRestricted ? file.name.replace(/^[^.]+/, '********_敏感数据') : file.name;

                                        return (
                                            <tr key={file.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={(e) => {
                                                if ((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'BUTTON') {
                                                    handleFileClick(file);
                                                }
                                            }}>
                                                <td className="px-4 py-3">
                                                    <input type="checkbox" checked={selectedFiles.includes(file.id)} onChange={() => toggleFileSelection(file.id)} />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                                            <FileText size={16} />
                                                        </div>
                                                        <div>
                                                            <div className={`font-medium ${isRestricted ? 'text-slate-400 italic' : 'text-slate-800'}`}>
                                                                {displayTitle}
                                                            </div>
                                                            <div className="text-[10px] text-slate-400">{file.size} • {file.uploadedAt}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {file.permissionLevel === 'PUBLIC' && <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] border border-green-100">全员公开</span>}
                                                    {file.permissionLevel === 'DEPARTMENT' && <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] border border-blue-100">部门可见</span>}
                                                    {file.permissionLevel === 'CONFIDENTIAL' && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] border border-slate-200 flex w-fit items-center gap-1"><Lock size={8}/> 绝密</span>}
                                                </td>
                                                <td className="px-4 py-3 text-slate-600">{file.department}</td>
                                                <td className="px-4 py-3">
                                                    {file.status === FileStatus.PUBLISHED && <span className="text-emerald-600 text-xs font-medium flex items-center gap-1"><CheckCircle size={12}/> 已发布</span>}
                                                    {file.status === FileStatus.AUDITING && <span className="text-amber-600 text-xs font-medium flex items-center gap-1"><Clock size={12}/> 审核中</span>}
                                                    {file.status === FileStatus.PARSING && <span className="text-blue-600 text-xs font-medium flex items-center gap-1"><Activity size={12}/> 解析中</span>}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button title="查看详情" onClick={() => handleFileClick(file)} className="p-1 text-slate-400 hover:text-blue-600"><Eye size={14}/></button>
                                                        <button title="更多" className="p-1 text-slate-400 hover:text-slate-800"><MoreHorizontal size={14}/></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                             </table>
                        </div>
                    </div>
                )}
                
                {/* 3. QUALITY */}
                {activeTab === 'quality' && drillDownView === 'NONE' && (
                    <div className="animate-in fade-in duration-500 space-y-6">
                         {/* L1 Stats */}
                         <div className="grid grid-cols-4 gap-4">
                             {[
                                 { label: "RAG 准确率", val: "92.4%", color: "text-emerald-600" },
                                 { label: "平均召回 Top-K", val: "3.2", color: "text-blue-600" },
                                 { label: "零结果查询", val: "156", color: "text-amber-600" },
                                 { label: "人工修正数", val: "42", color: "text-indigo-600" },
                             ].map((s, i) => (
                                 <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                     <div className="text-xs text-slate-400 mb-1">{s.label}</div>
                                     <div className={`text-2xl font-bold ${s.color}`}>{s.val}</div>
                                 </div>
                             ))}
                         </div>
                         {/* L1 Bad Case Table */}
                         <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                             <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                 <h3 className="font-bold text-slate-800">Bad Case 修复工作台</h3>
                                 <div className="flex gap-2 text-xs">
                                     <button className="px-3 py-1 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200">全部</button>
                                     <button className="px-3 py-1 bg-white border border-amber-200 text-amber-600 rounded-full">零结果</button>
                                     <button className="px-3 py-1 bg-white border border-red-200 text-red-600 rounded-full">低评分</button>
                                 </div>
                             </div>
                             <table className="w-full text-left text-sm">
                                 <thead className="bg-slate-50 text-slate-500">
                                     <tr>
                                         <th className="px-6 py-3 font-medium">用户提问</th>
                                         <th className="px-6 py-3 font-medium">提问者</th>
                                         <th className="px-6 py-3 font-medium">问题类型</th>
                                         <th className="px-6 py-3 font-medium">状态</th>
                                         <th className="px-6 py-3 font-medium text-right">操作</th>
                                     </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                     {MOCK_BAD_CASES.map(bc => (
                                         <tr key={bc.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => handleBadCaseClick(bc)}>
                                             <td className="px-6 py-3 text-slate-800 font-medium">{bc.query}</td>
                                             <td className="px-6 py-3 text-slate-500 text-xs">{bc.user}<br/>{bc.time}</td>
                                             <td className="px-6 py-3">
                                                 {bc.issueType === 'ZERO_RESULT' && <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded text-[10px] border border-amber-100">无结果</span>}
                                                 {bc.issueType === 'LOW_SCORE' && <span className="px-2 py-1 bg-red-50 text-red-600 rounded text-[10px] border border-red-100">低分评价</span>}
                                                 {bc.issueType === 'HALLUCINATION' && <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-[10px] border border-purple-100">幻觉</span>}
                                             </td>
                                             <td className="px-6 py-3">
                                                 {bc.status === 'PENDING' ? (
                                                     <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={12}/> 待处理</span>
                                                 ) : (
                                                     <span className="flex items-center gap-1 text-xs text-emerald-600"><CheckCircle size={12}/> 已修复</span>
                                                 )}
                                             </td>
                                             <td className="px-6 py-3 text-right">
                                                 <button className="text-xs font-medium text-blue-600 hover:text-blue-700 px-3 py-1.5 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                                     诊断
                                                 </button>
                                             </td>
                                         </tr>
                                     ))}
                                 </tbody>
                             </table>
                         </div>
                    </div>
                )}

                {/* 4. AUDIT */}
                {activeTab === 'audit' && drillDownView === 'NONE' && (
                    <div className="animate-in fade-in duration-500 space-y-6">
                         <div className="flex gap-6">
                             {/* L1 Risk Chart */}
                             <div className="flex-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                 <h3 className="font-bold text-slate-800 mb-6">拦截类型分布</h3>
                                 <div className="space-y-4">
                                     {MOCK_SECURITY_STATS.map((stat, i) => (
                                         <div key={i} className="cursor-pointer group" onClick={() => handleRiskClick(stat.type)}>
                                             <div className="flex justify-between text-xs mb-1">
                                                 <span className="text-slate-600 group-hover:text-blue-600">{stat.type}</span>
                                                 <span className="font-bold text-slate-800">{stat.count} 次</span>
                                             </div>
                                             <div className="w-full bg-slate-100 rounded-full h-2">
                                                 <div className={`h-2 rounded-full ${stat.color} group-hover:brightness-90`} style={{ width: `${stat.percentage}%` }}></div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             </div>
                             
                             {/* L1 Log Table */}
                             <div className="flex-[2] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                 <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                                     <h3 className="font-bold text-slate-800">实时安全日志</h3>
                                 </div>
                                 <div className="flex-1 overflow-y-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-slate-50 text-slate-500 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3">时间</th>
                                                <th className="px-6 py-3">用户</th>
                                                <th className="px-6 py-3">行为</th>
                                                <th className="px-6 py-3 text-right">风险等级</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {AUDIT_LOGS.map(log => (
                                                <tr key={log.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => handleLogClick(log)}>
                                                    <td className="px-6 py-3 font-mono text-slate-500">{log.time}</td>
                                                    <td className="px-6 py-3 font-medium text-slate-700">{log.user}</td>
                                                    <td className="px-6 py-3">{log.action}</td>
                                                    <td className="px-6 py-3 text-right">
                                                        {log.riskLevel === 'HIGH' && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-bold">HIGH</span>}
                                                        {log.riskLevel === 'MEDIUM' && <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-bold">MED</span>}
                                                        {log.riskLevel === 'LOW' && <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full">LOW</span>}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                 </div>
                             </div>
                         </div>
                    </div>
                )}

                {/* 5. USERS (New) */}
                {activeTab === 'users' && drillDownView === 'NONE' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">用户姓名</th>
                                        <th className="px-6 py-3 font-medium">部门</th>
                                        <th className="px-6 py-3 font-medium">系统角色</th>
                                        <th className="px-6 py-3 font-medium">最后登录</th>
                                        <th className="px-6 py-3 font-medium text-right">状态</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {MOCK_USERS.map(user => (
                                        <tr key={user.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-3 font-medium text-slate-700 flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-600">{user.name.charAt(0)}</div>
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-3 text-slate-600">{user.department}</td>
                                            <td className="px-6 py-3">
                                                {user.role === 'ADMIN' && <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded border border-purple-100">管理员</span>}
                                                {user.role === 'EDITOR' && <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded border border-blue-100">编辑</span>}
                                                {user.role === 'VIEWER' && <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded border border-slate-200">访客</span>}
                                            </td>
                                            <td className="px-6 py-3 text-slate-400 text-xs">{user.lastLogin}</td>
                                            <td className="px-6 py-3 text-right">
                                                {user.status === 'ACTIVE' ? (
                                                    <span className="text-emerald-600 text-xs font-bold">正常</span>
                                                ) : (
                                                    <span className="text-red-500 text-xs font-bold">已锁定</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* === DRILL DOWN VIEWS === */}
                {drillDownView === 'METRIC_DETAIL' && <MetricDetailView />}
                {drillDownView === 'FILE_DETAIL' && <FileDetailDrawer />}
                {drillDownView === 'CHUNK_EDITOR' && <ChunkEditorModal />}
                {drillDownView === 'BAD_CASE_DIAGNOSE' && <BadCaseDiagnoseView />}
                {drillDownView === 'CASE_FIX' && <CaseFixModal />}
                {drillDownView === 'LOG_TRACE' && <LogTraceView />}
                {drillDownView === 'RISK_TYPE_DETAIL' && (
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-in fade-in">
                        <button onClick={() => setDrillDownView('NONE')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-4"><ArrowLeft size={16}/> 返回审计总览</button>
                        <h3 className="font-bold text-slate-800 mb-2">{activeRiskType} - 详情下钻 (Level 2)</h3>
                        <p className="text-slate-400 text-sm">这里将展示所有属于该类型的历史安全事件列表。</p>
                    </div>
                )}

            </div>

            {/* === MODALS (Level 1 Actions) === */}
            
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">批量导入知识资产</h3>
                            <button onClick={() => setShowImportModal(false)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <div className="p-6 text-center border-dashed border-2 border-slate-200 rounded-lg m-6 bg-slate-50 hover:bg-white hover:border-blue-400 transition-colors cursor-pointer">
                            <UploadCloud size={48} className="mx-auto text-blue-200 mb-4" />
                            <p className="text-sm font-medium text-slate-700">点击上传或拖拽文件至此</p>
                            <p className="text-xs text-slate-400 mt-2">支持 PDF, Word, Excel, Markdown (Max 500MB)</p>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
                            <button onClick={() => setShowImportModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800">取消</button>
                            <button onClick={() => setShowImportModal(false)} className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800">开始上传</button>
                        </div>
                    </div>
                </div>
            )}

            {showBulkTagModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">批量添加标签</h3>
                        </div>
                        <div className="p-6">
                            <input 
                                type="text" 
                                placeholder="输入标签 (如: 财务, 2025)" 
                                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={bulkTagInput}
                                onChange={(e) => setBulkTagInput(e.target.value)}
                            />
                            <p className="text-xs text-slate-400 mt-2">将为选中的 {selectedFiles.length} 个文件添加此标签。</p>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3 rounded-b-xl">
                            <button onClick={() => setShowBulkTagModal(false)} className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800">取消</button>
                            <button onClick={handleBulkTag} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700">确认添加</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default ManagerDashboard;
