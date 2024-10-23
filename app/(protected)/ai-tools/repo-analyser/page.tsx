"use client";

import MarkDownRender from "@/components/prot_comp/MdRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import OptionButton from "./components/optionButton";
import FormError from "@/components/form-error";

export default function RepoAnalyzer() {
  const [repoUrl, setRepoUrl] = useState(""); 
  const [isRepoUrlSet, setIsRepoUrlSet] = useState(false);
  const [repoUrlError, setRepoUrlError] = useState("");
  const [loading, setLoading] = useState<boolean>(false); 
  const [repoInfo, setRepoInfo] = useState<RepositoryInfo | null>(null);
  const [displayText, setDisplayText] = useState<string>(""); // For lazy loading the text
  const [currentLength, setCurrentLength] = useState<number>(2000); // For tracking current text length
  const [showMore, setShowMore] = useState<boolean>(false); // For "Load More" functionality

  useEffect(() => {
    // Load only the first 2000 characters initially
    if (repoInfo?.repositoryText) {
      setDisplayText(repoInfo.repositoryText.slice(0, currentLength));
      setShowMore(repoInfo.repositoryText.length > currentLength); // Show "Load More" if text is longer
    }
  }, [repoInfo, currentLength]);

  const handleSetRepoUrl = async () => {
    setRepoUrlError("");
    if (!repoUrl) {
      setRepoUrlError("Please enter a repository path");
      return; 
    }

    setLoading(true); 

    try {
      const response = await fetch("/api/repo-analyse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "getGitRepositoryInfo",
          repoUrl,
        }),
      });

      if (!response.ok) {
        const errorInfo = await response.json();
        throw new Error(errorInfo.error || "An error occurred");
      }

      const { res } = await response.json();
      console.log(res);

      setRepoInfo({
        projectName: res.projectName,
        author: res.author,
        repositoryText: res.repositoryText,
        fileTree: res.fileTree,
      });

      setIsRepoUrlSet(true);
      setCurrentLength(2000); // Reset current length when fetching new repo info
    } catch (error) {
      setRepoUrlError(
        "Failed to fetch repository info. Please check the repository path and try again."
      );
      console.error("Error fetching repository info:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreText = () => {
    if (repoInfo?.repositoryText) {
      setCurrentLength((prevLength) => {
        const newLength = prevLength + 2000;
        // Update display text to show up to new length
        setDisplayText(repoInfo.repositoryText.slice(0, newLength));
        return newLength; // Return the new length for future increments
      });
    }
  };

  return (
    <div className="p-8 flex h-full w-full">
      <div className="flex flex-col w-1/4">
        <Input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter repository path"
          className="border rounded-lg p-2 w-full bg-white "
        />
        <FormError
          className="border rounded-lg p-2 mt-4 border-destructive"
          message={repoUrlError}
        />
        <span>Repo name: {repoInfo?.projectName}</span>
        <span>Repo author: {repoInfo?.author}</span>

        <Button
          onClick={handleSetRepoUrl}
          className="bg-blue-500 text-white p-2 mt-4 rounded-lg"
          disabled={loading}
        >
          {loading ? "Setting..." : "Set"}
        </Button>

        {/* OptionButtons for analysis can go here */}
        <OptionButton
          loading={loading}
          loadingContext="Analyzing code complexity..."
          context="Analyse code complexity"
        />
        <OptionButton
          loading={loading}
          loadingContext="Analyzing code style..."
          context="Analyse code style"
        />
        <OptionButton
          loading={loading}
          loadingContext="Analyzing security vulnerabilities..."
          context="Analyzing security vulnerabilities"
        />
        <OptionButton
          loading={loading}
          loadingContext="Analyzing code refactoring..."
          context="Analyze code refactoring"
        />
        <OptionButton
          loading={loading}
          loadingContext="Writing code documentation..."
          context="Write code documentation"
        />
      </div>
      <div className="h-full w-full pl-4">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="relative h-full">
            <Textarea
              value={displayText}
              className="h-full resize-none" // Disable resize for better UI control
              readOnly
            ></Textarea>
            {showMore && (
              <Button onClick={loadMoreText} className="absolute bottom-2 right-2">
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
