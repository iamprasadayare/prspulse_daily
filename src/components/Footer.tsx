import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#DADCE0] py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#444746]">
        <div>© 2025 Google PulseDaily. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a
            className="hover:text-[#1F1F1F] transition-colors"
            href="#privacy"
            onClick={(e) => e.preventDefault()}
          >
            Privacy Policy
          </a>
          <a
            className="hover:text-[#1F1F1F] transition-colors"
            href="#terms"
            onClick={(e) => e.preventDefault()}
          >
            Terms of Service
          </a>
          <a
            className="hover:text-[#1F1F1F] transition-colors"
            href="#feedback"
            onClick={(e) => e.preventDefault()}
          >
            Feedback
          </a>
        </div>
      </div>
    </footer>
  );
};
