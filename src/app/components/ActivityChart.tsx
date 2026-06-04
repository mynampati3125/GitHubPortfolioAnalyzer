import { Repository } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';

interface ActivityChartProps {
  repos: Repository[];
}

export function ActivityChart({ repos }: ActivityChartProps) {
  const monthlyActivity = calculateMonthlyActivity(repos);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-slate-900">Activity Timeline</h2>
      </div>
      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={monthlyActivity}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <YAxis
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#cbd5e1' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="repos" fill="#3b82f6" radius={[4, 4, 0, 0]} key="repos-bar" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function calculateMonthlyActivity(repos: Repository[]) {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
      key: `${date.getFullYear()}-${date.getMonth()}`,
      repos: 0,
    };
  });

  repos.forEach((repo) => {
    const updatedDate = new Date(repo.updated_at);
    const monthData = last6Months.find(
      (m) => m.monthIndex === updatedDate.getMonth() && m.year === updatedDate.getFullYear()
    );
    if (monthData) {
      monthData.repos++;
    }
  });

  return last6Months;
}
