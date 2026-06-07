import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Softened rarity colors that complement the dark mode theme
  const getRarityStyles = (rarity: Item["rarity"]) => {
    const base = "border font-medium";
    switch (rarity) {
      case "Shiny": return `${base} bg-slate-400/10 text-slate-200 border-slate-500/30`;
      case "Secret": return `${base} bg-purple-500/10 text-purple-300 border-purple-500/20`;
      case "Mythic": return `${base} bg-rose-500/10 text-rose-300 border-rose-500/20`;
      case "Legendary": return `${base} bg-amber-500/10 text-amber-300 border-amber-500/20`;
      case "Epic": return `${base} bg-blue-500/10 text-blue-300 border-blue-500/20`;
      default: return `${base} bg-slate-500/10 text-slate-300 border-slate-500/20`;
    }
  };

  return (
    <Card className="flex flex-col w-[280px] bg-card border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl">
      <div className="p-4 flex-1">
        {/* Optimized Image Area with subtle Shine Effect */}
        <div className="relative w-full h-40 bg-background rounded-lg mb-4 flex items-center justify-center border border-border group overflow-hidden">
          {item.rarity.includes("Shiny") && (
            <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          )}
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy" 
          />
        </div>

        {/* Title & Badge */}
        <div className="mb-4">
          <h3 className="font-semibold text-foreground text-lg mb-2 leading-tight">{item.name}</h3>
          <Badge variant="outline" className={getRarityStyles(item.rarity)}>
            {item.rarity}
          </Badge>
        </div>

        {/* Main Stats: High contrast between label and value */}
        <div className="grid grid-cols-2 gap-2 border-t border-border pt-4">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">Value</div>
            <div className="text-xl font-bold text-foreground">{item.value}</div>
          </div>
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-0.5">UTTV</div>
            <div className="text-md font-semibold text-foreground">{item.uttv}</div>
          </div>
        </div>
      </div>
      
      {/* Status Footer */}
      <div className="px-4 py-3 bg-black/10 border-t border-border flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Demand</span>
        <span className={`font-bold text-sm ${item.demand >= 7 ? 'text-emerald-400' : item.demand >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
          {item.demand.toFixed(1)} / 10
        </span>
      </div>

      <div className="px-4 py-2 border-t border-border flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Trend</span>
        <div className="flex items-center gap-1.5">
          {item.stability === "Stable" ? (
            <><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /><span className="text-[11px] font-bold text-emerald-400">Stable</span></>
          ) : (
            <><TrendingDown className="w-3.5 h-3.5 text-rose-400" /><span className="text-[11px] font-bold text-rose-400">Dropping</span></>
          )}
        </div>
      </div>
    </Card>
  );
}
