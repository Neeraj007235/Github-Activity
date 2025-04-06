import { useState } from 'react';
import { toast } from 'sonner';
import { Repository } from '../types/github';

export const useGitHubRepos = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async (username: string) => {
    if (!username) {
    toast.error("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
      if (!response.ok) {
        throw new Error(response.status === 404 ? 'User not found' : 'API error');
      }
      const data = await response.json();
      toast.success("Repositories fetched successfully!");
      setRepos(data);
    } catch (error) {
      toast.error("No repositories found for this username.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { repos, loading, fetchRepos };
};
