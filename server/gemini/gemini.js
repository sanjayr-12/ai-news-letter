import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEM_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function genContent() {
  try {
    const prompt =
      "your task is to pick any random two topics about programming or technology and write about it in 200 words for each topic in family guy peter griffen style and write the content in html, the heading in the h2 tag and the contents in the p tag";
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw error;
  }
}
