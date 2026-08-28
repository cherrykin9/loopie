import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { renderDigestEmail } from "@/lib/email/digest-template";
import type { TaskWithStatus } from "@/lib/tasks";

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
  const { subject, html } = renderDigestEmail(tasks);

  // "onboarding@resend.dev" only delivers to the Resend account's own verified
  // address. Swap in a verified sending domain (Resend > Domains) for real use.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error: sendError } = await resend.emails.send({
    from: "Loopie <onboarding@resend.dev>",
    to: process.env.DIGEST_TO_EMAIL!,
    subject,
    html,
  });

  if (sendError) {
    return NextResponse.json({ error: sendError.message }, { status: 500 });
  }

  return NextResponse.json({ sent: true, taskCount: tasks.length });
}
