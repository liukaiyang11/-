
import React, { useState } from 'react';
import { X, Check, Loader2 } from 'lucide-react';
import { ContactFormData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ContactModal: React.FC<Props> = ({ isOpen, onClose, title = "预约产品演示" }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    needs: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">{status === 'success' ? '提交成功' : title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Check size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">预约申请已收到</h4>
              <p className="text-slate-500 mb-6 max-w-xs mx-auto">
                感谢您对亚康华创元立方方案的关注。我们的售前专家将在 24 小时内与您联系。
              </p>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                关闭
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-slate-500 mb-4">
                请填写以下信息，以便我们可以为您安排定制化的产品演示与技术交流。
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">姓名 *</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="您的姓名"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">公司名称 *</label>
                  <input 
                    required 
                    type="text" 
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="所在企业全称"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">联系电话 *</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="手机号码"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">工作邮箱</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">需求描述</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                  placeholder="您主要关注的场景（如：知识库构建、法务合规、私有化部署等）..."
                  value={formData.needs}
                  onChange={e => setFormData({...formData, needs: e.target.value})}
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className="animate-spin" /> 提交中...</>
                  ) : (
                    "确认提交"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
