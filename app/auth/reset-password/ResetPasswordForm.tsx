"use client";

import { useActionState } from "react";
import { updatePassword } from "./actions";
import { Loopie } from "@/components/mascot/Loopie";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(updatePassword, null);

  return (
    <div className="max-w-[380px] mx-auto bg-card-bg rounded-[28px] px-7 pt-10 pb-8 text-center shadow-[0_8px_32px_rgba(74,66,59,0.10)]">
      <Loopie variant="neutral" size={90} />
      <p className="font-wordmark text-[26px] text-terracotta mt-2.5 mb-1">set a new password</p>
      <form action={action} className="flex flex-col gap-3 text-left mt-4">
        <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
          New password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
          />
        </label>

        {state?.error && <p className="text-sm text-red-orange font-semibold">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 px-7 py-3.5 rounded-2xl bg-terracotta text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(217,119,87,0.35)] disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save password"}
        </button>
      </form>
    </div>
  );
}
