import React, { useState, useEffect } from 'react';
import { TrendingUp, Award, DollarSign, Target, ChevronRight, BarChart2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { Card } from '@/components/common/Card';

interface Metrics {
  totalApplied: number;
  interviewsCount: number;
  offeredCount: number;
  avgMatchScore: number;
}

export const AnalyticsPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalApplied: 0,
    interviewsCount: 0,
    offeredCount: 0,
    avgMatchScore: 89,
  });

  useEffect(() => {
    const saved = localStorage.getItem('tracked_applications');
    if (saved) {
      const apps = JSON.parse(saved);
      const applied = apps.length;
      const interviews = apps.filter((a: any) => a.stage === 'Interviewing').length;
      const offered = apps.filter((a: any) => a.stage === 'Offered').length;
      
      const matchScores = apps.map((a: any) => a.matchScore || 80);
      const avgMatch = matchScores.length > 0 
        ? Math.round(matchScores.reduce((a: number, b: number) => a + b, 0) / matchScores.length)
        : 89;

      setMetrics({
        totalApplied: applied,
        interviewsCount: interviews,
        offeredCount: offered,
        avgMatchScore: avgMatch,
      });
    } else {
      setMetrics({
        totalApplied: 3,
        interviewsCount: 1,
        offeredCount: 1,
        avgMatchScore: 91,
      });
    }
  }, []);

  const responseRate = metrics.totalApplied > 0 
    ? Math.round(((metrics.interviewsCount + metrics.offeredCount) / metrics.totalApplied) * 100)
    : 45;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Engine & ATS Analytics</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Salary index mappings, ATS optimization metrics, and response benchmarks.
        </p>
      </div>

      {/* Numerical Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block uppercase">Response Rate</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white">{responseRate}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block uppercase">Avg Match Score</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white">{metrics.avgMatchScore}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block uppercase">Target Salary Index</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white">$145k</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block uppercase">ATS Resume Variants</span>
            <span className="text-2xl font-black text-slate-800 dark:text-white">{metrics.totalApplied * 2}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Visual Analytics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ATS Keyword optimizations */}
        <Card className="p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
            ATS Keyword Coverage Breakdown
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-350">Frontend UI Frameworks (React, Next.js)</span>
                <span className="text-emerald-500 font-bold">96% Matches</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-350">Typescript & Strict Typings</span>
                <span className="text-emerald-500 font-bold">88% Matches</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-350">Testing Utilities (Jest, Cypress, RTL)</span>
                <span className="text-amber-500 font-bold">64% Matches</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '64%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-350">System Design & Cloud Integrations</span>
                <span className="text-rose-500 font-bold">42% Matches</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly activity tracker bar chart using CSS grids */}
        <Card className="p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
            Weekly Pilot Submissions
          </h3>

          <div className="flex items-end justify-between h-40 pt-4 px-2 border-b border-slate-100 dark:border-slate-800">
            {/* Week bars */}
            <div className="flex flex-col items-center gap-2 w-10">
              <div className="w-6 bg-slate-200 dark:bg-slate-800 rounded-t-md h-8 hover:bg-slate-300 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400">W-24</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-10">
              <div className="w-6 bg-slate-200 dark:bg-slate-800 rounded-t-md h-12 hover:bg-slate-300 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400">W-25</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-10">
              <div className="w-6 bg-slate-200 dark:bg-slate-800 rounded-t-md h-16 hover:bg-slate-300 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400">W-26</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-10">
              <div className="w-6 bg-primary-500 rounded-t-md h-24 shadow-md shadow-primary-500/20 hover:bg-primary-600 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400">W-27</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-10">
              <div className="w-6 bg-primary-500 rounded-t-md h-32 shadow-md shadow-primary-500/20 hover:bg-primary-600 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400">W-28</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold px-2">
            <span>Last Updated: Just now</span>
            <span className="flex items-center gap-1 text-primary-500 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Autopilot submission spike (+34%)
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
