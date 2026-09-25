import { INTERVAL_PRESETS } from "@/lib/tasks";

export async function telegram(method: string, body: object) {
  return fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export async function sendTelegram(text: string, extra: object = {}) {
  return telegram("sendMessage", { chat_id: process.env.TELEGRAM_CHAT_ID, text, ...extra });
}

// "🪴 Monstera, Water, weekly" → { icon, itemName, taskName, intervalDays }
// Icon and task name are optional; interval is a number of days or a preset label.
export function parseAddMessage(text: string) {
  const parts = text.replace(/^\/add(@\S+)?/i, "").split(",").map((s) => s.trim());
  if (parts.length < 2 || parts.some((p) => !p)) return null;

  const intervalText = parts.pop()!.toLowerCase();
  const intervalDays =
    INTERVAL_PRESETS.find((p) => p.label.toLowerCase() === intervalText)?.days ??
    Number(intervalText.replace(/\s*days?$/, ""));
  if (!Number.isInteger(intervalDays) || intervalDays <= 0) return null;

  const match = parts[0].match(/^(\p{Extended_Pictographic}️?)\s*(.*)$/u);
  const icon = match?.[1] ?? "🌀";
  const itemName = match ? match[2] : parts[0];
  if (!itemName) return null;

  return { icon, itemName, taskName: parts[1] ?? itemName, intervalDays };
}
