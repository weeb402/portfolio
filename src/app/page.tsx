import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import CaseStudies from "@/components/CaseStudies";
import Scorecard from "@/components/Scorecard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectGrid />
      <CaseStudies />
      <Scorecard />
      <Footer />
    </main>
  );
}
