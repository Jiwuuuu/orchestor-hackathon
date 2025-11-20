import { Button } from "@/components/ui/button";

export function RecentPosts() {
  const posts = [
    {
      title: "Lorem Ipsum",
      platform: "Instagram",
      date: "2025-11-20",
      status: "scheduled",
    },
    {
      title: "Lorem Ipsum",
      platform: "Instagram",
      date: "2025-11-20",
      status: "published",
    },
    {
      title: "Lorem Ipsum",
      platform: "Instagram",
      date: "2025-11-20",
      status: "scheduled",
    },
    {
      title: "Lorem Ipsum",
      platform: "Instagram",
      date: "2025-11-20",
      status: "published",
    },
  ];

  return (
    <div className="bg-white rounded-[10px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-[clamp(20px,3vw,30px)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-[clamp(20px,2.5vw,24px)] font-bold mb-1">
          Recent Posts
        </h2>
        <p className="text-[14px] text-gray-600">
          Your latest content across all platforms
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-300 rounded-[5px] hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-semibold text-[16px] mb-1">{post.title}</p>
              <p className="text-[14px] text-gray-600">
                {post.platform} • {post.date}
              </p>
            </div>
            <span
              className={`px-3 py-2 rounded-full text-[14px] border border-black ${
                post.status === "scheduled"
                  ? "bg-yellow-400 text-black "
                  : "bg-black text-white px-4"
              }`}
            >
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full mt-auto pt-6 pb-6 text-[16px] font-semibold"
      >
        View All Posts
      </Button>
    </div>
  );
}
