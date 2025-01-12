import HistoryPage from "./history/page";
import GoogleSignIn from "./signin/page"
import { Newspaper, ArrowRight, Link as LinkIcon, Sparkles, Shield, Layout, Rss, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
    <div className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 -right-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/2 w-48 h-48 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: "4s" }} />
      </div>
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/10" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="animate-float" style={{ perspective: "1000px" }}>
            <div className="flex items-center gap-3 bg-background/50 p-4 rounded-full shadow-lg backdrop-blur-sm border border-white/10">
              <Newspaper className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                NewsFlow
              </h1>
            </div>
          </div>
          
          <h2 className="text-7xl font-bold tracking-tight max-w-4xl mt-12 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 relative z-10">
            Your Sources, AI-Powered,
            <span className="text-primary block mt-2">Perfectly Curated</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl relative z-10">
            Add your favorite news sources via URL and let our AI create a personalized feed 
            that matches your interests and reading preferences.
          </p>

          <div className="flex gap-4 relative z-10">
            <Button size="lg" className="gap-2 shadow-lg bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 backdrop-blur-sm bg-background/50">
              How It Works
            </Button>
          </div>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-4 py-24 relative">
      <div className="absolute inset-0 bg-dots-darker opacity-50" />
      <div className="relative">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">How NewsFlow Works</h3>
          <p className="text-muted-foreground">Three simple steps to your personalized news experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <LinkIcon className="h-8 w-8" />,
              title: "Add Your Sources",
              description: "Simply paste the URLs of your favorite news websites and RSS feeds."
            },
            {
              icon: <Brain className="h-8 w-8" />,
              title: "AI Analysis",
              description: "Our AI analyzes your reading patterns and content preferences."
            },
            {
              icon: <Sparkles className="h-8 w-8" />,
              title: "Personalized Feed",
              description: "Get a curated feed that shows what matters most to you."
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 backdrop-blur-sm bg-background/80">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Your Sources, Your Trust",
              description: "Only see content from sources you personally choose and trust."
            },
            {
              icon: <Layout className="h-8 w-8" />,
              title: "Flexible Integration",
              description: "Support for news websites, RSS feeds, and popular news platforms."
            },
            {
              icon: <Rss className="h-8 w-8" />,
              title: "Easy Management",
              description: "Add, remove, or modify your news sources anytime."
            }
          ].map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-primary/10 hover:border-primary/30 backdrop-blur-sm bg-background/80">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>

    <div className="relative bg-primary/5 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <h3 className="text-4xl font-bold mb-6">Take Control of Your News Feed</h3>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Start adding your trusted news sources and experience the power of AI-driven personalization.
        </p>
        <GoogleSignIn />
      </div>
    </div>
  </main>
  );
}
