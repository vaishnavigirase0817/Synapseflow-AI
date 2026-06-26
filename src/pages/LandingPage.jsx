import React, { Suspense } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/hero/HeroSection';
import BackToTop from '../components/common/BackToTop';
import ProgressIndicator from '../components/common/ProgressIndicator';
import CursorSpotlight from '../components/common/CursorSpotlight';

// Lazy load sections below the fold for performance
const TrustedCompanies = React.lazy(() => import('../components/sections/TrustedCompanies'));
const Statistics = React.lazy(() => import('../components/sections/Statistics'));
const BentoFeatureGrid = React.lazy(() => import('../components/sections/BentoFeatureGrid'));
const DashboardPreview = React.lazy(() => import('../components/sections/DashboardPreview'));
const WorkflowTimeline = React.lazy(() => import('../components/sections/WorkflowTimeline'));
const Pricing = React.lazy(() => import('../components/sections/Pricing'));
const Testimonials = React.lazy(() => import('../components/sections/Testimonials'));
const FAQ = React.lazy(() => import('../components/sections/FAQ'));
const Contact = React.lazy(() => import('../components/sections/Contact'));
const Footer = React.lazy(() => import('../components/sections/Footer'));

/**
 * LandingPage — Component assembling the complete SynapseFlow AI landing page.
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-surface-500">
      {/* Accessibility: Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-main focus:rounded-lg"
      >
        Skip to main content
      </a>

      <CursorSpotlight />
      <ProgressIndicator />
      <Navbar />

      <main role="main">
        {/* Hero loads immediately */}
        <HeroSection />

        {/* Below-fold content lazily loaded */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <TrustedCompanies />
          <Statistics />
          <BentoFeatureGrid />
          <DashboardPreview />
          <WorkflowTimeline />
          <Pricing />
          <Testimonials />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64" />}>
        <Footer />
      </Suspense>

      <BackToTop />
    </div>
  );
}
