import { formatDueLabel, type TaskWithStatus } from "@/lib/tasks";

export function renderDigestEmail(tasks: TaskWithStatus[]) {
  const rows = tasks
    .map(
      (t) => `
        <tr>
          <td style="padding:10px 0;font-size:20px;width:36px;">${t.item_icon}</td>
          <td style="padding:10px 0;">
            <div style="font-weight:700;color:#4A423B;font-size:14px;">${t.item_name}</div>
            <div style="color:#8A8078;font-size:13px;">${t.task_name}</div>
          </td>
          <td style="padding:10px 0;text-align:right;font-weight:700;font-size:13px;color:${
            t.status === "overdue" ? "#E06B3C" : "#E0A63C"
          };white-space:nowrap;">
            ${formatDueLabel(t)}
          </td>
        </tr>`
    )
    .join("");

  const subject =
    tasks.length === 0
      ? "loopie: all caught up today 🎉"
      : `loopie: ${tasks.length} thing${tasks.length === 1 ? "" : "s"} need attention today`;

  const body =
    tasks.length === 0
      ? `<p style="color:#8A8078;font-size:14px;">Nothing due today. Loopie is curled up happy — go enjoy your day.</p>`
      : `
        <p style="color:#8A8078;font-size:14px;margin-bottom:16px;">Here's what Loopie's keeping an eye on today:</p>
        <table style="width:100%;border-collapse:collapse;">${rows}</table>
      `;

  const html = `
    <div style="font-family:Nunito,Arial,sans-serif;background:#FAF3E9;padding:32px 16px;">
      <div style="max-width:420px;margin:0 auto;background:#FFFFFF;border-radius:24px;padding:28px 24px;">
        <div style="font-family:Georgia,serif;font-size:22px;color:#D97757;margin-bottom:4px;">loopie 🌀</div>
        ${body}
      </div>
    </div>
  `;

  return { subject, html };
}
