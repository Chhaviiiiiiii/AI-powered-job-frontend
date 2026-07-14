import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-12 md:py-16 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-800 dark:text-slate-100">
                Auto<span className="text-primary-500">Career</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
              Empowering job seekers to automate their job applications using next-generation AI agents. Land your dream job, 10x faster.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-450 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-450 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-450 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Product
            </h4>
            <a href="#features" className="text-sm font-semibold text-slate-650 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-slate-655 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">How it Works</a>
            <a href="#pricing" className="text-sm font-semibold text-slate-655 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">Pricing</a>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Legal
            </h4>
            <a href="#" className="text-sm font-semibold text-slate-655 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm font-semibold text-slate-655 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm font-semibold text-slate-655 hover:text-primary-500 dark:text-slate-450 dark:hover:text-primary-400 transition-colors">Security</a>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} AutoCareer Inc. All rights reserved.</p>
          <p>Made with passion for autonomous future.</p>
        </div>
      </Container>
    </footer>
  );
};
