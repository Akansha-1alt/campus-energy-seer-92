
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EnergySavingRecommendation } from '@/data/mockData';
import { DollarSign, Clock, ArrowRight } from "lucide-react";

type RecommendationsPanelProps = {
  recommendations: EnergySavingRecommendation[];
};

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ recommendations }) => {
  const difficultyColors = {
    'Easy': 'bg-energy-green text-white',
    'Medium': 'bg-energy-yellow text-black',
    'Hard': 'bg-energy-red text-white',
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Energy Saving Recommendations</CardTitle>
        <CardDescription>
          Potential improvements to reduce energy consumption
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden border-l-4 border-l-energy-teal">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <Badge className={`${difficultyColors[rec.difficulty]}`}>
                    {rec.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {rec.description}
                </p>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Potential Energy Savings</span>
                    <div className="flex items-center mt-1">
                      <div className="text-lg font-bold">{rec.potentialSavings.toLocaleString()}</div>
                      <span className="ml-1 text-energy-gray">&nbsp;kWh/year</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Estimated Cost</span>
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4" />
                      <div className="text-lg font-bold">{rec.estimatedCost.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Payback Period</span>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4" />
                      <div className="text-lg font-bold">{rec.paybackPeriod}</div>
                      <span className="ml-1 text-energy-gray">&nbsp;months</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm">
                    <span>Return on Investment</span>
                    <span className="font-medium">
                      {Math.round(100 * (rec.potentialSavings * 0.1) / rec.estimatedCost)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, Math.round(100 * (rec.potentialSavings * 0.1) / rec.estimatedCost))} 
                    className="h-2 mt-1" 
                  />
                </div>
                
                <div className="mt-4 text-right">
                  <button className="text-energy-blue hover:text-energy-teal text-sm font-medium flex items-center justify-end w-full">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
