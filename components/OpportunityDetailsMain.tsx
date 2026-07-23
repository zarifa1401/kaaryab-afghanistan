'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bookmark, ArrowLeft, MapPin, Briefcase, Clock, ExternalLink, CheckCircle2, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn, getDaysUntilDeadline, isExpiringSoon } from '@/lib/utils';
import EmptyState from '@/components/EmptyState';
import { FileQuestion } from 'lucide-react';

export default function OpportunityDetailsMain() {
  const params = useParams();
  const router = useRouter();
  const { opportunities, savedOpportunities, toggleSaveOpportunity } = useApp();
  
  const id = params.id as string;
  const opp = opportunities.find(o => o.id === id);

  // Loading state (Context loads from local storage on mount)
  if (opportunities.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400 animate-pulse">
        Loading opportunity...
      </div>
    );
  }

  // Not Found state
  if (!opp) {
    return (
      <div className="py-20">
        <EmptyState 
          icon={FileQuestion} 
          title="Opportunity Not Found" 
          description="The opportunity you are looking for might have been deleted or does not exist." 
        />
        <div className="text-center mt-6">
          <button onClick={() => router.push('/opportunities')} className="text-blue-600 font-semibold hover:underline">
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  const isSaved = savedOpportunities.includes(opp.id);
  const daysLeft = getDaysUntilDeadline(opp.deadline);
  const expiring = isExpiringSoon(opp.deadline);
  const isExpired = daysLeft < 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-8 max-w-5xl mx-auto"
    >
      <Link href="/opportunities" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to all opportunities
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8">
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
              {opp.category}
            </span>
            <button 
              onClick={() => toggleSaveOpportunity(opp.id)} 
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Bookmark fill={isSaved ? 'currentColor' : 'none'} className={cn(isSaved ? 'text-yellow-500' : 'text-gray-400')} size={18} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{opp.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center gap-2 mb-8">
            <Building2 size={18} /> {opp.organization}
          </p>

          {/* Tags */}
          {opp.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {opp.tags.map(tag => (
                <span key={tag} className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 whitespace-pre-line">{opp.description}</p>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Requirements</h2>
            <ul className="space-y-2">
              {opp.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                  <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={18} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 sticky top-24">
            <div className={cn(
              "flex items-center gap-3 p-4 rounded-xl mb-6", 
              isExpired ? "bg-gray-100 dark:bg-gray-800" : expiring ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"
            )}>
              <Clock className={cn(isExpired ? "text-gray-400" : expiring ? "text-red-500" : "text-green-500")} size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
                <p className={cn("font-bold", isExpired ? "text-gray-500" : expiring ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white")}>
                  {isExpired ? 'Expired' : `${daysLeft} days left`}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm border-t border-gray-100 dark:border-gray-800 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><MapPin size={16} /> Location</span>
                <span className="font-medium text-gray-900 dark:text-white">{opp.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Briefcase size={16} /> Type</span>
                <span className="font-medium text-gray-900 dark:text-white">{opp.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2"><Clock size={16} /> Due Date</span>
                <span className="font-medium text-gray-900 dark:text-white">{new Date(opp.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <a 
              href={opp.applyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "mt-6 w-full inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-colors",
                isExpired 
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              )}
            >
              Apply Now <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}