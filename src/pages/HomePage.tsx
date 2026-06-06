import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, Gamepad2, MessageSquare, Database } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
        Titan Tower Defense Values
      </h1>
      
      {/* Disclaimer Box */}
      <div className="max-w-md bg-card p-6 rounded-xl border border-border mb-8 shadow-lg">
        <div className="flex items-center gap-2 mb-3 text-yellow-500 justify-center">
          <AlertCircle />
          <h2 className="font-bold text-lg">Important</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Value lists are for superficial price knowledge. Don't take everything as absolute truth. 
          Values are in: <strong>Upgraded Keys / Gold Bars / Titans 1.0</strong> (1 Value = 1 Upgraded Raid Key).
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/database">
          <Button className="w-full text-lg h-14" size="lg">
            <Database className="mr-2" /> View Value List
          </Button>
        </Link>
        <a href="YOUR_GAME_LINK" target="_blank">
          <Button variant="outline" className="w-full text-lg h-14">
            <Gamepad2 className="mr-2" /> Play the Game
          </Button>
        </a>
        <a href="YOUR_DISCORD_LINK" target="_blank">
          <Button variant="outline" className="w-full text-lg h-14">
            <MessageSquare className="mr-2" /> Join Discord
          </Button>
        </a>
      </div>
    </div>
  );
}
