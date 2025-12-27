import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectUI } from "@/lib/types";

interface Props {
  projects: ProjectUI[];
}

export default function ProjectsCards({ projects }: Props) {
  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="rounded-xl border p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold leading-tight">{project.name}</h3>
            <p className="text-xs text-muted-foreground">{project.role}</p>

            {project.featured && <Badge variant="outline">Featured</Badge>}
          </div>

          <p className="text-sm text-muted-foreground">{project.summary}</p>

          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <span key={tech} className="rounded bg-muted px-2 py-0.5 text-xs">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {project.published ? (
              <Badge>Published</Badge>
            ) : (
              <Badge variant="secondary">Draft</Badge>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Edit
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          No projects yet
        </p>
      )}
    </div>
  );
}
