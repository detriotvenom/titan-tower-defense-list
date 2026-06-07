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
      case "Shiny": return "bg-slate-200 text-slate-900 border-slate-300 font-bold shadow-[0_0_10px_rgba(255,255,255,0.5)]";
      case "Secret": return "bg-[#9B59B6]/10 text-[#9B59B6] border-[#9B59B6]/50";
      case "Mythic": return "bg-[#E74C3C]/10 text-[#E74C3C] border-[#E74C3C]/50";
      case "Legendary": return "bg-[#F1C40F]/10 text-[#F1C40F] border-[#F1C40F]/50";
      case "Epic": return "bg-[#6C3483]/10 text-[#6C3483] border-[#6C3483]/50";
      case "Item": return "bg-[#95A5A6]/10 text-[#95A5A6] border-[#95A5A6]/50";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getDemandColor = (demand: number) => {
    if (demand >= 8) return "text-green-400";
    if (demand >= 5) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="flex flex-col w-[280px] bg-card/50 border-card-border overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
      <div className="p-4 flex-1">
        <div className={`w-full h-36 border rounded-lg mb-4 flex items-center justify-center bg-[#121214] transition-all duration-300 p-2 relative overflow-hidden group
          ${item.rarity.includes("Shiny") ? "border-slate-200/60 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-gradient-to-b from-[#1e293b] to-[#0f172a]" : "border-card-border/50"}`}
        >
          {item.rarity.includes("Shiny") && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 mix-blend-overlay" />
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-all duration-1000 ease-out group-hover:left-[200%]" />
            </div>
          )}
          <img src={item.image} alt={item.name} className="w-auto h-full max-w-full object-contain transition-transform duration-300 hover:scale-105 relative z-0" loading="lazy" />
        </div>

        <div className="flex flex-col items-start mb-4 gap-2 w-full">
          <h3 className="font-bold text-lg text-foreground leading-tight w-full">{item.name}</h3>
          <Badge variant="outline" className={`w-fit ${getRarityColor(item.rarity)}`}>{item.rarity}</Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Value</div>
            <div className="text-2xl font-black text-primary drop-shadow-md">{item.value}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">UTTV</div>
              <div className="font-semibold text-foreground/90">{item.uttv}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Demand</div>
              <div className={`font-semibold ${getDemandColor(item.demand)}`}>{item.demand.toFixed(1)} / 10</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-black/20 border-t border-card-border flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Trend</span>
        <div className="flex items-center gap-1.5">
          {item.stability === "Stable" ? (
            <><TrendingUp className="w-4 h-4 text-green-400" /><span className="text-sm font-medium text-green-400">Stable</span></>
          ) : (
            <><TrendingDown className="w-4 h-4 text-red-400" /><span className="text-sm font-medium text-red-400">Dropping</span></>
          )}
        </div>
      </div>
    </Card>
  );
}
