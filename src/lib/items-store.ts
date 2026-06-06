import { items as defaultItems } from "@/data/items";

export type Rarity = "Shiny" | "Secret" | "Mythic" | "Legendary" | "Epic" | "Item";
export type Stability = "Stable" | "Dropping";
export type Category = "Unit" | "Item"; // 🎯 Added this to handle the sub-category types

export interface Item {
  name: string;
  rarity: Rarity;
  category?: string; // 🎯 Added this line with a '?' so old cards won't break if they don't have it yet!
  value: string;
  uttv: string;
  demand: number;
  stability: Stability;
  image: string; // Ensuring image is officially recognized here too
}

const STORAGE_KEY = "ttd-items-v1";

export function loadItems(): Item[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Item[];
    }
  } catch {
    // ignore
  }
  return defaultItems as Item[];
}

export function saveItems(items: Item[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetItems(): Item[] {
  localStorage.removeItem(STORAGE_KEY);
  return defaultItems as Item[];
}
