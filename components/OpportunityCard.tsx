'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react';
import { Opportunity } from '@/types';
import { useApp } from '@/context/AppContext';
import { cn, getDaysUntilDeadline, isExpiringSoon } from '@/lib/utils';

export default function OpportunityCard({ opp }: { opp: Opportunity }) {
  const { savedOpportunities, toggleSaveOpportunity } = useApp();
  const isSaved = savedOpportunities.includes(opp.id);
  const daysLeft = getDaysUntilDeadline(opp.deadline);
  const expiring = isExpiringSoon(opp.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between h-full transition-shadow hover:shadow-xl"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
            {opp.category}
          </span>
          <button 
            onClick={() => toggleSaveOpportunity(opp.id)} 
            className="text-gray-400 hover:text-yellow-500 transition-colors" 
            aria-label="Save opportunity"
          >
            <Bookmark fill={isSaved ? 'currentColor' : 'none'} className={cn(isSaved && 'text-yellow-500')} size={20} />
          </button>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 transition-colors">
          <Link href={`/opportunities/${opp.id}`}>{opp.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{opp.organization}</p>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
          <span className="flex items-center gap-1.5"><Briefcase size={14} /> {opp.type}</span>
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {opp.location}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className={cn('flex items-center gap-2 text-sm font-medium', expiring ? 'text-red-500' : 'text-gray-500 dark:text-gray-400')}>
          <Clock size={16} />
          {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
          {expiring && daysLeft >= 0 && (
            <span className="ml-1 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide animate-pulse">
              Expiring Soon
            </span>
          )}
        </div>
        <Link href={opp.applyLink} target="_blank" className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
          Apply <ExternalLink size={14} />
        </Link>
      </div>
    </motion.div>
  );
}