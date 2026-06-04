import { useState } from 'react';
import { Github, Sparkles, TrendingUp, Code2, Award, ArrowLeft } from 'lucide-react';
import { AnalysisType } from './AnalysisTypeSelector';

interface AnalyzerLandingProps {
  onAnalyze: (username?: string, portfolioUrl?: string) => void;
  isAnalyzing: boolean;
  analysisType: AnalysisType;
  onBack?: () => void;
}

export function AnalyzerLanding({ onAnalyze, isAnalyzing, analysisType, onBack }: AnalyzerLandingProps) {
  const [username, setUsername] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  const showGithubInput = analysisType === 'github' || analysisType === 'both';
  const showPortfolioInput = analysisType === 'portfolio' || analysisType === 'both';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (analysisType === 'github' && username.trim()) {
      onAnalyze(username.trim(), undefined);
    } else if (analysisType === 'portfolio' && portfolioUrl.trim()) {
      onAnalyze(undefined, portfolioUrl.trim());
    } else if (analysisType === 'both' && username.trim() && portfolioUrl.trim()) {
      onAnalyze(username.trim(), portfolioUrl.trim());
    }
  };

  const getTitle = () => {
    switch (analysisType) {
      case 'github': return 'Analyze Your GitHub Profile';
      case 'portfolio': return 'Analyze Your Portfolio Website';
      case 'both': return 'Analyze GitHub & Portfolio';
    }
  };

  const getDescription = () => {
    switch (analysisType) {
      case 'github': return 'Enter your GitHub username to get insights on your coding activity, tech stack, and placement readiness';
      case 'portfolio': return 'Enter your portfolio URL to analyze design, performance, and professional features';
      case 'both': return 'Get comprehensive analysis of both your GitHub and portfolio for complete insights';
    }
  };

  return (
    <div className="size-full flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-8 px-6 py-3 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 rounded-lg transition-all shadow-lg hover:shadow-xl border-2 border-slate-200 hover:border-blue-300 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Selection</span>
          </button>
        )}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Github className="w-12 h-12 text-slate-900" />
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            {getTitle()}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {getDescription()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            {showGithubInput && (
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                  GitHub Username *
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., octocat"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isAnalyzing}
                  required
                />
              </div>
            )}

            {showPortfolioInput && (
              <div className="mb-6">
                <label htmlFor="portfolio" className="block text-sm font-medium text-slate-700 mb-2">
                  Portfolio URL *
                </label>
                <input
                  id="portfolio"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://yourportfolio.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isAnalyzing}
                  required
                />
                <p className="text-xs text-slate-500 mt-2">
                  Note: Portfolio analysis provides basic insights. For detailed analysis, manual review is recommended.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
            </button>
          </div>
        </form>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Coding Consistency"
            description="Track your commit patterns and development activity over time"
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="Tech Stack Diversity"
            description="Analyze the variety of technologies and languages you use"
          />
          <FeatureCard
            icon={<Award className="w-6 h-6" />}
            title="Portfolio Quality"
            description="Get AI-powered insights to improve your professional profile"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
