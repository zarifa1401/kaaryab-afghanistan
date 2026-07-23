'use client';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

export default function AboutMain() {
  const features = [
    { icon: Target, title: "Our Mission", description: "To empower Afghan youth by providing a centralized platform to discover jobs, scholarships, and skill-building opportunities." },
    { icon: Lightbulb, title: "The Problem", description: "Information is often scattered across social media and groups. We bring it all into one easy-to-use, accessible platform." },
    { icon: Users, title: "Who We Serve", description: "Students, fresh graduates, job seekers, women looking for remote work, and organizations wanting to share opportunities." },
  ];

  return (
    <div className="py-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">About KaarYab</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          KaarYab Afghanistan is a modern opportunity finder platform that helps Afghan youth discover jobs, internships, scholarships, remote work, and skill-building opportunities in one place.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {features.map((feat, idx) => (
          <motion.div 
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl text-center"
          >
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl w-fit mx-auto mb-4">
              <feat.icon className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feat.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{feat.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
        <Heart className="mx-auto mb-4" size={32} />
        <h2 className="text-2xl font-bold mb-2">Built for the Community</h2>
        <p className="text-blue-100 max-w-xl mx-auto">
          This platform is an educational project designed to solve real-world problems. Together, we can build a brighter future for Afghanistan.
        </p>
      </div>
    </div>
  );
}