import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Detection logic
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  // Refined Color Palette
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-900", // Dark purple, but not pitch black
    mythic: "bg-rose-600",
    legendary: "bg-amber-600",
    epic: "bg-blue-600",
    item: "bg-slate-600",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-600";

  return (
    <div className="w-[280px] transition-all hover:scale-[1.02]">
      {/* Background set to slate-800 for a softer dark look */}
      <Card className="h-full bg-slate-800 border border-slate-700 shadow-xl flex flex-col overflow-hidden">
        
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
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                animation: 'pulse 1.5s infinite'
              }}
            />
          )}
        </div>

        {/* Item Image Container */}
        <div className="p-6 bg-slate-850 flex items-center justify-center h-40">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md" 
          />
        </div>

        {/* Content - Text color softened to slate-200 */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-slate-200 leading-snug">{item.name}</h3>
            <Badge className="bg-slate-900 text-[10px] font-medium uppercase tracking-wider text-slate-400 border border-slate-700 shrink-0 ml-2">
              {item.rarity}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
