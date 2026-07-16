import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  FileText, 
  Zap, 
  Cpu, 
  BarChart, 
  ArrowRight, 
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { Badge } from '@/components/common/Badge';
import { useAuth } from '@/contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);



  const companies = ['Google', 'Meta', 'Stripe', 'Netflix', 'Airbnb', 'Microsoft'];

  const features = [
    {
      icon: Cpu,
      title: 'AI Autopilot Apply',
      description: 'Our advanced autonomous agents tailor your resume and submit high-probability applications while you sleep.',
      color: 'text-violet-500 bg-violet-50 dark:bg-violet-950/30'
    },
    {
      icon: Search,
      title: 'Smart Job Matching',
      description: 'Continuous scanning of top boards and company portals. We filter out the noise and lock onto matching positions.',
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/30'
    },
    {
      icon: FileText,
      title: 'Tailored Resumes',
      description: 'Dynamically adapt and optimize bullet points and keywords for each job post to pass ATS checkers with top scores.',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/30'
    },
    {
      icon: BarChart,
      title: 'Real-Time Analytics',
      description: 'Track application stages, response rates, and salary benchmarks in a single comprehensive cockpit.',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'Profile Auto-Sync',
      desc: 'Link your LinkedIn or upload your master resume. Set your criteria, target salary, and job preferences.'
    },
    {
      num: '02',
      title: 'Agent Instruction',
      desc: 'Configure your autonomous job-seeking agent. Define triggers, limits, and validation steps.'
    },
    {
      num: '03',
      title: 'Autonomous Pilot',
      desc: 'Our AI finds jobs, tailrows your credentials, performs validation checks, and applies automatically.'
    },
    {
      num: '04',
      title: 'Review Offers',
      desc: 'Get direct invitations to interviews and track dashboard status updates in real-time.'
    }
  ];

  const testimonials = [
    {
      quote: "AutoCareer completely redefined my job search. It applied to 12 targeted roles, and I received 3 interview invites within the first week!",
      author: "Sarah Jenkins",
      role: "Senior Software Engineer"
    },
    {
      quote: "Instead of spending hours filling out tedious forms, I set up my autonomous agent. I landed a staff product design job with zero stress.",
      author: "Alex Rivera",
      role: "Lead Product Designer"
    }
  ];

  const faqs = [
    {
      q: "How does the AI customize my resume for each application?",
      a: "Our AI scans the job description, highlights critical keywords, and restructures your existing master resume experiences to showcase maximum match score while retaining full factual honesty."
    },
    {
      q: "Will it apply to positions without my confirmation?",
      a: "You have complete control! You can choose 'Full Autopilot' mode or set it to 'Draft Mode' where you review and click submit after the agent drafts the application."
    },
    {
      q: "Which job boards does the platform support?",
      a: "We currently support LinkedIn, Indeed, Glassdoor, Greenhouse, Lever, and direct career portals for over 10,000 global tech organizations."
    }
  ];

  return (
    <div className="overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-grid-pattern">
        {/* Colorful blob overlay */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Badge variant="primary" size="md">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary-600 dark:text-primary-400 animate-pulse" />
              Autonomous AI Agents are Active
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Automate Your Job Search and Submit Applications using{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-pink-500">
              Autonomous AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Let our next-gen agents optimize your resume, scout matching roles, fill forms, and apply 24/7. Land your dream job on autopilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              variant="primary" 
              size="lg" 
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => isAuthenticated ? navigate('/dashboard') : openAuthModal('signup')}
            >
              Get Started Free
            </Button>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </a>
          </motion.div>
        </Container>
      </section>

      {/* Trusted Companies */}
      <section className="py-10 border-y border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/10">
        <Container>
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            Autonomous agent submissions landing offers at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 dark:opacity-40">
            {companies.map((c) => (
              <span key={c} className="text-lg md:text-xl font-extrabold text-slate-700 dark:text-slate-200 tracking-tight">
                {c}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <Section id="features" bg="muted">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="sm">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mt-3">
              Supercharge your career hunt with autopilot tech
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-sm md:text-base">
              A comprehensive toolkit engineered to maximize interview success while automating manual job hunting tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card hoverEffect className="h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How It Works */}
      <Section id="how-it-works" bg="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="sm">Pipeline</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mt-3">
              Set up your agent in 4 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col gap-4 relative">
                {/* Numeric background badge */}
                <div className="text-5xl font-black text-slate-100 dark:text-slate-900 select-none">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-150">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section bg="muted">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="primary" size="sm">Why AutoCareer</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mt-3 mb-6">
              Spend less time filling forms, more time preparing for offers
            </h2>
            <div className="flex flex-col gap-4">
              {[
                'Automated tailored resume variants with proper keywords.',
                'Greenhouse, Lever, Workday autonomous compatibility.',
                'Direct-to-recruiter outreach drafts prepared dynamically.',
                '100% human-verified final triggers keep you in control.'
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-655 dark:text-slate-350">{point}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button variant="primary" onClick={() => navigate('/profile/setup')}>
                Get Setup Now
              </Button>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-8 flex flex-col gap-6">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-500" /> Success Engine Status
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-900">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Average ATS Score</span>
                <span className="text-xs font-bold text-emerald-500">94.8%</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-900">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Applications Completed</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">12,482</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-900">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Weekly Time Saved</span>
                <span className="text-xs font-bold text-primary-500">18.4 Hours</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" bg="default">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="sm">Social Proof</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mt-3">
              Success stories from global developers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <Card key={t.author} className="relative flex flex-col justify-between p-8">
                <p className="text-sm italic text-slate-550 dark:text-slate-350 leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-150">
                    {t.author}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {t.role}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing Placeholder */}
      <Section id="pricing" bg="muted">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" size="sm">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800 dark:text-white mt-3">
              Fair, transparent pricing for active applicants
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-xs md:text-sm">
              Unlock maximum automation. Get started for free, upgrade as you scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
            <Card className="p-8 flex flex-col justify-between border-2 border-transparent">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Free Pilot</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for testing our auto-scouter.</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-slate-850 dark:text-white">$0</span>
                  <span className="text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 1 Active Job Scouting Agent</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 5 AI Auto-Submissions / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Basic ATS Optimization</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate('/profile/setup')}>
                Get Started Free
              </Button>
            </Card>

            <Card className="p-8 flex flex-col justify-between border-2 border-primary-500 shadow-xl relative">
              <div className="absolute top-0 right-6 -translate-y-1/2">
                <Badge variant="primary">Most Popular</Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Pro Autopilot</h3>
                <p className="text-xs text-slate-400 mt-1">Complete autonomous workflow scaling.</p>
                <div className="my-6">
                  <span className="text-3xl font-extrabold text-slate-850 dark:text-white">$29</span>
                  <span className="text-slate-400 text-xs"> / month</span>
                </div>
                <ul className="space-y-3 mb-8 text-xs text-slate-500 dark:text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Unlimited Search Agents</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> 100 Auto-Submissions / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Tailored Cover Letters & Resume</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Live Interview Pipeline Analytics</li>
                </ul>
              </div>
              <Button variant="primary" className="w-full" onClick={() => isAuthenticated ? navigate('/dashboard') : openAuthModal('signup')}>
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQ Placeholder */}
      <Section bg="default">
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="primary" size="sm">Support</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-850 dark:text-white mt-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/20 dark:bg-slate-900/5 transition-colors duration-250"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-slate-800 dark:text-slate-200 text-left"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <Minus className="w-4 h-4 text-primary-500" /> : <Plus className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bg="gradient" className="border-b-0">
        <Container className="text-center relative py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-pink-500/10 rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-850 dark:text-white">
              Ready to land your next interview?
            </h2>
            <p className="mt-4 text-sm text-slate-550 dark:text-slate-400">
              Set up your agent, define preferences, and sit back. We handle the rest.
            </p>
            <div className="mt-8 flex justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => isAuthenticated ? navigate('/dashboard') : openAuthModal('signup')}
              >
                Launch Your AI Pilot Now
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
