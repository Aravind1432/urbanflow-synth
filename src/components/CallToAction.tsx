import { Button } from "@/components/ui/button";
import { ArrowRight, Download, PlayCircle } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-primary">
            Ready to Transform Your City?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of citizens already experiencing smarter, safer, and more connected urban living through AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-10 py-7 text-lg shadow-glow-primary hover:scale-105 transition-all"
            >
              <Download className="mr-2 h-5 w-5" />
              Download the App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-10 py-7 text-lg hover:scale-105 transition-all"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
            {[
              { value: "50+", label: "Cities Deployed" },
              { value: "99.9%", label: "Uptime Reliability" },
              { value: "4.8/5", label: "User Rating" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
