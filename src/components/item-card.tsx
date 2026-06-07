import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Item } from "@/lib/items-store";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="w-[280px]">
      <Card className="h-full bg-slate-900 border border-white/10 overflow-hidden">
        
        {/* FORCED SHINE TEST */}
        <div className="relative h-4 w-full bg-slate-800 overflow-hidden">
            <div 
              style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 99,
                background: "linear-gradient(90deg, transparent, white, transparent)",
                backgroundSize: "200% 100%",
                animation: "shine-test 1s linear infinite"
              }}
            />
        </div>
        <style>{`
          @keyframes shine-test {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
        
        {/* ... rest of your card ... */}
        <div className="p-4 text-white">TESTING ANIMATION</div>
      </Card>
    </div>
  );
}
