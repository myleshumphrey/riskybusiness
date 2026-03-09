"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { calculateRiskScore } from "@/lib/scoring/engine";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  SECTIONS,
  type Question,
  type AssessmentAnswers,
} from "@/lib/assessment/questions";
import { CheckCircle2 } from "lucide-react";

const DEBOUNCE_MS = 500;

export function AssessmentWizard({ demo = false }: { demo?: boolean }) {
  const router = useRouter();
  const [assessmentId, setAssessmentId] = useState<string | null>(demo ? "demo" : null);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(!demo);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const section = SECTIONS[currentStep];
  const isLastStep = currentStep === SECTIONS.length - 1;

  const loadAssessment = useCallback(async () => {
    if (demo) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/assessment", { method: "POST" });
      const data = await res.json();
      const assessment = data.assessment;
      if (assessment) {
        setAssessmentId(assessment.id);
        setAnswers((assessment.answers ?? {}) as AssessmentAnswers);
      } else {
        setError("Failed to create assessment");
      }
    } catch {
      setError("Failed to load assessment");
    } finally {
      setLoading(false);
    }
  }, [demo]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  const saveAnswers = useCallback(
    async (updates: AssessmentAnswers, companyUpdates?: Record<string, unknown>) => {
      if (demo || !assessmentId) return;
      setSaving(true);
      try {
        const res = await fetch(`/api/assessment/${assessmentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: { ...answers, ...updates },
            companyUpdates: companyUpdates || undefined,
          }),
        });
        if (!res.ok) throw new Error("Save failed");
      } catch {
        setError("Failed to save");
      } finally {
        setSaving(false);
      }
    },
    [demo, assessmentId, answers]
  );

  const debouncedSave = useCallback(() => {
    if (demo) return () => {};
    const timeout = setTimeout(() => {
      saveAnswers(answers);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [demo, answers, saveAnswers]);

  useEffect(() => {
    if (demo || !assessmentId || Object.keys(answers).length === 0) return;
    return debouncedSave();
  }, [demo, answers, assessmentId, debouncedSave]);

  const handleAnswer = (questionId: string, value: string | number | string[]) => {
    const updates = { [questionId]: value };
    setAnswers((prev) => ({ ...prev, ...updates }));

    if (!demo && currentStep === 0) {
      const companyUpdates: Record<string, unknown> = {};
      if (questionId === "businessName") companyUpdates.name = value;
      if (questionId === "industry") companyUpdates.industry = value;
      if (questionId === "companySize") companyUpdates.size = value;
      if (questionId === "employeeCount") companyUpdates.employeeCount = Number(value) || undefined;
      if (questionId === "revenueRange") companyUpdates.revenueRange = value;
      if (questionId === "location") companyUpdates.location = value;
      if (questionId === "businessType") companyUpdates.businessType = value;
      if (questionId === "handlesData") companyUpdates.handlesData = value === "yes";
      if (questionId === "acceptsPayments") companyUpdates.acceptsPayments = value === "yes";
      if (Object.keys(companyUpdates).length > 0) {
        saveAnswers({ ...answers, ...updates }, companyUpdates);
      }
    }
  };

  const handleSubmit = async () => {
    if (!assessmentId) return;
    setSubmitting(true);
    setError("");
    try {
      if (demo) {
        const result = calculateRiskScore(answers);
        sessionStorage.setItem("demoRiskScore", JSON.stringify(result));
        sessionStorage.setItem("demoCompanyName", (answers.businessName as string) || "Sample Business");
        router.push("/demo/results");
        return;
      }
      const res = await fetch(`/api/assessment/${assessmentId}/submit`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submit failed");
      }
      router.push(`/dashboard/${assessmentId}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to submit");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error && !assessmentId) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
        {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm backdrop-blur">
        <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
          <span className="font-medium">
            Step {currentStep + 1} of {SECTIONS.length}
          </span>
          {demo ? (
            <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-700">
              Sample mode
            </span>
          ) : (
            saving && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                Saving...
              </span>
            )
          )}
        </div>
        <Progress
          value={((currentStep + 1) / SECTIONS.length) * 100}
          className="h-2"
        />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {SECTIONS.map((item, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs transition-all ${
                  isActive
                    ? "border-teal-200 bg-teal-50 text-teal-700"
                    : isDone
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-slate-50 text-slate-500"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <span className="font-semibold">{idx + 1}</span>
                )}
                <span className="truncate">{item.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        key={section.id}
        className="mb-8 animate-in fade-in-0 slide-in-from-right-2 duration-300 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/25"
      >
        <h2 className="font-display text-2xl font-bold text-slate-900">
          {section.title}
        </h2>
        <p className="mt-2 text-slate-600">{section.description}</p>

        <div className="mt-8 space-y-5">
          {section.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => handleAnswer(q.id, v)}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive animate-in fade-in-0 duration-200">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="h-11 px-6"
        >
          Back
        </Button>
        {isLastStep ? (
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="h-11 px-6 bg-teal-600 hover:bg-teal-700"
          >
            {submitting ? "Calculating..." : "See your risk profile"}
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="h-11 px-6 bg-teal-600 hover:bg-teal-700"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

function QuestionField({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string | number | string[] | undefined;
  onChange: (v: string | number | string[]) => void;
}) {
  const { id, label, type, options, required, placeholder } = question;

  if (type === "text") {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-colors hover:bg-slate-50">
        <Label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </Label>
        <Input
          id={id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="mt-3 h-11 border-slate-300/80 bg-white"
        />
      </div>
    );
  }

  if (type === "number") {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-colors hover:bg-slate-50">
        <Label htmlFor={id} className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </Label>
        <Input
          id={id}
          type="number"
          value={(value as number) ?? ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
          placeholder={placeholder}
          className="mt-3 h-11 border-slate-300/80 bg-white"
          min={0}
        />
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-colors hover:bg-slate-50">
        <Label className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </Label>
        <Select
          value={(value as string) ?? ""}
          onValueChange={(v) => onChange(v ?? "")}
        >
          <SelectTrigger className="mt-3 h-11 border-slate-300/80 bg-white">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
        <Label className="text-sm font-medium text-slate-800">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </Label>
        <RadioGroup
          value={(value as string) ?? ""}
          onValueChange={(v) => onChange(v)}
          className="mt-3 flex flex-col gap-2.5"
        >
          {options?.map((o) => (
            <div
              key={o.value}
              className={`group flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 transition-all hover:border-teal-300 hover:bg-teal-50/50 ${
                value === o.value ? "border-teal-400 bg-teal-50" : "border-slate-200"
              }`}
            >
              <RadioGroupItem value={o.value} id={`${id}-${o.value}`} />
              <Label
                htmlFor={`${id}-${o.value}`}
                className="cursor-pointer font-normal text-slate-700"
              >
                {o.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (type === "checkbox") {
    const selected = (value as string[]) ?? [];
    return (
      <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-4">
        <Label className="text-sm font-medium text-slate-800">{label}</Label>
        <div className="mt-3 flex flex-col gap-2.5">
          {options?.map((o) => (
            <div
              key={o.value}
              className={`flex items-center gap-3 rounded-lg border bg-white px-3 py-2.5 transition-all hover:border-teal-300 hover:bg-teal-50/50 ${
                selected.includes(o.value)
                  ? "border-teal-400 bg-teal-50"
                  : "border-slate-200"
              }`}
            >
              <Checkbox
                id={`${id}-${o.value}`}
                checked={selected.includes(o.value)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? [...selected, o.value]
                    : selected.filter((x) => x !== o.value);
                  onChange(next);
                }}
              />
              <Label
                htmlFor={`${id}-${o.value}`}
                className="cursor-pointer font-normal text-slate-700"
              >
                {o.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
