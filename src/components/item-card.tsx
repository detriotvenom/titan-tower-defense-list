import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

const getRarityBarStyles = (rarity: string) => {
  if (rarity.includes("Shiny")) return "bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-500 animate-pulse";
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
        
        {/* Rarity Bar */}
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
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-foreground leading-tight">{item.name}</h3>
            {/* Added Rarity Badge back */}
            <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-white/10 bg-white/5">
              {item.rarity}
            </Badge>
          </div>
          
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

        {/* Footer with Demand AND Stability */}
        <div className="grid grid-cols-2 bg-white/[0.03] border-t border-white/5">
          <div className="px-4 py-3 border-r border-white/5">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Demand</p>
            <p className={`font-black text-sm tabular-nums ${item.demand >= 7 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {item.demand.toFixed(1)}/10
            </p>
          </div>
          <div className="px-4 py-3 flex flex-col justify-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Stability</p>
            <div className="flex items-center gap-1">
              {item.stability === "Stable" ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-rose-400" />
              )}
              <span className={`text-[11px] font-bold ${item.stability === "Stable" ? 'text-emerald-400' : 'text-rose-400'}`}>
                {item.stability}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
