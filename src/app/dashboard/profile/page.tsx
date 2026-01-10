import { prisma } from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Briefcase,
} from "lucide-react";

export default async function ProfilePage() {
  const user = await CurrentUser();
  if (!user) return null;

  const [about, contact, projects] = await Promise.all([
    prisma.about.findUnique({
      where: { createdById: user.id },
    }),
    prisma.contact.findUnique({
      where: { createdById: user.id },
    }),
    prisma.project.findMany({
      where: { createdById: user.id, published: true },
      select: { id: true, isFlagship: true, featured: true },
    }),
  ]);

  return (
    <div className="max-w-5xl space-y-10">
      {/* ===== PROFILE HEADER ===== */}
      <Card>
        <CardContent className="pt-6 flex flex-col md:flex-row gap-6 items-start">
          {about?.profileImage && (
            <Image
              src={about?.profileImage | ""}
              alt={about.fullName}
              width={120}
              height={120}
              className="rounded-full object-cover border"
            />
          )}

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">
              {about?.fullName ?? user.name ?? "—"}
            </h1>

            <p className="text-muted-foreground">
              {about?.headline ?? "Professional profile"}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="rounded-full border px-3 py-1 text-sm">
                {user.role}
              </span>

              {contact?.availableForWork && (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-600">
                  Open to work
                </span>
              )}

              {contact?.openToRelocation && (
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-600">
                  Open to relocation
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
