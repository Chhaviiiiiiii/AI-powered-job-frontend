import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, ChevronRight, CheckCircle, Award, AlertCircle, Plus, Sparkles, Trash2, ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Modal } from '@/components/common/Modal';

interface Application {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  stage: 'Scouted' | 'Applied' | 'Interviewing' | 'Offered' | 'Archived';
  dateApplied: string;
}

const defaultApplications: Application[] = [
  {
    id: '1',
    title: 'Senior Frontend React Developer',
    company: 'Stripe',
    location: 'Remote (US/Canada)',
    salary: '$140,000 - $170,000',
    matchScore: 94,
    stage: 'Applied',
    dateApplied: '07/12/2026',
  },
  {
    id: '5',
    title: 'Software Engineer II (React)',
    company: 'Microsoft',
    location: 'Hybrid (Redmond, WA)',
    salary: '$120,000 - $145,000',
    matchScore: 91,
    stage: 'Interviewing',
    dateApplied: '07/10/2026',
  },
  {
    id: 'a1',
    title: 'UI Developer',
    company: 'Linear',
    location: 'Remote',
    salary: '$130,000 - $155,000',
    matchScore: 88,
    stage: 'Offered',
    dateApplied: '07/08/2026',
  },
];

export const ApplicationsPage: React.FC = () => {
  const [apps, setApps] = useState<Application[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [stage, setStage] = useState<'Scouted' | 'Applied' | 'Interviewing' | 'Offered' | 'Archived'>('Applied');

  useEffect(() => {
    const saved = localStorage.getItem('tracked_applications');
    if (saved) {
      setApps(JSON.parse(saved));
    } else {
      setApps(defaultApplications);
      localStorage.setItem('tracked_applications', JSON.stringify(defaultApplications));
    }
  }, []);

  const handleUpdateStage = (id: string, newStage: typeof stage) => {
    const updated = apps.map((app) => (app.id === id ? { ...app, stage: newStage } : app));
    setApps(updated);
    localStorage.setItem('tracked_applications', JSON.stringify(updated));
  };

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const newApp: Application = {
      id: Math.random().toString(),
      title,
      company,
      location: location || 'Remote',
      salary: salary || 'N/A',
      matchScore: Math.floor(Math.random() * 20) + 75,
      stage,
      dateApplied: new Date().toLocaleDateString(),
    };

    const updated = [...apps, newApp];
    setApps(updated);
    localStorage.setItem('tracked_applications', JSON.stringify(updated));
    setIsOpen(false);
    
    // reset inputs
    setTitle('');
    setCompany('');
    setLocation('');
    setSalary('');
  };

  const handleDelete = (id: string) => {
    const updated = apps.filter((app) => app.id !== id);
    setApps(updated);
    localStorage.setItem('tracked_applications', JSON.stringify(updated));
  };

  const stages: { label: string; value: typeof stage; color: string }[] = [
    { label: 'Scouted', value: 'Scouted', color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400' },
    { label: 'Applied', value: 'Applied', color: 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-400' },
    { label: 'Interviewing', value: 'Interviewing', color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400' },
    { label: 'Offered', value: 'Offered', color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' },
    { label: 'Archived', value: 'Archived', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Application Pipeline Cockpit</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time stage tracking of active pilot submissions and direct hiring responses.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Add Application
        </Button>
      </div>

      {/* Pipeline list */}
      <div className="grid grid-cols-1 gap-4">
        {apps.length > 0 ? (
          apps.map((app) => (
            <Card
              key={app.id}
              className="p-5 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-sm"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-slate-550 dark:text-slate-450" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-slate-800 dark:text-slate-200 truncate">
                      {app.title}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-550">
                      at
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-350 truncate">
                      {app.company}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Applied: {app.dateApplied}
                    </span>
                    <span>•</span>
                    <span>Salary: {app.salary}</span>
                    <span>•</span>
                    <span className="text-violet-500 font-bold">{app.matchScore}% Match</span>
                  </div>
                </div>
              </div>

              {/* Status and Action controls */}
              <div className="flex flex-wrap items-center gap-3.5 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-850">
                {/* Stage Badge */}
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                  stages.find((s) => s.value === app.stage)?.color || ''
                }`}>
                  {app.stage}
                </span>

                {/* Transition dropdown */}
                <div className="flex items-center gap-2">
                  <select
                    value={app.stage}
                    onChange={(e) => handleUpdateStage(app.id, e.target.value as any)}
                    className="px-2 py-1 text-xs font-bold rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-400 outline-none"
                  >
                    <option value="Scouted">Move to Scouted</option>
                    <option value="Applied">Move to Applied</option>
                    <option value="Interviewing">Move to Interview</option>
                    <option value="Offered">Move to Offer</option>
                    <option value="Archived">Archive</option>
                  </select>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-850 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 text-slate-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-350 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">No applications tracked yet</h3>
            <p className="text-xs text-slate-400 mt-1">Visit the Job Scouting board and auto-apply to listings.</p>
          </Card>
        )}
      </div>

      {/* Manual Application Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Track Manual Application" size="sm">
        <form onSubmit={handleAddApp} className="space-y-4">
          <Input label="Job Title" placeholder="Senior SDE" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="Company Name" placeholder="Google" value={company} onChange={(e) => setCompany(e.target.value)} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Location" placeholder="Remote / New York" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Input label="Salary Bracket" placeholder="$120k - $150k" value={salary} onChange={(e) => setSalary(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Current Pipeline Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800"
            >
              <option value="Scouted">Scouted</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full mt-2">
            Submit Submission
          </Button>
        </form>
      </Modal>
    </div>
  );
};
