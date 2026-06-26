import React, { useState } from 'react';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Administrator'
  });

  const [toggles, setToggles] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    autoScaling: true,
    darkMode: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl font-display font-bold text-main">Settings</h1>
        <p className="text-sm text-main/50">Manage your profile and workspace preferences.</p>
      </div>

      {/* Profile Section */}
      <section className="glass rounded-xl border border-glass/[0.06] overflow-hidden">
        <div className="p-6 border-b border-glass/[0.06]">
          <h2 className="text-lg font-display font-bold text-main">Profile Information</h2>
          <p className="text-xs text-main/40 mt-1">Update your personal details here.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 p-1">
              <div className="w-full h-full rounded-full bg-surface-500 flex items-center justify-center">
                <span className="text-2xl font-medium text-main">JS</span>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-glass/[0.04] text-sm font-medium text-main hover:bg-glass/[0.08] transition-colors border border-glass/[0.08]">
              Change Avatar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-main/50 mb-1.5">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-xl text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary-400/50"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-main/50 mb-1.5">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-2 bg-glass/[0.03] border border-glass/[0.08] rounded-xl text-sm text-main focus:outline-none focus:ring-2 focus:ring-primary-400/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="px-6 py-2 rounded-lg bg-primary-600 text-sm font-medium text-main hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/25">
              Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* Preferences Section */}
      <section className="glass rounded-xl border border-glass/[0.06] overflow-hidden">
        <div className="p-6 border-b border-glass/[0.06]">
          <h2 className="text-lg font-display font-bold text-main">Preferences</h2>
          <p className="text-xs text-main/40 mt-1">Configure your notifications and environment.</p>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {[
            { key: 'emailAlerts', title: 'Email Alerts', desc: 'Receive daily summary emails about automation health.' },
            { key: 'pushNotifications', title: 'Push Notifications', desc: 'Get instant alerts for failed workflows.' },
            { key: 'weeklyReports', title: 'Weekly Reports', desc: 'Receive a detailed PDF report every Monday.' },
            { key: 'autoScaling', title: 'Auto-Scaling Infrastructure', desc: 'Automatically scale worker nodes under heavy load.' },
            { key: 'darkMode', title: 'Dark Mode', desc: 'Use dark theme across the dashboard.' },
          ].map((item) => (
            <div key={item.key} className="p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-medium text-main">{item.title}</h3>
                <p className="text-xs text-main/40 mt-0.5">{item.desc}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key)}
                className="relative w-12 h-6 rounded-full bg-glass/10 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 flex-shrink-0"
                role="switch"
                aria-checked={toggles[item.key]}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${
                  toggles[item.key] ? 'left-7 bg-primary-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'left-1 bg-glass/50'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
