'use client';
import { Search } from 'lucide-react';
import { Category, OpportunityType } from '@/types';

interface FilterState {
  search: string;
  category: string;
  type: string;
  location: string;
}

interface SearchFilterProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function SearchFilter({ filters, setFilters }: SearchFilterProps) {
  const categories: (Category | 'All')[] = ['All', 'Job', 'Internship', 'Scholarship', 'Online course', 'Remote work', 'Training program', 'Volunteer work'];
  const types: (OpportunityType | 'All')[] = ['All', 'Remote', 'On-site', 'Hybrid'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-6 sticky top-24">
      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Title or keyword..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Type Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Type</label>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Location Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
        <input
          type="text"
          placeholder="e.g. Kabul or Online"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        onClick={() => setFilters({ search: '', category: 'All', type: 'All', location: '' })}
        className="w-full py-2 text-sm font-semibold text-blue-600 hover:underline"
      >
        Clear Filters
      </button>
    </div>
  );
}