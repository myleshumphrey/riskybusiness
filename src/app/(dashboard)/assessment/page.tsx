import Link from "next/link";
import { AssessmentWizard } from "@/components/assessment/AssessmentWizard";
import { Button } from "@/components/ui/button";

export default function AssessmentPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="mb-3 inline-flex rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
          Guided flow
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Risk Assessment</h1>
          <p className="mt-2 text-slate-600">
            Complete each section. Your progress is saved automatically. You can come back anytime.
          </p>
        </div>
        <div className="mt-4">
          <Link href="/dashboard">
            <Button variant="outline" className="border-slate-300">
              Save and continue later
            </Button>
          </Link>
        </div>
      </div>

      <AssessmentWizard />
    </div>
  );
}
