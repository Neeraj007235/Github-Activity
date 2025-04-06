import { useState } from 'react';
import { Github } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import SearchCard from './components/SearchCard';
import RepoTable from './components/RepoTable';
import CommitsChart from './components/CommitsChart';
import CommitBarChart from './components/CommitBarChart';
import { useGitHubRepos } from './hooks/useGitHubRepos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ThemeProvider } from './components/ui/theme-provider';
import Header from './components/Header';

function App() {
  const [username, setUsername] = useState('');
  const [searchedUsername, setSearchedUsername] = useState('');
  const { repos, loading, fetchRepos } = useGitHubRepos();

  const handleSearch = () => {
    fetchRepos(username);
    setSearchedUsername(username);
  };
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <Toaster />
        <div className="min-h-screen bg-background p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <Header /> 
            <SearchCard
              username={username}
              setUsername={setUsername}
              fetchRepos={handleSearch}
              loading={loading}
            />

            {repos.length > 0 && (
              <>
                <Tabs defaultValue="linechart">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="linechart">Daily Commits (30 Days)</TabsTrigger>
                    <TabsTrigger value="barchart">Commits (Last 7 Days)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="linechart">
                    <CommitsChart username={searchedUsername} />
                  </TabsContent>
                  <TabsContent value="barchart">
                    <CommitBarChart username={searchedUsername} />
                  </TabsContent>
                </Tabs>

                <RepoTable repos={repos} />
              </>
            )}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;