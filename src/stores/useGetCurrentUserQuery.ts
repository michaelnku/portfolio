"use client";

import { UserDTO } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrentUserQuery(initialUser?: UserDTO | null) {
  return useQuery<UserDTO | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await fetch("/api/current-user", { credentials: "include" });

      if (!res.ok) return null;
      const data = await res.json();
      return (data as UserDTO) ?? null;
    },
    initialData: initialUser ?? null,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}
