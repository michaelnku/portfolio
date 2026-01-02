import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type ResumeButtonProps = {
  resumeUrl?: string;
};

export default function ResumeButton({ resumeUrl }: ResumeButtonProps) {
  if (!resumeUrl) return null;

  return (
    <Button asChild className="mt-4">
      <Link href={resumeUrl} target="_blank" rel="noreferrer">
        <Download className="mr-2 h-4 w-4" />
        Download Resume
      </Link>
    </Button>
  );
}
