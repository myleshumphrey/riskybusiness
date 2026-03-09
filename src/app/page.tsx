import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#0d9488]/5 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-[#06b6d4]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[#14b8a6]/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white font-semibold text-sm">
              R
            </div>
            <span className="font-display text-lg font-semibold text-slate-900">Risk Profile</span>
          </Link>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-900/10">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section className="relative pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50/80 px-4 py-1.5 text-sm font-medium text-teal-700 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            Trusted by 500+ small businesses
          </div>
          <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Understand your business risk{" "}
            <span className="text-teal-600">in minutes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            A simpler way to see your company&apos;s risk profile. Answer guided questions in plain English and get a clear, professional assessment — no compliance jargon.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8 text-base font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-900/20 transition-all hover:shadow-teal-900/30 hover:-translate-y-0.5">
                Start assessment
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium border-slate-300 hover:bg-slate-50">
                Try sample — no login
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="ghost" className="h-12 px-8 text-base font-medium text-slate-600 hover:text-slate-900">
                I have an account
              </Button>
            </Link>
          </div>
        </section>

        {/* Example risk profile preview */}
        <section className="py-16">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-teal-600">
            What you&apos;ll get
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-slate-900">
            Your risk profile at a glance
          </h2>
          <div className="mx-auto mt-10 max-w-md">
            <Card className="overflow-hidden border-0 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60">
              <div className="bg-gradient-to-br from-slate-50 to-white px-6 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Overall risk score</p>
                    <p className="mt-1 font-display text-3xl font-bold text-slate-900">78</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-white shadow-lg shadow-emerald-500/30">
                    78
                  </div>
                </div>
                <Badge className="mt-3 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                  Good
                </Badge>
              </div>
              <CardContent className="p-6 pt-4">
                <div className="space-y-3">
                  {[
                    { label: "Operational", score: 82, color: "bg-teal-500" },
                    { label: "Cyber & Tech", score: 75, color: "bg-cyan-500" },
                    { label: "Governance", score: 70, color: "bg-emerald-500" },
                  ].map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-600">{cat.label}</span>
                      <div className="flex flex-1 max-w-32 items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${cat.color}`}
                            style={{ width: `${cat.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700 w-6">{cat.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-teal-600">
            Simple process
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-slate-900">
            How it works
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-3">
            {[
              { step: 1, title: "Sign up", desc: "Create a free account in seconds. No credit card required.", icon: "📋" },
              { step: 2, title: "Answer questions", desc: "Complete our guided assessment in under 10 minutes.", icon: "✏️" },
              { step: 3, title: "Get your profile", desc: "Receive a risk score, breakdown, and actionable recommendations.", icon: "📊" },
            ].map((item) => (
              <Card
                key={item.step}
                className="group relative overflow-hidden border-slate-200/80 bg-white shadow-md shadow-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-teal-100/50 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-xl text-teal-600 font-semibold">
                    {item.icon}
                  </div>
                  <CardTitle className="font-display mt-4 text-lg text-slate-900">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {item.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm font-medium uppercase tracking-wider text-teal-600">
              Built for you
            </p>
            <h2 className="mt-2 text-center font-display text-2xl font-bold text-slate-900">
              Built for small businesses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
              No dedicated risk or security team? No problem. We translate complex concepts into plain business language.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {[
                "Fast assessment — complete in under 10 minutes",
                "Clear risk score and category breakdown",
                "Actionable recommendations to improve your profile",
                "Professional report to share with partners or insurers",
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-600">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials placeholder */}
        <section className="py-20">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-teal-600">
            What others say
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-bold text-slate-900">
            Trusted by small business owners
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
            <Card className="border-slate-200/80 bg-white shadow-md">
              <CardContent className="pt-6">
                <p className="text-slate-600 italic">
                  &quot;Finally, a risk assessment that doesn&apos;t feel like filling out a government form. Took 8 minutes and the report looked professional enough to share with our insurance broker.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-teal-200" />
                  <div>
                    <p className="font-semibold text-slate-900">Sarah M.</p>
                    <p className="text-sm text-slate-500">Owner, Coastal Design Co.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 bg-white shadow-md">
              <CardContent className="pt-6">
                <p className="text-slate-600 italic">
                  &quot;We needed to show our risk profile for a vendor review. Risk Profile made it simple — clear scores, no jargon, and a PDF we could attach to the application.&quot;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-200" />
                  <div>
                    <p className="font-semibold text-slate-900">James T.</p>
                    <p className="text-sm text-slate-500">Founder, TechFlow Consulting</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <Card className="mx-auto max-w-2xl overflow-hidden border-0 bg-gradient-to-br from-teal-600 to-teal-700 shadow-2xl shadow-teal-900/30">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-display text-2xl text-white">
                Ready to understand your risk?
              </CardTitle>
              <CardDescription className="text-base text-teal-100">
                Join small business owners who have simplified their risk visibility.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-8">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-white text-teal-700 hover:bg-slate-100 shadow-lg"
                >
                  Start your assessment
                </Button>
              </Link>
              <Link href="/demo" className="text-sm text-teal-100 hover:text-white underline">
                Or try a sample without signing up
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-600 text-white text-xs font-bold">
                R
              </div>
              <span className="font-display text-sm font-semibold text-slate-900">Risk Profile</span>
            </div>
            <p className="text-center text-sm text-slate-500 sm:text-right">
              © {new Date().getFullYear()} Risk Profile. A simpler way to see your company&apos;s risk.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
