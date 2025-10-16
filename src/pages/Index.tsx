import Hero from "@/components/Hero";
import DataFusionSection from "@/components/DataFusionSection";
import CitizenReporting from "@/components/CitizenReporting";
import HowItWorks from "@/components/HowItWorks";
import ImpactMetrics from "@/components/ImpactMetrics";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <DataFusionSection />
      <CitizenReporting />
      <HowItWorks />
      <ImpactMetrics />
      <CallToAction />
    </main>
  );
};

export default Index;
