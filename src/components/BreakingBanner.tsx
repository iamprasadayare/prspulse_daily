import React from 'react';
import { BreakingAlert } from '../types';

interface BreakingBannerProps {
  alert: BreakingAlert;
  onViewBreakdown: () => void;
  onResetDefault?: () => void;
}

export const BreakingBanner: React.FC<BreakingBannerProps> = ({
  alert,
  onViewBreakdown,
  onResetDefault,
}) => {
  return (
    <section className="bg-[#FCE8E6] border border-[#FAD2CF] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-all animate-fade-in">
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#D93025] text-white text-xs font-semibold tracking-wider animate-pulse shrink-0">
          BREAKING
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#1F1F1F] truncate">
            {alert.title}
          </p>
          <p className="text-xs text-[#444746]">
            {alert.timestamp} • {alert.sourcesVerifiedCount} engineering benchmarks and community sources verified
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onViewBreakdown}
          className="inline-flex items-center gap-1 text-[#D93025] hover:text-[#b3261e] text-sm font-semibold group cursor-pointer"
          type="button"
        >
          <span>View live breakdown</span>
          <span className="material-symbols-outlined text-base group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>

        {alert.isCustom && onResetDefault && (
          <button
            onClick={onResetDefault}
            className="text-xs text-[#727785] hover:text-[#1F1F1F] underline cursor-pointer"
            title="Reset to default breaking alert"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
};
