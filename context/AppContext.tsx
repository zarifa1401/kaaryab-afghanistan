'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Opportunity } from '@/types';
import { mockOpportunities } from '@/data/mockData';

interface AppContextType {
  opportunities: Opportunity[];
  savedOpportunities: string[];
  addOpportunity: (opp: Opportunity) => void;
  updateOpportunity: (opp: Opportunity) => void;
  deleteOpportunity: (id: string) => void;
  toggleSaveOpportunity: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);

  useEffect(() => {
    const storedOpps = localStorage.getItem('kaaryab_opportunities');
    const storedSaved = localStorage.getItem('kaaryab_saved');
    
    setOpportunities(storedOpps ? JSON.parse(storedOpps) : mockOpportunities);
    setSavedOpportunities(storedSaved ? JSON.parse(storedSaved) : []);
  }, []);

  useEffect(() => {
    if (opportunities.length) localStorage.setItem('kaaryab_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('kaaryab_saved', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  const addOpportunity = (opp: Opportunity) => setOpportunities(prev => [opp, ...prev]);
  const updateOpportunity = (opp: Opportunity) => setOpportunities(prev => prev.map(o => o.id === opp.id ? opp : o));
  const deleteOpportunity = (id: string) => setOpportunities(prev => prev.filter(o => o.id !== id));
  
  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunities(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider value={{ opportunities, savedOpportunities, addOpportunity, updateOpportunity, deleteOpportunity, toggleSaveOpportunity }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};