import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  // Rarity colors (These are the solid bars for non-shiny items)
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-900",
    mythic: "bg-rose-600",
    legendary: "bg-amber-600",
    epic: "bg-blue-600",
    rare: "bg-sky-600",
    uncommon: "bg-green-600",
    common: "bg-slate-600",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-600";

  return (
    <div className="w-[280px] transition-all hover:scale-[1.02]">
      <Card className="h-full bg-slate-800 border border-slate-700 shadow-xl flex flex-col overflow-hidden">
        
        {/* Consistent Top Bar: Animated Rainbow for Shiny, Solid Rarity Color for others */}
        <div 
          className={`h-2 w-full ${!isShiny ? barColor : ""}`}
          style={isShiny ? {
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee, #ff0000)',
            backgroundSize: '200% 100%',
            animation: 'rainbow 3s linear infinite'
          } : {}}
        />

        {/* Consistent Image Container: Every image gets the exact same frame */}
        <div className="p-6 bg-slate-850 flex items-center justify-center h-48">
          <div className="border border-slate-700 rounded-xl p-2 bg-slate-900/50 shadow-inner">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-contain" 
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="p-5 flex flex-col gap-2">
          <h3 className="font-semibold text-lg text-slate-200 leading-snug truncate">{item.name}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <Badge className="bg-slate-900 border border-slate-700 text-slate-400 uppercase text-[10px]">
              {isShiny ? "SHINY " + item.rarity : item.rarity}
            </Badge>
            
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Val</p>
              <p className="text-sm font-bold text-slate-200">{item.value}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
