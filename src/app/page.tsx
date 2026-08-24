import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";
import GunBarrelIntro from "@/components/GunBarrelIntro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import Scorecard from "@/components/Scorecard";

export default function Home() {
  return (
    <>
      <GunBarrelIntro />
      <div className="crt-overlay" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <ProjectsGrid />
        <CaseStudies />
        <Scorecard />
      </main>
      <Footer />
    </>
  );
}
