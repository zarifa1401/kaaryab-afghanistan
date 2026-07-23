'use client';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import OpportunityCard from '@/components/OpportunityCard';
import EmptyState from '@/components/EmptyState';

export default function SavedOpportunitiesMain() {
  const { opportunities, savedOpportunities } = useApp();

  // Filter to get the full objects for the saved IDs
  const savedItems = opportunities.filter(opp => savedOpportunities.includes(opp.id));

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Opportunities</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Opportunities you ve bookmarked for later.</p>
      </div>

      {savedItems.length === 0 ? (
        <EmptyState 
          icon={Bookmark} 
          title="No saved opportunities yet" 
          description="Click the bookmark icon on any opportunity to save it here for easy access later." 
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {savedItems.map(opp => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </motion.div>
      )}
    </div>
  );
}