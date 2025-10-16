import { Database, Brain, Zap, Target } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "Real-Time Data Ingestion",
      description: "Continuously collect urban data from social media, sensors, official reports, and citizen submissions",
      details: ["Multi-source integration", "Unstructured data handling", "24/7 monitoring"]
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced Gemini models analyze, cluster, and synthesize information using multimodal understanding",
      details: ["Semantic clustering", "Pattern recognition", "Context awareness"]
    },
    {
      icon: Zap,
      title: "Intelligent Synthesis",
      description: "Transform raw data into coherent, actionable insights with clear recommendations",
      details: ["Event summarization", "Impact assessment", "Route optimization"]
    },
    {
      icon: Target,
      title: "Proactive Delivery",
      description: "Serve personalized, location-aware insights through an intuitive digital twin interface",
      details: ["Real-time updates", "Interactive mapping", "Smart notifications"]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your city's intelligent nervous system, transforming chaos into clarity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i}
                className="relative group"
              >
                {/* Connecting line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/40 to-transparent -z-10" 
                       style={{ 
                         width: i % 2 === 0 ? "100%" : "0",
                         left: i % 2 === 0 ? "100%" : "auto",
                         right: i % 2 === 1 ? "100%" : "auto"
                       }} 
                  />
                )}
                
                <div className="p-8 rounded-lg bg-card border border-border hover:border-primary/40 transition-all hover:shadow-glow-primary">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-primary mb-2">STEP {i + 1}</div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="pl-22">
                    <div className="space-y-2">
                      {step.details.map((detail, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-primary/20">
            <span className="text-sm font-semibold">Powered by:</span>
            <div className="flex items-center gap-4">
              <span className="text-primary font-bold">Gemini AI</span>
              <div className="w-1 h-1 rounded-full bg-primary/50" />
              <span className="text-accent font-bold">Real-Time Processing</span>
              <div className="w-1 h-1 rounded-full bg-accent/50" />
              <span className="text-secondary font-bold">Multimodal Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
