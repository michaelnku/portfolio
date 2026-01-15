import { auth } from "@/auth/auth";
import { normalizeUser } from "@/lib/normalizeUser";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json(null);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      role: true,
      image: true,
      profileAvatar: true,
    },
  });

  return Response.json(normalizeUser(user));
}
