
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getOrchestratorAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Lead AI Orchestrator. The user is a "Family Architect" building a life system. Prompt: ${prompt}`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The orchestration system is currently offline. Please review your manual protocols.";
  }
}
