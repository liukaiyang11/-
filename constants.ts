
import { KnowledgeFile, FileStatus, Agent, MetricCard, AuditLog, EnhancedFile, KnowledgeChunk, BadCase, SecurityStat, SystemUser, AIModel } from './types';
import { ShieldCheck, Activity, Database, Clock, Briefcase, FileSearch, Workflow } from 'lucide-react';

export const COMPANY_NAME = "亚康华创";
export const PRODUCT_NAME = "元立方";
export const PRODUCT_NAME_EN = "OmniCube";
export const PRODUCT_FULL_NAME = "元立方 OmniCube 企业级大模型知识库一体化方案";

export const HERO_TITLE = "构建企业专属的“第二大脑”";
export const HERO_SUBTITLE = "基于云边协同架构，将沉睡的文档转化为可调用的资产。安全、低成本、开箱即用的企业级 AI 基础设施。";

// 品牌哲学文案
export const BRAND_PHILOSOPHY = {
  yuan: {
    title: "元 (Omni)",
    subtitle: "全域融合，数据之本",
    desc: "纳管全模态异构数据，以全知全能的数据底座，打破信息孤岛，开启无限可能。"
  },
  cube: {
    title: "立方 (Cube)",
    subtitle: "多维构建，立体赋能",
    desc: "基于存算分离的立体架构，通过多维度的知识解析与推理，打造坚实的算力立方体。"
  }
};

export const BENEFITS = [
  {
    id: "finance",
    title: "金融级标准，全行业复用",
    icon: Briefcase,
    description: "源自金融领域的数据治理方法论。我们将处理高复杂度数据的严谨标准，应用至传统行业，解决核心业务场景下的知识管理难题。"
  },
  {
    id: "parsing",
    title: "多模态精准解析",
    icon: FileSearch,
    description: "解决大模型落地的“第一公里”挑战。针对研报、手册中的跨页表格及复杂图表进行结构化还原，提升数据质量，从源头减少 RAG 幻觉。"
  },
  {
    id: "agent",
    title: "场景化智能体 (RDI)",
    icon: Workflow,
    description: "拒绝“空壳”工具。不同于基础编排平台，我们提供经过业务验证的“岗位画像”与智能体模版，预装 20+ 行业场景 Agent，实现开箱即用。"
  }
];

export const COMPARISON_DETAILS = {
  finance: {
    title: "为什么需要“金融级”底座？",
    traditionalTitle: "通用/开源 RAG 方案",
    ourTitle: "元立方：复用金融级数据治理能力",
    traditionalPoints: [
      "主要针对通用文本优化，处理工业手册、电网图纸等专业文档时效果受限",
      "缺乏对数据一致性的严格保障，在设备维保、安全规程等关键场景存在风险",
      "安全架构多基于互联网标准，难以满足传统行业的物理隔离要求",
      "仅提供基础检索工具，缺乏处理企业存量非结构化数据的系统性方法论"
    ],
    ourPoints: [
      "标准复用：将金融行业对数据严谨性的高标准，平移至传统行业核心场景",
      "复杂场景适配：底层引擎深度优化，能够理解并处理复杂的逻辑推演与图表关联",
      "全栈自主可控：适配国产化软硬件环境，满足关键基础设施的安全合规要求",
      "工程化落地：不仅仅是软件，提供从数据清洗到知识运营的全套最佳实践"
    ]
  },
  parsing: {
    title: "解析精度是知识库的生命线",
    traditionalTitle: "传统 OCR / 脚本处理",
    ourTitle: "智能文档认知引擎",
    traditionalPoints: [
      "处理跨页表格、无框表格时容易丢失结构信息，导致数据错位",
      "难以提取 PDF 中的图片、印章等非文本要素，信息获取不完整",
      "缺乏语义分块能力，容易造成段落截断，影响上下文理解",
      "无法有效还原图表中的数据趋势，丢失关键决策依据"
    ],
    ourPoints: [
      "版面分析算法：精准识别并还原文档的段落、表格与层级结构",
      "结构化抽取：支持复杂表格（如无线表、跨页表）的无损还原",
      "多模态理解：自动提取并描述图表、图片中的关键信息，丰富知识维度",
      "异构数据归一：对 Word, PDF, Excel 等多种格式进行统一标准化清洗"
    ]
  },
  agent: {
    title: "从“工具搭建”升级为“业务交付”",
    traditionalTitle: "通用编排平台 (DIY)",
    ourTitle: "场景化智能体 (Ready-to-use)",
    traditionalPoints: [
      "提供的是基础组件，需要企业投入大量人力进行提示词工程与调试",
      "效果高度依赖个人能力，难以在企业内部进行标准化复制",
      "缺乏行业 Know-how，难以直接嵌入具体的业务流程中",
      "往往作为独立系统存在，难以与现有 ERP/OA 系统深度打通"
    ],
    ourPoints: [
      "预置岗位模型：基于行业实践，内置经过调优的“岗位画像”与工作流",
      "开箱即用：预装 20+ 高频场景 Agent（法务审查、标书生成等），快速上手",
      "闭环运营：提供知识加工、审核、优化的全生命周期管理工具",
      "持续进化：Agent 能力随业务数据的积累与反馈而不断自我迭代"
    ]
  }
};

