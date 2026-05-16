import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-[var(--color-matte-black)]">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
