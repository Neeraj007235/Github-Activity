// components/Header.tsx
import { Github, Moon, Sun } from 'lucide-react';
import { useTheme } from './ui/theme-provider';

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <header className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
                <Github className="h-8 w-8" />
                <h1 className="text-3xl font-bold">GitHub Activity Dashboard</h1>
            </div>

            <div
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'
                    }`}
            >
                {isDark ? (
                    <Sun className="h-6 w-6 text-yellow-500 transition-all" />
                ) : (
                    <Moon className="h-6 w-6 text-blue-500 transition-all" />
                )}
                <span className="sr-only">Toggle theme</span>
            </div>
        </header>
    );
};

export default Header;
