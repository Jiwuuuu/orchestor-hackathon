"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardNav() {
  return (
    <nav className="bg-white py-[clamp(20px,4vw,30px)] px-[clamp(60px,12vw,120px)]">
      <div className="flex items-center justify-between">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-[clamp(30px,4vw,50px)]">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="font-family-logo font-bold tracking-tightest-custom text-black leading-[0.85] break-all 1.5xl:break-normal text-[clamp(36px,4vw,48px)]"
          >
            ORCHESTOR
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-[clamp(20px,3vw,40px)] text-[16px]">
            <Link
              href="/dashboard"
              className="hover:underline hover:font-semibold decoration-2 underline-offset-4 transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/calendar"
              className="hover:underline hover:font-semibold decoration-2 underline-offset-4 transition-all"
            >
              Calendar
            </Link>
            <Link
              href="/analytics"
              className="hover:underline hover:font-semibold decoration-2 underline-offset-4 transition-all"
            >
              Analytics
            </Link>
            <Link
              href="/settings"
              className="hover:underline hover:font-semibold decoration-2 underline-offset-4 transition-all"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button variant="outline" className="text-[20px] px-6 py-2 border">
          Sign out
        </Button>
      </div>
    </nav>
  );
}
