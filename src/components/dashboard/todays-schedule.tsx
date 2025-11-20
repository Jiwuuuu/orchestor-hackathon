import { Button } from "@/components/ui/button";

export function TodaysSchedule() {
  const schedule = [
    {
      time: "10:00 AM",
      platform: "Instagram Story - Product Teaser",
      details: "Story #231",
    },
    {
      time: "10:00 AM",
      platform: "Instagram Story - Product Teaser",
      details: "Story #231",
    },
    {
      time: "10:00 AM",
      platform: "Instagram Story - Product Teaser",
      details: "Story #231",
    },
    {
      time: "10:00 AM",
      platform: "Instagram Story - Product Teaser",
      details: "Story #231",
    },
  ];

  return (
    <div className="bg-white rounded-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-[clamp(20px,3vw,30px)]">
      <div className="mb-6">
        <h2 className="text-[clamp(20px,2.5vw,24px)] font-bold mb-1">
          Today&apos;s Schedule
        </h2>
        <p className="text-[14px] text-gray-600">Posts scheduled for today</p>
      </div>

      <div className="space-y-3">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-gray-300 rounded-[5px]"
          >
            <div className="bg-black text-white rounded-[5px] px-3 py-5 text-center shrink-0">
              <p className="text-[14px] font-semibold">10:00</p>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[16px] mb-1">{item.platform}</p>
              <p className="text-[14px] text-gray-600">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-6 bg-black text-white border-2 border-black hover:bg-white hover:text-black text-[16px] font-bold py-6">
        Create New Post
      </Button>
    </div>
  );
}
