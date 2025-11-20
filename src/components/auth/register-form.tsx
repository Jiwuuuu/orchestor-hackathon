"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <div className="bg-white rounded-[10px] border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-[550px] py-[clamp(6px,0.8vw,10px)] px-[clamp(12px,1.5vw,20px)]">
      {/* Heading */}
      <div className="mb-[clamp(15px,2vw,20px)]">
        <h2 className="text-[clamp(28px,4vw,32px)] font-semibold">
          Create account
        </h2>
        <p className="text-[16px] text-[#6D6D6D]">
          Sign up to start automating your content
        </p>
      </div>

      {/* Google Sign Up Button */}
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-[#000000] rounded-[5px] px-4 py-3 mb-6 hover:bg-gray-50 transition-colors">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z"
            fill="#4285F4"
          />
          <path
            d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z"
            fill="#34A853"
          />
          <path
            d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
            fill="#FBBC05"
          />
          <path
            d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-[16px] font-medium text-gray-700 cursor-pointer">
          Continue with Google
        </span>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-[#6D6D6D]"></div>
        <span className="text-[14px] text-[#6D6D6D] uppercase">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-[#6D6D6D]"></div>
      </div>

      {/* Registration Form */}
      <form className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-[16px]">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-[#000000] rounded-[5px] text-[14px] focus:outline-none focus:border-black transition-colors"
            placeholder=""
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-[16px]">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-[#000000] rounded-[5px] text-[14px] focus:outline-none focus:border-black transition-colors"
            placeholder=""
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-[16px]">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-[#000000] rounded-[5px] text-[14px] focus:outline-none focus:border-black transition-colors"
            placeholder=""
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label htmlFor="confirm-password" className="block text-[16px]">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="w-full px-4 py-3 border border-[#000000] rounded-[5px] text-[14px] focus:outline-none focus:border-black transition-colors"
            placeholder=""
          />
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          variant="outline"
          className="w-full mt-2 py-3 px-4 text-[16px] font-semibold border"
        >
          Create Account
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-[#6D6D6D]"></div>
        <span className="text-[14px] text-[#6D6D6D] uppercase">Or</span>
        <div className="flex-1 h-px bg-[#6D6D6D]"></div>
      </div>

      {/* Try Demo Button */}
      <Button
        variant="default"
        className="w-full bg-black text-white border border-black hover:bg-white hover:text-black py-4 text-[18px] font-bold"
      >
        Try Demo →
      </Button>

      {/* Sign In Link */}
      <p className="text-center text-[16px] mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold no-underline hover:underline"
        >
          Sign in
        </Link>
      </p>

      {/* Terms & Privacy */}
      <p className="text-center text-[16px] text-[#6D6D6D] my-4">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="no-underline hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="no-underline hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
