export function QuickActions() {
  const actions = [
    { label: "New Post" },
    { label: "Schedule" },
    { label: "Analytics" },
    { label: "Settings" },
  ];

  return (
    <div className="bg-white rounded-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-[clamp(20px,3vw,30px)] mt-[clamp(30px,4vw,40px)]">
      <div className="mb-6">
        <h2 className="text-[clamp(20px,2.5vw,24px)] font-bold mb-1">
          Quick Actions
        </h2>
        <p className="text-[14px] text-gray-600">
          Manage your content workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {actions.map((action, index) => (
          <button
            key={index}
            className="w-full px-4 p-3 border-2 border-black rounded-[5px] hover:bg-black hover:text-white transition-colors text-[16px] font-semibold flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-4 h-4 bg-[#D9D9D9] rounded-[5px]"></div>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
