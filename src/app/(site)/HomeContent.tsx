import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import AboutSection from "@/components/sections/About";
import Hero from "@/components/hero/h";

const HomeContent = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about" className="section-spacing">
        <AboutSection />
      </section>

      <section id="projects" className="section-spacing">
        <ProjectsSection />
      </section>

      <section id="contact" className="section-spacing">
        <ContactSection />
      </section>
    </>
  );
};

export default HomeContent;
