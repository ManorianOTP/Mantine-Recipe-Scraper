'use client';

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Recipe } from '../types';

interface HtmlDataContextType {
  recipeData: Recipe | null;
  setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
  index: number | null;
  setIndex: React.Dispatch<React.SetStateAction<number | null>>;
  updateRecipeProperty: (property: keyof Recipe, value: any) => void;
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
  // Try to get the initial data and index from sessionStorage (if any)
  const [recipeData, setRecipeData] = useState<Recipe | null>(() => {
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('recipeData');
      return savedData ? JSON.parse(savedData) : null;
    }
    return null;
  });

  const [index, setIndex] = useState<number | null>(() => {
    if (typeof window !== 'undefined') {
      const savedIndex = sessionStorage.getItem('recipeIndex');
      return savedIndex ? parseInt(savedIndex, 10) : null;
    }
    return null;
  });

  const updateRecipeProperty = (property: keyof Recipe, value: any) => {
    setRecipeData((prevRecipeData) => {
      if (prevRecipeData) {
        return { ...prevRecipeData, [property]: value };
      }
      return null;
    });
  };

  // Persist the recipeData to sessionStorage whenever it changes
  useEffect(() => {
    if (recipeData !== null) {
      sessionStorage.setItem('recipeData', JSON.stringify(recipeData));
    }
  }, [recipeData]);

  // Persist the index to sessionStorage whenever it changes
  useEffect(() => {
    if (index !== null) {
      sessionStorage.setItem('recipeIndex', index.toString());
    }
  }, [index]);

  return (
    <HtmlDataContext.Provider value={{ recipeData, setRecipeData, index, setIndex, updateRecipeProperty }}>
      {children}
    </HtmlDataContext.Provider>
  );
};