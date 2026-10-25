import React from 'react';
import { BreakingAlert, PersonaType } from '../types';

interface LiveBreakdownModalProps {
  alert: BreakingAlert;
  persona: PersonaType;
  userName: string;
  onClose: () => void;
}

export const LiveBreakdownModal: React.FC<LiveBreakdownModalProps> = ({
  alert,
  persona,
  userName,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#DADCE0] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#FCE8E6] border-b border-[#FAD2CF] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D93025] text-white text-xs font-semibold tracking-wider animate-pulse">
              LIVE BREAKDOWN
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base md:text-lg font-medium text-[#1F1F1F] truncate max-w-xl">
              {alert.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727785] hover:text-[#1F1F1F] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-[#005bbf] uppercase tracking-wider">
              Verification Consensus • {alert.sourcesVerifiedCount} Sources Grounded
            </div>
            <p className="text-sm text-[#1F1F1F] leading-relaxed">
              {alert.summary}
            </p>
          </div>

          {/* Persona Tailored Impact Box */}
          <div className="bg-[#E8F0FE] border border-[#c1c6d6]/30 rounded-xl p-4 flex gap-3.5">
            <span
              className="material-symbols-outlined text-[#005bbf] text-2xl shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {persona === 'Founder / Exec'
                ? 'rocket_launch'
                : persona === 'Product Manager'
                ? 'explore'
                : 'psychology'}
            </span>
            <div className="space-y-1">
              <span className="text-xs text-[#005bbf] font-semibold uppercase tracking-wider block">
                ✨ Live Impact for {userName} ({persona})
              </span>
              <p className="text-xs md:text-sm text-[#414754] leading-relaxed">
                <strong className="text-[#181c20] font-medium">{alert.leadImpact}: </strong>
                {alert.roleAnalysis}
              </p>
            </div>
          </div>

          {/* 3 Technical Highlights */}
          {alert.bullets && alert.bullets.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-[#727785] uppercase tracking-wider">
                Key Technical Signals
              </h4>
              <div className="space-y-2">
                {alert.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#DADCE0] text-xs text-[#1F1F1F]"
                  >
                    <span className="text-[#D93025] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Timeline */}
          <div>
            <h4 className="text-xs font-semibold text-[#727785] uppercase tracking-wider mb-2">
              Real-Time Verification Timeline
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                <span className="font-mono text-[#D93025] font-semibold shrink-0">Now</span>
                <div>
                  <strong className="text-[#1F1F1F]">Threshold Activated: </strong>
                  Radar triggered threshold alert for {alert.title}. Dispatched push notification.
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                <span className="font-mono text-[#005bbf] font-semibold shrink-0">1m ago</span>
                <div>
                  <strong className="text-[#1F1F1F]">Multi-Source Verification: </strong>
                  Cross-checked against arXiv preprints, GitHub pull requests, and model registries.
                </div>
              </div>
              <div className="flex items-start gap-3 p-2.5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0]">
                <span className="font-mono text-[#1E8E3E] font-semibold shrink-0">3m ago</span>
                <div>
                  <strong className="text-[#1F1F1F]">Synthesized for {persona}: </strong>
                  Tailored unit economics, latency metrics, and architectural guardrails generated.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F9FA] border-t border-[#DADCE0] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#D93025] hover:bg-[#b3261e] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
