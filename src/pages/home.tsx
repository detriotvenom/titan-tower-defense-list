import React, { useState, useMemo } from "react";
import { loadItems } from "@/lib/items-store";
import { ItemCard } from "@/components/item-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowDownAZ, ArrowUpAZ, Shield } from "lucide-react";

type RarityFilter = "All" | "Shiny" | "Secret" | "Mythic" | "Legendary" | "Epic" | "Item";
type SortOrder = "desc" | "asc";

export default function Home() {
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState<RarityFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filteredAndSortedItems = useMemo(() => {
    let result = [...loadItems()];

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(item => item.name.toLowerCase().includes(lowerSearch));
    }

    if (rarityFilter !== "All") {
      if (rarityFilter === "Shiny") {
        result = result.filter(item => item.rarity.startsWith("Shiny"));
      } else {
        result = result.filter(item => item.rarity.includes(rarityFilter));
      }
    }

    result.sort((a, b) => {
      const getVal = (valStr: string) => parseFloat(valStr.split('-')[0].trim().replace(/,/g, ''));
      const valA = getVal(a.value);
      const valB = getVal(b.value);
      return sortOrder === "desc" ? valB - valA : valA - valB;
    });

    return result;
  }, [search, rarityFilter, sortOrder]);

  const rarities: RarityFilter[] = ["All", "Shiny", "Secret", "Mythic", "Legendary", "Epic", "Item"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 selection:bg-primary selection:text-primary-foreground">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white">TTD Value List</h1>
                <p className="text-sm text-muted-foreground font-medium">Titan Tower Defense Community Value List</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search items..." 
                className="w-full md:w-72 pl-9 bg-black/20 border-white/10 focus-visible:ring-primary/50 placeholder:text-muted-foreground/50 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-card/30 p-4 rounded-xl border border-white/5">
            <div className="flex flex-wrap gap-2">
              {rarities.map((rarity) => (
                <Button
                  key={rarity}
                  variant={rarityFilter === rarity ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setRarityFilter(rarity)}
                  className={`rounded-full px-4 ${rarityFilter === rarity ? '' : 'bg-black/20 hover:bg-white/10 text-muted-foreground hover:text-white border border-white/5'}`}
                >
                  {rarity}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
              className="gap-2 bg-black/20 border-white/10 hover:bg-white/10"
            >
              {sortOrder === "desc" ? <ArrowDownAZ className="w-4 h-4" /> : <ArrowUpAZ className="w-4 h-4" />}
              Sort: Value {sortOrder === "desc" ? "High to Low" : "Low to High"}
            </Button>
          </div>
        </div>

        {/* REVISED LAYOUT: Contained, Centered, and Tightly Packed */}
        <div className="max-w-[1200px] mx-auto">
          {filteredAndSortedItems.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3">
              {filteredAndSortedItems.map((item) => (
                <ItemCard key={item.name} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No items found</h3>
              <Button variant="link" onClick={() => { setSearch(""); setRarityFilter("All"); }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
