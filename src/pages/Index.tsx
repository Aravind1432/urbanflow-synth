import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DataFusionSection from "@/components/DataFusionSection";
import HowItWorks from "@/components/HowItWorks";
import ImpactMetrics from "@/components/ImpactMetrics";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <DataFusionSection />
      <HowItWorks />
      <ImpactMetrics />
      <CallToAction />
    </main>
  );
};

export default Index;
