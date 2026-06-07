import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Database, Gamepad2, MessageSquare, TrendingUp, Info } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Main Hero Card */}
        <div className="md:col-span-2 p-8 rounded-3xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-black tracking-tight">TTD Value List</h1>
              <p className="text-muted-foreground mt-1">The definitive source for Titan Tower Defense market data.</p>
            </div>
          </div>
          <Link href="/database">
            <Button size="lg" className="h-14 px-8 font-bold text-lg gap-2 shadow-lg shadow-primary/20">
              Launch Database <Database className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Secondary Info Cards */}
        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
          <Gamepad2 className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-bold">Play the Game</h3>
          <p className="text-sm text-muted-foreground">Jump directly into the action on Roblox.</p>
          <a href="https://roblox.com" target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full">Play Now</Button>
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
          <MessageSquare className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-bold">Community Discord</h3>
          <p className="text-sm text-muted-foreground">Join thousands of traders to discuss values.</p>
          <a href="https://discord.gg" target="_blank" rel="noreferrer">
            <Button variant="outline" className="w-full">Join Server</Button>
          </a>
        </div>

        {/* Footer/Info Bar */}
        <div className="md:col-span-2 flex items-center justify-between px-6 py-4 rounded-full bg-card border border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" /> Market data updated hourly
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" /> Version 2.4.0 Stable
          </div>
        </div>

      </div>
    </div>
  );
}
