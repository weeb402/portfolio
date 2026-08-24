import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";
import GoldenGunEasterEgg from "@/components/GoldenGunEasterEgg";
import GunBarrelIntro from "@/components/GunBarrelIntro";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import Scorecard from "@/components/Scorecard";
import TacticalBackdrop from "@/components/TacticalBackdrop";
import TelemetryHeader from "@/components/TelemetryHeader";

export default function Home() {
  return (
    <>
      <GunBarrelIntro />
      <TacticalBackdrop />
      <div className="crt-overlay" aria-hidden="true" />
      <TelemetryHeader />
      <main>
        <Hero />
        <ProjectsGrid />
        <CaseStudies />
        <Scorecard />
      </main>
      <Footer />
      <GoldenGunEasterEgg />
    </>
  );
}
