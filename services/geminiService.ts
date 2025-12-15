
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Note: In a real production app, ensure proper backend proxying for keys.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateRAGResponse = async (
  query: string, 
  context: string
): Promise<string> => {
  if (!apiKey) {
    return "演示模式：未检测到 API Key。在实际部署中，系统会在此处将检索到的上下文发送至云端大模型进行推理。";
  }

  try {
    const prompt = `
      你是一个专业的企业智能助手。
      请根据以下从企业本地知识库中检索到的上下文信息，回答用户的问题。
      
      --- 本地检索到的上下文 (已脱敏) ---
      ${context}
      --- 上下文结束 ---

      用户问题: ${query}
      
      要求：
      1. 回答必须基于提供的上下文。
      2. 语气专业、简洁、商务。
      3. 如果上下文中没有相关信息，请直接说明。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "未能生成回答。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "连接云端大模型失败。请检查网络设置或 API Key 配置。";
  }
};