import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const ResumeButton = () => {
  return (
    <a href="/Michael_Nku_Resume.pdf" target="_blank" rel="noopener noreferrer">
      <Button variant="outline">
        <Download />
        Download Resume
      </Button>
    </a>
  );
};

export default ResumeButton;
