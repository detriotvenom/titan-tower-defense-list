import React, { useState, useEffect, useCallback } from "react";
import { loadItems, saveItems, resetItems, type Item, type Rarity, type Stability } from "@/lib/items-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import {
  Shield,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Search,
  RotateCcw,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
} from "lucide-react";

const ADMIN_PASSWORD = "9778339300";
const SESSION_KEY = "ttd-admin-auth";

const RARITIES: Rarity[] = ["Shiny", "Secret", "Mythic", "Legendary", "Epic", "Item"];
const STABILITIES: Stability[] = ["Stable", "Dropping"];

const RARITY_COLORS: Record<Rarity, string> = {
  Shiny: "animate-rainbow text-white border-transparent",
  Secret: "bg-[#9B59B6]/20 text-[#9B59B6] border-[#9B59B6]/50",
  Mythic: "bg-[#E74C3C]/20 text-[#E74C3C] border-[#E74C3C]/50",
  Legendary: "bg-[#F1C40F]/20 text-[#F1C40F] border-[#F1C40F]/50",
  Epic: "bg-[#6C3483]/20 text-[#6C3483] border-[#6C3483]/50",
  Item: "bg-[#95A5A6]/20 text-[#95A5A6] border-[#95A5A6]/50",
};

const BLANK_ITEM: Item = {
  name: "",
  rarity: "Item",
  value: "0.00",
  uttv: "0.00",
  demand: 5.0,
  stability: "Stable",
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setError(false);
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">TTD Value List</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card/40 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              className={`bg-black/30 border-white/10 focus-visible:ring-primary/50 ${error ? "border-red-500/60 focus-visible:ring-red-500/30" : ""}`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3" /> Incorrect password
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={!password}>
            Sign In
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-muted-foreground hover:text-white"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Value List
          </Button>
        </form>
      </div>
    </div>
  );
}

interface EditRowProps {
  item: Item;
  onSave: (item: Item) => void;
  onCancel: () => void;
}

