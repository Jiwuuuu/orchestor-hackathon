import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="bg-custom-green font-body min-h-screen flex flex-col items-center justify-center p-[clamp(20px,4vw,30px)]">
      {/* Logo/Branding */}
      <div className="text-center mb-[clamp(20px,3vw,30px)]">
        <div className="font-family-logo font-bold tracking-tightest-custom text-black leading-[0.85] break-all 1.5xl:break-normal text-[clamp(40px,8vw,80px)]">
          ORCHESTOR
        </div>
        <p className="text-[16px] text-[#000000] mt-2">
          AI-Powered Social Media Scheduling
        </p>
      </div>

      {/* Register Form */}
      <RegisterForm />

      {/* Back to Home Link */}
      <Link
        href="/"
        className="mt-8 text-[14px] font-medium hover:underline flex items-center gap-2"
      >
        ← Back to home
      </Link>
    </div>
  );
}
