import { useState, useEffect } from 'react';

/**
 * useMockData — Hook that generates fluctuating realistic data for the dashboard.
 */
export function useMockData() {
  const [metrics, setMetrics] = useState({
    activeWorkflows: 24,
    tasksAutomated: 14285,
    timeSaved: 1420,
    errorRate: 0.02,
    revenue: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
    traffic: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
    activityFeed: [
      { id: 1, type: 'success', message: 'Sales Report Generated', time: 'Just now' },
      { id: 2, type: 'info', message: 'Customer Data Synced via API', time: '2m ago' },
      { id: 3, type: 'warning', message: 'High API latency detected', time: '15m ago' },
      { id: 4, type: 'success', message: 'Workflow "Lead Routing" completed', time: '1h ago' },
      { id: 5, type: 'info', message: 'AI Model V2 deployed to production', time: '2h ago' }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        // Randomly fluctuate KPIs slightly
        const fluctuate = (val, maxChange) => {
          const change = (Math.random() - 0.5) * maxChange;
          return Math.max(0, val + change);
        };

        const newActivity = [...prev.activityFeed];
        // 20% chance to push a new activity
        if (Math.random() > 0.8) {
          const events = [
            { type: 'success', message: 'Marketing Campaign Optimized' },
            { type: 'success', message: 'Database Backup Completed' },
            { type: 'info', message: 'New user joined workspace' },
            { type: 'error', message: 'Webhook delivery failed (retrying)' },
            { type: 'warning', message: 'Approaching API rate limit' }
          ];
          const randomEvent = events[Math.floor(Math.random() * events.length)];
          newActivity.unshift({
            id: Date.now(),
            ...randomEvent,
            time: 'Just now'
          });
          if (newActivity.length > 5) newActivity.pop();
        }

        return {
          ...prev,
          activeWorkflows: Math.floor(fluctuate(prev.activeWorkflows, 2)),
          tasksAutomated: Math.floor(fluctuate(prev.tasksAutomated, 50)),
          timeSaved: Math.floor(fluctuate(prev.timeSaved, 5)),
          errorRate: Math.max(0.01, parseFloat(fluctuate(prev.errorRate, 0.005).toFixed(3))),
          revenue: [...prev.revenue.slice(1), Math.floor(fluctuate(prev.revenue[6], 1000))],
          traffic: [...prev.traffic.slice(1), Math.floor(fluctuate(prev.traffic[6], 2000))],
          activityFeed: newActivity.map((item, i) => i > 0 && item.time === 'Just now' ? { ...item, time: '1m ago' } : item)
        };
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
