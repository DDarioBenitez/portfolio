import SiteShell from "../components/SiteShell";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <AboutMe />
      <Projects />
      <Contact />
    </SiteShell>
  );
}
