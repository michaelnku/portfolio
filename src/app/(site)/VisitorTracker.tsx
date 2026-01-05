"use client";

import { useTrackVisitor } from "@/hooks/useTrackVisitor";

export default function VisitorTracker() {
  useTrackVisitor();
  return null;
}
