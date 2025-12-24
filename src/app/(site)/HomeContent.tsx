import Hero from "@/components/hero/Hero";
import AboutPage from "./AboutMe/page";
import ProjectsPage from "./Projects/page";
import ContactPage from "./Contact/page";

const HomeContent = () => {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section id="about" className="py-24">
        <AboutPage />
      </section>

      <section id="projects" className="py-24">
        <ProjectsPage />
      </section>

      <section id="contact" className="py-24">
        <ContactPage />
      </section>
    </>
  );
};

export default HomeContent;
