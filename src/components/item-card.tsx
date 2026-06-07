import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Logic Fix: Check if 'isShiny' exists, OR if the name includes "Shiny"
  const isShiny = item.isShiny === true || item.name.toLowerCase().includes("shiny");

  return (
    <div className="w-[280px]">
      <Card className="h-full bg-slate-900 border border-white/10 p-4">
        {/* Debug Label - Now showing the actual status */}
        <div className="text-white text-xs mb-2 p-1 bg-blue-900">
          Detected Shiny: {String(isShiny)}
        </div>

        <h3 className="text-white font-bold">{item.name}</h3>
        
        {/* Visual indicator - Will now work! */}
        <div className={`h-2 mt-2 ${isShiny ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      </Card>
    </div>
  );
}
