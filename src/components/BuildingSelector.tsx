
import React from 'react';
import { Building } from '@/data/mockData';
import BuildingCard from './BuildingCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type BuildingSelectorProps = {
  buildings: Building[];
  selectedBuildingId: string;
  onSelectBuilding: (buildingId: string) => void;
};

const BuildingSelector: React.FC<BuildingSelectorProps> = ({ buildings, selectedBuildingId, onSelectBuilding }) => {
  const buildingTypes = [...new Set(buildings.map(building => building.type))];
  
  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold">Campus Buildings</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex overflow-x-auto pb-1 mb-2">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          {buildingTypes.map(type => (
            <TabsTrigger key={type} value={type} className="flex-1">{type}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {buildings.map(building => (
              <BuildingCard
                key={building.id}
                building={building}
                isSelected={building.id === selectedBuildingId}
                onClick={() => onSelectBuilding(building.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        {buildingTypes.map(type => (
          <TabsContent key={type} value={type} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {buildings
                .filter(building => building.type === type)
                .map(building => (
                  <BuildingCard
                    key={building.id}
                    building={building}
                    isSelected={building.id === selectedBuildingId}
                    onClick={() => onSelectBuilding(building.id)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BuildingSelector;
