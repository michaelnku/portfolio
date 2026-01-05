"use server";

import { prisma } from "@/lib/prisma";

function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function trackResumeDownload() {
  const date = today();

  await prisma.portfolioAnalytics.upsert({
    where: { date },
    update: {
      resumeDownloads: { increment: 1 },
    },
    create: {
      date,
      resumeDownloads: 1,
    },
  });
}
export async function trackVisitor() {
  const date = today();

  await prisma.portfolioAnalytics.upsert({
    where: { date },
    update: {
      totalVisitors: { increment: 1 },
    },
    create: {
      date,

      totalVisitors: 1,
    },
  });
}
