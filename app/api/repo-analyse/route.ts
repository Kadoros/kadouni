import { generateReadMeFile } from "@/actions/gemini.action";
import { getGitRepositoryInfo } from "@/actions/gitAnalysis";
import { NextResponse } from "next/server";

// Define the API route
export async function POST(request: Request) {
  try {
    const { requestType, repoUrl, filename } = await request.json();
    let res;

    console.log("Received request");
    console.log(requestType, repoUrl, filename);
    
    
    // Analyze the Git repository based on the request type
    if (requestType === "getGitRepositoryInfo") {
      console.log("getGitRepositoryInfo");
      res = await getGitRepositoryInfo(repoUrl);
      console.log(res);
      
    } else if (requestType === "getRepositoryFile") {
      console.log("getRepositoryFile");
      res = await getRepositoryFile(repoUrl, filename);
    }

    // Optionally generate a README after analyzing
    // if (requestType === "getGitRepositoryInfo" && res) {
    //   await generateReadMeFile(res);
    // }

    // Return the results using NextResponse
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Example functions to handle repository actions
async function analyzeGitRepository(repoPath: string) {
  // Your logic to analyze the repository
  return "Analysis result"; // Replace with actual analysis result
}

async function getRepositoryFile(repoPath: string, filename: string) {
  // Your logic to get the content of a specific file
  return `Content of ${filename}`; // Replace with actual file content
}
