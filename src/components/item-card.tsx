import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="w-[280px]">
      <Card className="h-full bg-slate-900 border border-white/10 p-4">
        {/* DEBUG INFO */}
        <div className="text-white text-xs mb-2 p-1 bg-red-900">
          Shiny Status: {String(item.isShiny)}
        </div>

        <h3 className="text-white font-bold">{item.name}</h3>
        
        {/* Visual indicator */}
        <div className={`h-2 mt-2 ${item.isShiny ? 'bg-green-500' : 'bg-red-500'}`} />
      </Card>
    </div>
  );
}
