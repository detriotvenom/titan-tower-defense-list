import React from "react";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  const isShiny = item.isShiny;

  return (
    <div className="w-[260px] transition-all hover:scale-[1.02]">
      <Card className="h-full bg-[#2a2a2a] border border-slate-700 shadow-xl overflow-hidden flex flex-col">
        
        {/* Animated Header Bar */}
        <div 
          className={`h-1.5 w-full ${isShiny ? "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-rainbow" : "bg-slate-700"}`}
        />

        {/* Image Area */}
        <div className="p-4 flex items-center justify-center">
          <div className="border border-slate-700/50 rounded-xl p-2 bg-slate-950/40 shadow-inner">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
          </div>
        </div>

        {/* Info Section */}
        <div className="px-4 pb-4 space-y-3">
          <h3 className="font-bold text-white text-center text-sm truncate">{item.name}</h3>

          {/* Stats Grid */}
          <div className="space-y-1.5">
            <StatRow label="Value" value={item.value} />
            <StatRow label="UTTV" value={item.uttv} color="text-emerald-400" />
            <StatRow label="Demand" value={`${item.demand} /10`} />
            <StatRow 
              label="Stability" 
              value={item.stability} 
              color={item.stability === "Dropping" ? "text-red-400" : "text-green-400"} 
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

// Reusable Stat Row Component with Text Outline
const StatRow = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div className="bg-[#3a3a3a] border border-gray-600 rounded-md py-1 px-3 flex justify-between items-center text-[10px]">
    <span className="text-gray-400 font-bold uppercase tracking-wider">{label}:</span>
    <span className={`${color} font-black text-outline text-xs`}>{value}</span>
  </div>
);
