import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Briefcase, FileCheck, Award, Sparkles, Terminal, ToggleLeft, ToggleRight, Settings2, Play, Square } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

interface Activity {
  id: string;
  time: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}

const mockConsoleLogs = [
  'Scouting LinkedIn & Greenhouse API for matching React developer jobs...',
  'Found: Senior Frontend React Developer role at Stripe (94% Match score).',
  'Analyzing resume intersection with Stripe job description...',
  'ATS keyword match missing: "Developer Tools", "Payment APIs". Injecting contexts...',
  'Adapting cover letter bullet points to highlight billing platform experience...',
  'Auto-filling Greenhouse application forms (Email, Name, Resume, Github, LinkedIn)...',
  'Submitting Stripe application successfully. Tracking code stripe_094a secured.',
  'Scouting Glassdoor for remote SDE positions...',
  'Found: Staff Software Engineer - UI Systems at Vercel (89% Match score).',
  'Adapting master resume to match Vercel styling guidelines...',
  'Drafting application forms. Waiting for manual review (Threshold settings)...',
  'Agent standby. Scanning company portals for newly listed positions...',
];

export const DashboardPage: React.FC = () => {
  const [totalApplied, setTotalApplied] = useState(0);
  const [interviews, setInterviews] = useState(0);
  const [scouted, setScouted] = useState(0);
  
  const [autopilot, setAutopilot] = useState(false);
  const [logs, setLogs] = useState<Activity[]>([
    { id: '1', time: '17:30', message: 'Autonomous Job Pilot initialized.', type: 'info' },
    { id: '2', time: '17:32', message: 'Credentials scanned. Master resume uploaded.', type: 'success' },
    { id: '3', time: '17:35', message: 'Agent standby. Autopilot toggle is currently OFF.', type: 'warn' },
  ]);

  const logIndexRef = useRef(0);
  const intervalRef = useRef<any>(null);
  const consoleBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load statistics
    const savedJobs = localStorage.getItem('mock_jobs');
    const savedApps = localStorage.getItem('tracked_applications');

    if (savedApps) {
      const apps = JSON.parse(savedApps);
      setTotalApplied(apps.length);
      setInterviews(apps.filter((a: any) => a.stage === 'Interviewing').length);
    } else {
      setTotalApplied(3);
      setInterviews(1);
    }

    if (savedJobs) {
      const jobs = JSON.parse(savedJobs);
      setScouted(jobs.length);
    } else {
      setScouted(5);
    }
  }, []);

  // Auto-scroll console logs
  useEffect(() => {
    if (consoleBottomRef.current) {
      consoleBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Autopilot logger simulation
  useEffect(() => {
    if (autopilot) {
      // Clear initial standby warnings
      setLogs([
        { id: 'start', time: new Date().toLocaleTimeString().slice(0, 5), message: 'Autopilot activated. Agent is now active 24/7.', type: 'success' },
      ]);
      logIndexRef.current = 0;

      intervalRef.current = setInterval(() => {
        const timeStr = new Date().toLocaleTimeString().slice(0, 5);
        const nextMsg = mockConsoleLogs[logIndexRef.current % mockConsoleLogs.length];
        
        let type: 'info' | 'success' | 'warn' = 'info';
        if (nextMsg.includes('successfully') || nextMsg.includes('initialized')) type = 'success';
        if (nextMsg.includes('standby') || nextMsg.includes('Warning')) type = 'warn';

        setLogs((prev) => [
          ...prev,
          { id: Math.random().toString(), time: timeStr, message: nextMsg, type },
        ]);

        // Dynamically increment stats if auto applied
        if (nextMsg.includes('Submitting') || nextMsg.includes('Applied')) {
          setTotalApplied((t) => t + 1);
        }

        logIndexRef.current += 1;
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setLogs((prev) => [
          ...prev,
          { id: Math.random().toString(), time: new Date().toLocaleTimeString().slice(0, 5), message: 'Agent paused. Autopilot turned OFF.', type: 'warn' },
        ]);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autopilot]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Intro section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Agent Cockpit</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Control your AI application pipeline and monitor live submissions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-primary-500/10">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>Active Agent Pilot</span>
        </div>
      </div>

      {/* Numerical Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center justify-between border-slate-100 dark:border-slate-850">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Scouted Listings</span>
            <span className="text-3xl font-black text-slate-800 dark:text-white">{scouted}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-100 dark:border-slate-850">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Applications Filed</span>
            <span className="text-3xl font-black text-slate-800 dark:text-white">{totalApplied}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-slate-100 dark:border-slate-850">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block uppercase">Interviews Scheduled</span>
            <span className="text-3xl font-black text-slate-800 dark:text-white">{interviews}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Main Autopilot Panel & Live Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Autopilot Controller card */}
        <Card className="p-6 flex flex-col justify-between border-slate-100 dark:border-slate-850 min-h-[300px]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Autopilot Controller
              </h3>
              <Settings2 className="w-4 h-4 text-slate-400" />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Toggle autopilot to authorize the AI agent to optimize your master resume bullet points and apply directly to matches above your threshold.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-850 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilot Autopilot Status
              </span>
              <button onClick={() => setAutopilot(!autopilot)} className="focus:outline-none">
                {autopilot ? (
                  <ToggleRight className="w-12 h-12 text-primary-500" />
                ) : (
                  <ToggleLeft className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                )}
              </button>
            </div>

            <Button
              variant={autopilot ? 'danger' : 'primary'}
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setAutopilot(!autopilot)}
            >
              {autopilot ? (
                <>
                  <Square className="w-4 h-4 text-white fill-white" />
                  Stop AI Pilot Agent
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-white fill-white" />
                  Engage AI Pilot Agent
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Live Terminal Console log card */}
        <Card className="lg:col-span-2 p-6 flex flex-col border-slate-100 dark:border-slate-850 bg-slate-950 text-slate-200 min-h-[300px] shadow-2xl rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-bold font-mono text-slate-300">
                auto-agent-console-log (~/pilot)
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="flex-1 font-mono text-[11px] leading-relaxed overflow-y-auto max-h-56 space-y-2 pr-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5">
                <span className="text-slate-600 select-none">[{log.time}]</span>
                <span className={`
                  ${log.type === 'success' ? 'text-emerald-400 font-semibold' : ''}
                  ${log.type === 'warn' ? 'text-amber-400 font-semibold' : ''}
                  ${log.type === 'info' ? 'text-slate-300' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={consoleBottomRef} />
          </div>
        </Card>
      </div>
    </div>
  );
};
