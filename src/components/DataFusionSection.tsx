import { Brain, Database, Zap, MessageSquare } from "lucide-react";
import dataFusion from "@/assets/data-fusion.jpg";

const DataFusionSection = () => {
  const features = [
    {
      icon: Database,
      title: "Multi-Source Integration",
      description: "Seamlessly ingests data from social media, sensors, city reports, and citizen submissions in real-time."
    },
    {
      icon: Brain,
      title: "Intelligent Clustering",
      description: "AI semantically groups related information across diverse sources into coherent event narratives."
    },
    {
      icon: Zap,
      title: "Actionable Insights",
      description: "Every summary includes clear recommendations and guidance for citizens and city management."
    },
    {
      icon: MessageSquare,
      title: "Dynamic Updates",
      description: "Continuously evolves event status, providing real-time resolution tracking and updates."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
            AI-Powered Data Fusion
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming chaos into clarity through advanced multimodal intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img 
              src={dataFusion}
              alt="Data fusion visualization"
              className="rounded-lg shadow-glow-primary border border-primary/20"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg" />
          </div>

          <div className="space-y-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={i}
                  className="flex gap-4 p-6 rounded-lg bg-card border border-border hover:border-primary/40 transition-all hover:translate-x-2"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Flow */}
        <div className="relative">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {["Ingest", "Analyze", "Synthesize", "Deliver"].map((step, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 animate-pulse-glow">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold">{step}</p>
                {i < 3 && (
                  <div className="absolute w-full h-0.5 bg-gradient-to-r from-primary to-secondary top-8 left-1/2 -z-10" 
                       style={{ width: `${100 / 3}%`, left: `${(i + 0.5) * 100 / 4}%` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataFusionSection;
