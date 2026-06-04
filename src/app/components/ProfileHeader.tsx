import { GitHubData } from '../types';
import { Github, Users, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  data: GitHubData;
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  const memberSince = new Date(data.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-start gap-6">
        <img
          src={data.avatar}
          alt={data.username}
          className="w-24 h-24 rounded-full border-4 border-blue-100"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">
            {data.name || data.username}
          </h1>
          <div className="flex items-center gap-2 text-slate-600 mb-3">
            <Github className="w-4 h-4" />
            <span>@{data.username}</span>
          </div>
          {data.bio && (
            <p className="text-slate-700 mb-4">{data.bio}</p>
          )}
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-900">{data.followers}</span>
              <span className="text-slate-600">followers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">{data.following}</span>
              <span className="text-slate-600">following</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">Joined {memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
