import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

const getRarityBarStyles = (rarity: string) => {
  // 1. Priority: Secrets take precedence over Shiny
  if (rarity.includes("Secret")) return "bg-purple-600";

  // 2. Shiny: Silver metallic effect
  if (rarity.includes("Shiny")) {
    return "bg-gradient-to-r from-slate-700 via-slate-100 to-slate-700 bg-[length:200%_100%] animate-shine";
  }

  // 3. Standard Rarities
  switch (rarity) {
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
        
        {/* Metallic/Color Rarity Bar */}
        <div className={`h-1.5 w-full ${getRarityBarStyles(item.rarity)}`} />

        {/* Image Area */}
        <div
