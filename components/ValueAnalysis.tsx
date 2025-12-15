
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Briefcase, FileSearch, Workflow, Award, Building2, ScrollText, Star, GraduationCap, Globe2, Box, AppWindow, CheckCircle2, Server } from 'lucide-react';
import StrategicInsight from './StrategicInsight';
import EnterpriseArchitectureStack from './EnterpriseArchitectureStack';
import { COMPARISON_DETAILS } from '../constants';

interface Props {
  onBack: () => void;
}

type TabKey = 'finance' | 'parsing' | 'agent';

const ValueAnalysis: React.FC<Props> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('finance');

  const comparison = COMPARISON_DETAILS[activeTab];

  const TabButton = ({ id, label, icon: Icon }: { id: TabKey, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all flex-1 md:flex-none justify-center ${
        activeTab === id 
        ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
        : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

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

        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">企业级价值深度解析</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            不只是工具，更是经过头部金融机构验证的智能化转型方法论。
          </p>
        </div>
        
        {/* Industry Recognition & Partners Section */}
        <div className="mb-20 grid md:grid-cols-3 gap-6">
            
            {/* Card 1: Certifications */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                        <Award size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">权威资质认证</h3>
                        <p className="text-xs text-slate-500">Industry Recognition</p>
                    </div>
                </div>
                <div className="space-y-3 flex-1">
                    {[
                        "国家高新技术企业", 
                        "中关村高新技术企业", 
                        "CMMI-3 级软件认证", 
                        "ISO9001 / ISO27001 体系认证",
                        "AAA 级信用企业"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                            <Star size={14} className="text-amber-500 fill-amber-500" />
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 2: Clients */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">长期合作客户</h3>
                        <p className="text-xs text-slate-500">Key Partners</p>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-2 content-start">
                    {[
                        "中国银行", "招商银行", "中信银行", "民生银行",
                        "中信证券", "广发证券", "国泰君安", "华夏银行",
                        "深交所", "北交所", "阿里云", "火山引擎"
                    ].map((client, i) => (
                        <div key={i} className="text-xs font-medium text-slate-600 text-center py-2 px-1 bg-slate-50 rounded border border-slate-100 truncate">
                            {client}
                        </div>
                    ))}
                </div>
            </div>

            {/* Card 3: R&D Strength */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <ScrollText size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">核心科研实力</h3>
                        <p className="text-xs text-slate-500">Intellectual Property</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100 text-center">
                        <div className="text-3xl font-extrabold text-indigo-600 mb-1">30+</div>
                        <div className="text-xs font-bold text-slate-700">技术发明专利 & 软著</div>
                    </div>
                     <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-3xl font-extrabold text-slate-700 mb-1">10+</div>
                        <div className="text-xs font-bold text-slate-600">国际顶级会议论文</div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-auto">
                        <GraduationCap size={14} /> 清华五道口 / 复旦大学 产研合作
                    </div>
                </div>
            </div>

        </div>

        {/* 1. Architecture Strategy (NEW SVG Stack Diagram) */}
        <div className="mb-20">
            <EnterpriseArchitectureStack />
        </div>

        {/* 2. Strategic Insight (Data First Philosophy) */}
        <div className="mb-20">
            <StrategicInsight />
        </div>

        {/* 3. Detailed Comparison Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-20">
            <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar">
                <TabButton id="finance" label="金融行业最佳实践" icon={Briefcase} />
                <TabButton id="parsing" label="多模态高精度解析" icon={FileSearch} />
                <TabButton id="agent" label="角色化智能体 (RDI)" icon={Workflow} />
            </div>

            <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500" key={activeTab}>
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-900">{comparison.title}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {/* Traditional/Competitor */}
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                            <div className="p-2 bg-red-100 text-red-500 rounded-lg">
                                <XCircle size={20} />
                            </div>
                            <h4 className="font-bold text-slate-700">{comparison.traditionalTitle}</h4>
                        </div>
                        <ul className="space-y-4">
                            {comparison.traditionalPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-600 text-sm">
                                    <span className="text-red-400 mt-1">●</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Our Solution */}
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-200 relative z-10">
                            <div className="p-2 bg-blue-600 text-white rounded-lg shadow-md shadow-blue-500/20">
                                <CheckCircle size={20} />
                            </div>
                            <h4 className="font-bold text-slate-900">{comparison.ourTitle}</h4>
                        </div>
                        <ul className="space-y-4 relative z-10">
                            {comparison.ourPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-3 text-slate-700 text-sm font-medium">
                                    <span className="text-blue-500 mt-0.5"><CheckCircle size={14}/></span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. ROI Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
            {[
                { label: "文档检索效率", val: "提升 90%", desc: "从平均 30分钟 缩短至 5秒" },
                { label: "客服人力成本", val: "降低 45%", desc: "AI 自动拦截 80% 常见咨询" },
                { label: "新员工培训周期", val: "缩短 2周", desc: "知识库随问随答，快速上手" }
            ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-shadow">
                    <div className="text-3xl font-extrabold text-blue-600 mb-2">{item.val}</div>
                    <div className="font-bold text-slate-800 mb-2">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ValueAnalysis;
