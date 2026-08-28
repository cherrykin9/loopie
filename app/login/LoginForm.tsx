"use client";

import { useActionState, useState } from "react";
import { signIn, sendResetLink } from "./actions";
import { Loopie } from "@/components/mascot/Loopie";

export function LoginForm() {
  const [mode, setMode] = useState<"signin" | "reset">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signIn, null);
  const [resetState, resetAction, resetPending] = useActionState(sendResetLink, null);

  return (
    <div className="max-w-[380px] mx-auto bg-card-bg rounded-[28px] px-7 pt-10 pb-8 text-center shadow-[0_8px_32px_rgba(74,66,59,0.10)]">
      <Loopie variant="neutral" size={90} />
      <p className="font-wordmark text-[30px] text-terracotta mt-2.5 mb-1">loopie</p>

      {mode === "signin" ? (
        <>
          <p className="text-sm text-charcoal-soft mb-6">Welcome back. Let&apos;s see what&apos;s due.</p>
          <form action={signInAction} className="flex flex-col gap-3 text-left">
            <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
              Password
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
              />
            </label>

            {signInState?.error && (
              <p className="text-sm text-red-orange font-semibold">{signInState.error}</p>
            )}

            <button
              type="submit"
              disabled={signInPending}
              className="mt-2 px-7 py-3.5 rounded-2xl bg-terracotta text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(217,119,87,0.35)] disabled:opacity-60"
            >
              {signInPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <button
            onClick={() => setMode("reset")}
            className="mt-4 text-sm text-charcoal-soft underline"
          >
            Forgot password?
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-charcoal-soft mb-6">
            We&apos;ll send a magic link to reset your password.
          </p>

          {resetState?.sent ? (
            <p className="text-sm text-sage font-semibold">Check your email for a reset link.</p>
          ) : (
            <form action={resetAction} className="flex flex-col gap-3 text-left">
              <label className="flex flex-col gap-1 text-sm font-semibold text-charcoal">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-xl border border-terracotta-soft px-4 py-3 text-sm outline-none focus:border-terracotta"
                />
              </label>

              {resetState?.error && (
                <p className="text-sm text-red-orange font-semibold">{resetState.error}</p>
              )}

              <button
                type="submit"
                disabled={resetPending}
                className="mt-2 px-7 py-3.5 rounded-2xl bg-sage text-white font-extrabold text-sm shadow-[0_6px_16px_rgba(143,168,136,0.4)] disabled:opacity-60"
              >
                {resetPending ? "Sending…" : "Send reset link"}
              </button>
            </form>
          )}

          <button
            onClick={() => setMode("signin")}
            className="mt-4 text-sm text-charcoal-soft underline"
          >
            Back to sign in
          </button>
        </>
      )}
    </div>
  );
}
