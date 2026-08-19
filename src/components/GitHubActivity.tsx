import React, { useState, useEffect } from 'react';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../portfolioConfig';

const GithubIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://api.github.com/users/${PORTFOLIO_CONFIG.githubUsername}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories. Rate limits may apply.');
        }

        const data: Repo[] = await response.json();
        // Sort by stargazers first, then by date updated
        const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted);
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (lang: string) => {
    switch (lang?.toLowerCase()) {
      case 'javascript':
        return 'bg-yellow-400';
      case 'typescript':
        return 'bg-blue-400';
      case 'python':
        return 'bg-blue-500';
      case 'java':
        return 'bg-red-500';
      case 'html':
        return 'bg-orange-500';
      case 'css':
        return 'bg-indigo-500';
      default:
        return 'bg-muted-grey';
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Subtle interior glow spot */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(235,74,66,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <GithubIcon className="text-primary-red" />
          <h4 className="text-base font-bold text-fdf3f2">
            Active Developer Repositories
          </h4>
        </div>
        <a
          href={PORTFOLIO_CONFIG.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-wider text-primary-red hover:underline flex items-center gap-1.5 select-none"
        >
          View Direct Profile
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="glass-card rounded-2xl p-4 h-36 flex flex-col justify-between animate-pulse"
            >
              <div>
                <div className="h-4 bg-white/10 rounded-full w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded-full w-5/6 mb-1" />
                <div className="h-3 bg-white/5 rounded-full w-2/3" />
              </div>
              <div className="h-3 bg-white/5 rounded-full w-1/4" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-6 relative z-10">
          <BookOpen className="w-6 h-6 text-muted-grey mx-auto mb-3 opacity-40" />
          <p className="font-mono text-xs text-muted-grey">
            Unable to load real-time repositories. Direct profile at:{' '}
            <a
              href={PORTFOLIO_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-red underline"
            >
              github.com/{PORTFOLIO_CONFIG.githubUsername}
            </a>
          </p>
        </div>
      ) : repos.length === 0 ? (
        <div className="text-center py-6 text-muted-grey font-mono text-xs relative z-10">
          No public repositories found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          {repos.slice(0, 3).map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card glass-card-hover p-4 rounded-xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <h5 className="font-bold text-fdf3f2 group-hover:text-primary-red transition-colors text-sm truncate mb-2">
                  {repo.name}
                </h5>
                <p className="text-xs text-muted-grey line-clamp-2 leading-relaxed mb-3">
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[10px] text-muted-grey">
                {repo.language ? (
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                    <span className="font-mono">{repo.language}</span>
                  </div>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-primary-red/80" />
                    <span className="font-mono">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3 text-muted-grey/80" />
                    <span className="font-mono">{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
export default GitHubActivity;
