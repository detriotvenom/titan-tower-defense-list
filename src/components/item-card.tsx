import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const getRarityStyles = (rarity: Item["rarity"]) => {
    // Using a subtle semi-transparent background for a "frosted" glass badge
    const base = "border border-white/10 font-bold backdrop-blur-sm";
    switch (rarity) {
      case "Shiny": return `${base} bg-slate-500/20 text-slate-200`;
      case "Secret": return `${base} bg-purple-500/20 text-purple-200`;
      case "Mythic": return `${base} bg-rose-500/20 text-rose-200`;
      case "Legendary": return `${base} bg-amber-500/20 text-amber-200`;
      case "Epic": return `${base} bg-blue-500/20 text-blue-200`;
      default: return `${base} bg-slate-500/10 text-slate-400`;
    }
  };

  return (
    // Wrapper provides the glow and border gradient effect
    <div className="group relative w-[280px] p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent transition-all hover:scale-[1.02] duration-300">
      <Card className="h-full bg-card/80 backdrop-blur-md border-none shadow-2xl flex flex-col overflow-hidden">
        
        {/* Image Area with "Glass" sheen */}
        <div className="relative w-full h-40 bg-black/20 flex items-center justify-center overflow-hidden">
          {item.rarity.includes("Shiny") && (
            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          )}
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[70%] max-h-[70%] object-contain transition-transform duration-500 group-hover:scale-110"
            loading="lazy" 
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-foreground mb-2 leading-tight tracking-tight">{item.name}</h3>
          <Badge variant="secondary" className={getRarityStyles(item.rarity)}>
            {item.rarity}
          </Badge>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
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

        {/* Footer with high-contrast text */}
        <div className="px-5 py-3 bg-white/[0.03] border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Demand</span>
          <span className={`font-black text-sm tabular-nums ${item.demand >= 7 ? 'text-emerald-400' : item.demand >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
            {item.demand.toFixed(1)}/10
          </span>
        </div>
      </Card>
      
      {/* The Glow Effect */}
      <div className="absolute -inset-1 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
    </div>
  );
}
