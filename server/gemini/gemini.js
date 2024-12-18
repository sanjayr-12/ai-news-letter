import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import historyModel from "../schema/history.schema.js";

const genAI = new GoogleGenerativeAI(process.env.GEM_API);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-001",
  systemInstruction: process.env.SYS_IN,
  safetySettings: safetySettings,
});

export async function genContent() {
  try {
    const array = [];
    const history = await historyModel.find();
    for (const his of history) {
      array.push(his.history);
    }
    const result = await model.generateContent(
      array + " " + process.env.HISTORY
    );
    return result.response.text();
  } catch (error) {
    throw error;
  }
}
