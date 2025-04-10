
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnergyDataPoint, EnergyForecast } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from 'recharts';

type EnergyConsumptionChartProps = {
  historicalData: EnergyDataPoint[];
  forecastData: EnergyForecast[];
};

const EnergyConsumptionChart: React.FC<EnergyConsumptionChartProps> = ({ historicalData, forecastData }) => {
  // Process data for charts
  const processedHistoricalData = historicalData.map(point => ({
    ...point,
    date: format(parseISO(point.timestamp), 'MM/dd'),
  }));

  const processedForecastData = forecastData.map(point => ({
    date: format(parseISO(point.timestamp), 'MM/dd'),
    predicted: point.predicted,
    lowerBound: point.lowerBound,
    upperBound: point.upperBound,
  }));

  // Combine historical and forecast data for the full chart
  const combinedData = [
    ...processedHistoricalData.slice(-7).map(point => ({
      date: point.date,
      actual: point.total,
      predicted: null,
      lowerBound: null,
      upperBound: null,
      type: 'Historical'
    })),
    ...processedForecastData.map(point => ({
      date: point.date,
      actual: null,
      predicted: point.predicted,
      lowerBound: point.lowerBound,
      upperBound: point.upperBound,
      type: 'Forecast'
    }))
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Energy Consumption Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="combined">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="combined">Historical & Forecast</TabsTrigger>
            <TabsTrigger value="historical">Historical Breakdown</TabsTrigger>
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="combined" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="upperBound" 
                  fill="#e8f0fe" 
                  stroke="#e8f0fe" 
                  name="Upper Bound"
                />
                <Area 
                  type="monotone" 
                  dataKey="lowerBound" 
                  fill="#ffffff" 
                  stroke="#ffffff" 
                  name="Lower Bound"
                />
                <Bar dataKey="actual" fill="#1a73e8" name="Actual Usage" />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#34a853" 
                  strokeWidth={2}
                  name="Predicted Usage" 
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="text-sm text-muted-foreground text-center mt-2">
              Past 7 days and forecast for next 7 days (kWh)
            </div>
          </TabsContent>

          <TabsContent value="historical" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedHistoricalData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="electricity" stackId="a" fill="#1a73e8" name="Electricity" />
                <Bar dataKey="heating" stackId="a" fill="#ea4335" name="Heating" />
                <Bar dataKey="cooling" stackId="a" fill="#34a853" name="Cooling" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-sm text-muted-foreground text-center mt-2">
              Past 14 days energy consumption breakdown (kWh)
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={processedForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="upperBound" 
                  stackId="1" 
                  stroke="#34a853" 
                  fill="#e6f4ea" 
                  name="Upper Bound"
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stackId="2" 
                  stroke="#1a73e8" 
                  fill="#e8f0fe" 
                  name="Predicted Usage" 
                />
                <Area 
                  type="monotone" 
                  dataKey="lowerBound" 
                  stackId="3" 
                  stroke="#fbbc05" 
                  fill="#ffffff" 
                  name="Lower Bound" 
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-sm text-muted-foreground text-center mt-2">
              7-day energy consumption forecast with confidence intervals (kWh)
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnergyConsumptionChart;
