
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  buildings, 
  generateHistoricalData, 
  generateForecastData, 
  generateRecommendations 
} from '@/data/mockData';
import BuildingSelector from './BuildingSelector';
import EnergyMetricsCards from './EnergyMetricsCards';
import EnergyConsumptionChart from './EnergyConsumptionChart';
import RecommendationsPanel from './RecommendationsPanel';

const Dashboard: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState(buildings[0]?.id || '');
  const [historicalData, setHistoricalData] = useState(generateHistoricalData(selectedBuildingId));
  const [forecastData, setForecastData] = useState(generateForecastData(selectedBuildingId, historicalData));
  const [recommendations, setRecommendations] = useState(generateRecommendations(selectedBuildingId));
  
  // Update data when building changes
  useEffect(() => {
    const newHistoricalData = generateHistoricalData(selectedBuildingId);
    setHistoricalData(newHistoricalData);
    setForecastData(generateForecastData(selectedBuildingId, newHistoricalData));
    setRecommendations(generateRecommendations(selectedBuildingId));
  }, [selectedBuildingId]);
  
  return (
    <div className="container py-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="buildings">Buildings</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <EnergyMetricsCards historicalData={historicalData} />
            <EnergyConsumptionChart 
              historicalData={historicalData}
              forecastData={forecastData}
            />
            <RecommendationsPanel 
              recommendations={recommendations.slice(0, 2)} 
            />
          </TabsContent>
          
          <TabsContent value="buildings">
            <BuildingSelector
              buildings={buildings}
              selectedBuildingId={selectedBuildingId}
              onSelectBuilding={setSelectedBuildingId}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-6">
            <RecommendationsPanel recommendations={recommendations} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
