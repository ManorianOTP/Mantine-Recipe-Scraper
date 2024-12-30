'use client';

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Recipe } from '../types';

interface HtmlDataContextType {
  recipeData: Recipe | null;
  setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const HtmlDataContext = createContext<HtmlDataContextType | undefined>(undefined);

export const useHtmlData = (): HtmlDataContextType => {
  const context = useContext(HtmlDataContext);
  if (!context) {
    throw new Error('useHtmlData must be used within an HtmlDataProvider');
  }
  return context;
};

interface HtmlDataProviderProps {
  children: ReactNode;
}

export const HtmlDataProvider: React.FC<HtmlDataProviderProps> = ({ children }) => {
  // Try to get the initial data from sessionStorage (if any)
  const [recipeData, setRecipeData] = useState<Recipe | null>(() => {
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('recipeData');
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
  });

  // Persist the recipeData to sessionStorage whenever it changes
  useEffect(() => {
    if (recipeData !== null) {
      sessionStorage.setItem('recipeData', JSON.stringify(recipeData));
    }
  }, [recipeData]);

  return (
    <HtmlDataContext.Provider value={{ recipeData, setRecipeData }}>
      {children}
    </HtmlDataContext.Provider>
  );
};
