const platformStats = [
  { platform: "Twitter", followers: "12.5K", engagement: "4.2%", posts: 24 },
  { platform: "LinkedIn", followers: "8.2K", engagement: "6.8%", posts: 18 },
  { platform: "Instagram", followers: "25.1K", engagement: "5.1%", posts: 32 },
  { platform: "Facebook", followers: "15.8K", engagement: "3.5%", posts: 15 },
];

const topPosts = [
  { title: "Product launch announcement", platform: "Twitter", likes: 245, shares: 89, comments: 34 },
  { title: "Behind the scenes video", platform: "Instagram", likes: 512, shares: 156, comments: 78 },
  { title: "Industry insights article", platform: "LinkedIn", likes: 189, shares: 67, comments: 45 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your social media performance and engagement metrics.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Followers</p>
          <p className="text-3xl font-bold mt-1">61.6K</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+2.5% this month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Engagement</p>
          <p className="text-3xl font-bold mt-1">4.9%</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+0.8% this month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Posts This Month</p>
          <p className="text-3xl font-bold mt-1">89</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12 vs last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Reach This Month</p>
          <p className="text-3xl font-bold mt-1">245K</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">+18% this month</p>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Platform Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Platform</th>
                <th className="text-left pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Followers</th>
                <th className="text-left pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Engagement Rate</th>
                <th className="text-left pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {platformStats.map((stat) => (
                <tr key={stat.platform}>
                  <td className="py-3 font-medium">{stat.platform}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">{stat.followers}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">{stat.engagement}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">{stat.posts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Posts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Top Performing Posts</h3>
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{post.platform}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-semibold">{post.likes}</p>
                  <p className="text-gray-500 dark:text-gray-400">Likes</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{post.shares}</p>
                  <p className="text-gray-500 dark:text-gray-400">Shares</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{post.comments}</p>
                  <p className="text-gray-500 dark:text-gray-400">Comments</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
