import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(date: Date | null) {
  if (!date) return "Not Started";
  return date.toLocaleString("id-ID", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function formatTimeRange(
  start: Date | null,
  end: Date | null
) {
  if (!start || !end) return "Not Started";
  return `${formatDateTime(start)} - ${formatDateTime(
    end
  )}`;
}

export function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimestamp(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return hours
    ? `${hours}h`
    : minutes
    ? `${minutes}m`
    : `${remainingSeconds}s`;
}
