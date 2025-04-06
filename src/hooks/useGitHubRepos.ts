import { useState } from 'react';
import { toast } from 'sonner';
import { Repository } from '../types/github';
import { fetchUserRepos } from '../services/githubApi';

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
      const data = await fetchUserRepos(username);
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