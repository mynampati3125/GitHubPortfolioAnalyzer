import { PortfolioData } from '../types';
import { Globe, Zap, Smartphone, Mail, Briefcase, MessageSquare, Award } from 'lucide-react';

interface PortfolioAnalysisProps {
  data: PortfolioData;
}

export function PortfolioAnalysis({ data }: PortfolioAnalysisProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-slate-900">Portfolio Analysis</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mb-4 block"
          >
            {data.url}
          </a>

          <div className="space-y-3">
            <PortfolioMetric
              icon={<Zap className="w-4 h-4" />}
              label="Load Time"
              value={`${data.loadTime.toFixed(2)}s`}
              status={data.loadTime < 2 ? 'good' : data.loadTime < 3 ? 'average' : 'poor'}
            />
            <PortfolioMetric
              icon={<Award className="w-4 h-4" />}
              label="Design Quality"
              value={`${data.designQuality}%`}
              status={data.designQuality >= 80 ? 'good' : data.designQuality >= 60 ? 'average' : 'poor'}
            />
          </div>
        </div>

        <div className="space-y-3">
          <PortfolioFeature
            icon={<Globe className="w-4 h-4" />}
            label="Custom Domain"
            hasFeature={data.hasCustomDomain}
          />
          <PortfolioFeature
            icon={<Smartphone className="w-4 h-4" />}
            label="Responsive Design"
            hasFeature={data.isResponsive}
          />
          <PortfolioFeature
            icon={<Mail className="w-4 h-4" />}
            label="Contact Section"
            hasFeature={data.hasContact}
          />
          <PortfolioFeature
            icon={<Briefcase className="w-4 h-4" />}
            label="Project Showcase"
            hasFeature={data.hasProjects}
          />
          <PortfolioFeature
            icon={<MessageSquare className="w-4 h-4" />}
            label="Blog/Articles"
            hasFeature={data.hasBlog}
          />
        </div>
      </div>
    </div>
  );
}

function PortfolioMetric({
  icon,
  label,
  value,
  status
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status: 'good' | 'average' | 'poor';
}) {
  const statusColors = {
    good: 'text-green-600 bg-green-100',
    average: 'text-yellow-600 bg-yellow-100',
    poor: 'text-red-600 bg-red-100',
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
        {value}
      </span>
    </div>
  );
}

function PortfolioFeature({
  icon,
  label,
  hasFeature
}: {
  icon: React.ReactNode;
  label: string;
  hasFeature: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
        hasFeature ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
      }`}>
        {hasFeature ? '✓' : '✗'}
      </div>
      <div className="flex items-center gap-2 text-slate-700">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}
