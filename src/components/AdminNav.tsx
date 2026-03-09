"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/dashboard"
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        Back to app
      </Link>
      <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </Button>
    </nav>
  );
}
