import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/5 blur-3xl" />
      </div>

      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white text-sm font-semibold">
              R
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">Risk Profile</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to home</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Card className="border-slate-200/80 shadow-xl shadow-slate-200/30">
          <CardHeader>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-2xl">
              ✨
            </div>
            <CardTitle className="font-display mt-4 text-2xl">Try a sample assessment</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Go through the full assessment flow without creating an account. See how it works and what your risk profile could look like. No sign-up required.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/demo/assessment">
              <Button size="lg" className="w-full h-12 text-base font-semibold bg-teal-600 hover:bg-teal-700">
                Start sample assessment
              </Button>
            </Link>
            <p className="text-center text-sm text-slate-500">
              Takes about 5–10 minutes
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
