import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  // Logic: Shiny if flag is true OR name contains "Shiny"
  const isShiny = item.isShiny === true || (item.name && item.name.toLowerCase().includes("shiny"));

  return (
    <div className="w-[280px] transition-all hover:scale-[1.02]">
      <Card className="h-full bg-slate-800 border border-slate-700 shadow-xl flex flex-col overflow-hidden hover:border-slate-500 transition-colors">
        
        {/* Rainbow Rarity Indicator Bar */}
        <div 
          className="relative h-2 w-full"
          style={{
            background: 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #0000ff, #4b0082, #ee82ee)'
          }}
        >
          {isShiny && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                animation: 'pulse 1.5s infinite'
              }}
            />
          )}
        </div>

        {/* Item Image Container */}
        <div className="p-6 bg-slate-850 flex items-center justify-center h-40">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md" 
          />
        </div>

        {/* Details Section */}
        <div className="p-5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-slate-200 leading-snug truncate">
              {item.name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <Badge className="bg-slate-900 text-[10px] font-medium uppercase tracking-wider text-slate-400 border border-slate-700">
              {item.rarity}
            </Badge>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Val</p>
              <p className="text-sm font-bold text-slate-200">{item.value}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
