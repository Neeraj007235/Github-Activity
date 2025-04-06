import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Search } from 'lucide-react';

interface Props {
  username: string;
  setUsername: (name: string) => void;
  fetchRepos: () => void;
  loading: boolean;
}

const SearchCard = ({ username, setUsername, fetchRepos, loading }: Props) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Search GitHub User</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchRepos()}
        />
        <Button onClick={fetchRepos} disabled={loading}>
          {loading ? (
            <div className="animate-spin">⌛</div>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default SearchCard;
