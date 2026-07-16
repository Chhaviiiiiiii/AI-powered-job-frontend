import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Brain, CheckCircle, Sparkles, Filter } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  status: 'Scouted' | 'Applying' | 'Applied' | 'Ignored';
  description: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend React Developer',
    company: 'Stripe',
    location: 'Remote (US/Canada)',
    salary: '$140,000 - $170,000',
    type: 'Full-time',
    matchScore: 94,
    status: 'Scouted',
    description: 'Lead engineering efforts on our developer dashboard widgets and checkout interfaces using React and TailwindCSS.',
  },
  {
    id: '2',
    title: 'Staff Software Engineer - UI Systems',
    company: 'Vercel',
    location: 'Hybrid (San Francisco, CA)',
    salary: '$180,050 - $220,000',
    type: 'Full-time',
    matchScore: 89,
    status: 'Scouted',
    description: 'Design, build, and optimize next-generation components and framework utilities for global developers.',
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Netflix',
    location: 'Onsite (Los Gatos, CA)',
    salary: '$130,000 - $160,000',
    type: 'Contract',
    matchScore: 82,
    status: 'Scouted',
    description: 'Collaborate with designers to implement intuitive landing pages and client dashboards for rich content streamers.',
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'Google',
    location: 'Remote (US)',
    salary: '$150,000 - $180,000',
    type: 'Full-time',
    matchScore: 74,
    status: 'Scouted',
    description: 'Develop and support high-quality mobile applications using React Native frameworks.',
  },
  {
    id: '5',
    title: 'Software Engineer II (React)',
    company: 'Microsoft',
    location: 'Hybrid (Redmond, WA)',
    salary: '$120,000 - $145,000',
    type: 'Full-time',
    matchScore: 91,
    status: 'Scouted',
    description: 'Build robust web applications inside the cloud management consoles. Heavy typescript usage.',
  },
];

export const JobSearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mock_jobs');
    if (saved) {
      setJobs(JSON.parse(saved));
    } else {
      setJobs(mockJobs);
      localStorage.setItem('mock_jobs', JSON.stringify(mockJobs));
    }
  }, []);

  const handleApply = (id: string) => {
    setApplyingId(id);
    
    // Update state to applying
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: 'Applying' as const } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('mock_jobs', JSON.stringify(updatedJobs));

    // Simulate AI optimization and submit delay
    setTimeout(() => {
      const finishedJobs = updatedJobs.map((job) =>
        job.id === id ? { ...job, status: 'Applied' as const } : job
      );
      setJobs(finishedJobs);
      localStorage.setItem('mock_jobs', JSON.stringify(finishedJobs));
      setApplyingId(null);

      // Add to application tracker dynamically
      const activeApps = JSON.parse(localStorage.getItem('tracked_applications') || '[]');
      const newlyApplied = finishedJobs.find((j) => j.id === id);
      if (newlyApplied && !activeApps.some((a: any) => a.id === id)) {
        activeApps.push({
          id: newlyApplied.id,
          title: newlyApplied.title,
          company: newlyApplied.company,
          location: newlyApplied.location,
          salary: newlyApplied.salary,
          matchScore: newlyApplied.matchScore,
          stage: 'Applied',
          dateApplied: new Date().toLocaleDateString(),
        });
        localStorage.setItem('tracked_applications', JSON.stringify(activeApps));
      }
    }, 2000);
  };

  const handleIgnore = (id: string) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: 'Ignored' as const } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem('mock_jobs', JSON.stringify(updatedJobs));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'All' || job.type === typeFilter;

    return matchesSearch && matchesType && job.status !== 'Ignored';
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Job Scouting Board</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Our agent continuously monitors company portals and screens candidates. Approve applications below.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary-500/10 text-primary-655 dark:text-primary-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-primary-500/20">
          <Brain className="w-4 h-4 animate-pulse" />
          <span>Agent Online: Scouting...</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search matching positions, keywords, technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="flex items-center gap-2 relative">
          <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 pl-10 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 outline-none bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-primary-500 w-44"
          >
            <option value="All">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const hasApplied = job.status === 'Applied';
            const isCurrentlyApplying = job.status === 'Applying';

            return (
              <Card
                key={job.id}
                className={`p-6 border transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700
                  ${isCurrentlyApplying ? 'border-primary-500/40 bg-primary-500/5' : ''}
                  ${hasApplied ? 'border-emerald-500/20 bg-emerald-50/5 dark:bg-emerald-950/5' : 'border-slate-100 dark:border-slate-800'}`}
              >
                {/* Details */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                      {job.company}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-750" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {job.type}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-750" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {job.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-850 dark:text-white">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-655 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      {job.salary}
                    </span>
                  </div>
                </div>

                {/* Match Score & Actions */}
                <div className="flex flex-row md:flex-col md:items-end justify-between gap-4 md:border-l md:border-slate-100 dark:md:border-slate-800 md:pl-6 min-w-[200px]">
                  {/* AI Match badge */}
                  <div className="flex flex-col gap-1 items-start md:items-end">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-violet-600 to-pink-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
                      <Brain className="w-3 h-3" />
                      <span>{job.matchScore}% Match</span>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-550 font-semibold mt-1">
                      High skills intersection
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-2">
                    {!hasApplied && !isCurrentlyApplying && (
                      <Button variant="ghost" size="sm" onClick={() => handleIgnore(job.id)} disabled={isCurrentlyApplying}>
                        Ignore
                      </Button>
                    )}

                    {isCurrentlyApplying ? (
                      <Button variant="primary" size="sm" isLoading className="px-5">
                        Applying...
                      </Button>
                    ) : hasApplied ? (
                      <Badge variant="success" size="md">
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                        Applied
                      </Badge>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleApply(job.id)}
                        leftIcon={<Sparkles className="w-4 h-4 text-white" />}
                      >
                        Auto-Apply
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-12 text-center text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
            <Briefcase className="w-12 h-12 text-slate-350 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">No jobs match search criteria</h3>
            <p className="text-xs text-slate-400 mt-1">Try updating your filters or search terms.</p>
          </Card>
        )}
      </div>
    </div>
  );
};
