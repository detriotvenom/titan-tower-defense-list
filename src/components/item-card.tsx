import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Logic: Shiny if flag is true OR name contains "Shiny"
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  // Fixed colors: Secret is now a deep dark purple
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-950",
    mythic: "bg-rose-600",
    legendary: "bg-amber-600",
    epic: "bg-blue-600",
    item: "bg-slate-700",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-700";

  return (
    <div className="w-[280px] transition-all hover:scale-[1.02]">
      {/* Card background is solid to ensure readability */}
      <Card className="h-full bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Rarity Indicator Bar */}
        <div className={`relative h-2 w-full ${barColor}`}>
          {isShiny && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                animation: 'pulse 1.5s infinite'
              }}
            />
          )}
        </div>

        {/* Item Image */}
        <div className="p-6 bg-slate-950 flex items-center justify-center h-40">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-lg" 
          />
        </div>

        {/* Details - Explicitly white text for readability */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-white leading-snug">{item.name}</h3>
            <Badge className="bg-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-200 border border-slate-600 shrink-0 ml-2">
              {item.rarity}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
