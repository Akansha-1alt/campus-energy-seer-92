
import React from 'react';
import { Button } from "@/components/ui/button";
import { BellIcon, Settings } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b bg-white">
      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-energy-blue to-energy-teal items-center justify-center">
          <span className="text-white font-bold text-xl">ES</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold gradient-heading">Campus Energy Seer</h1>
          <p className="text-sm text-muted-foreground">Energy Consumption Forecasting Platform</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button className="hidden sm:flex">Dashboard</Button>
      </div>
    </header>
  );
};

export default Header;
