import { useState } from 'react';
import { Github } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import SearchCard from './components/SearchCard';
import RepoTable from './components/RepoTable';
import { useGitHubRepos } from './hooks/useGitHubRepos';

function App() {
  const [username, setUsername] = useState('');
  const { repos, loading, fetchRepos } = useGitHubRepos();

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center space-x-2">
            <Github className="h-8 w-8" />
            <h1 className="text-3xl font-bold">GitHub Activity Dashboard</h1>
          </div>

          <SearchCard
            username={username}
            setUsername={setUsername}
            fetchRepos={() => fetchRepos(username)}
            loading={loading}
          />

          {repos.length > 0 && <RepoTable repos={repos} />}
        </div>
      </div>
    </>
  );
}

export default App;
