import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseAddMessage, sendTelegram } from "@/lib/telegram";

const HELP = `Send me something to track, like:
🪴 Monstera, Water, weekly
Car, Service, 180

Format: [icon] item, [task], interval (days or Daily/Weekly/Monthly…)`;

// Telegram webhook. Always answers 200 so Telegram doesn't retry.
export async function POST(request: NextRequest) {
  if (request.headers.get("x-telegram-bot-api-secret-token") !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = await request.json();
  const message = update.message;
  if (!message?.text || String(message.chat.id) !== process.env.TELEGRAM_CHAT_ID) {
    return NextResponse.json({ ok: true });
  }

  const parsed = parseAddMessage(message.text);
  if (!parsed) {
    await sendTelegram(HELP);
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminClient();
  // ponytail: single-user app, so new rows go to the only account. Use an env var if more users sign up.
  const { data: users } = await supabase.auth.admin.listUsers({ perPage: 1 });
  const userId = users?.users[0]?.id;

  const { data: item, error: itemError } = await supabase
    .from("items")
    .insert({ user_id: userId, name: parsed.itemName, icon: parsed.icon })
    .select("id")
    .single();

  const { error: taskError } = item
    ? await supabase.from("tasks").insert({
        user_id: userId,
        item_id: item.id,
        name: parsed.taskName,
        interval_days: parsed.intervalDays,
      })
    : { error: null };

  const error = itemError ?? taskError;
  await sendTelegram(
    error
      ? `Couldn't add that: ${error.message}`
      : `Added ${parsed.icon} ${parsed.itemName} — ${parsed.taskName}, every ${parsed.intervalDays} day${parsed.intervalDays === 1 ? "" : "s"}`
  );
  return NextResponse.json({ ok: true });
}
