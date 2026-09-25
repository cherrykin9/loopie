import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDueLabel, type TaskWithStatus } from "@/lib/tasks";
import { sendTelegram } from "@/lib/telegram";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("task_status")
    .select("*")
    .in("status", ["overdue", "due_soon"])
    .order("next_due", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const tasks = (data ?? []) as TaskWithStatus[];
  if (tasks.length === 0) {
    return NextResponse.json({ sent: false, taskCount: 0 });
  }

  const text = [
    `🌀 loopie: ${tasks.length} thing${tasks.length === 1 ? "" : "s"} need attention`,
    "",
    ...tasks.map((t) => `${t.item_icon} ${t.item_name} — ${t.task_name} (${formatDueLabel(t)})`),
  ].join("\n");

  const res = await sendTelegram(text, {
    reply_markup: {
      inline_keyboard: tasks.map((t) => [
        { text: `✅ ${t.item_name} — ${t.task_name}`, callback_data: `done:${t.id}` },
      ]),
    },
  });
  if (!res.ok) {
    return NextResponse.json({ error: await res.text() }, { status: 500 });
  }

  return NextResponse.json({ sent: true, taskCount: tasks.length });
}
