import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// Lazy load Dashboard Layout to split the bundle
const DashboardLayout = React.lazy(() => import('./dashboard/layout/DashboardLayout'));
const Overview = React.lazy(() => import('./dashboard/pages/Overview'));
const Analytics = React.lazy(() => import('./dashboard/pages/Analytics'));
const Reports = React.lazy(() => import('./dashboard/pages/Reports'));
const Settings = React.lazy(() => import('./dashboard/pages/Settings'));
const WorkflowBuilder = React.lazy(() => import('./dashboard/pages/WorkflowBuilder'));
const Automations = React.lazy(() => import('./dashboard/pages/Automations'));
const Integrations = React.lazy(() => import('./dashboard/pages/Integrations'));
const Team = React.lazy(() => import('./dashboard/pages/Team'));
const Notifications = React.lazy(() => import('./dashboard/pages/Notifications'));

/**
 * App — Root component with React Router configuration.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Application Routes */}
        <Route 
          path="/dashboard" 
          element={
            <Suspense fallback={<div className="min-h-screen bg-surface-500 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div></div>}>
              <DashboardLayout />
            </Suspense>
          }
        >
          {/* Default dashboard route */}
          <Route index element={<Overview />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="workflow-builder" element={<WorkflowBuilder />} />
          <Route path="settings" element={<Settings />} />
          <Route path="automations" element={<Automations />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="team" element={<Team />} />
          <Route path="notifications" element={<Notifications />} />
          {/* Fallback for other dashboard routes */}
          <Route path="*" element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
