'use client';
import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import OpportunityCard from '@/components/OpportunityCard';
import SearchFilter from '@/components/SearchFilter';
import EmptyState from '@/components/EmptyState';

export default function OpportunitiesMain() {
  const { opportunities } = useApp();
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
    location: ''
  });

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesSearch = opp.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                            opp.organization.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === 'All' || opp.category === filters.category;
      const matchesType = filters.type === 'All' || opp.type === filters.type;
      const matchesLocation = filters.location === '' || 
                              opp.location.toLowerCase().includes(filters.location.toLowerCase());

      return matchesSearch && matchesCategory && matchesType && matchesLocation;
    });
  }, [opportunities, filters]);

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Opportunities</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Browse jobs, internships, and scholarships.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar / Filters */}
        <aside className="lg:col-span-1">
          <SearchFilter filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredOpportunities.length}</span> results
          </div>

          {filteredOpportunities.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.map(opp => (
                <OpportunityCard key={opp.id} opp={opp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}