const connectedAccounts = [
  { platform: "Twitter", username: "@socialscheduler", connected: true },
  { platform: "LinkedIn", username: "Social Scheduler", connected: true },
  { platform: "Instagram", username: "@social.scheduler", connected: true },
  { platform: "Facebook", username: "Social Scheduler", connected: true },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account settings and connected platforms.
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>UTC (Coordinated Universal Time)</option>
              <option>EST (Eastern Standard Time)</option>
              <option>PST (Pacific Standard Time)</option>
              <option>GMT (Greenwich Mean Time)</option>
            </select>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Connected Accounts</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            + Add Account
          </button>
        </div>
        <div className="space-y-3">
          {connectedAccounts.map((account) => (
            <div
              key={account.platform}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{account.platform[0]}</span>
                </div>
                <div>
                  <p className="font-medium">{account.platform}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{account.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Connected
                </span>
                <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive email updates about your scheduled posts
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Post Published Alerts</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when a scheduled post is published
              </p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="font-medium">Weekly Analytics Report</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive a weekly summary of your performance
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-red-200 dark:border-red-900">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
}
