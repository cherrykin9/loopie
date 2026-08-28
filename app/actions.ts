"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createItemWithTask(formData: FormData) {
  const itemName = String(formData.get("itemName") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();
  const taskName = String(formData.get("taskName") ?? "").trim() || itemName;
  const intervalDays = Number(formData.get("intervalDays"));

  if (!itemName || !icon || !intervalDays || intervalDays <= 0) {
    return { error: "Fill in a name, icon, and interval." };
  }

  const supabase = await createClient();

  const { data: item, error: itemError } = await supabase
    .from("items")
    .insert({ name: itemName, icon })
    .select("id")
    .single();

  if (itemError || !item) {
    return { error: itemError?.message ?? "Couldn't create item." };
  }

  const { error: taskError } = await supabase
    .from("tasks")
    .insert({ item_id: item.id, name: taskName, interval_days: intervalDays });

  if (taskError) {
    return { error: taskError.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function markTaskDone(taskId: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().slice(0, 10);

  const { error } = await supabase
    .from("tasks")
    .update({ last_done_date: today })
    .eq("id", taskId);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function updateTask(
  taskId: string,
  updates: { name?: string; intervalDays?: number; lastDoneDate?: string | null }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      ...(updates.name !== undefined ? { name: updates.name } : {}),
      ...(updates.intervalDays !== undefined ? { interval_days: updates.intervalDays } : {}),
      ...(updates.lastDoneDate !== undefined ? { last_done_date: updates.lastDoneDate } : {}),
    })
    .eq("id", taskId);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function removeItem(itemId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("items").delete().eq("id", itemId);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}
