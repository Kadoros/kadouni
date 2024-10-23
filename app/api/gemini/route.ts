// pages/api/geminai.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI }  from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GAMINI_API_KEY!
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);

export async function GET(req: NextRequest) {
  try {
    const response = await geminaiClient.get('/your-endpoint'); // Replace with your specific endpoint
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Geminai:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
