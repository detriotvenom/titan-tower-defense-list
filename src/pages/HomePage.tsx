import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Database, Gamepad2, MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-10">
        
        {/* Branding Section */}
        <div className="space-y-6">
          <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-2xl shadow-primary/10">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tight text-foreground">
              TTD <span className="text-primary">Value List</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Value List for Titan Tower Defense.
            </p>
          </div>
        </div>

        {/* Primary Call to Action */}
        <div className="flex justify-center">
          <Link href="/database">
            <Button size="lg" className="h-16 px-12 text-xl font-black gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
              Value List <Database className="w-6 h-6" />
            </Button>
          </Link>
        </div>

        {/* Community Links (Subtle) */}
        <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/5">
          <a href="https://roblox.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-bold text-sm">
            <Gamepad2 className="w-4 h-4" /> Play Game
          </a>
          <div className="w-px h-4 bg-white/10" />
          <a href="https://discord.gg" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 font-bold text-sm">
            <MessageSquare className="w-4 h-4" /> Join Discord
          </a>
        </div>

      </div>
    </div>
  );
}
