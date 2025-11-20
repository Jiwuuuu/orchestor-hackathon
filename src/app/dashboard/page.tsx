import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentPosts } from "@/components/dashboard/recent-posts";
import { TodaysSchedule } from "@/components/dashboard/todays-schedule";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <div className="bg-custom-green font-body min-h-screen">
      {/* Navigation */}
      <DashboardNav />

      {/* Main Content */}
      <div className="pt-[clamp(30px,4vw,40px)] pb-[clamp(50px,12vw,120px)] px-[clamp(50px,12vw,120px)]">
        {/* Greeting */}
        <div className="mb-[clamp(30px,4vw,40px)]">
          <h1 className="text-[clamp(32px,4vw,48px)] font-bold mb-2">
            Good morning, User
          </h1>
          <p className="text-[16px] text-gray-700">
            Here&apos;s what&apos;s happening with your content today
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Recent Posts and Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-[clamp(20px,3vw,30px)] mt-[clamp(60px,7vw,80px)]">
          <RecentPosts />
          <TodaysSchedule />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
