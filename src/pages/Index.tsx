
import React, { createContext, useState, useContext } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

// Create a context for debug mode with proper TypeScript typing
export interface DebugContextType {
  debugMode: boolean;
  setDebugMode: (value: boolean) => void;
}

export const DebugContext = createContext<DebugContextType>({
  debugMode: false,
  setDebugMode: () => {}
});

// Custom hook for accessing the debug context
export const useDebug = () => useContext(DebugContext);

const Index = () => {
  const [debugMode, setDebugMode] = useState(false);
  
  return (
    <DebugContext.Provider value={{ debugMode, setDebugMode }}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Dashboard />
      </div>
    </DebugContext.Provider>
  );
};

export default Index;
