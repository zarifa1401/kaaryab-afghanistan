'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Briefcase, GraduationCap, Users, Laptop, Clock, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { isExpiringSoon } from '@/lib/utils';

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'];

export default function DashboardMain() {
  const { opportunities } = useApp();

  const stats = useMemo(() => {
    const total = opportunities.length;
    const jobs = opportunities.filter(o => o.category === 'Job').length;
    const scholarships = opportunities.filter(o => o.category === 'Scholarship').length;
    const internships = opportunities.filter(o => o.category === 'Internship').length;
    const remote = opportunities.filter(o => o.type === 'Remote').length;
    const expiringSoon = opportunities.filter(o => isExpiringSoon(o.deadline)).length;

    return { total, jobs, scholarships, internships, remote, expiringSoon };
  }, [opportunities]);

  const chartData = useMemo(() => {
    const categories = ['Job', 'Internship', 'Scholarship', 'Online course', 'Remote work', 'Training program', 'Volunteer work'];
    return categories
      .map(cat => ({
        name: cat,
        value: opportunities.filter(o => o.category === cat).length
      }))
      .filter(item => item.value > 0); // Only show categories that have data
  }, [opportunities]);

  const statCards = [
    { label: 'Total Opportunities', value: stats.total, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' },
    { label: 'Jobs', value: stats.jobs, icon: Briefcase, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/30' },
    { label: 'Scholarships', value: stats.scholarships, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/30' },
    { label: 'Internships', value: stats.internships, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
    { label: 'Remote Work', value: stats.remote, icon: Laptop, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-900/30' },
    { label: 'Expiring Soon', value: stats.expiringSoon, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/30' },
  ];

  // Assuming new opportunities are added to the beginning of the array
  const recentOpportunities = opportunities.slice(0, 5);

  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of platform statistics and recent activity.</p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className={`p-2 rounded-lg w-fit ${stat.bg}`}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Opportunities by Category</h2>
          <div className="flex-grow h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.9)', 
                      border: 'none', 
                      borderRadius: '8px', 
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data available</div>
            )}
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
            {chartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></span>
                <span className="text-gray-600 dark:text-gray-300">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Submissions</h2>
            <Link href="/opportunities" className="text-sm text-blue-600 font-medium hover:underline flex items-center">
              View All <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="pb-3 pr-4 font-medium">Title</th>
                  <th className="pb-3 pr-4 font-medium">Organization</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 font-medium">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOpportunities.map(opp => (
                  <tr key={opp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">
                      <Link href={`/opportunities/${opp.id}`} className="hover:text-blue-600">
                        {opp.title.length > 25 ? `${opp.title.substring(0, 25)}...` : opp.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{opp.organization}</td>
                    <td className="py-3 pr-4 text-gray-600 dark:text-gray-300">{opp.category}</td>
                    <td className="py-3 flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                      <Clock size={14} className="text-gray-400" />
                      {new Date(opp.deadline).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}