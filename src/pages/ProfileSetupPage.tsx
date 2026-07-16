import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Upload, Plus, X, ShieldAlert, Cpu } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface ProfileSettings {
  jobTitle: string;
  targetSalary: number;
  locationPreference: string;
  skills: string[];
  matchThreshold: number;
  autoSubmit: boolean;
  resumeName: string;
}

const defaultProfile: ProfileSettings = {
  jobTitle: 'Senior React Developer',
  targetSalary: 120000,
  locationPreference: 'Remote',
  skills: ['React', 'TypeScript', 'TailwindCSS', 'Node.js', 'Next.js'],
  matchThreshold: 80,
  autoSubmit: false,
  resumeName: 'master_resume_2026.pdf',
};

export const ProfileSetupPage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileSettings>(defaultProfile);
  const [newSkill, setNewSkill] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('agent_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('agent_profile', JSON.stringify(profile));
    setSuccessMsg('AI Agent configuration updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  const simulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setProfile((p) => ({ ...p, resumeName: file.name }));
            return 100;
          }
          return prev + 20;
        });
      }, 200);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Intro Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">AI Pilot & Profile Configuration</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Define your application parameters. Your autonomous agent uses these rules to filter, adapt, and apply for jobs.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Form fields */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
              Professional Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Target Job Title"
                type="text"
                value={profile.jobTitle}
                onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                required
              />

              <Input
                label="Target Salary ($/year)"
                type="number"
                value={profile.targetSalary}
                onChange={(e) => setProfile({ ...profile, targetSalary: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Location Preference</label>
              <select
                value={profile.locationPreference}
                onChange={(e) => setProfile({ ...profile, locationPreference: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none bg-white dark:bg-slate-900 text-slate-850 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-primary-500"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
                <option value="Anywhere">Anywhere</option>
              </select>
            </div>

            {/* Resume upload simulator */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Master Resume PDF</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={simulateUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-250 block">
                  {uploading ? 'Processing resume bullet points...' : profile.resumeName ? profile.resumeName : 'Upload new PDF Resume'}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                  PDF format up to 5MB. AutoCareer parses skills and adapts text.
                </span>

                {uploading && (
                  <div className="mt-4 w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-500 h-full transition-all duration-200" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Skills Area */}
          <Card className="p-6 space-y-6">
            <h3 className="text-md font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3">
              Skills Checklist
            </h3>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-500 text-slate-400 p-0.5 rounded-lg"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2 max-w-sm">
              <Input
                placeholder="React, ATS Optimization..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddSkill} className="px-4">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Agent settings */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6 border-primary-500/20 shadow-lg shadow-primary-500/5 bg-gradient-to-b from-white to-primary-50/5 dark:from-slate-900 dark:to-primary-950/5">
            <div className="flex items-center gap-2 text-primary-500">
              <Cpu className="w-5 h-5 text-primary-500" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Agent Parameters
              </h3>
            </div>

            {/* Threshold slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-655 dark:text-slate-400">Match Score Filter</span>
                <span className="text-primary-500">{profile.matchThreshold}% or above</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={profile.matchThreshold}
                onChange={(e) => setProfile({ ...profile, matchThreshold: parseInt(e.target.value) })}
                className="w-full accent-primary-500 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer h-2"
              />
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block leading-tight">
                AI Agent will only auto-apply to listings matching this threshold score.
              </span>
            </div>

            {/* Auto submit toggle */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Autopilot Mode</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Agent will automatically submit applications without confirmation.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={profile.autoSubmit}
                  onChange={(e) => setProfile({ ...profile, autoSubmit: e.target.checked })}
                  className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer appearance-none checked:bg-primary-555 checked:bg-primary-500 relative before:content-[''] before:absolute before:w-4 before:h-4 before:rounded-full before:bg-white before:top-0.5 before:left-0.5 before:transition-all checked:before:translate-x-4 shadow-sm border border-slate-300 dark:border-slate-700"
                />
              </div>

              {profile.autoSubmit && (
                <div className="flex gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-[10px] text-amber-650 dark:text-amber-400">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Autopilot applies 24/7 on your behalf. Ensure your master resume matches your experience accurately!</span>
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2">
              <Save className="w-4 h-4" />
              Save AI Settings
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
};
