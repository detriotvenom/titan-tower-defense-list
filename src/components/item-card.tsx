import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

// 1. We use a mapping object for clean, high-performance styling
const RARITY_MAP: Record<string, string> = {
  secret: "bg-purple-600",
  mythic: "bg-rose-500",
  legendary: "bg-amber-500",
  epic: "bg-blue-500",
  item: "bg-slate-500",
};

const getRarityStyles = (item: Item) => {
  // 2. Shiny items always get the special animation
  if (item.isShiny) {
    return "bg-gradient-to-r from-slate-700 via-slate-100 to-slate-700 bg-[length:200%_100%] animate-shine";
  }

  // 3. Fallback to map, or default to slate if rarity not found
  const rarityKey = item.rarity.toLowerCase();
  return RARITY_MAP[rarityKey] || "bg-slate-500";
};

export function ItemCard({ item }: ItemCardProps) {
  const rarityStyle = getRarityStyles(item);

  return (
    <div className="group relative w-[280px] p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent transition-all hover:scale-[1.02] duration-300">
      <Card className="h-full bg-card/80 backdrop-blur-md border-none shadow-2xl flex flex-col overflow-hidden">
        
        {/* Dynamic Color Bar */}
        <div className={`h-1.5 w-full ${rarityStyle}`} />

        <div className="relative w-full h-40 bg-black/20 flex items-center justify-center overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-foreground leading-tight">{item.name}</h3>
            <Badge variant="outline" className="text-[10px] uppercase tracking-widest border-white/10 bg-white/5 text-foreground/80 shrink-0">
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
