import { ProjectUI } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
  EmptyContent,
} from "@/components/ui/empty";

type Props = {
  project: ProjectUI[];
};

const ProjectsSection = ({ project }: Props) => {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 space-y-20">
      {/* HEADER */}
      <header className="space-y-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold">Selected Projects</h1>

        <p className="text-muted-foreground text-lg">
          A curated selection of production-ready projects demonstrating my
          experience designing, building, and scaling modern web applications.
        </p>
      </header>

      {/* PROJECT LIST */}
      <div className="space-y-12">
        {project.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border p-8 space-y-10"
          >
            {/* TITLE + META */}
            <header className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold">{project.name}</h2>

                {project.isFlagship && (
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600">
                    Flagship Project
                  </span>
                )}

                {!project.isFlagship && project.featured && (
                  <span className="rounded-full border px-3 py-1 text-sm">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Role: <span className="font-medium">{project.role}</span>
              </p>
            </header>

            {/* OVERVIEW */}
            <section className="space-y-2">
              <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                Overview
              </h3>

              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {project.summary}
              </p>
            </section>

            {/* KEY CONTRIBUTIONS */}
            {project.keyFeatures.length > 0 && (
              <section className="space-y-3">
                <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  Key Contributions
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={`${project.id}-${index}`}>• {feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* TECH STACK */}
            {project.techStack.length > 0 && (
              <section className="space-y-3">
                <h3 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  Technology Stack
                </h3>

                <ul className="flex flex-wrap gap-2 text-sm">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech.key}
                      className="rounded-full border px-4 py-1 text-muted-foreground"
                    >
                      {tech.value}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* ACTIONS */}
            <footer className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <Button asChild>
                  <Link
                    href={
                      project.liveUrl.startsWith("http")
                        ? project.liveUrl
                        : `https://${project.liveUrl}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Live Project
                  </Link>
                </Button>
              )}

              <Button variant="outline" asChild>
                <Link href="#contact">Discuss This Project</Link>
              </Button>
            </footer>
          </article>
        ))}
      </div>

      {/* EMPTY STATE */}
      {project.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen className="h-8 w-8" />
            </EmptyMedia>

            <EmptyTitle>Selected projects in progress</EmptyTitle>

            <EmptyDescription>
              I focus on quality over quantity. A curated selection of
              production-grade projects will appear here shortly.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button asChild>
              <Link href="#contact">Contact me</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </section>
  );
};

export default ProjectsSection;