export const MOCK_KNOWLEDGE_BASE = `
《集团差旅管理规范 2024版》
1. 住宿标准：一线城市（北上广深）标准为 800元/晚，二线城市 500元/晚。
2. 交通工具：高铁二等座，飞行时长超过4小时可申请公务舱。
3. 餐饮补贴：无需发票，每日固定发放 120元。
4. 审批流：部门经理审批 -> 财务复核。
`;

// 深度监控指标
export const DASHBOARD_METRICS = {
  assets: {
    total: { id: 'total', label: "知识碎片总量", value: "1,240,592", unit: "个", change: "+12%", trend: "up", hasDrillDown: false },
    storage: { id: 'storage', label: "向量存储占用", value: "1.8", unit: "TB", change: "+50GB", trend: "up", hasDrillDown: false },
    parsingRate: { id: 'parsingRate', label: "解析成功率", value: "99.8%", unit: "", change: "+0.2%", trend: "up", hasDrillDown: true },
    aging: { id: 'aging', label: "知识老化率", value: "12%", unit: "", change: "-2%", trend: "down", desc: "6个月未更新文档", hasDrillDown: true }
  },
  usage: {
    qps: { id: 'qps', label: "平均 QPS", value: "450", unit: "", change: "+15%", trend: "up", hasDrillDown: false },
    latency: { id: 'latency', label: "P99 检索耗时", value: "850", unit: "ms", change: "-120ms", trend: "down", hasDrillDown: false },
    zeroRate: { id: 'zeroRate', label: "零结果率", value: "3.2%", unit: "", change: "-0.5%", trend: "down", desc: "未命中知识的查询", hasDrillDown: true },
    satisfaction: { id: 'satisfaction', label: "用户点赞率", value: "94.5%", unit: "", change: "+1.2%", trend: "up", hasDrillDown: true }
  }
};

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'L001', time: '10:23:45', user: '系统自动', action: '敏感词过滤', detail: '拦截包含身份证号的Prompt', status: 'BLOCKED', riskLevel: 'HIGH', ip: '192.168.1.5', payload: '{"prompt": "User ID: 1101011990..."}' },
  { id: 'L002', time: '10:21:12', user: '张三 (销售部)', action: '知识调用', detail: '引用《产品定价表_V3》', status: 'ALLOWED', riskLevel: 'LOW', ip: '192.168.1.102' },
  { id: 'L003', time: '10:15:30', user: '李四 (研发部)', action: '文档解析', detail: 'API接口文档.md - 解析成功', status: 'ALLOWED', riskLevel: 'LOW', ip: '192.168.1.105' },
  { id: 'L004', time: '09:45:10', user: '外部IP', action: 'SQL注入尝试', detail: '拦截恶意 Payload', status: 'BLOCKED', riskLevel: 'HIGH', ip: '202.106.0.21', payload: 'SELECT * FROM users WHERE 1=1' },
  { id: 'L005', time: '09:30:22', user: '王五 (人事部)', action: '越权访问', detail: '尝试访问《高管薪资》被拒', status: 'BLOCKED', riskLevel: 'MEDIUM', ip: '192.168.1.20', payload: 'GET /api/docs/salary_vp_2024.pdf' },
];

