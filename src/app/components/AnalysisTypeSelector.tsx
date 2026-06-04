import { Github, Globe, Layers } from 'lucide-react';

export type AnalysisType = 'github' | 'portfolio' | 'both';

interface AnalysisTypeSelectorProps {
  onSelect: (type: AnalysisType) => void;
}

export function AnalysisTypeSelector({ onSelect }: AnalysisTypeSelectorProps) {
  return (
    <div className="size-full flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            AI-Based Portfolio & GitHub Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get AI-powered insights to improve your profile and boost your placement readiness
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 text-center mb-8">
          What would you like to analyze?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnalysisTypeCard
            icon={<Github className="w-12 h-12" />}
            title="GitHub Only"
            description="Analyze your GitHub profile, repositories, coding consistency, and tech stack"
            color="blue"
            onClick={() => onSelect('github')}
          />
          <AnalysisTypeCard
            icon={<Globe className="w-12 h-12" />}
            title="Portfolio Only"
            description="Analyze your portfolio website design, performance, and professional features"
            color="purple"
            onClick={() => onSelect('portfolio')}
          />
          <AnalysisTypeCard
            icon={<Layers className="w-12 h-12" />}
            title="Both"
            description="Get comprehensive analysis of both your GitHub and portfolio for complete insights"
            color="green"
            onClick={() => onSelect('both')}
          />
        </div>
      </div>
    </div>
  );
}

interface AnalysisTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'green';
  onClick: () => void;
}

function AnalysisTypeCard({ icon, title, description, color, onClick }: AnalysisTypeCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-300',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200 border-purple-300',
    green: 'bg-green-100 text-green-600 hover:bg-green-200 border-green-300',
  };

  const buttonColors = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    green: 'bg-green-600 hover:bg-green-700',
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-slate-200 transition-all">
      <div className={`w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-3 text-center">{title}</h3>
      <p className="text-slate-600 text-center mb-6 min-h-[60px]">{description}</p>
      <button
        onClick={onClick}
        className={`w-full py-3 px-6 text-white rounded-lg font-medium transition-colors ${buttonColors[color]}`}
      >
        Select
      </button>
    </div>
  );
}
