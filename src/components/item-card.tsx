import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const isShiny = item.isShiny;

  // Simple, clean rarity colors
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-900/50",
    mythic: "bg-rose-900/50",
    legendary: "bg-amber-900/50",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-800/50";

  return (
    <div className="w-[260px] transition-all hover:scale-[1.02]">
      <Card className="h-full bg-slate-900/80 border border-slate-700 shadow-xl overflow-hidden">
        
        {/* Animated Header */}
        <div 
          className={`h-1.5 w-full ${!isShiny ? barColor : ""}`}
          style={isShiny ? {
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee, #ff0000)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-move 3s linear infinite'
          } : {}}
        />

        {/* Tightened Image Area */}
        <div className="p-4 flex items-center justify-center h-32">
          <div className="border border-slate-700/50 rounded-xl p-2 bg-slate-950/40 shadow-inner">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
          </div>
        </div>

        {/* Compact Info Section */}
        <div className="px-4 pb-4">
          <h3 className="font-bold text-slate-100 text-sm mb-2 truncate">{item.name}</h3>
          
          <div className="flex items-end justify-between border-t border-slate-800 pt-2">
            <Badge className="bg-slate-800 border-none text-[9px] uppercase font-bold text-slate-400">
              {isShiny ? "Shiny " + item.rarity : item.rarity}
            </Badge>
            
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-500 font-black uppercase">Val</span>
                <span className="text-xs font-bold text-white font-mono">{item.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-slate-500 font-black uppercase">UTTV</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{item.uttv}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
