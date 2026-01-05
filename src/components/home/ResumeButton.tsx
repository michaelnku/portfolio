"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { trackResumeDownload } from "@/actions/analyticsActions";

type Props = {
  resumeUrl?: string;
  resumeName?: string;
  fullName?: string;
};

export default function ResumeButton({
  resumeUrl,
  resumeName,
  fullName,
}: Props) {
  if (!resumeUrl) return null;

  const safeName =
    resumeName ?? `${fullName?.replace(/\s+/g, "_") ?? "Resume"}_Resume.pdf`;

  const handleClick = () => {
    trackResumeDownload();
  };

  return (
    <Button asChild size="lg" variant="outline">
      <a
        href={resumeUrl}
        download={safeName}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
      >
        <Download className="mr-2 h-4 w-4" />
        <p className="text-xs text-muted-foreground">
          Click to download résumé
        </p>
      </a>
    </Button>
  );
}
