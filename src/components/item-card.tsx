import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const getRarityColor = (rarity: Item["rarity"]) => {
    switch (rarity) {
      case "Shiny": return "bg-slate-200 text-slate-900 border-slate-300 font-bold";
      case "Secret": return "bg-purple-500/10 text-purple-300 border-purple-500/20";
      case "Mythic": return "bg-red-500/10 text-red-300 border-red-500/20";
      case "Legendary": return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "Epic": return "bg-blue-500/10 text-blue-300 border-blue-500/20";
      default: return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    }
  };

  return (
    <Card className="flex flex-col w-[280px] bg-card border-card-border overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg">
      <div className="p-4 flex-1">
        {/* Image Container */}
        <div className="relative w-full h-40 bg-background/50 rounded-lg mb-4 flex items-center justify-center border border-border/50">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-300 hover:scale-110"
            loading="lazy" 
          />
        </div>

        {/* Title & Rarity */}
        <div className="mb-4">
          <h3 className="font-bold text-white text-lg mb-1 leading-snug">{item.name}</h3>
          <Badge variant="outline" className={`border-none ${getRarityColor(item.rarity)}`}>
            {item.rarity}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Value</div>
            <div className="text-xl font-extrabold text-white">{item.value}</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">UTTV</div>
            <div className="text-lg font-semibold text-foreground">{item.uttv}</div>
          </div>
        </div>
      </div>
      
      {/* Footer Stats */}
      <div className="px-4 py-3 bg-background/50 border-t border-border/50 flex items-center justify-between">
        <div className="text-xs text-muted-foreground uppercase tracking-widest">Demand</div>
        <span className={`font-bold ${item.demand >= 7 ? 'text-emerald-400' : item.demand >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
          {item.demand.toFixed(1)}/10
        </span>
      </div>

      <div className="px-4 py-2 flex items-center justify-between border-t border-border/50">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Trend</span>
        <div className="flex items-center gap-1">
          {item.stability === "Stable" ? (
            <><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /><span className="text-xs font-medium text-emerald-400">Stable</span></>
          ) : (
            <><TrendingDown className="w-3.5 h-3.5 text-rose-400" /><span className="text-xs font-medium text-rose-400">Dropping</span></>
          )}
        </div>
      </div>
    </Card>
  );
}
