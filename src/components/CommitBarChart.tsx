import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BarChart2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchUserRepos, fetchRepoCommits } from '../services/githubApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  username: string;
}

interface DayCommit {
  date: string;
  commits: number;
  displayDate: string;
}

const CommitBarChart = ({ username }: Props) => {
  const [commitData, setCommitData] = useState<DayCommit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommitActivity = async () => {
      if (!username) return;
      
      setLoading(true);
      try {
        const repos = await fetchUserRepos(username);

        const reposToFetch = repos.slice(0, 10);
 
        const commitsPromises = reposToFetch.map(async (repo: any) => {
          return await fetchRepoCommits(username, repo.name);
        });
        
        const allReposCommits = await Promise.all(commitsPromises);
        
        const allCommits = allReposCommits.flat();
        
        const lastWeek = [...Array(7)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0]; 
        }).reverse(); 
        
        const commitsByDate = allCommits.reduce((acc: Record<string, number>, commit: any) => {
          const date = commit.commit.author.date.split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        
        const formattedData = lastWeek.map(date => {
          const displayDate = new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });
          
          return {
            date,
            displayDate,
            commits: commitsByDate[date] || 0
          };
        });
        
        setCommitData(formattedData);
      } catch (error) {
        console.error('Error fetching commit activity:', error);
        toast.error('Failed to load commit activity data');
      } finally {
        setLoading(false);
      }
    };

    fetchCommitActivity();
  }, [username]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Commits for Last 7 Days
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin text-2xl">⌛</div>
          </div>
        ) : commitData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commitData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value) => [`${value} commits`, 'Commits']}
                />
                <Bar dataKey="commits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No commit activity data available for this user
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommitBarChart;