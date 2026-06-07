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
      {/* Increased card depth and softened the background */}
      <Card className="h-full bg-slate-900/40 backdrop-blur-md border border-white/5 shadow-2xl flex flex-col overflow-hidden">
        
        <div className={`h-1.5 w-full ${barColor}`} />

        {/* Softened the background behind the image to be less "inky" */}
        <div className="p-6 bg-slate-950/20 flex items-center justify-center h-40">
          <img 
            src={item.image} 
            alt={item.name} 
            className="max-w-[80%] max-h-[80%] object-contain drop-shadow-lg" 
          />
        </div>

        <div className="p-5 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            {/* Using text-slate-100 instead of pure white */}
            <h3 className="font-semibold text-lg text-slate-100 leading-snug">{item.name}</h3>
            <Badge className="bg-slate-800 text-[10px] uppercase tracking-wider text-slate-300 border-none">
              {item.rarity}
            </Badge>
          </div>
          
          {/* Softer separator and muted text for secondary data */}
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-700/50 pt-4">
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Value</p>
              <p className="text-lg font-bold text-slate-200">{item.value}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Demand</p>
              <p className="text-lg font-bold text-slate-200">{item.demand}/10</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
