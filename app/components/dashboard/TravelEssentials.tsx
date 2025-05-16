import { useState } from "react";
import { Card } from "../ui/card";
import type { TravelEssential } from "../../lib/types";
import { useTripInfo } from "../../lib/tripContext";

export function TravelEssentials() {
  const { tripInfo } = useTripInfo();
  const [essentials, setEssentials] = useState<TravelEssential[]>(tripInfo.essentials);

  const togglePacked = (id: string) => {
    setEssentials(essentials.map(item =>
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  return (
    <Card className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold mb-4 tracking-tight">Travel Essentials</h2>
      <div className="space-y-3">
        {essentials.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              id={item.id}
              checked={item.packed}
              onChange={() => togglePacked(item.id)}
              className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor={item.id} className="flex flex-col">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </label>
          </div>
        ))}
      </div>
    </Card>
  );
}
