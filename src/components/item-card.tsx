import React from "react";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="bg-[#2a2a2a] border border-gray-600 rounded-xl p-3 w-[260px] space-y-1.5 shadow-lg">
      <h3 className="font-bold text-white text-sm text-center mb-2 truncate">{item.name}</h3>
      <StatRow label="Value" value={item.value} />
      <StatRow label="UTTV" value={item.uttv} color="text-emerald-400" />
      <StatRow label="Demand" value={`${item.demand} /10`} />
      <StatRow 
        label="Stability" 
        value={item.stability} 
        color={item.stability === "Dropping" ? "text-red-400" : "text-green-400"} 
      />
    </div>
  );
}

const StatRow = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div className="bg-[#3a3a3a] border border-gray-600 rounded-md py-1 px-3 flex justify-between items-center text-[10px]">
    <span className="text-gray-400 font-bold uppercase tracking-wider">{label}:</span>
    <span className={`${color} font-black text-xs`}>{value}</span>
  </div>
);
