import { Repository } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Code2 } from 'lucide-react';

interface TechStackAnalysisProps {
  repos: Repository[];
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1', '#14b8a6'];

export function TechStackAnalysis({ repos }: TechStackAnalysisProps) {
  const languageData = calculateLanguageDistribution(repos);
  const totalRepos = repos.length;
  const reposWithLanguage = repos.filter(r => r.language).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-slate-900">Tech Stack Distribution</h2>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
            {totalRepos} total repos
          </span>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium">
            {reposWithLanguage} with language data
          </span>
        </div>
      </div>
      {languageData.length > 0 ? (
        <ResponsiveContainer width="100%" height={420}>
          <PieChart>
            <Pie
              data={languageData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={false}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {languageData.map((entry, index) => (
                <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [`${value} repositories`, name]}
              contentStyle={{
                backgroundColor: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            />
            <Legend
              verticalAlign="bottom"
              height={80}
              iconType="circle"
              iconSize={10}
              formatter={(value: string) => {
                const item = languageData.find(d => d.name === value);
                return (
                  <span style={{ color: '#334155', fontSize: '13px' }}>
                    {value} <span style={{ color: '#64748b' }}>({item?.value || 0} repos)</span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[420px] flex items-center justify-center text-slate-500">
          No language data available
        </div>
      )}
    </div>
  );
}

function calculateLanguageDistribution(repos: Repository[]) {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  return Object.entries(languageCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);
}
