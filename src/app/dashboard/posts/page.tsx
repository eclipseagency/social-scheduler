const posts = [
  { id: 1, title: "New product launch announcement", platform: "Twitter", status: "Scheduled", date: "Jan 20, 2026", time: "10:00 AM" },
  { id: 2, title: "Weekly tips and tricks", platform: "LinkedIn", status: "Draft", date: "Jan 21, 2026", time: "2:00 PM" },
  { id: 3, title: "Behind the scenes content", platform: "Instagram", status: "Published", date: "Jan 18, 2026", time: "9:00 AM" },
  { id: 4, title: "Customer testimonial spotlight", platform: "Facebook", status: "Scheduled", date: "Jan 22, 2026", time: "11:00 AM" },
  { id: 5, title: "Industry news roundup", platform: "Twitter", status: "Draft", date: "Jan 23, 2026", time: "3:00 PM" },
  { id: 6, title: "Product feature highlight", platform: "LinkedIn", status: "Published", date: "Jan 17, 2026", time: "1:00 PM" },
];

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Posts</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and schedule your social media posts.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm">
          <option>All Platforms</option>
          <option>Twitter</option>
          <option>LinkedIn</option>
          <option>Instagram</option>
          <option>Facebook</option>
        </select>
        <select className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Draft</option>
          <option>Scheduled</option>
          <option>Published</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Post
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Platform
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <p className="font-medium text-sm">{post.title}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {post.platform}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {post.date} at {post.time}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.status === "Published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : post.status === "Scheduled"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
