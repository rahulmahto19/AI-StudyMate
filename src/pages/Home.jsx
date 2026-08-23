import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import StudentExperience from "../components/StudentExperience";
import PlacementSection from "../components/PlacementSection";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">

      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <StudentExperience />
        <PlacementSection />
        <CTA />
      </main>

      <Footer />

    </div>
  );
}

export default Home;