export const MOCK_AGENTS: Agent[] = [
  { id: 'a1', name: '法务合规助手', category: '法务', description: '自动比对历史合同，识别风险条款', icon: 'Scale', gradient: 'from-blue-500 to-indigo-600', stats: '2.3k 次调用', isHot: true },
  { id: 'a2', name: '销售标书生成', category: '销售', description: '基于过往案例一键生成技术标书', icon: 'FileCheck', gradient: 'from-amber-500 to-orange-600', stats: '890 次调用' },
  { id: 'a3', name: 'IT 运维大脑', category: '运维', description: '诊断服务器日志，给出修复建议', icon: 'Server', gradient: 'from-cyan-500 to-blue-600', stats: '3.1k 次调用' },
];

export const MOCK_FILES_ENHANCED: EnhancedFile[] = [
  { 
    id: '1', name: '公司制度规范汇编_2025.pdf', type: 'pdf', size: '24 MB', uploadedAt: '2025-01-10', 
    status: FileStatus.PUBLISHED, department: '人力资源部', hits: 1250, quality: 98,
    permissionLevel: 'PUBLIC', owner: 'HR_Admin', tags: ['制度', '行政']
  },
  { 
    id: '2', name: '2025_Q1_薪资调整方案.xlsx', type: 'xlsx', size: '2 MB', uploadedAt: '2025-02-01', 
    status: FileStatus.PUBLISHED, department: '人力资源部', hits: 12, quality: 100,
    permissionLevel: 'CONFIDENTIAL', owner: 'HR_Director', tags: ['薪资', '绝密']
  },
  { 
    id: '3', name: '核心业务系统源码架构图.pptx', type: 'pptx', size: '150 MB', uploadedAt: '2025-01-15', 
    status: FileStatus.AUDITING, department: '研发部', hits: 0, quality: 85,
    permissionLevel: 'DEPARTMENT', owner: 'Dev_Lead', tags: ['架构', '技术']
  },
  { 
    id: '4', name: 'Q4季度竞品分析报告.pdf', type: 'pdf', size: '55 MB', uploadedAt: '2025-01-12', 
    status: FileStatus.PUBLISHED, department: '市场部', hits: 890, quality: 95,
    permissionLevel: 'DEPARTMENT', owner: 'Marketing_VP', tags: ['竞品', '市场']
  },
  { 
    id: '5', name: '2024年度财务审计底稿.docx', type: 'docx', size: '12 MB', uploadedAt: '2025-01-14', 
    status: FileStatus.PARSING, department: '财务部', hits: 0, quality: 0,
    permissionLevel: 'CONFIDENTIAL', owner: 'Finance_Audit', tags: ['审计']
  },
];

// === 模拟下钻数据 ===

export const MOCK_CHUNKS: KnowledgeChunk[] = [
  { id: 'c1', content: '第一章 总则：本制度旨在规范公司差旅管理，适用于全体正式员工。差旅活动应遵循节约、高效的原则。', tokenCount: 256, vectorId: 'vec_001', similarity: 0.92, status: 'ACTIVE' },
  { id: 'c2', content: '第二章 住宿标准：一线城市（北上广深）标准为 800元/晚，二线城市 500元/晚。超标部分需由个人承担或经VP级特批。', tokenCount: 128, vectorId: 'vec_002', similarity: 0.88, status: 'ACTIVE' },
  { id: 'c3', content: '表1-1 城市等级划分表：[表格数据：包含300个城市的分级列表]...', tokenCount: 512, vectorId: 'vec_003', similarity: 0.45, status: 'DISABLED' },
];

export const MOCK_BAD_CASES: BadCase[] = [
  { 
    id: 'bc1', 
    query: '如何报销上个月的团建费用？', 
    user: '张三', 
    time: '10:00', 
    issueType: 'ZERO_RESULT', 
    status: 'PENDING',
    aiResponse: '抱歉，我在知识库中未找到关于“团建费用报销”的具体规定。我只能回答差旅费用的相关问题。',
    retrievedChunks: []
  },
  { 
    id: 'bc2', 
    query: '年假可以预支吗？', 
    user: '李四', 
    time: '11:20', 
    issueType: 'LOW_SCORE', 
    relatedDoc: '考勤管理制度.pdf', 
    status: 'RESOLVED',
    aiResponse: '根据规定，年假一般不支持预支。',
    retrievedChunks: [MOCK_CHUNKS[0]]
  },
];

