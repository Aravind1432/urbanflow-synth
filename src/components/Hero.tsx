import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Sparkles } from "lucide-react";
import heroCity from "@/assets/hero-city.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroCity} 
          alt="Futuristic smart city at night"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-dark opacity-60" />
      </div>

      {/* Animated Data Points */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full shadow-glow-primary animate-data-flow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="text-primary font-semibold tracking-wide uppercase text-sm">
            AI-Powered Urban Intelligence
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary">
          Your City, Understood.
        </h1>
        
        <p className="text-xl md:text-2xl mb-4 text-foreground/90 max-w-3xl mx-auto animate-fade-in">
          Smarter. Safer. Connected.
        </p>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in">
          Experience your urban environment through an intelligent Digital Twin. 
          Real-time data fusion, AI-powered insights, and seamless citizen engagement 
          transform how you navigate and understand your city.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-glow-primary transition-all hover:scale-105"
          >
            <Map className="mr-2 h-5 w-5" />
            Explore AetherAi
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Active Events Tracked" },
            { value: "95%", label: "Prediction Accuracy" },
            { value: "2min", label: "Avg Response Time" }
          ].map((stat, i) => (
            <div 
              key={i}
              className="p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
