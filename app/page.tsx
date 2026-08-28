import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { SignOutButton } from "@/components/dashboard/SignOutButton";
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
      <header className="flex items-center justify-between px-6 pt-6">
        <span className="font-wordmark text-2xl text-terracotta">loopie</span>
        <SignOutButton />
      </header>
      <DashboardClient tasks={(data ?? []) as TaskWithStatus[]} />
    </>
  );
}
