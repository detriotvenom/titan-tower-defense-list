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
      <Card className="h-full bg-slate-900 border border-slate-700 shadow-xl flex flex-col overflow-hidden">
        
        <div 
          className={`h-2 w-full ${!isShiny ? barColor : ""}`}
          style={isShiny ? {
            background: 'linear-gradient(90deg, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee, #ff0000)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-move 3s linear infinite'
          } : {}}
        />

        <div className="p-4 flex items-center justify-center h-40 bg-slate-950/30">
          <div className="border border-slate-700 rounded-lg p-2 bg-slate-950/50 shadow-inner">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-1.5">
          <h3 className="font-bold text-sm text-slate-100 truncate">{item.name}</h3>
          
          <div className="flex items-center justify-between mt-1">
            <Badge className="bg-slate-800 border border-slate-700 text-slate-400 text-[9px] font-bold uppercase">
              {isShiny ? "SHINY " + item.rarity : item.rarity}
            </Badge>
            
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[8px] text-slate-500 font-black uppercase">Val</p>
                <p className="text-xs font-bold text-white">{item.value || "-"}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] text-slate-500 font-black uppercase">UTTV</p>
                <p className="text-xs font-bold text-emerald-400">{item.uttv || "-"}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
