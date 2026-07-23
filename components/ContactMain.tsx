'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { contactSchema, ContactFormValues } from '@/lib/schema';

export default function ContactMain() {
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call / Email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", data);
    setIsSent(true);
    reset();
    setTimeout(() => setIsSent(false), 4000); // Hide success message after 4s
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-8 max-w-5xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Get in Touch</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Have questions or suggestions? Drop us a message.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <Mail className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">support@kaaryab.af</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <Phone className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">+93 700 000 000</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
              <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Kabul, Afghanistan</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 shadow-sm">
          {isSent && (
            <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
              <CheckCircle2 size={20} />
              <p className="text-sm font-medium">Message sent successfully! We will get back to you soon.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Name</label>
                <input {...register('name')} placeholder="Your full name" className={inputClass} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input {...register('email')} placeholder="you@example.com" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Message</label>
              <textarea {...register('message')} rows={6} placeholder="How can we help you?" className={inputClass}></textarea>
              {errors.message && <p className={errorClass}>{errors.message.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="mr-2" /> {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}