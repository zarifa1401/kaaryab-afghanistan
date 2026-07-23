import { LucideIcon, SearchX } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = SearchX, 
  title = "No opportunities found", 
  description = "Try adjusting your search or filters to find what you are looking for." 
}: { 
  icon?: LucideIcon; 
  title?: string; 
  description?: string; 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-4">
        <Icon className="text-gray-400 dark:text-gray-500" size={32} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">{description}</p>
    </div>
  );
}