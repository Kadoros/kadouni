import simpleGit from "simple-git";
import fs from "fs";
import path from "path";

const git = simpleGit();
//
export const getGitRepositoryInfo = async (repoUrl: string) => {
  const baseDir = process.cwd(); // Gets the current working directory

  // Create the output directory path using path.join
  const outputDir = path.join(baseDir, "actions", "clonepath");

  try {
    await git.clone(repoUrl, outputDir);
    console.log(`Repository cloned to ${outputDir}`);

    const result = extractAuthorAndProject(repoUrl);

    const directoryTreeText = traverseDirectoryText(outputDir);
    const directoryTreeJson = traverseDirectoryJson(outputDir);
    console.log(`directoryTree is generated`);

    const mergedRepoFiles = mergeRepoFiles(outputDir);

    const mergedContent = `
    Project Name= ${result?.projectName}

    author = ${result?.author}

    git repository url= ${repoUrl}


    file tree=
    ${directoryTreeText}

    File contexts= 
    ${mergedRepoFiles}

    `;
    fs.rmSync(outputDir, { recursive: true, force: true });
    return {
      repositoryText: mergedContent,
      projectName: result?.projectName,
      author: result?.author,
      fileTree: directoryTreeJson,
    };
  } catch (error) {
    console.error("Error during cloning and generating RepositoryText:", error);
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
};



const traverseDirectoryText = (dir: string, depth: number = 0): string => {
  let output = "";
  const indent = " ".repeat(depth * 4); // Indentation for each level
  const files = fs.readdirSync(dir);

  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();
    const isLast = index === files.length - 1; // Check if it's the last file in the folder

    // Use different symbols based on whether it's the last item
    const branch = isLast ? "└── " : "├── ";

    output += `${indent}${branch}${file}\n`;

    if (isDirectory) {
      // Recursively call for subdirectories with increased depth
      output += traverseDirectoryText(filePath, depth + 1);
    }
  });

  return output;
};

const traverseDirectoryJson = (dir: string): DirectoryEntry => {
  const result: DirectoryEntry = {
    name: path.basename(dir),
    path: dir,
    type: "directory",
    contents: [], // Initialize contents as an empty array
  };

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    const entry: DirectoryEntry = {
      name: file,
      path: filePath,
      type: isDirectory ? "directory" : "file",
    };

    if (isDirectory) {
      entry.contents = traverseDirectoryJson(filePath).contents; // Recursive call
    } else {
      entry.content = fs.readFileSync(filePath, "utf-8"); // Add file content
    }

    result.contents!.push(entry); // Use non-null assertion operator
  });

  return result;
};

const mergeRepoFiles = (repoUrl: string): string => {
  let mergedContent = "";

  const mergeFilesRecursively = (dir: string) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      // Skip the .git folder and package-lock.json
      if (file === '.git' || file === 'package-lock.json') {
        return; // Skip this file or directory
      }

      // Check if it's a directory
      if (fs.statSync(filePath).isDirectory()) {
        mergeFilesRecursively(filePath); // Recurse into subdirectory
      } else {
        // Read file content only if it's a file (not a directory)
        const content = fs.readFileSync(filePath, "utf-8");
        mergedContent += `\n\n${filePath}:\n-----------------------\n${content}\n-----------------------\n`;
      }
    });
  };

  mergeFilesRecursively(repoUrl); // Start merging from the top-level directory

  return mergedContent.trim();
};

const extractAuthorAndProject = (
  url: string
): { author: string; projectName: string } | null => {
  // Regular expression to match the author and project name
  const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = url.match(regex);

  if (match) {
    return {
      author: match[1], // Author name
      projectName: match[2], // Project name
    };
  }

  return null; // Return null if the URL doesn't match the expected format
};



//

