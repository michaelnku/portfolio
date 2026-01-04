"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import HireMeForm from "./HireMeForm";
import { useState } from "react";

const HireMeButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Hire Me
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Let’s work together</DialogTitle>
        </DialogHeader>

        <HireMeForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default HireMeButton;
