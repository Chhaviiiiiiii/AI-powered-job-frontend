import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';
import { LandingPage } from '@/pages/LandingPage';
import { EmptyState } from '@/components/common/EmptyState';
import { LayoutDashboard, Briefcase, FileCheck, TrendingUp, Sparkles } from 'lucide-react';

// Placeholder elements using EmptyState component for paths not created yet
const DashboardPlaceholder = () => (
  <div className="py-12">
    <EmptyState
      icon={<LayoutDashboard className="w-12 h-12 text-primary-500" />}
      title="Dashboard"
      description="Your dashboard and active AI agent overview will appear here. The backend connectivity is coming soon."
    />
  </div>
);

const JobsPlaceholder = () => (
  <div className="py-12">
    <EmptyState
      icon={<Briefcase className="w-12 h-12 text-primary-500" />}
      title="Job Search Scouting"
      description="Scan and lock onto matching positions automatically using AI agent intelligence."
    />
  </div>
);

const ApplicationsPlaceholder = () => (
  <div className="py-12">
    <EmptyState
      icon={<FileCheck className="w-12 h-12 text-primary-500" />}
      title="Application Tracker"
      description="Real-time monitoring of active pilot submissions and hiring stages."
    />
  </div>
);

const AnalyticsPlaceholder = () => (
  <div className="py-12">
    <EmptyState
      icon={<TrendingUp className="w-12 h-12 text-primary-500" />}
      title="Analytics Engine"
      description="Salaries benchmarks, response rates, and ATS optimization score cards."
    />
  </div>
);

const ProfileSetupPlaceholder = () => (
  <div className="py-12">
    <EmptyState
      icon={<Sparkles className="w-12 h-12 text-primary-500" />}
      title="Profile & Agent Setup Wizard"
      description="Complete setup to initiate your AI pilot agent. Forms, resume uploaders, and parameter setup details are coming soon."
    />
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="/jobs" element={<JobsPlaceholder />} />
        <Route path="/applications" element={<ApplicationsPlaceholder />} />
        <Route path="/analytics" element={<AnalyticsPlaceholder />} />
        <Route path="/profile/setup" element={<ProfileSetupPlaceholder />} />
      </Route>

      {/* Redirect all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
