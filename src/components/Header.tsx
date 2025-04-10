
import React from 'react';
import { Button } from "@/components/ui/button";
import { BellIcon, Settings, Bug } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useDebug } from '@/pages/Index';

const Header = () => {
  const { toast } = useToast();
  const { debugMode, setDebugMode } = useDebug();
  
  const toggleDebugMode = () => {
    const newDebugMode = !debugMode;
    setDebugMode(newDebugMode);
    
    toast({
      title: newDebugMode ? "Debug mode enabled" : "Debug mode disabled",
      description: newDebugMode 
        ? "Developer debugging tools are now visible" 
        : "Developer debugging tools are now hidden",
    });
  };
  
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>User Settings</DropdownMenuItem>
            <DropdownMenuItem>Appearance</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleDebugMode} className="flex items-center justify-between">
              Developer Mode
              <Bug className={`h-4 w-4 ml-2 ${debugMode ? 'text-energy-blue' : 'text-muted-foreground'}`} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button className="hidden sm:flex">Dashboard</Button>
      </div>
    </header>
  );
};

export default Header;