export const MOCK_SECURITY_STATS: SecurityStat[] = [
  { type: 'PII 敏感信息', count: 1240, percentage: 45, color: 'bg-amber-500' },
  { type: 'Prompt 注入', count: 850, percentage: 30, color: 'bg-red-500' },
  { type: '越权访问', count: 420, percentage: 15, color: 'bg-purple-500' },
  { type: '其他违规', count: 280, percentage: 10, color: 'bg-slate-400' },
];

export const MOCK_USERS: SystemUser[] = [
  { id: 'u1', name: 'Admin_Sys', role: 'ADMIN', department: 'IT部', lastLogin: '2025-02-20 10:00', status: 'ACTIVE' },
  { id: 'u2', name: 'Knowledge_Lead', role: 'EDITOR', department: '运营部', lastLogin: '2025-02-19 14:30', status: 'ACTIVE' },
  { id: 'u3', name: 'HR_Director', role: 'VIEWER', department: '人力资源部', lastLogin: '2025-02-18 09:15', status: 'ACTIVE' },
  { id: 'u4', name: 'Temp_User', role: 'VIEWER', department: '实习生', lastLogin: '2025-01-10 10:00', status: 'LOCKED' },
];

export const MOCK_MODELS: AIModel[] = [
  { id: 'm1', name: 'DeepSeek-R1-Distill-70B', version: 'v1.2', type: 'LLM', parameters: '70B', contextWindow: '128k', vramUsage: 48, status: 'LOADED', description: '深度求索最新蒸馏模型，推理能力强，适合复杂逻辑任务。', tags: ['Reasoning', 'Math', 'Code'] },
  { id: 'm2', name: 'Qwen-2.5-72B-Instruct', version: 'v2.5', type: 'LLM', parameters: '72B', contextWindow: '32k', vramUsage: 52, status: 'UNLOADED', description: '阿里通义千问，通用能力均衡，中文指令遵循能力卓越。', tags: ['General', 'Chat', 'Roleplay'] },
  { id: 'm3', name: 'BGE-M3-Embedding', version: 'v1.0', type: 'EMBEDDING', parameters: '300M', contextWindow: '8k', vramUsage: 2, status: 'LOADED', description: '智源多语言向量模型，支持稠密/稀疏/多向量检索。', tags: ['RAG', 'Search'] },
  { id: 'm4', name: 'Llama-3-70B-Quant', version: 'v3.0', type: 'LLM', parameters: '70B', contextWindow: '8k', vramUsage: 35, status: 'UNLOADED', description: 'Meta 开源模型基座，4-bit 量化版本，适配性极佳。', tags: ['English', 'General'] },
  { id: 'm5', name: 'BCE-Reranker-Base', version: 'v2.0', type: 'RERANK', parameters: '500M', contextWindow: '4k', vramUsage: 4, status: 'LOADED', description: '网易有道重排序模型，大幅提升 RAG Top-1 准确率。', tags: ['RAG', 'Rerank'] },
];

export const PRESET_QUESTIONS = [
  "最新的差旅住宿标准是多少？",
  "如何申请报销餐饮费？",
  "查询差旅审批流程"
];

export const FAQ_ITEMS = [
  {
    q: "可以对接企业内部部署的大模型吗？",
    a: "完全支持。元立方仅负责知识的解析、清洗与向量化（RAG 检索）。检索到的知识片段可以通过标准 API 接口发送给公有云（DeepSeek/文心等）、私有云平台或局域网内部署的推理一体机。"
  },
  {
    q: "元立方是否存储业务数据？",
    a: "元立方本地存储原始文件和向量索引。在推理过程中，仅将脱敏后的上下文片段发送给大模型，原始文件永不离场，保障核心数据资产安全。"
  },
  {
    q: "支持哪些格式的企业文档？",
    a: "支持 PDF、Word、Excel、PPT、TXT、Markdown 以及扫描件图片（OCR）。系统具备自动拆解表格、识别图表的能力。"
  },
  {
    q: "系统部署周期需要多久？",
    a: "元立方一体机预装了操作系统与业务软件，开箱即用。通常在设备上架通电后，1小时内即可完成初始化并开始导入知识库。"
  }
];
