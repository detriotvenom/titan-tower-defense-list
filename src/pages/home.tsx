import React, { useState, useMemo } from "react";
import { Link } from "wouter";
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
      result = rarityFilter === "Shiny" 
        ? result.filter(item => item.rarity.startsWith("Shiny"))
        : result.filter(item => item.rarity.includes(rarityFilter));
    }
    result.sort((a, b) => {
      const getVal = (v: string) => parseFloat(v.split('-')[0].trim().replace(/,/g, ''));
      return sortOrder === "desc" ? getVal(b.value) - getVal(a.value) : getVal(a.value) - getVal(b.value);
    });
    return result;
  }, [search, rarityFilter, sortOrder]);

  const rarities: RarityFilter[] = ["All", "Shiny", "Secret", "Mythic", "Legendary", "Epic", "Item"];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header with Clickable Logo/Title */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/">
              <a className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white">TTD Value List</h1>
                  <p className="text-sm text-muted-foreground font-medium">Titan Tower Defense Community Value List</p>
                </div>
              </a>
            </Link>
            
            <div className="w-full md:w-72 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
              <Input 
                placeholder="Search items..." 
                className="pl-9 bg-black/20 border-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card/30 p-4 rounded-xl border border-white/5 mb-8">
          <div className="flex flex-wrap gap-2">
            {rarities.map((r) => (
              <Button
                key={r}
                variant={rarityFilter === r ? "default" : "secondary"}
                size="sm"
                onClick={() => setRarityFilter(r)}
                className={`rounded-full px-4 ${rarityFilter !== r ? 'bg-black/20 text-muted-foreground border border-white/5' : ''}`}
              >
                {r}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => setSortOrder(p => p === "desc" ? "asc" : "desc")} className="bg-black/20 border-white/10">
            {sortOrder === "desc" ? <ArrowDownAZ className="w-4 h-4 mr-2" /> : <ArrowUpAZ className="w-4 h-4 mr-2" />}
            Sort: Value {sortOrder === "desc" ? "High to Low" : "Low to High"}
          </Button>
        </div>

        {/* Contained Grid: The "Professional Layout" */}
        <div className="max-w-[1200px] mx-auto">
          {filteredAndSortedItems.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3">
              {filteredAndSortedItems.map((item) => (
                <ItemCard key={item.name} item={item} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-lg font-bold text-white mb-2">No items found</h3>
              <Button variant="link" onClick={() => { setSearch(""); setRarityFilter("All"); }}>Clear all filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
