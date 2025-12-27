import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectUI } from "@/lib/types";

interface Props {
  projects: ProjectUI[];
}

export default function ProjectsTable({ projects }: Props) {
  return (
    <div className="rounded-xl border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Tech</th>
            <th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t hover:bg-muted/50 transition"
            >
              <td className="px-4 py-3">
                <div className="font-medium">{project.name}</div>
                <div className="text-xs text-muted-foreground">
                  {project.summary.slice(0, 60)}…
                </div>
              </td>

              <td className="px-4 py-3 space-x-2">
                {project.published ? (
                  <Badge>Published</Badge>
                ) : (
                  <Badge variant="secondary">Draft</Badge>
                )}

                {project.featured && <Badge variant="outline">Featured</Badge>}
              </td>

              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-muted px-2 py-0.5 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {projects.length === 0 && (
        <div className="p-6 text-center text-muted-foreground">
          No projects yet
        </div>
      )}
    </div>
  );
}
