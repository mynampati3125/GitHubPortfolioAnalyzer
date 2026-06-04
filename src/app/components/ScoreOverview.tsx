import { AnalysisScore } from '../types';
import { TrendingUp, Code, Layers, Activity } from 'lucide-react';

interface ScoreOverviewProps {
  scores: AnalysisScore;
  hasGithub: boolean;
  hasPortfolio: boolean;
}

export function ScoreOverview({ scores, hasGithub, hasPortfolio }: ScoreOverviewProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-auto-fit gap-6">
      <ScoreCard
        title="Overall Score"
        score={scores.overall}
        icon={<TrendingUp className="w-5 h-5" />}
        color="blue"
        large
      />
      {hasGithub && (
        <>
          <ScoreCard
            title="Consistency"
            score={scores.consistency}
            icon={<Activity className="w-5 h-5" />}
            color="green"
          />
          <ScoreCard
            title="Quality"
            score={scores.quality}
            icon={<Code className="w-5 h-5" />}
            color="purple"
          />
          <ScoreCard
            title="Diversity"
            score={scores.diversity}
            icon={<Layers className="w-5 h-5" />}
            color="orange"
          />
          <ScoreCard
            title="Activity"
            score={scores.activity}
            icon={<Activity className="w-5 h-5" />}
            color="pink"
          />
        </>
      )}
      {hasPortfolio && scores.portfolio !== undefined && (
        <ScoreCard
          title="Portfolio"
          score={scores.portfolio}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
      )}
    </div>
  );
}

interface ScoreCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink';
  large?: boolean;
}

function ScoreCard({ title, score, icon, color, large }: ScoreCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600',
  };

  const ringClasses = {
    blue: 'stroke-blue-600',
    green: 'stroke-green-600',
    purple: 'stroke-purple-600',
    orange: 'stroke-orange-600',
    pink: 'stroke-pink-600',
  };

  const percentage = Math.min(score, 100);
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${large ? 'lg:row-span-1' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="relative w-20 h-20">
          <svg className="transform -rotate-90 w-20 h-20">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-slate-200"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={ringClasses[color]}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-slate-900">{Math.round(score)}</span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-medium text-slate-600">{title}</h3>
    </div>
  );
}
