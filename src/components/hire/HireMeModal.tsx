"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import HireMeForm from "./HireMeForm";

export default function HireMeModal() {
  return (
    <Dialog>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Let’s work together</DialogTitle>
        </DialogHeader>

        <HireMeForm />
      </DialogContent>
    </Dialog>
  );
}
