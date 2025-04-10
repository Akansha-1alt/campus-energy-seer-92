
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergyDataPoint } from '@/data/mockData';
import { 
  TrendingUpIcon, 
  TrendingDownIcon, 
  LightbulbIcon, 
  ThermometerIcon, 
  DropletIcon, 
  SnowflakeIcon 
} from "lucide-react";

type EnergyMetricsCardsProps = {
  historicalData: EnergyDataPoint[];
};

const EnergyMetricsCards: React.FC<EnergyMetricsCardsProps> = ({ historicalData }) => {
  // Get the most recent data point
  const currentData = historicalData[historicalData.length - 1];
  
  // Calculate percentage changes compared to yesterday
  const yesterdayData = historicalData[historicalData.length - 2] || currentData;
  
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return Number.isFinite(change) ? change.toFixed(1) : '0.0';
  };
  
  const electricityChange = calculateChange(currentData.electricity, yesterdayData.electricity);
  const heatingChange = calculateChange(currentData.heating, yesterdayData.heating);
  const coolingChange = calculateChange(currentData.cooling, yesterdayData.cooling);
  const waterChange = calculateChange(currentData.water, yesterdayData.water);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Electricity</CardTitle>
          <LightbulbIcon className="h-4 w-4 text-energy-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.electricity.toLocaleString()} kWh</div>
          <div className="flex items-center space-x-2">
            {parseFloat(electricityChange) >= 0 ? (
              <TrendingUpIcon className="h-4 w-4 text-energy-red" />
            ) : (
              <TrendingDownIcon className="h-4 w-4 text-energy-green" />
            )}
            <p className={`text-sm ${parseFloat(electricityChange) >= 0 ? 'text-energy-red' : 'text-energy-green'}`}>
              {parseFloat(electricityChange) >= 0 ? '+' : ''}{electricityChange}% from yesterday
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Heating</CardTitle>
          <ThermometerIcon className="h-4 w-4 text-energy-red" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.heating.toLocaleString()} kWh</div>
          <div className="flex items-center space-x-2">
            {parseFloat(heatingChange) >= 0 ? (
              <TrendingUpIcon className="h-4 w-4 text-energy-red" />
            ) : (
              <TrendingDownIcon className="h-4 w-4 text-energy-green" />
            )}
            <p className={`text-sm ${parseFloat(heatingChange) >= 0 ? 'text-energy-red' : 'text-energy-green'}`}>
              {parseFloat(heatingChange) >= 0 ? '+' : ''}{heatingChange}% from yesterday
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Cooling</CardTitle>
          <SnowflakeIcon className="h-4 w-4 text-energy-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.cooling.toLocaleString()} kWh</div>
          <div className="flex items-center space-x-2">
            {parseFloat(coolingChange) >= 0 ? (
              <TrendingUpIcon className="h-4 w-4 text-energy-red" />
            ) : (
              <TrendingDownIcon className="h-4 w-4 text-energy-green" />
            )}
            <p className={`text-sm ${parseFloat(coolingChange) >= 0 ? 'text-energy-red' : 'text-energy-green'}`}>
              {parseFloat(coolingChange) >= 0 ? '+' : ''}{coolingChange}% from yesterday
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Water</CardTitle>
          <DropletIcon className="h-4 w-4 text-energy-blue" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentData.water.toLocaleString()} gal</div>
          <div className="flex items-center space-x-2">
            {parseFloat(waterChange) >= 0 ? (
              <TrendingUpIcon className="h-4 w-4 text-energy-red" />
            ) : (
              <TrendingDownIcon className="h-4 w-4 text-energy-green" />
            )}
            <p className={`text-sm ${parseFloat(waterChange) >= 0 ? 'text-energy-red' : 'text-energy-green'}`}>
              {parseFloat(waterChange) >= 0 ? '+' : ''}{waterChange}% from yesterday
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyMetricsCards;
