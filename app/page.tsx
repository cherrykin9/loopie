import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
import { Loopie } from "@/components/mascot/Loopie";
import type { TaskWithStatus } from "@/lib/tasks";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("task_status")
    .select("*")
    .order("next_due", { ascending: true });

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center p-6">
        <p className="text-red-orange font-semibold">Couldn&apos;t load your tasks: {error.message}</p>
      </main>
    );
  }

  return (
    <>
      <header className="max-w-[720px] w-full mx-auto flex items-center justify-between flex-wrap gap-3 px-6 pt-8 pb-2">
        <div className="flex items-center gap-2">
          <Loopie variant="neutral" size={64} animate={false} />
          <span className="font-wordmark text-3xl text-terracotta">loopie</span>
        </div>
        <div className="text-right">
          <p className="text-sm text-charcoal-soft">Everything on its cycle, nothing forgotten</p>
          <SignOutButton />
        </div>
      </header>
      <DashboardClient tasks={(data ?? []) as TaskWithStatus[]} />
      <footer className="text-center text-xs text-charcoal-soft py-6">
        loopie © 2026 · made for Yimun
      </footer>
    </>
  );
}
