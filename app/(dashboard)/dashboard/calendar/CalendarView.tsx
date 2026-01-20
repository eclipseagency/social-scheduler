"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Instagram,
  Facebook,
  Linkedin,
  Calendar,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";

interface Schedule {
  id: string;
  scheduledAt: Date;
  status: string;
  post: {
    id: string;
    title: string | null;
    caption: string | null;
    client: {
      id: string;
      name: string;
    };
  };
  platform: {
    name: string;
    color: string | null;
  };
}

interface Client {
  id: string;
  name: string;
}

interface CalendarViewProps {
  schedules: Schedule[];
  clients: Client[];
  selectedClientId?: string;
}

function getPlatformIcon(platformName: string) {
  switch (platformName.toLowerCase()) {
    case "instagram":
      return <Instagram className="w-3 h-3" />;
    case "facebook":
      return <Facebook className="w-3 h-3" />;
    case "linkedin":
      return <Linkedin className="w-3 h-3" />;
    default:
      return null;
  }
}

function getPlatformColor(platformName: string) {
  switch (platformName.toLowerCase()) {
    case "instagram":
      return "#E4405F";
    case "facebook":
      return "#1877F2";
    case "linkedin":
      return "#0A66C2";
    default:
      return "#8B5CF6";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "SCHEDULED":
      return "bg-blue-500/20 border-blue-500/30";
    case "POSTED":
      return "bg-green-500/20 border-green-500/30";
    case "FAILED":
      return "bg-red-500/20 border-red-500/30";
    default:
      return "bg-gray-500/20 border-gray-500/30";
  }
}

export default function CalendarView({
  schedules,
  clients,
  selectedClientId,
}: CalendarViewProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getSchedulesForDay = (date: Date) => {
    return schedules.filter((s) => isSameDay(new Date(s.scheduledAt), date));
  };

  const handleClientFilter = (clientId: string) => {
    if (clientId) {
      router.push(`/dashboard/calendar?clientId=${clientId}`);
    } else {
      router.push("/dashboard/calendar");
    }
  };

  const selectedDaySchedules = selectedDate
    ? getSchedulesForDay(selectedDate)
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-2">
        <div className="dashboard-card">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-white">
                {format(currentDate, "MMMM yyyy")}
              </h2>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 text-[#94a3b8] hover:text-white hover:bg-[rgba(139,92,246,0.1)] rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedClientId || ""}
                onChange={(e) => handleClientFilter(e.target.value)}
                className="form-select w-auto text-sm"
              >
                <option value="">All Clients</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="btn-ghost text-sm"
              >
                Today
              </button>
            </div>
          </div>

          {/* Week Days Header */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-xs font-medium text-[#64748b]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 border border-[rgba(139,92,246,0.2)] rounded-lg overflow-hidden">
            {days.map((day, index) => {
              const daySchedules = getSchedulesForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[100px] p-2 border-b border-r border-[rgba(139,92,246,0.1)] text-left transition-colors ${
                    isSelected
                      ? "bg-[rgba(139,92,246,0.15)]"
                      : "hover:bg-[rgba(139,92,246,0.05)]"
                  } ${!isCurrentMonth ? "opacity-40" : ""}`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                      isToday
                        ? "bg-[#8B5CF6] text-white font-bold"
                        : "text-[#94a3b8]"
                    }`}
                  >
                    {format(day, "d")}
                  </span>

                  <div className="mt-1 space-y-1">
                    {daySchedules.slice(0, 3).map((schedule) => (
                      <div
                        key={schedule.id}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${getStatusColor(
                          schedule.status
                        )}`}
                        style={{
                          borderLeftColor: getPlatformColor(schedule.platform.name),
                          borderLeftWidth: "2px",
                        }}
                      >
                        {getPlatformIcon(schedule.platform.name)}
                        <span className="truncate text-[#e2e8f0]">
                          {schedule.post.client.name.slice(0, 8)}
                        </span>
                      </div>
                    ))}
                    {daySchedules.length > 3 && (
                      <span className="text-xs text-[#64748b]">
                        +{daySchedules.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Selected Date Details */}
        <div className="dashboard-card">
          <h3 className="text-lg font-semibold text-white mb-4">
            {selectedDate
              ? format(selectedDate, "EEEE, MMMM d")
              : "Select a date"}
          </h3>

          {selectedDate ? (
            selectedDaySchedules.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-[#64748b] opacity-50" />
                <p className="text-[#94a3b8] mb-4">No posts scheduled</p>
                <Link
                  href={`/dashboard/posts/new${selectedClientId ? `?clientId=${selectedClientId}` : ""}`}
                  className="btn-gradient inline-flex"
                >
                  <Plus className="w-4 h-4" />
                  Schedule Post
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDaySchedules.map((schedule) => (
                  <Link
                    key={schedule.id}
                    href={`/dashboard/posts/${schedule.post.id}`}
                    className="block p-3 rounded-lg bg-[rgba(139,92,246,0.05)] border border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.4)] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${getPlatformColor(schedule.platform.name)}20`,
                          color: getPlatformColor(schedule.platform.name),
                        }}
                      >
                        {getPlatformIcon(schedule.platform.name)}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {schedule.platform.name}
                      </span>
                      <span className="text-xs text-[#64748b]">
                        {format(new Date(schedule.scheduledAt), "h:mm a")}
                      </span>
                    </div>
                    <p className="text-sm text-[#94a3b8] truncate">
                      {schedule.post.title || schedule.post.caption?.slice(0, 50) || "Untitled"}
                    </p>
                    <p className="text-xs text-[#64748b] mt-1">
                      {schedule.post.client.name}
                    </p>
                  </Link>
                ))}

                <Link
                  href={`/dashboard/posts/new${selectedClientId ? `?clientId=${selectedClientId}` : ""}`}
                  className="flex items-center justify-center gap-2 p-3 border border-dashed border-[rgba(139,92,246,0.3)] rounded-lg text-[#94a3b8] hover:text-white hover:border-[rgba(139,92,246,0.5)] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Post
                </Link>
              </div>
            )
          ) : (
            <p className="text-[#64748b] text-center py-8">
              Click on a date to see scheduled posts
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="dashboard-card">
          <h3 className="text-sm font-semibold text-white mb-3">Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-[#94a3b8]">Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-[#94a3b8]">Posted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-[#94a3b8]">Failed</span>
            </div>
          </div>

          <div className="border-t border-[rgba(139,92,246,0.2)] mt-4 pt-4">
            <h4 className="text-sm font-semibold text-white mb-3">Platforms</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-[#E4405F]" />
                <span className="text-xs text-[#94a3b8]">Instagram</span>
              </div>
              <div className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-[#1877F2]" />
                <span className="text-xs text-[#94a3b8]">Facebook</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <span className="text-xs text-[#94a3b8]">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
