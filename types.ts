
export enum ViewMode {
  LANDING = 'LANDING',
  FORMS = 'FORMS',
  VALUE = 'VALUE',
  WORKBENCH = 'WORKBENCH',
  ADMIN = 'ADMIN',
  TECH = 'TECH'
}

export enum FileStatus {
  PARSING = 'PARSING',     // 解析中
  AUDITING = 'AUDITING',   // 审核中
  PUBLISHED = 'PUBLISHED', // 已发布
  FAILED = 'FAILED'        // 失败
}

export enum AnimationState {
  IDLE = 'IDLE',
  INGESTION = 'INGESTION',                
  PROCESSING_LOCAL = 'PROCESSING_LOCAL',     
  QUERYING = 'QUERYING',
  RERANKING = 'RERANKING', // Added for full pipeline logic
  SANITIZATION = 'SANITIZATION',          
  ENCRYPTION_REQUEST = 'ENCRYPTION_REQUEST', 
  CLOUD_TRANSMISSION_REQUEST = 'CLOUD_TRANSMISSION_REQUEST', 
  CLOUD_DECRYPTION = 'CLOUD_DECRYPTION',     
  CLOUD_INFERENCE = 'CLOUD_INFERENCE',       
  CLOUD_ENCRYPTION_RESPONSE = 'CLOUD_ENCRYPTION_RESPONSE', 
  CLOUD_TRANSMISSION_RESPONSE = 'CLOUD_TRANSMISSION_RESPONSE', 
  DECRYPTION_LOCAL = 'DECRYPTION_LOCAL',     
  DELIVERY = 'DELIVERY'                      
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  isThinking?: boolean;
}

export interface KnowledgeFile {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'pptx' | 'xlsx';
  size: string;
  uploadedAt: string;
  status: FileStatus;
  department: string;
  hits: number;    // 调用次数
  quality: number; // 知识质量评分 0-100
}

export interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  gradient: string;
  stats: string;
  isHot?: boolean;
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  desc: string;
  icon: any;
  hasDrillDown?: boolean; // 是否支持下钻
}

export interface AuditLog {
  id: string;
  time: string;
  user: string;
  action: string;
  detail: string;
  status: 'BLOCKED' | 'ALLOWED';
  riskLevel?: 'HIGH' | 'MEDIUM' | 'LOW';
  ip?: string;
  payload?: string; // 完整 payload 用于三级下钻
}

export interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  needs: string;
}

export interface EnhancedFile extends KnowledgeFile {
  permissionLevel: 'PUBLIC' | 'DEPARTMENT' | 'CONFIDENTIAL'; // 公开、部门可见、绝密
  owner: string;
  isMasked?: boolean; // 前端展示控制
  tags?: string[];
}

// === 下钻与深度交互数据类型 ===

// Level 3: 知识切片 (Knowledge Chunk)
export interface KnowledgeChunk {
  id: string;
  content: string;
  tokenCount: number;
  vectorId: string;
  similarity?: number; // 检索时的相似度
  status: 'ACTIVE' | 'DISABLED'; // 可禁用切片
}

// Level 2/3: Bad Case 诊断详情
export interface BadCase {
  id: string;
  query: string;
  user: string;
  time: string;
  issueType: 'ZERO_RESULT' | 'LOW_SCORE' | 'HALLUCINATION'; 
  relatedDoc?: string;
  status: 'PENDING' | 'RESOLVED';
  // 诊断详情
  aiResponse?: string;
  retrievedChunks?: KnowledgeChunk[]; // 当时召回的切片
  adminComment?: string;
}

// Level 1: 安全统计
export interface SecurityStat {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

// Level 1: 用户管理
export interface SystemUser {
  id: string;
  name: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  department: string;
  lastLogin: string;
  status: 'ACTIVE' | 'LOCKED';
}

// Level 1: 模型管理 (New for Model Pool)
export interface AIModel {
  id: string;
  name: string;
  version: string;
  type: 'LLM' | 'EMBEDDING' | 'RERANK';
  parameters: string; // e.g. "72B"
  contextWindow: string; // e.g. "32k"
  vramUsage: number; // GB
  status: 'LOADED' | 'UNLOADED' | 'LOADING';
  description: string;
  tags: string[];
}
