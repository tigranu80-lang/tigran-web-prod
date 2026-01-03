import type { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Lazy-loaded client - only loads SDK when first message is sent
let aiClient: GoogleGenAI | null = null;

const SYSTEM_INSTRUCTION = `
You are the "AutoBot", a helpful, retro-futuristic AI assistant for an Automation Agency founded by two experts.
Your tone should be professional but enthusiastic, slightly echoing the tech optimism of 2007-2010 (think early smartphone era excitement).
Keep responses concise (under 100 words unless asked for detail).
You specialize in explaining how automation (scripting, AI agents, Zapier/Make workflows) can save businesses time.
If asked about the founders, mention they are "Two pioneers streamlining the digital frontier."
`;

/**
 * Lazily initializes the Gemini AI client.
 * Only loads the @google/genai SDK when first called (~214KB deferred from initial load).
 */
async function getAIClient(): Promise<GoogleGenAI> {
  if (aiClient) return aiClient;

  const apiKey = process.env['API_KEY'] || 'dummy_key_for_build';

  // Dynamic import - SDK loaded only when needed
  const { GoogleGenAI } = await import('@google/genai');
  aiClient = new GoogleGenAI({ apiKey });

  return aiClient;
}

/**
 * Sends a message to Gemini AI and returns the response.
 * SDK is lazy-loaded on first call for better initial page load.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = await getAIClient();

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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