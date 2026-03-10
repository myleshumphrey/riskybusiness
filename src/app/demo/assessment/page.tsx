import Link from "next/link";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { Button } from "@/components/ui/button";

export default function DemoAssessmentPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white text-sm font-semibold">
              R
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">Risk Profile</span>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
              Sample
            </span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">Home</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-3 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            Interactive sample
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Sample risk assessment</h1>
          <p className="mt-2 text-slate-600">
            This is a demo. Your answers won&apos;t be saved. Create an account to save your real assessment.
          </p>
        </div>

        <AssessmentWizard demo />
      </main>
    </div>
  );
}
