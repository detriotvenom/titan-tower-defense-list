import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // FALLBACK LOGIC: 
  // It checks if 'isShiny' is true OR if the name includes "Shiny"
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  return (
    <div className="w-[280px] transition-all hover:scale-[1.02]">
      <Card className="h-full bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Rarity Indicator Bar - Uses our logic now */}
        <div className={`relative h-1.5 w-full bg-slate-500 overflow-hidden`}>
          {isShiny && (
            <div className="absolute inset-0 bg-white animate-pulse" />
          )}
        </div>

        <div className="p-6 bg-slate-950/20 flex items-center justify-center h-40">
          <img src={item.image} alt={item.name} className="max-w-[80%] max-h-[80%] object-contain drop-shadow-lg" />
        </div>

        <div className="p-5 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-slate-100 leading-snug">{item.name}</h3>
            <Badge className="bg-slate-800 text-[10px] uppercase tracking-wider text-slate-300 border-none shrink-0 ml-2">
              {item.rarity}
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
