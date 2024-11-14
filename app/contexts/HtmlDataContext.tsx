"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Recipe } from "../types"; // Adjust the path if necessary

interface HtmlDataContextType {
  recipeData: Recipe | null;
  setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

const HtmlDataContext = createContext<HtmlDataContextType | undefined>(
  undefined
);

export const useHtmlData = (): HtmlDataContextType => {
  const context = useContext(HtmlDataContext);
  if (!context) {
    throw new Error("useHtmlData must be used within an HtmlDataProvider");
  }
  return context;
};

interface HtmlDataProviderProps {
  children: ReactNode;
}

export const HtmlDataProvider: React.FC<HtmlDataProviderProps> = ({
  children,
}) => {
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  return (
    <HtmlDataContext.Provider value={{ recipeData, setRecipeData }}>
      {children}
    </HtmlDataContext.Provider>
  );
};
