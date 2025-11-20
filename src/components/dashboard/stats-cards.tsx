export function StatsCards() {
  const stats = [
    {
      label: "TOTAL POSTS",
      value: "127",
      change: "+12 this month",
    },
    {
      label: "SCHEDULED",
      value: "23",
      change: "Next 7 days",
    },
    {
      label: "PUBLISHED",
      value: "104",
      change: "All time",
    },
    {
      label: "ENGAGEMENT",
      value: "12.5K",
      change: "+8.2% vs last week",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[clamp(15px,2vw,20px)]">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-[clamp(20px,3vw,30px)] py-[clamp(20px,3vw,10px)]"
        >
          <p className="text-[12px] text-gray-600 font-medium">{stat.label}</p>
          <p className="text-[clamp(32px,4vw,48px)] font-bold mb-1">
            {stat.value}
          </p>
          <p className="text-[14px] text-gray-500 mt-8">{stat.change}</p>
        </div>
      ))}
    </div>
  );
}
