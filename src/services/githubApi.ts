const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
  ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
};

export const fetchUserRepos = async (username: string) => {
  console.log("Github token", GITHUB_TOKEN);

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(response.status === 404 ? 'User not found' : `API error: ${response.status}`);
  }

  return await response.json();
};

export const fetchRepoCommits = async (username: string, repoName: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100`,
    { headers }
  );

  if (!response.ok) {
    return [];
  }

  return await response.json();
};
