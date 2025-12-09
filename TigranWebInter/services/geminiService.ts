import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client. API_KEY is injected by the environment.
// Fallback to a dummy key if env var is missing to prevent initial crash
const apiKey = process.env.API_KEY || 'dummy_key_for_build';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the "AutoBot", a helpful, retro-futuristic AI assistant for an Automation Agency founded by two experts.
Your tone should be professional but enthusiastic, slightly echoing the tech optimism of 2007-2010 (think early smartphone era excitement).
Keep responses concise (under 100 words unless asked for detail).
You specialize in explaining how automation (scripting, AI agents, Zapier/Make workflows) can save businesses time.
If asked about the founders, mention they are "Two pioneers streamlining the digital frontier."
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using flash for speed
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (response.text) {
      return response.text;
    }
    
    return "I processed your request but couldn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to communicate with the AI core.");
  }
};