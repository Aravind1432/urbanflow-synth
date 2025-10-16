import { Camera, MapPin, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import citizenReporting from "@/assets/citizen-reporting.jpg";

const CitizenReporting = () => {
  const steps = [
    {
      icon: Camera,
      title: "Capture & Submit",
      description: "Take a photo or video of any urban event or issue with your phone"
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "Gemini instantly analyzes media, identifies context, and categorizes the event"
    },
    {
      icon: MapPin,
      title: "Auto-Plot & Context",
      description: "Event automatically appears on the city map with AI-generated description"
    },
    {
      icon: CheckCircle,
      title: "Track & Resolve",
      description: "Monitor status updates and resolution in real-time"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-accent">
            Multimodal Citizen Reporting
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your eyes on the city. Powered by advanced AI vision and understanding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow-accent">
                      <Icon className="w-7 h-7 text-accent-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-accent">{i + 1}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-1 md:order-2 relative">
            <img 
              src={citizenReporting}
              alt="Citizen using mobile app to report urban event"
              className="rounded-lg shadow-glow-accent border border-accent/20"
            />
            <div className="absolute -bottom-6 -right-6 p-6 bg-card border border-accent/40 rounded-lg shadow-xl">
              <div className="text-sm text-muted-foreground mb-1">AI Analysis Complete</div>
              <div className="text-lg font-semibold text-accent">Event Categorized</div>
              <div className="text-xs text-muted-foreground mt-2">Accuracy: 96%</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-accent hover:opacity-90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-glow-accent"
          >
            Start Reporting
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CitizenReporting;