function EditRow({ item, onSave, onCancel }: EditRowProps) {
  const [form, setForm] = useState<Item>({ ...item });

  const update = <K extends keyof Item>(key: K, val: Item[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  return (
    <tr className="bg-primary/5 border-b border-white/10">
      <td className="px-4 py-3">
        <Input
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="h-8 text-sm bg-black/30 border-white/10"
          placeholder="Item name"
        />
      </td>
      <td className="px-4 py-3">
        <select
          value={form.rarity}
          onChange={(e) => update("rarity", e.target.value as Rarity)}
          className="h-8 text-sm bg-black/50 border border-white/10 rounded-md px-2 text-white w-full"
        >
          {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </td>
      <td className="px-4 py-3">
        <Input
          value={form.value}
          onChange={(e) => update("value", e.target.value)}
          className="h-8 text-sm bg-black/30 border-white/10"
          placeholder="e.g. 100.00 or 90.00 - 100.00"
        />
      </td>
      <td className="px-4 py-3">
        <Input
          value={form.uttv}
          onChange={(e) => update("uttv", e.target.value)}
          className="h-8 text-sm bg-black/30 border-white/10"
          placeholder="e.g. 1.00"
        />
      </td>
      <td className="px-4 py-3">
        <Input
          type="number"
          min={0}
          max={10}
          step={0.5}
          value={form.demand}
          onChange={(e) => update("demand", parseFloat(e.target.value) || 0)}
          className="h-8 text-sm bg-black/30 border-white/10 w-20"
        />
      </td>
      <td className="px-4 py-3">
        <select
          value={form.stability}
          onChange={(e) => update("stability", e.target.value as Stability)}
          className="h-8 text-sm bg-black/50 border border-white/10 rounded-md px-2 text-white w-full"
        >
          {STABILITIES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 w-8 p-0 bg-green-600 hover:bg-green-500"
            onClick={() => form.name.trim() && onSave(form)}
            disabled={!form.name.trim()}
          >
            <Check className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-white" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

interface AddRowProps {
  onAdd: (item: Item) => void;
}

function AddRow({ onAdd }: AddRowProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <tr>
        <td colSpan={7} className="px-4 py-3">
          <Button variant="ghost" size="sm" className="text-primary/70 hover:text-primary gap-2" onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> Add new item
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <EditRow
      item={BLANK_ITEM}
      onSave={(item) => { onAdd(item); setOpen(false); }}
      onCancel={() => setOpen(false)}
    />
  );
}

function AdminPanel() {
  const [items, setItems] = useState<Item[]>(() => loadItems());
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [, navigate] = useLocation();

  const persist = useCallback((updated: Item[]) => {
    setItems(updated);
    saveItems(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, []);

  const handleSaveEdit = (index: number, updated: Item) => {
    const next = [...items];
    next[index] = updated;
    persist(next);
    setEditingIndex(null);
  };

  const handleAdd = (item: Item) => {
    persist([item, ...items]);
  };

  const handleDelete = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    persist(next);
    setDeleteConfirm(null);
  };

  const handleReset = () => {
    const defaulted = resetItems();
    setItems(defaulted);
    setSaved(true);
    setShowReset(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/");
  };

  const handleExport = () => {
    const json = JSON.stringify(items, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ttd-value-list-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) =>
      !search.trim() || item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-card/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">TTD Value List Editor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs text-green-400 flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> Saved
              </span>
            )}
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4" /> Value List
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" /> Export JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={() => setShowReset(true)}
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Reset confirmation dialog */}
      {showReset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h2 className="font-bold text-white">Reset to Defaults?</h2>
                <p className="text-xs text-muted-foreground">This will undo all your edits.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" className="flex-1" onClick={() => setShowReset(false)}>Cancel</Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-500 text-white" onClick={handleReset}>Reset</Button>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-72 bg-black/20 border-white/10"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-white">{filtered.length}</span> of{" "}
            <span className="font-bold text-white">{items.length}</span> items
          </p>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-white/10 overflow-hidden bg-card/20">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/20">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rarity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">UTTV</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Demand</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stability</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AddRow onAdd={handleAdd} />
                {filtered.map(({ item, originalIndex }) =>
                  editingIndex === originalIndex ? (
                    <EditRow
                      key={originalIndex}
                      item={item}
                      onSave={(updated) => handleSaveEdit(originalIndex, updated)}
                      onCancel={() => setEditingIndex(null)}
                    />
                  ) : (
                    <tr
                      key={originalIndex}
                      className="border-b border-white/5 hover:bg-white/3 transition-colors group"
                    >
                      <td className="px-4 py-3 font-medium text-white max-w-xs truncate">{item.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`text-xs ${RARITY_COLORS[item.rarity]}`}>
                          {item.rarity}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary">{item.value}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.uttv}</td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${item.demand >= 8 ? "text-green-400" : item.demand >= 5 ? "text-yellow-400" : "text-red-400"}`}>
                          {item.demand.toFixed(1)}/10
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {item.stability === "Stable" ? (
                            <>
                              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-green-400 text-xs font-medium">Stable</span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                              <span className="text-red-400 text-xs font-medium">Dropping</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-primary hover:bg-primary/10"
                            onClick={() => { setEditingIndex(originalIndex); setDeleteConfirm(null); }}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          {deleteConfirm === originalIndex ? (
                            <>
                              <Button
                                size="sm"
                                className="h-7 w-7 p-0 bg-red-600 hover:bg-red-500"
                                onClick={() => handleDelete(originalIndex)}
                              >
                                <Check className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-muted-foreground"
                                onClick={() => setDeleteConfirm(null)}
                              >
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-muted-foreground hover:text-red-400 hover:bg-red-500/10"
                              onClick={() => setDeleteConfirm(originalIndex)}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  return <AdminPanel />;
}
