import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Database, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-8">
        <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-8 animate-in fade-in zoom-in duration-700">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
          TTD <span className="text-primary">Value List</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          The most trusted, up-to-date community tracking system for Titan Tower Defense. Stay ahead of the market.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/database">
            <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2">
              View Database <Database className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-border/50">
              Admin Portal
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-muted-foreground/50 text-sm">
        Updated daily by the TTD community
      </div>
    </div>
  );
}
