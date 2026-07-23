'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Briefcase, GraduationCap, Laptop, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import OpportunityCard from '@/components/OpportunityCard';

export default function KaryabMain() {
  const { opportunities } = useApp();
  const featuredOpportunities = opportunities.filter(o => o.isFeatured).slice(0, 3);

  const categories = [
    { name: 'Jobs', icon: Briefcase, count: opportunities.filter(o => o.category === 'Job').length },
    { name: 'Scholarships', icon: GraduationCap, count: opportunities.filter(o => o.category === 'Scholarship').length },
    { name: 'Remote Work', icon: Laptop, count: opportunities.filter(o => o.category === 'Remote work').length },
    { name: 'Internships', icon: Users, count: opportunities.filter(o => o.category === 'Internship').length },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="text-center pt-10 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Find Your Next <span className="text-blue-600">Opportunity</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            KaarYab Afghanistan connects youth with jobs, internships, scholarships, and remote work in one place.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/opportunities" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              <Search size={20} className="mr-2" /> Browse Opportunities
            </Link>
            <Link 
              href="/add-opportunity" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Post an Opportunity <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl mb-4">
                <cat.icon className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{cat.count} Available</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Opportunities */}
      {featuredOpportunities.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Featured Opportunities</h2>
            <Link href="/opportunities" className="text-sm font-semibold text-blue-600 hover:underline flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOpportunities.map(opp => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}