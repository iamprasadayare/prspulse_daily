import React, { useState } from 'react';
import { PersonaType, UserProfile } from '../types';

interface BriefingHeaderProps {
  userProfile: UserProfile;
  onRoleLensChange: (role: PersonaType) => void;
  onPlayAudioBrief: () => void;
  onRefreshFeed: () => void;
  isRefreshing: boolean;
  isHnConnected: boolean;
}

const PERSONAS: { id: PersonaType; label: string; icon: string }[] = [
  { id: 'Founder / Exec', label: 'Founder / Exec', icon: 'rocket_launch' },
  { id: 'Software Engineer', label: 'Software Engineer', icon: 'terminal' },
  { id: 'Product Manager', label: 'Product Manager', icon: 'explore' },
];

export const BriefingHeader: React.FC<BriefingHeaderProps> = ({
  userProfile,
  onRoleLensChange,
  onPlayAudioBrief,
  onRefreshFeed,
  isRefreshing,
  isHnConnected,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-[28px] text-[#1F1F1F] tracking-tight font-medium">
            {userProfile.isSignedIn && userProfile.name
              ? `Your briefing, ${userProfile.name.split(' ')[0]}`
              : 'Your briefing'}
          </h1>

          {/* Persona Lens Pill dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8F0FE] hover:bg-[#dae2ff] text-[#005bbf] text-xs md:text-sm font-semibold rounded-full transition-colors cursor-pointer border border-[#c1c6d6]/30 shadow-2xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px] text-[#005bbf]">
                {userProfile.persona === 'Founder / Exec'
                  ? 'rocket_launch'
                  : userProfile.persona === 'Product Manager'
                  ? 'explore'
                  : 'terminal'}
              </span>
              <span>Role Lens: {userProfile.persona}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#DADCE0] py-2 z-50">
                <div className="px-4 py-1.5 text-xs font-semibold text-[#727785] uppercase tracking-wider">
                  Select Professional Persona
                </div>
                {PERSONAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onRoleLensChange(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs md:text-sm flex items-center justify-between hover:bg-[#F1F3F4] transition-colors cursor-pointer ${
                      userProfile.persona === p.id
                        ? 'text-[#005bbf] font-bold bg-[#E8F0FE]/60'
                        : 'text-[#1F1F1F]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-lg">{p.icon}</span>
                      <span>{p.label}</span>
                    </div>
                    {userProfile.persona === p.id && (
                      <span className="material-symbols-outlined text-sm text-[#005bbf]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live HackerNews API Badge */}
          {isHnConnected && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E8E3E] text-xs font-medium border border-[#1E8E3E]/20">
              <span className="w-2 h-2 rounded-full bg-[#1E8E3E] animate-pulse"></span>
              Live HackerNews API Active
            </span>
          )}
        </div>

        <p className="text-sm text-[#444746] flex items-center gap-2 flex-wrap">
          <span>{dateStr || 'Wednesday, October 24'}</span>
          <span className="w-1 h-1 rounded-full bg-[#727785]"></span>
          <span>
            Curated for your {userProfile.persona} tech stack & cloud architecture focus
          </span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
        <button
          onClick={onPlayAudioBrief}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-sm font-semibold rounded-full shadow-sm transition-all transform active:scale-95 cursor-pointer"
          id="briefingPlayBtn"
          type="button"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
          <span>Listen to Daily Brief (60s)</span>
        </button>

        <button
          onClick={onRefreshFeed}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#ebeef4] hover:bg-[#e5e8ee] text-[#414754] text-sm font-medium rounded-full transition-colors cursor-pointer disabled:opacity-50"
          type="button"
        >
          <span
            className={`material-symbols-outlined text-lg ${isRefreshing ? 'animate-spin text-[#1A73E8]' : ''}`}
          >
            sync
          </span>
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Feed'}</span>
        </button>
      </div>
    </section>
  );
};
