import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { fetchUserRepos, fetchRepoCommits } from '../services/githubApi';

interface CommitData {
  date: string;
  count: number;
}

interface Props {
  username: string;
}

const CommitsChart = ({ username }: Props) => {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchCommitData = async () => {
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
        
        const commitsByDate = allCommits.reduce((acc: Record<string, number>, commit: any) => {
          const date = commit.commit.author.date.split('T')[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        
        const last30Days = [...Array(30)].map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();
        
        const formattedData = last30Days.map(date => ({
          date: date,
          count: commitsByDate[date] || 0
        }));
        
        setCommitData(formattedData);
      } catch (error) {
        console.error('Error fetching commit data:', error);
        toast.error('Failed to load commit data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCommitData();
  }, [username]);

  // Custom tooltip component for dark mode compatibility
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow">
          <p className="text-gray-900 dark:text-gray-100 font-medium">{`Date: ${label}`}</p>
          <p className="text-blue-600 dark:text-blue-400">{`${payload[0].value} commits`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Daily Commits (Last 30 Days)
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
              <LineChart data={commitData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => date.substring(5)}
                  interval={4}
                  className="text-gray-900 dark:text-gray-100"
                />
                <YAxis className="text-gray-900 dark:text-gray-100" />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No commit data available for this user
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommitsChart;