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
    secret: "bg-purple-900",
    mythic: "bg-rose-700",
    legendary: "bg-amber-600",
    epic: "bg-blue-600",
    rare: "bg-sky-600",
    common: "bg-slate-600",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-600";

  return (
    <div className="w-[280px] transition-transform hover:-translate-y-1">
      <Card className="h-full bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden">
        
        {/* The Rainbow Bar - Thicker and more vibrant */}
        <div 
          className={`h-2.5 w-full ${!isShiny ? barColor : ""}`}
          style={isShiny ? {
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee, #ff0000)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-move 3s linear infinite'
          } : {}}
        />

        {/* Image Frame - Uniform and centered */}
        <div className="p-6 flex items-center justify-center h-48 bg-slate-950/30">
          <div className="border border-slate-700 rounded-xl p-3 bg-slate-950/50 shadow-inner">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-contain" 
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="p-4 flex flex-col gap-3">
          <h3 className="font-bold text-base text-slate-100 truncate">{item.name}</h3>
          
          <div className="flex items-center justify-between">
            <Badge className="bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold tracking-wide uppercase">
              {isShiny ? "SHINY " + item.rarity : item.rarity}
            </Badge>
            
            <div className="text-right">
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Val</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
