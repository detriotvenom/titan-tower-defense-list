import React, { useState } from "react";
import { Item } from "@/lib/items-store";

export function TradeCalculator() {
  const [leftItems, setLeftItems] = useState<Item[]>([]);
  const [rightItems, setRightItems] = useState<Item[]>([]);

  const calculateTotal = (items: Item[]) => 
    items.reduce((sum, item) => sum + parseFloat(item.value || "0"), 0).toFixed(2);

  return (
    <div className="p-8 grid grid-cols-2 gap-8 text-white">
      {/* Left Side */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-4">Your Offer</h2>
        <div className="h-64 bg-slate-950 rounded p-4 mb-4">
          {/* List items here */}
        </div>
        <p className="text-2xl font-bold text-emerald-400">Total: {calculateTotal(leftItems)}</p>
      </div>

      {/* Right Side */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-4">Their Offer</h2>
        <div className="h-64 bg-slate-950 rounded p-4 mb-4">
          {/* List items here */}
        </div>
        <p className="text-2xl font-bold text-emerald-400">Total: {calculateTotal(rightItems)}</p>
      </div>
    </div>
  );
}
