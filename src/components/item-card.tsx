import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-500",
    mythic: "bg-rose-500",
    legendary: "bg-amber-500",
    epic: "bg-blue-500",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-500";

  return (
    <div className="w-[280px] group transition-all hover:scale-[1.02]">
      <Card className="h-full bg-card/50 backdrop-blur-sm border-white/10 shadow-xl flex flex-col overflow-hidden">
        {/* Rarity Bar */}
        <div className={`h-1.5 w-full ${barColor}`} />

        {/* Image Section */}
        <div className="p-6 bg-black/10 flex items-center justify-center h-40">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl" 
          />
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg leading-snug text-white">{item.name}</h3>
            <Badge className="bg-white/10 hover:bg-white/20 text-[10px] uppercase tracking-wider text-white/70 border-none">
              {item.rarity}
            </Badge>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/5 pt-4">
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Value</p>
              <p className="text-lg font-black text-white">{item.value}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Demand</p>
              <p className="text-lg font-bold text-white">{item.demand}/10</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
