import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";
import CalendarView from "./CalendarView";

async function getScheduledPosts(userId: string, clientId?: string) {
  const where: Record<string, unknown> = {
    post: { client: { userId } },
  };

  if (clientId) {
    where.post = { ...where.post as object, clientId };
  }

  return prisma.platformSchedule.findMany({
    where,
    include: {
      post: {
        include: {
          client: true,
        },
      },
      platform: true,
      socialAccount: true,
    },
    orderBy: { scheduledAt: "asc" },
  });
}

async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const { clientId } = await searchParams;
  const [schedules, clients] = await Promise.all([
    getScheduledPosts(session.user.id, clientId),
    getClients(session.user.id),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Content Calendar</h1>
        <p className="text-[#94a3b8]">
          View and manage your scheduled posts across all platforms
        </p>
      </div>

      <CalendarView
        schedules={schedules}
        clients={clients}
        selectedClientId={clientId}
      />
    </div>
  );
}
