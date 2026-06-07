import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

// 1. Helper function for rarity-specific styling
const getRarityBarStyles = (rarity: string) => {
  if (rarity.includes("Shiny")) {
    return "bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500 animate-pulse";
  }
  switch (rarity) {
    case "Secret": return "bg-purple-500";
    case "Mythic": return "bg-rose-500";
    case "Legendary": return "bg-amber-500";
    case "Epic": return "bg-blue-500";
    default: return "bg-slate-500";
  }
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group relative w-[280px] p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent transition-all hover:scale-[1.02] duration-300">
      <Card className="h-full bg-card/80 backdrop-blur-md border-none shadow-2xl flex flex-col overflow-hidden">
        
        {/* 2. THE RARITY BAR */}
        <div className={`h-1.5 w-full ${getRarityBarStyles(item.rarity)}`} />

        {/* Image Area */}
        <div className="relative w-full h-40 bg-black/20 flex items-center justify-center overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-foreground mb-4 leading-tight">{item.name}</h3>
          
          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Value</p>
              <p className="text-lg font-black text-white tabular-nums">{item.value}</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">UTTV</p>
              <p className="text-lg font-bold text-foreground tabular-nums">{item.uttv}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Demand</span>
          <span className={`font-black text-sm tabular-nums ${item.demand >= 7 ? 'text-emerald-400' : item.demand >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
            {item.demand.toFixed(1)}/10
          </span>
        </div>
      </Card>
    </div>
  );
}
