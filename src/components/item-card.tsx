import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Define colors as a simple object to avoid logic errors
  const rarityColors: Record<string, string> = {
    secret: "bg-purple-600",
    mythic: "bg-rose-500",
    legendary: "bg-amber-500",
    epic: "bg-blue-500",
  };

  const barColor = rarityColors[item.rarity.toLowerCase()] || "bg-slate-500";

  return (
    <div className="w-[280px] rounded-2xl bg-card border border-border overflow-hidden shadow-lg">
      {/* Static Rarity Bar - No complex animations to ensure it renders */}
      <div className={`h-1.5 w-full ${barColor}`} />

      <div className="p-4 bg-black/20 flex items-center justify-center h-40">
        <img src={item.image} alt={item.name} className="max-w-[70%] max-h-[70%] object-contain" />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.rarity}</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs font-bold uppercase text-muted-foreground">Value</p>
          <p className="text-xl font-black">{item.value}</p>
        </div>
      </div>
    </div>
  );
}
