import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPublicProjects } from "@/helper/getPublicProjects";

const projects = [
  {
    name: "NexaMart Marketplace",
    role: "Full-Stack Developer",
    description:
      "A full-featured marketplace platform designed for real-world commerce, including role-based dashboards, product management, and secure payments.",
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Tailwind CSS",
    ],
    features: [
      "Role-based access (Moderator, Admin, Seller, Rider, Buyer)",
      "Product & inventory management",
      "Secure authentication & authorization",
      "Stripe payment integration",
      "Modern dashboard UI",
    ],
    status: "Flagship Project",
    link: "nexamart-store-red.vercel.app",
  },
];

const ProjectsSection = async () => {
  const pj = await getPublicProjects();
  return (
    <section className="mx-auto max-w-5xl px-6 space-y-20">
      {/* HEADER */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A selection of projects showcasing my experience building scalable,
          production-ready web applications.
        </p>
      </header>

      {/* PROJECTS */}
      {projects.map((project) => (
        <div key={project.name} className="rounded-2xl border p-8 space-y-8">
          {/* TITLE */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold">{project.name}</h2>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                {project.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{project.role}</p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* FEATURES */}
          <div className="space-y-3">
            <h3 className="font-medium">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground text-sm">
              {project.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>

          {/* STACK */}
          <div className="flex flex-wrap gap-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-4 py-1 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild>
              <Link href={project.link}>View Project</Link>
            </Button>

            <Button variant="outline">Request Demo</Button>
          </div>
        </div>
      ))}

      {/* PROJECTS */}
      {pj.map((project) => (
        <div key={project.id} className="rounded-2xl border p-8 space-y-8">
          {/* TITLE */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold">{project.name}</h2>

              {project.isFlagship && (
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                  Flagship Project
                </span>
              )}

              {!project.isFlagship && project.featured && (
                <span className="rounded-full border px-3 py-1 text-sm">
                  Featured
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{project.role}</p>
          </div>

          {/* SUMMARY */}
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* FEATURES */}
          <div className="space-y-3">
            <h3 className="font-medium">Key Features</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground text-sm">
              {project.keyFeatures.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>

          {/* STACK */}
          <div className="space-y-3">
            <h3 className="font-medium">Tech Stack</h3>

            <ul className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {project.techStack.map((tech) => (
                <li key={tech} className="rounded-full border px-4 py-1">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveUrl && (
              <Button asChild>
                <Link
                  href={
                    project.liveUrl.startsWith("http")
                      ? project.liveUrl
                      : `https://${project.liveUrl}`
                  }
                  target="_blank"
                >
                  View Project
                </Link>
              </Button>
            )}

            <Button variant="outline">Request Demo</Button>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-muted-foreground text-center">
          No projects published yet.
        </p>
      )}
    </section>
  );
};
export default ProjectsSection;
