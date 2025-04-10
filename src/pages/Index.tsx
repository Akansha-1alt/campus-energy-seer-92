
import React, { createContext, useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';

// Create a context for debug mode
export const DebugContext = createContext({
  debugMode: false,
  setDebugMode: (value: boolean) => {}
});

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
