import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginFallback() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-slate-200/70 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-sm font-semibold text-white">
              R
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">Risk Profile</span>
          </Link>
        </div>
      </header>
      <div className="flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="h-96 w-96 max-w-md animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
