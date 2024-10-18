import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEM_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function genContent() {
  try {
    const prompt =
      "your task is to pick any random two topics about programming or technology and write about it in 200words for each topic in family guy peter griffen style and give it in the html format";
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw error;
  }
}
