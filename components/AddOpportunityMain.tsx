'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { opportunitySchema, OpportunityFormValues } from '@/lib/schema';
import { Category, OpportunityType } from '@/types';

export default function AddOpportunityMain() {
  const router = useRouter();
  const { addOpportunity } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: '',
      organization: '',
      category: 'Job',
      location: '',
      type: 'Remote',
      deadline: '',
      description: '',
      requirements: '',
      applyLink: '',
      tags: '',
    },
  });

  const onSubmit = (data: OpportunityFormValues) => {
    // Transform string inputs to arrays
    const newOpportunity = {
      id: crypto.randomUUID(), // Generate unique ID
      title: data.title,
      organization: data.organization,
      category: data.category as Category,
      location: data.location,
      type: data.type as OpportunityType,
      deadline: data.deadline,
      description: data.description,
      requirements: data.requirements.split(',').map(item => item.trim()).filter(Boolean),
      applyLink: data.applyLink,
      tags: data.tags ? data.tags.split(',').map(item => item.trim()).filter(Boolean) : [],
      isFeatured: false, // New opportunities are not featured by default
    };

    addOpportunity(newOpportunity);
    router.push('/opportunities');
  };

  // Reusable input classes
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-8 max-w-3xl mx-auto"
    >
      <Link href="/opportunities" className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft size={16} className="mr-2" /> Back to all opportunities
      </Link>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Post a New Opportunity</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Fill out the form below to share an opportunity with the community.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title & Organization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Title</label>
              <input {...register('title')} placeholder="e.g. Junior Frontend Developer" className={inputClass} />
              {errors.title && <p className={errorClass}>{errors.title.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Organization</label>
              <input {...register('organization')} placeholder="e.g. Kabul Tech" className={inputClass} />
              {errors.organization && <p className={errorClass}>{errors.organization.message}</p>}
            </div>
          </div>

          {/* Category & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Category</label>
              <select {...register('category')} className={inputClass}>
                <option value="Job">Job</option>
                <option value="Internship">Internship</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Online course">Online course</option>
                <option value="Remote work">Remote work</option>
                <option value="Training program">Training program</option>
                <option value="Volunteer work">Volunteer work</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Work Type</label>
              <select {...register('type')} className={inputClass}>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Location & Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Location</label>
              <input {...register('location')} placeholder="e.g. Kabul or Online" className={inputClass} />
              {errors.location && <p className={errorClass}>{errors.location.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Deadline</label>
              <input type="date" {...register('deadline')} className={inputClass} />
              {errors.deadline && <p className={errorClass}>{errors.deadline.message}</p>}
            </div>
          </div>

          {/* Apply Link */}
          <div>
            <label className={labelClass}>Apply Link</label>
            <input {...register('applyLink')} placeholder="https://example.com/apply" className={inputClass} />
            {errors.applyLink && <p className={errorClass}>{errors.applyLink.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea {...register('description')} rows={5} placeholder="Describe the opportunity..." className={inputClass}></textarea>
            {errors.description && <p className={errorClass}>{errors.description.message}</p>}
          </div>

          {/* Requirements & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Requirements (comma-separated)</label>
              <input {...register('requirements')} placeholder="React, HTML, CSS" className={inputClass} />
              {errors.requirements && <p className={errorClass}>{errors.requirements.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Tags (comma-separated, optional)</label>
              <input {...register('tags')} placeholder="Tech, Remote, Junior" className={inputClass} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="mr-2" /> {isSubmitting ? 'Submitting...' : 'Submit Opportunity'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}