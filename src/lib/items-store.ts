import { items as defaultItems } from "@/data/items";

export type Rarity = "Shiny" | "Secret" | "Mythic" | "Legendary" | "Epic" | "Item";
export type Stability = "Stable" | "Dropping";

export interface Item {
  name: string;
  rarity: Rarity;
  value: string;
  uttv: string;
  demand: number;
  stability: Stability;
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
