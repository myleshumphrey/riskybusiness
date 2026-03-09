"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CategoryChart } from "@/components/dashboard/CategoryChart";

const CATEGORIES = [
  { key: "operational", label: "Operational", color: "#0d9488" },
  { key: "cyber", label: "Cyber & Tech", color: "#0891b2" },
  { key: "governance", label: "Governance", color: "#10b981" },
  { key: "resilience", label: "Resilience", color: "#f59e0b" },
  { key: "claims", label: "Claims History", color: "#ef4444" },
];

function getScoreColor(score: number) {
  if (score >= 85) return "bg-emerald-500";
  if (score >= 70) return "bg-teal-500";
  if (score >= 55) return "bg-amber-500";
  if (score >= 40) return "bg-orange-500";
  return "bg-red-500";
}

interface RiskScoreResult {
  overall: number;
  operational: number;
  cyber: number;
  governance: number;
  resilience: number;
  claims: number;
  level: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: { title: string; description: string; priority: string }[];
}

export default function DemoResultsPage() {
  const [result, setResult] = useState<RiskScoreResult | null>(null);
  const [companyName, setCompanyName] = useState("Sample Business");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem("demoRiskScore");
    const name = sessionStorage.getItem("demoCompanyName");
    if (stored) {
      setResult(JSON.parse(stored) as RiskScoreResult);
      if (name) setCompanyName(name);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>No sample results</CardTitle>
            <CardDescription>
              Complete a sample assessment first to see your risk profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/demo/assessment">
              <Button className="w-full">Start sample assessment</Button>
            </Link>
            <Link href="/" className="block mt-4">
              <Button variant="ghost" className="w-full">Back to home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = CATEGORIES.map((c) => ({
    name: c.label,
    score: result[c.key as keyof RiskScoreResult] as number,
    fill: c.color,
  }));

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-slate-200/60 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/demo" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white text-sm font-semibold">
              R
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">Risk Profile</span>
            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">
              Sample
            </span>
          </Link>
          <div className="flex gap-2">
            <Link href="/signup">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                Save my results — Sign up
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="ghost" size="sm">Exit sample</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 rounded-lg border border-teal-200 bg-teal-50/50 px-4 py-3 text-sm text-teal-800">
          This is a sample. To save your results and download a PDF report,{" "}
          <Link href="/signup" className="font-medium underline hover:no-underline">create a free account</Link>.
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">Your risk profile</h1>
              <p className="mt-2 text-slate-600">
                {companyName} — sample assessment
              </p>
            </div>
            <Link href="/demo/assessment">
              <Button variant="outline">Try again</Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-1 border-slate-200/80 shadow-md">
              <CardHeader>
                <CardTitle>Overall score</CardTitle>
                <CardDescription>Your company risk profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-white ${getScoreColor(result.overall)}`}
                >
                  {result.overall}
                </div>
                <Badge className="mt-4" variant="secondary">
                  {result.level}
                </Badge>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 border-slate-200/80 shadow-md">
              <CardHeader>
                <CardTitle>Category breakdown</CardTitle>
                <CardDescription>Scores by risk area</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryChart data={chartData} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-slate-200/80 shadow-md">
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>What you&apos;re doing well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600">✓</span>
                      <span className="text-slate-700">{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-md">
              <CardHeader>
                <CardTitle>Key gaps</CardTitle>
                <CardDescription>Areas to improve</CardDescription>
              </CardHeader>
              <CardContent>
                {result.weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500">!</span>
                        <span className="text-slate-700">{w}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No significant gaps identified.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200/80 shadow-md">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Prioritized next steps to improve your risk profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex gap-4 rounded-lg border border-slate-200/80 p-4">
                    <Badge
                      variant={r.priority === "high" ? "destructive" : "secondary"}
                      className="shrink-0"
                    >
                      {r.priority}
                    </Badge>
                    <div>
                      <p className="font-medium text-slate-900">{r.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{r.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
