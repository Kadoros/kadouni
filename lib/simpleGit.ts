import simpleGit, { SimpleGit } from "simple-git";

const git: SimpleGit = simpleGit();

export const getRepositoryInfo = async (
  repoPath: string
): Promise<RepositoryInfo> => {
  await git.cwd(repoPath);

  const status = await git.status();

  // Retrieve logs
  const log = await git.log();
  const latestCommitMessage = log.latest
    ? log.latest.message
    : "No commits yet"; // Handle null case

  const branches = await git.branch();

  return {
    currentBranch: status.current || undefined, // Provide undefined if current is empty
    isClean: status.isClean(),
    latestCommit: latestCommitMessage,
    untrackedFiles: status.not_added, // Use not_added instead of notAdded
    branches: branches.all,
  };
};
