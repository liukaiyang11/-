
import React, { useState } from 'react';
import { X, FileText, Building2, Shield, ChevronRight, Download, Globe, Award, Server, BookOpen, CheckCircle, BarChart3, Lock, Cpu, Database, Zap } from 'lucide-react';

export type InfoType = 'DOCS' | 'ABOUT' | 'PRIVACY' | 'WHITEPAPER';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: InfoType;
}

const FooterInfoModal: React.FC<Props> = ({ isOpen, onClose, type }) => {
  const [activeDocSection, setActiveDocSection] = useState('intro');

  if (!isOpen) return null;

  // --- CONTENT: WHITEPAPER (Full Version) ---
  const renderWhitepaper = () => (
    <div className="h-[75vh] flex flex-col md:flex-row bg-white">
      {/* Table of Contents Sidebar */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-6 overflow-y-auto flex-shrink-0">
         <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">目录 Contents</div>
         <nav className="space-y-1">
             <a href="#wp-exec" className="block px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-blue-600 rounded-lg transition-colors font-medium">1. 执行摘要</a>
             <a href="#wp-challenge" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">2. 行业挑战与背景</a>
             <a href="#wp-philosophy" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">3. 产品核心理念</a>
             <a href="#wp-arch" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">4. 技术架构详解</a>
             <a href="#wp-hardware" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">5. 硬件规格与性能</a>
             <a href="#wp-security" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">6. 安全合规机制</a>
             <a href="#wp-benchmark" className="block px-3 py-2 text-sm text-slate-600 hover:bg-white hover:text-blue-600 rounded-lg transition-colors">7. 性能实测数据</a>
         </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-8 mb-12">
              <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 text-white p-2 rounded-lg">
                      <BookOpen size={24} />
                  </div>
                  <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">Technical Whitepaper</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
                  元立方 Omni Cube <br/>
                  <span className="text-slate-500 font-medium text-2xl">企业级大模型知识库一体化解决方案</span>
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span>Version 2.5</span>
                  <span>March 2025</span>
                  <span>亚康华创 x 感易智能 联合出品</span>
              </div>
          </div>

          {/* 1. Executive Summary */}
          <section id="wp-exec" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">1</span>
                  执行摘要
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600">
                  <p className="text-lg leading-relaxed mb-4">
                      随着大语言模型（LLM）技术的爆发，企业智能化转型进入深水区。然而，通用大模型在落地传统行业（如能源、交通、制造）的核心业务时，面临着<strong>数据主权安全隐患、专业领域知识幻觉、算力建设成本高昂</strong>三大挑战。
                  </p>
                  <p className="leading-relaxed">
                      元立方 Omni Cube 提出了一种创新的<strong>“云边协同、存算分离”</strong>架构。通过在企业本地部署软硬一体化的边缘节点，实现对非结构化数据的高精度解析与治理，构建企业私有的知识向量库。系统仅将脱敏后的上下文片段发送至推理端（支持公有云、私有云或本地模型），从而在保障数据主权的前提下，大幅降低大模型落地门槛。
                  </p>
              </div>
          </section>

          {/* 2. Industry Challenges */}
          <section id="wp-challenge" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">2</span>
                  行业挑战与背景
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Lock size={18} className="text-red-500" /> 数据安全困境
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                          传统行业拥有大量涉及核心工艺、地质勘探、电网拓扑的敏感数据。直接将这些原始文档上传至公有云进行训练或微调（Fine-tuning），存在极大的数据泄露风险与合规隐患。
                      </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Zap size={18} className="text-amber-500" /> 知识幻觉问题
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                          通用大模型缺乏行业 Know-how。在面对复杂的设备维修手册、即时故障排查场景时，极易产生“一本正经胡说八道”的幻觉，导致决策失误。
                      </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Database size={18} className="text-blue-500" /> 非结构化数据治理难
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                          企业 80% 的知识沉淀在 PDF、扫描件、图纸等非结构化文档中。传统的 OCR 技术无法有效还原跨页表格、复杂流程图，导致知识碎片化、丢失逻辑关联。
                      </p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <Server size={18} className="text-purple-500" /> 算力建设门槛高
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                          自建千卡 GPU 集群进行私有化训练，硬件采购与运维成本动辄千万级。中小企业难以承担，且算力利用率往往不足，造成资源浪费。
                      </p>
                  </div>
              </div>
          </section>

          {/* 3. Product Philosophy */}
          <section id="wp-philosophy" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">3</span>
                  产品核心理念
              </h2>
              <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden mb-8">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                      <Award size={200} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Data First, AI Second.</h3>
                  <p className="text-lg text-blue-100 max-w-2xl leading-relaxed">
                      我们坚信，<strong>高质量的知识库是企业 AI 的灵魂</strong>。模型可以替换，应用可以重构，唯有经过治理的数据资产是企业恒定的壁垒。元立方不仅仅是一个 RAG 工具，更是一套完整的数据资产化方法论。
                  </p>
              </div>
          </section>

          {/* 4. Technical Architecture */}
          <section id="wp-arch" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">4</span>
                  技术架构详解
              </h2>
              
              <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 pl-4 border-l-4 border-blue-600">4.1 存算分离架构 (Separation of Storage & Compute)</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                      系统在逻辑上解耦为“知识底座”与“推理大脑”两部分。
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-slate-600">
                      <li><strong>边缘侧（知识底座）：</strong> 运行于元立方一体机。负责多模态异构数据解析（OCR）、向量化嵌入（Embedding）、本地向量索引存储、RAG 检索召回以及 PII 敏感信息清洗。</li>
                      <li><strong>云端/中心侧（推理大脑）：</strong> 负责最终的文本生成与逻辑推理。兼容 OpenAI 接口协议，可无缝对接 DeepSeek, Qwen, GPT-4 或企业私有化部署的 Llama 3 集群。</li>
                  </ul>
              </div>

              <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 pl-4 border-l-4 border-blue-600">4.2 智能文档认知引擎 (Intelligent Doc Parser)</h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                      <div className="grid md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="font-bold text-slate-800 mb-2">版面分析 (Layout Analysis)</h4>
                              <p className="text-sm text-slate-600">基于 Transformer 的视觉编码器，精准识别文档中的页眉、页脚、分栏、表格及图片区域，重构文档逻辑树。</p>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-800 mb-2">表格还原 (Table Reconstruction)</h4>
                              <p className="text-sm text-slate-600">针对跨页表格、无框表格及复杂合并单元格，利用几何算法与语义理解进行无损还原，保留行列表头对应关系。</p>
                          </div>
                      </div>
                  </div>
              </div>

               <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 pl-4 border-l-4 border-blue-600">4.3 混合检索策略 (Hybrid Search)</h3>
                  <p className="text-slate-600 leading-relaxed">
                      采用 <strong>BM25 关键词检索 + Dense Vector 稠密向量检索</strong> 的双路召回机制。引入 Cross-Encoder 重排序模型（Rerank），对召回的 Top-N 切片进行语义精排，显著提升 Top-1 命中率，有效缓解模型幻觉。
                  </p>
              </div>
          </section>

          {/* 5. Hardware Specs */}
          <section id="wp-hardware" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">5</span>
                  硬件规格与性能
              </h2>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse border border-slate-200">
                      <thead className="bg-slate-100 text-slate-700">
                          <tr>
                              <th className="p-4 border border-slate-200">组件 (Component)</th>
                              <th className="p-4 border border-slate-200">旗舰版 (Flagship)</th>
                              <th className="p-4 border border-slate-200">标准版 (Standard)</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          <tr>
                              <td className="p-4 border border-slate-200 font-bold bg-slate-50">AI 加速卡 (NPU)</td>
                              <td className="p-4 border border-slate-200">Ascend 910 * 8 (256 TFLOPS FP16)</td>
                              <td className="p-4 border border-slate-200">Ascend 310P * 4 (88 TOPS INT8)</td>
                          </tr>
                          <tr>
                              <td className="p-4 border border-slate-200 font-bold bg-slate-50">通用处理器 (CPU)</td>
                              <td className="p-4 border border-slate-200">鲲鹏 920 (48 Core @ 2.6GHz)</td>
                              <td className="p-4 border border-slate-200">Intel Xeon Gold (24 Core @ 2.4GHz)</td>
                          </tr>
                          <tr>
                              <td className="p-4 border border-slate-200 font-bold bg-slate-50">系统内存</td>
                              <td className="p-4 border border-slate-200">512 GB DDR4 ECC</td>
                              <td className="p-4 border border-slate-200">128 GB DDR4 ECC</td>
                          </tr>
                          <tr>
                              <td className="p-4 border border-slate-200 font-bold bg-slate-50">本地存储</td>
                              <td className="p-4 border border-slate-200">7.68TB NVMe SSD (RAID 5)</td>
                              <td className="p-4 border border-slate-200">2TB NVMe SSD</td>
                          </tr>
                          <tr>
                              <td className="p-4 border border-slate-200 font-bold bg-slate-50">网络接口</td>
                              <td className="p-4 border border-slate-200">4x 25GE SFP28 + 2x 10GE RJ45</td>
                              <td className="p-4 border border-slate-200">2x 10GE SFP+ + 2x 1GE RJ45</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </section>

          {/* 6. Security */}
          <section id="wp-security" className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">6</span>
                  安全合规机制
              </h2>
              <ul className="grid md:grid-cols-2 gap-6">
                  <li className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                          <Shield size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800">PII 隐私清洗</h4>
                          <p className="text-sm text-slate-600 mt-1">内置 NLP 实体识别模型，自动发现并替换姓名、身份证、银行卡号等敏感信息，确保出网数据脱敏。</p>
                      </div>
                  </li>
                  <li className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                          <Lock size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800">全链路加密</h4>
                          <p className="text-sm text-slate-600 mt-1">本地存储采用 AES-256 加密，网络传输强制 TLS 1.3 双向认证，密钥由企业本地 HSM 模块管理。</p>
                      </div>
                  </li>
                   <li className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <Cpu size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800">可信计算环境 (TEE)</h4>
                          <p className="text-sm text-slate-600 mt-1">核心推理进程运行于内存隔离的安全沙箱中，防止恶意代码注入与内存数据窃取。</p>
                      </div>
                  </li>
                   <li className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-white">
                      <div className="flex-shrink-0 w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
                          <FileText size={20} />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800">审计溯源</h4>
                          <p className="text-sm text-slate-600 mt-1">记录所有知识调用日志与 Prompt 记录，支持对水印文档的泄露溯源，满足等保三级审计要求。</p>
                      </div>
                  </li>
              </ul>
          </section>

          {/* 7. Benchmarks */}
          <section id="wp-benchmark" className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">7</span>
                  性能实测数据
              </h2>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                      <BarChart3 className="text-blue-600" />
                      <span className="font-bold text-slate-700">场景：百万级金融文档库检索与问答</span>
                  </div>
                  <div className="space-y-4">
                      <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-slate-700">解析速度 (PDF Pages/Sec)</span>
                              <span className="text-slate-500">35 pages/s</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                      </div>
                       <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-slate-700">检索召回准确率 (Recall@5)</span>
                              <span className="text-slate-500">92.4%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                      </div>
                       <div>
                          <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-slate-700">端到端响应延迟 (P99 Latency)</span>
                              <span className="text-slate-500">1.2s</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                      </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                      * 测试环境：元立方标准版一体机，知识库包含 100万个 chunks，并发数 50 QPS。
                  </p>
              </div>
          </section>

          {/* Footer Download */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl text-center">
              <h3 className="text-xl font-bold mb-4">获取完整技术资料</h3>
              <p className="text-slate-400 mb-6 text-sm">
                  包含详细的 API 开发文档、SDK 使用指南以及私有化部署实施手册。
              </p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 mx-auto">
                  <Download size={18} /> 下载 PDF 合集包 (58MB)
              </button>
          </div>

      </div>
    </div>
  );

  // --- CONTENT: ABOUT US (Based on PDF) ---
  const renderAbout = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center border-b border-slate-100 pb-6">
        <h3 className="text-2xl font-black text-slate-900 mb-2">北京亚康华创科技有限公司</h3>
        <p className="text-slate-500 text-sm">专业的 AI 应用解决方案集成商 | 算力全产业链综合服务商</p>
      </div>

      {/* Intro Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            { val: "1999", label: "成立于", sub: "深交所上市 301085" },
            { val: "20+", label: "年", sub: "企业级数据中心经验" },
            { val: "1000+", label: "家", sub: "服务客户" },
            { val: "3000+", label: "名", sub: "全行业精英人才" },
        ].map((item, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-xl text-center">
                <div className="text-xl font-extrabold text-blue-600">{item.val}</div>
                <div className="text-xs font-bold text-slate-700 mt-1">{item.label}</div>
                <div className="text-[10px] text-slate-400 mt-1">{item.sub}</div>
            </div>
        ))}
      </div>

      {/* Core Business */}
      <div>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-lg">
            <Globe className="text-blue-600" size={20}/> 全球化服务与战略定位
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
            亚康股份（股票代码：301085）致力于成为领先的算力全产业链综合服务商。国内覆盖“东数西算”八大集群，海外服务能力覆盖北美、欧洲、东亚及东南亚。
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
            在 AI 时代，亚康华创作为集团核心技术力量，确立了<strong>“固本迎新，内外双修”</strong>的战略。以自主可控算力设备和通用大模型为底座，打造“个人工作台+行业应用+集成交付”的开放生态平台，解决政企客户 AI 应用落地的“最后一公里”难题。
        </p>
      </div>

      {/* Certifications */}
      <div>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 text-lg">
            <Award className="text-amber-500" size={20}/> 资质与实力
        </h4>
        <div className="grid grid-cols-2 gap-3">
            {[
                "CMMI5 级软件认证", "ITSS 运行维护服务二级", "国家高新技术企业", "ISO 9001/27001/20000 认证",
                "工信部可信云认证", "系统集成企业能力", "华为/超聚变/H3C 核心合作伙伴"
            ].map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {cert}
                </div>
            ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
          <Server className="text-blue-600 mt-1" size={20} />
          <div>
              <h5 className="font-bold text-slate-800 text-sm">创新产品：元立方一体机</h5>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  联合生态伙伴，通过“软件定义硬件”，推出了适配 DeepSeek 等主流大模型的行业 AI 一体机，提供开箱即用的推理环境与数据治理服务。
              </p>
          </div>
      </div>
    </div>
  );

  // --- CONTENT: PRIVACY POLICY ---
  const renderPrivacy = () => (
    <div className="space-y-6 text-sm text-slate-600 leading-relaxed h-[60vh] overflow-y-auto pr-2">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <h3 className="text-xl font-bold text-slate-900">隐私保护政策</h3>
        <p className="text-xs text-slate-400 mt-2">更新日期：2025年3月1日</p>
      </div>

      <p>
        北京亚康华创科技有限公司（以下简称“我们”）非常重视您的隐私。元立方企业级大模型知识库一体机（以下简称“本产品”）是一款面向企业客户的<strong>私有化部署</strong>产品。本政策旨在说明我们如何处理您的数据。
      </p>

      <h4 className="font-bold text-slate-900 text-base mt-6">1. 数据存储与控制权</h4>
      <p>
        <strong>核心承诺：数据不出域。</strong>
        <br/>
        本产品采用本地化部署（On-Premises）模式。您的所有企业知识库文档、向量索引、用户账号信息及对话日志均存储于您企业内部控制的服务器（元立方一体机）中。除非您明确配置并授权连接外部公有云 API，否则没有任何数据会传输至亚康华创或第三方服务器。
      </p>

      <h4 className="font-bold text-slate-900 text-base mt-6">2. 我们收集的信息</h4>
      <p>仅在您主动联系售后支持或使用云端授权验证服务时，我们可能会收集以下最小化信息：</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>设备序列号 (SN) 与授权许可证信息。</li>
        <li>系统运行日志（需您手动导出并发送，用于故障排查）。</li>
        <li>企业联系人的姓名、电话及邮箱（用于商务对接）。</li>
      </ul>

      <h4 className="font-bold text-slate-900 text-base mt-6">3. 第三方模型服务</h4>
      <p>
        若您选择配置 DeepSeek、OpenAI 或其他第三方大模型 API：
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>本产品会自动对用户 Prompt 进行 PII（个人敏感信息）脱敏处理。</li>
        <li>脱敏后的上下文片段将被发送至您配置的第三方服务商。</li>
        <li>请参照对应模型服务商的隐私协议了解其数据处理方式。</li>
      </ul>

      <h4 className="font-bold text-slate-900 text-base mt-6">4. 数据安全</h4>
      <p>
        我们采用行业标准的安全措施，包括但不限于 AES-256 本地存储加密、TLS 1.3 传输加密以及基于角色的访问控制 (RBAC)，以防止未经授权的访问、披露或丢失。
      </p>

      <h4 className="font-bold text-slate-900 text-base mt-6">5. 联系我们</h4>
      <p>
        如对本隐私政策有任何疑问，请联系：security@yakang.com
      </p>
    </div>
  );

  // --- CONTENT: PRODUCT DOCS ---
  const renderDocs = () => (
    <div className="flex flex-col md:flex-row h-[60vh] gap-6">
       {/* Sidebar Navigation */}
       <div className="w-full md:w-48 flex-shrink-0 border-r border-slate-100 pr-4 space-y-1">
          {[
              { id: 'intro', label: '产品简介' },
              { id: 'specs', label: '硬件规格' },
              { id: 'software', label: '软件架构' },
              { id: 'deploy', label: '部署指南' },
              { id: 'api', label: 'API 接口' },
          ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveDocSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${activeDocSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                  {item.label}
              </button>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
             <button className="flex items-center gap-2 text-xs text-slate-500 hover:text-blue-600 px-3">
                <Download size={12} /> 下载 PDF 手册
             </button>
          </div>
       </div>

       {/* Doc Content Area */}
       <div className="flex-1 overflow-y-auto pr-2 text-sm text-slate-600 leading-relaxed">
          {activeDocSection === 'intro' && (
              <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">产品简介：元立方 Omni Cube</h3>
                  <p>元立方是亚康华创推出的企业级 AI 知识库一体机，旨在解决企业在应用大模型时面临的数据安全、算力部署复杂、知识幻觉严重等痛点。</p>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 my-4">
                      <h4 className="font-bold text-slate-800 text-xs uppercase mb-2">核心特性</h4>
                      <ul className="space-y-2 text-xs">
                          <li>✅ <strong>开箱即用：</strong> 预装元立方 OS、向量数据库及 RAG 引擎。</li>
                          <li>✅ <strong>模型丰富：</strong> 内置 DeepSeek-R1、Qwen、Llama3 等主流开源模型，支持一键切换。</li>
                          <li>✅ <strong>物理隔离：</strong> 支持纯离线模式运行，满足金融、军工级安全要求。</li>
                      </ul>
                  </div>
              </div>
          )}

          {activeDocSection === 'specs' && (
               <div className="space-y-4 animate-in fade-in">
                   <h3 className="text-xl font-bold text-slate-900 mb-4">硬件规格参数</h3>
                   <table className="w-full text-xs text-left border-collapse">
                       <thead>
                           <tr className="bg-slate-100 border-b border-slate-200">
                               <th className="p-2">组件</th>
                               <th className="p-2">旗舰版 (Flagship)</th>
                               <th className="p-2">标准版 (Standard)</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                           <tr><td className="p-2 font-bold">算力 (NPU)</td><td className="p-2">Ascend 910 * 8</td><td className="p-2">Ascend 310P * 4</td></tr>
                           <tr><td className="p-2 font-bold">CPU</td><td className="p-2">鲲鹏 920 (48 Core)</td><td className="p-2">Intel Xeon (24 Core)</td></tr>
                           <tr><td className="p-2 font-bold">显存</td><td className="p-2">512 GB HBM</td><td className="p-2">96 GB</td></tr>
                           <tr><td className="p-2 font-bold">存储</td><td className="p-2">7.68T NVMe SSD</td><td className="p-2">2T NVMe SSD</td></tr>
                       </tbody>
                   </table>
               </div>
          )}
          
          {activeDocSection === 'software' && (
               <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">软件架构栈</h3>
                  <p>元立方基于 <strong>MindIE</strong> 推理加速引擎构建，底层兼容 PyTorch 与 TensorFlow 生态。</p>
                  <ul className="list-disc pl-5 space-y-2">
                      <li><strong>OS 层：</strong> Ubuntu 22.04 LTS / OpenEuler (国产化适配)</li>
                      <li><strong>驱动层：</strong> CANN 8.0 异构计算架构</li>
                      <li><strong>中间件：</strong> Milvus (向量库), PostgreSQL (关系库), Redis (缓存)</li>
                      <li><strong>应用层：</strong> 元立方 RAG 编排引擎, AI Agent 工作台</li>
                  </ul>
               </div>
          )}

          {activeDocSection === 'deploy' && (
               <div className="space-y-4 animate-in fade-in">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">部署指南</h3>
                  <ol className="list-decimal pl-5 space-y-3">
                      <li>
                          <strong>硬件上架：</strong> 将一体机安装至标准 19 英寸机柜，连接电源及管理网口 (MGMT)。
                      </li>
                      <li>
                          <strong>网络配置：</strong> 默认管理 IP 为 <code>192.168.1.100</code>。请通过 SSH 登录修改为企业内网 IP。
                      </li>
                      <li>
                          <strong>授权激活：</strong> 访问 <code>http://[IP]:8080/activate</code>，输入设备 SN 码进行激活。
                      </li>
                      <li>
                          <strong>模型加载：</strong> 进入管理后台 -> 模型中心，选择需要的行业模型进行显存加载。
                      </li>
                  </ol>
               </div>
          )}
           
           {activeDocSection === 'api' && (
               <div className="space-y-4 animate-in fade-in">
                   <h3 className="text-xl font-bold text-slate-900 mb-4">API 接口文档</h3>
                   <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs">
                       <p className="text-green-400">POST /v1/chat/completions</p>
                       <p className="mt-2 text-slate-500">// 请求示例</p>
                       <pre className="mt-1">
{`{
  "model": "deepseek-r1",
  "messages": [
    {"role": "user", "content": "查询差旅标准"}
  ],
  "use_rag": true,
  "temperature": 0.7
}`}
                       </pre>
                   </div>
                   <p className="text-xs text-slate-500 mt-2">完全兼容 OpenAI SDK 格式。</p>
               </div>
           )}
       </div>
    </div>
  );

  const getTitle = () => {
      switch(type) {
          case 'ABOUT': return '关于我们';
          case 'PRIVACY': return '隐私政策';
          case 'DOCS': return '产品技术文档';
          case 'WHITEPAPER': return '技术白皮书 (完整版)';
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-slate-900">
             {type === 'DOCS' && <FileText className="text-blue-600" />}
             {type === 'ABOUT' && <Building2 className="text-blue-600" />}
             {type === 'PRIVACY' && <Shield className="text-blue-600" />}
             {type === 'WHITEPAPER' && <BookOpen className="text-blue-600" />}
             <h3 className="text-lg font-bold">{getTitle()}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden">
           {type === 'ABOUT' && <div className="p-6 md:p-8 overflow-y-auto h-full">{renderAbout()}</div>}
           {type === 'PRIVACY' && <div className="p-6 md:p-8 overflow-y-auto h-full">{renderPrivacy()}</div>}
           {type === 'DOCS' && <div className="p-6 md:p-8 overflow-y-auto h-full">{renderDocs()}</div>}
           {type === 'WHITEPAPER' && renderWhitepaper()}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end flex-shrink-0">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-300 transition-colors text-sm"
            >
                关闭
            </button>
        </div>
      </div>
    </div>
  );
};

export default FooterInfoModal;
