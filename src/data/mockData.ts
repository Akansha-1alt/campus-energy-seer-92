
// Mock building types
export type Building = {
  id: string;
  name: string;
  type: 'Academic' | 'Residential' | 'Administrative' | 'Sports' | 'Library';
  totalArea: number; // in square feet
  floors: number;
  constructionYear: number;
  energyEfficiencyRating: 'A' | 'B' | 'C' | 'D' | 'E';
  image: string;
};

// Mock energy data types
export type EnergyDataPoint = {
  timestamp: string; // ISO string
  electricity: number; // kWh
  heating: number; // kWh
  cooling: number; // kWh
  water: number; // gallons
  total: number; // kWh (excluding water)
};

export type EnergyForecast = {
  timestamp: string; // ISO string
  predicted: number; // kWh
  lowerBound: number; // kWh
  upperBound: number; // kWh
};

export type EnergySavingRecommendation = {
  id: string;
  title: string;
  description: string;
  potentialSavings: number; // kWh per year
  estimatedCost: number; // $
  paybackPeriod: number; // months
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

// Generate sample buildings
export const buildings: Building[] = [
  {
    id: 'b1',
    name: 'Science Center',
    type: 'Academic',
    totalArea: 120000,
    floors: 5,
    constructionYear: 2005,
    energyEfficiencyRating: 'B',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'b2',
    name: 'University Library',
    type: 'Library',
    totalArea: 85000,
    floors: 4,
    constructionYear: 1998,
    energyEfficiencyRating: 'C',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'b3',
    name: 'West Residence Hall',
    type: 'Residential',
    totalArea: 75000,
    floors: 6,
    constructionYear: 2010,
    energyEfficiencyRating: 'A',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'b4',
    name: 'Athletics Complex',
    type: 'Sports',
    totalArea: 140000,
    floors: 2,
    constructionYear: 2015,
    energyEfficiencyRating: 'A',
    image: 'https://images.unsplash.com/photo-1570044389283-ec13eeee853b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'b5',
    name: 'Administration Building',
    type: 'Administrative',
    totalArea: 45000,
    floors: 3,
    constructionYear: 1985,
    energyEfficiencyRating: 'D',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: 'b6',
    name: 'Engineering Building',
    type: 'Academic',
    totalArea: 95000,
    floors: 4,
    constructionYear: 2000,
    energyEfficiencyRating: 'B',
    image: 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

// Generate historical data for the past month (daily)
export const generateHistoricalData = (buildingId: string): EnergyDataPoint[] => {
  const data: EnergyDataPoint[] = [];
  const now = new Date();
  
  // Different buildings have different baseline energy usage
  const baselineMap: Record<string, { electricity: number, heating: number, cooling: number, water: number }> = {
    'b1': { electricity: 2000, heating: 1500, cooling: 1800, water: 3000 },
    'b2': { electricity: 1800, heating: 1200, cooling: 1500, water: 2500 },
    'b3': { electricity: 1500, heating: 2000, cooling: 1000, water: 4000 },
    'b4': { electricity: 2500, heating: 1800, cooling: 2200, water: 5000 },
    'b5': { electricity: 1200, heating: 1000, cooling: 900, water: 2000 },
    'b6': { electricity: 1900, heating: 1400, cooling: 1700, water: 3500 },
  };
  
  const baseline = baselineMap[buildingId] || { electricity: 1500, heating: 1000, cooling: 1200, water: 3000 };
  
  // Generate data for past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some daily variation (±20%)
    const variation = () => 0.8 + Math.random() * 0.4;
    // Add some weekly patterns (weekends have different usage)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const weekendFactor = isWeekend ? 0.7 : 1.0;
    
    const electricity = Math.round(baseline.electricity * variation() * weekendFactor);
    const heating = Math.round(baseline.heating * variation() * weekendFactor);
    const cooling = Math.round(baseline.cooling * variation() * weekendFactor);
    const water = Math.round(baseline.water * variation() * weekendFactor);
    
    data.push({
      timestamp: date.toISOString(),
      electricity,
      heating,
      cooling,
      water,
      total: electricity + heating + cooling
    });
  }
  
  return data;
};

// Generate forecasted data for the next week (daily)
export const generateForecastData = (buildingId: string, historicalData: EnergyDataPoint[]): EnergyForecast[] => {
  const forecasts: EnergyForecast[] = [];
  const now = new Date();
  
  // Use the last 7 days average as baseline for prediction
  const recentData = historicalData.slice(-7);
  const avgTotal = recentData.reduce((sum, point) => sum + point.total, 0) / recentData.length;
  
  // Generate forecasts for next 7 days
  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    // Add some variation to predictions
    const variationFactor = 0.9 + Math.random() * 0.3; // ±15% variation
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const weekendFactor = isWeekend ? 0.75 : 1.05;
    
    const predicted = Math.round(avgTotal * variationFactor * weekendFactor);
    const uncertainty = 0.1; // 10% uncertainty
    
    forecasts.push({
      timestamp: date.toISOString(),
      predicted,
      lowerBound: Math.round(predicted * (1 - uncertainty)),
      upperBound: Math.round(predicted * (1 + uncertainty))
    });
  }
  
  return forecasts;
};

// Generate energy saving recommendations
export const generateRecommendations = (buildingId: string): EnergySavingRecommendation[] => {
  const building = buildings.find(b => b.id === buildingId);
  if (!building) return [];
  
  // Base recommendations on building characteristics
  const recommendations: EnergySavingRecommendation[] = [
    {
      id: 'r1',
      title: 'LED Lighting Upgrade',
      description: 'Replace all fluorescent lights with LED alternatives to reduce electricity consumption.',
      potentialSavings: Math.round(building.totalArea * 0.5),
      estimatedCost: Math.round(building.totalArea * 0.8),
      paybackPeriod: 18,
      difficulty: 'Medium'
    },
    {
      id: 'r2',
      title: 'Programmable Thermostats',
      description: 'Install smart thermostats to optimize heating and cooling based on occupancy patterns.',
      potentialSavings: Math.round(building.totalArea * 0.3),
      estimatedCost: 5000 + (building.floors * 500),
      paybackPeriod: 12,
      difficulty: 'Easy'
    }
  ];
  
  // Add building-specific recommendations
  if (building.constructionYear < 2000) {
    recommendations.push({
      id: 'r3',
      title: 'Window Replacement',
      description: 'Replace single-pane windows with energy-efficient double-pane alternatives.',
      potentialSavings: Math.round(building.totalArea * 0.8),
      estimatedCost: Math.round(building.totalArea * 2.5),
      paybackPeriod: 36,
      difficulty: 'Hard'
    });
  }
  
  if (building.energyEfficiencyRating === 'D' || building.energyEfficiencyRating === 'E') {
    recommendations.push({
      id: 'r4',
      title: 'HVAC System Upgrade',
      description: 'Modernize the HVAC system to improve energy efficiency and reduce maintenance costs.',
      potentialSavings: Math.round(building.totalArea * 1.2),
      estimatedCost: Math.round(building.totalArea * 5),
      paybackPeriod: 48,
      difficulty: 'Hard'
    });
  }
  
  if (building.type === 'Academic' || building.type === 'Administrative') {
    recommendations.push({
      id: 'r5',
      title: 'Occupancy Sensors',
      description: 'Install occupancy sensors to control lighting in classrooms and offices.',
      potentialSavings: Math.round(building.totalArea * 0.25),
      estimatedCost: Math.round(building.floors * 2000),
      paybackPeriod: 9,
      difficulty: 'Easy'
    });
  }
  
  return recommendations;
};
