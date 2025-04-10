
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, TerminalSquare, Database, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DebugPanelProps = {
  visible: boolean;
  applicationState: any;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ visible, applicationState }) => {
  const { toast } = useToast();
  
  if (!visible) return null;

  const copyToClipboard = (data: any) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "State data has been copied to your clipboard",
    });
  };

  const logToConsole = (data: any, label: string) => {
    console.log(`🔍 DEBUG [${label}]:`, data);
    toast({
      title: "Logged to console",
      description: `${label} data has been logged to the console`,
    });
  };
  
  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 shadow-lg border-energy-blue">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center">
            <TerminalSquare className="w-4 h-4 mr-2 text-energy-blue" />
            Developer Debug Panel
          </CardTitle>
          <Badge variant="outline" className="bg-energy-blue text-white">DEV</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 max-h-[50vh] overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <Cpu className="w-4 h-4 mr-2 text-energy-blue" />
              <h3 className="text-sm font-medium">Application State</h3>
            </div>
            <pre className="text-xs p-2 bg-gray-100 rounded overflow-x-auto">
              {JSON.stringify(applicationState, null, 2)}
            </pre>
            <div className="flex justify-end mt-1 space-x-2">
              <button 
                onClick={() => copyToClipboard(applicationState)}
                className="text-xs text-energy-blue hover:text-energy-teal flex items-center"
              >
                <Code className="w-3 h-3 mr-1" /> Copy JSON
              </button>
              <button 
                onClick={() => logToConsole(applicationState, 'Application State')}
                className="text-xs text-energy-blue hover:text-energy-teal flex items-center"
              >
                <TerminalSquare className="w-3 h-3 mr-1" /> Log to Console
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <Database className="w-4 h-4 mr-2 text-energy-blue" />
              <h3 className="text-sm font-medium">Performance Metrics</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-xs p-2 bg-gray-100 rounded">
                <span className="text-gray-500">Render Count:</span> 
                <span className="font-mono ml-1">1</span>
              </div>
              <div className="text-xs p-2 bg-gray-100 rounded">
                <span className="text-gray-500">Memory Usage:</span> 
                <span className="font-mono ml-1">
                  {Math.round(performance.memory?.usedJSHeapSize / 1048576 || 0)} MB
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DebugPanel;
