import React from 'react';
import ActivityFeed from '../components/ActivityFeed';
import { useMockData } from '../hooks/useMockData';

export default function Notifications() {
  const data = useMockData();

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-main">Notifications</h1>
          <p className="text-sm text-main/50">Stay updated on your workspace activities.</p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-glass/[0.04] text-sm font-medium text-main hover:bg-glass/[0.08] transition-colors border border-glass/[0.08]">
          Mark all as read
        </button>
      </div>

      <div className="glass rounded-xl border border-glass/[0.06] p-6 min-h-[500px]">
        <ActivityFeed activities={data.activityFeed} />
      </div>
    </div>
  );
}
