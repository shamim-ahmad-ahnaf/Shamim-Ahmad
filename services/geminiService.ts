
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROJECTS, SKILLS } from "../constants";

const SYSTEM_INSTRUCTION = `
You are an AI representative for Shamim Ahmad, a World-Class Senior Web Developer. 
Your goal is to answer questions from potential clients or employers about the developer's work, skills, and background.

Developer Info:
- Name: Shamim Ahmad
- Expertise: Fullstack Development, React, TypeScript, AI Integration.
- Key Skills: ${SKILLS.map(s => s.name).join(', ')}
- Top Projects: ${PROJECTS.map(p => p.title).join(', ')}

Keep your answers professional, concise, and engaging. 
If someone asks about the developer's experience, focus on technical excellence and user-centric design.
Translate the context accurately to the user's language if they speak in Bengali or English.
`;

export const chatWithAI = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], currentMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that. Could you try again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the AI assistant. Please check your network.";
  }
};
