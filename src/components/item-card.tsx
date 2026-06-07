import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  const rarityColors: Record<string, string> = {
    secret: "bg-purple-900/50",
    mythic: "bg-rose-900/50",
    legendary: "bg-amber-900/50",
    epic: "bg-blue-900/50",
    rare: "bg-sky-900/50",
    common: "bg-slate-800/50",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-800/50";

  return (
    <div className="w-[260px] group transition-all duration-300 hover:scale-[1.02]">
      <Card className="h-full bg-slate-900/80 border border-slate-700 shadow-xl overflow-hidden backdrop-blur-sm">
        
        {/* Animated Bar */}
        <div 
          className={`h-1.5 w-full ${!isShiny ? barColor : ""}`}
          style={isShiny ? {
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee, #ff0000)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-move 3s linear infinite'
          } : {}}
        />

        {/* Image Area - Cleaned up */}
        <div className="p-5 flex items-center justify-center h-40">
          <div className="relative border border-slate-700/50 rounded-xl p-2 bg-slate-950/40">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Info Area - Perfectly aligned */}
        <div className="px-4 pb-4">
          <h3 className="font-bold text-slate-100 text-sm mb-3 truncate" title={item.name}>
            {item.name}
          </h3>
          
          <div className="flex items-end justify-between border-t border-slate-800 pt-3">
            <Badge className="bg-slate-800 border-none text-slate-400 text-[10px] uppercase font-bold tracking-wider">
              {isShiny ? "Shiny " + item.rarity : item.rarity}
            </Badge>
            
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase">Val</span>
                <span className="text-xs font-mono font-bold text-white">{item.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase">UTTV</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{item.uttv || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
