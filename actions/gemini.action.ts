import { GoogleGenerativeAI } from "@google/generative-ai";
import simpleGit, { SimpleGit } from "simple-git";
import fs from "fs";
import path from "path";
import axios from "axios";
const API_KEY =
  process.env.GOOGLE_GEMINI_API_KEY ||
  "AIzaSyBTESkh_gID_pPLLU2mXw_d4Tsg87C8T1Q"; // Use environment variables for API key
const git: SimpleGit = simpleGit();

// Example TypeScript type for the analysis result
interface AnalysisResult {
  title: string;
  description: string;
  features: string[];
  improvements: string[];
}

// Your function should return this type

// Function to interact with Google Generative AI (Gemini)
// Function to interact with Google Generative AI (Gemini)

const generation_config = {
  temperature: 1,
  top_p: 0.95,
  top_k: 64,
  max_output_tokens: 8192,
  response_mime_type: "text/plain",
};

export const AiGenerate = async (input: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key not defined in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: generation_config,
  });

  const prompt = `User: ${input}\n:`; // Adjust the prompt to include user input
  const result = await model.generateContent(prompt);

  console.log(result.response.text());

  return result.response.text();
};

export const analyzeGitRepository = async (repoPath: string) => {
  // Set the working directory to the specified repository
  await git.cwd(repoPath);

  // Fetch the latest changes
  await git.pull();

  // Get the list of files in the repository
  const status = await git.status();
  const fileList = status.files.map((file) => file.path);

  // Read the contents of each file and merge them
  let combinedCode = "";
  for (const file of fileList) {
    const filePath = path.join(repoPath, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      combinedCode += content + "\n\n"; // Combine with double newlines for separation
    }
  }

  // Generate analysis using AI
  const analysisPrompt = `Analyze the following code for file structure, features, and possible improvements:\n\n${combinedCode}`;
  const analysisResult = await AiGenerate(analysisPrompt);

  // Construct the return object with AI analysis included
  return {
    title: "Example Project", // Placeholder for actual title
    description: analysisResult || "Example description", // Use AI-generated description or a default
    features: ["Feature 1", "Feature 2"], // Use AI to populate actual features if needed
    improvements: analysisResult.split("\n") || ["Improvement 1"], // Split AI response for improvements
  };
};

export const generateReadMeFile = async (repoPath: string) => {
  const baseDir = process.cwd(); // Gets the current working directory

  // Create the output directory path using path.join
  const outputDir = path.join(baseDir, "actions", "clonepath");
  try {
    // Clone the repository
    await git.clone(repoPath, outputDir);
    console.log(`Repository cloned to ${outputDir}`);

    // Merge content of all files in the cloned repository
    const mergedContent = mergeRepoFiles(outputDir);

    // Use the merged content to generate AI content
    const aiResponse = await AiGenerate(mergedContent);
    console.log("Generated content from AI:", aiResponse);
    fs.rmSync(outputDir, { recursive: true, force: true });

    return aiResponse;

    // // You can also save the AI response to a file if needed
    // const responsePath = path.join(outputDir, 'AI_Response.md');
    // fs.writeFileSync(responsePath, aiResponse);
    // console.log('AI response saved to AI_Response.md');
  } catch (error) {
    console.error("Error during cloning and generating README:", error);
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
};

const mergeRepoFiles = (repoPath: string): string => {
  const files = fs.readdirSync(repoPath);
  let mergedContent = "";

  files.forEach((file) => {
    const filePath = path.join(repoPath, file);

    // Read file content only if it's a file (not a directory)
    if (fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath, "utf-8");
      mergedContent += `\n\n---\n\n# ${file}\n\n${content}`;
    }
  });

  return mergedContent.trim();
};

export const listCommits = async (repoPath: string) => {
  const log = await git.cwd(repoPath).log();
  return log.all;
};

// Function to check the status of the Git repository
export const checkRepositoryStatus = async (repoPath: string) => {
  const status = await git.cwd(repoPath).status();
  return status;
};
