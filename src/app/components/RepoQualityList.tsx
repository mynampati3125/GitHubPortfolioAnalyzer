import { Repository } from '../types';
import { Star, GitFork, ExternalLink } from 'lucide-react';

interface RepoQualityListProps {
  repos: Repository[];
}

export function RepoQualityList({ repos }: RepoQualityListProps) {
  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Top Repositories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: Repository }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-slate-200 rounded-lg p-4 hover:bg-slate-900 hover:border-slate-900 hover:shadow-lg transition-all group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-slate-900 group-hover:text-white transition-colors truncate">
          {repo.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white flex-shrink-0 ml-2" />
      </div>
      {repo.description && (
        <p className="text-sm text-slate-600 group-hover:text-slate-300 mb-3 line-clamp-2">{repo.description}</p>
      )}
      <div className="flex items-center gap-4 text-sm text-slate-500 group-hover:text-slate-300">
        {repo.language && (
          <span className="flex items-center gap-1 group-hover:text-white">
            <span className="w-3 h-3 rounded-full bg-blue-500 group-hover:bg-blue-400"></span>
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 group-hover:text-white">
          <Star className="w-4 h-4" />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 group-hover:text-white">
          <GitFork className="w-4 h-4" />
          {repo.forks_count}
        </span>
      </div>
    </a>
  );
}
