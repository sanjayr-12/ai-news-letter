import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEM_API);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function genContent() {
  try {
    const prompt =
      "choose any two random tech topics, the first one should be the programming topic and the second is technology oriented topic and write each content in 200 words, there should be only the heading and the content, and no other words and return in the html format, note each time return the some unique topic";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result;
  } catch (error) {
    throw error;
  }
}
