"use client";

import { useEffect } from "react";
import { trackVisitor } from "@/actions/analyticsActions";

export function useTrackVisitor() {
  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (!visited) {
      trackVisitor();
      sessionStorage.setItem("visited", "true");
    }
  }, []);
}
