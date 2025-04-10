
import React from 'react';
import { Building } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BuildingCardProps = {
  building: Building;
  isSelected: boolean;
  onClick: () => void;
};

const BuildingCard: React.FC<BuildingCardProps> = ({ building, isSelected, onClick }) => {
  const ratingColors = {
    'A': 'bg-energy-green text-white',
    'B': 'bg-energy-teal text-white',
    'C': 'bg-energy-yellow text-black',
    'D': 'bg-energy-gray text-white',
    'E': 'bg-energy-red text-white'
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-2 border-energy-blue ring-2 ring-energy-blue/20' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        <div className="h-40 overflow-hidden rounded-t-lg">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${ratingColors[building.energyEfficiencyRating]}`}>
              {building.energyEfficiencyRating} Rated
            </Badge>
          </div>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{building.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Type:</div>
          <div>{building.type}</div>
          <div className="text-muted-foreground">Area:</div>
          <div>{building.totalArea.toLocaleString()} sq ft</div>
          <div className="text-muted-foreground">Built:</div>
          <div>{building.constructionYear}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildingCard;
