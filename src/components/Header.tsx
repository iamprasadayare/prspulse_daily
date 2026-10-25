import React, { useState, useRef, useEffect } from 'react';
import { PersonaType, UserProfile } from '../types';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfile;
  onOpenSignInModal: (step?: 1 | 2) => void;
  onSignOut: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenBreakdownModal: () => void;
  onOpenSynthesizerModal: () => void;
  hasNotificationPermission: boolean;
  onRequestNotificationPermission: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  userProfile,
  onOpenSignInModal,
  onSignOut,
  searchQuery,
  onSearchChange,
  onOpenBreakdownModal,
  onOpenSynthesizerModal,
  hasNotificationPermission,
  onRequestNotificationPermission,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);

  const notifMenuRef = useRef<HTMLDivElement>(null);
  const appsMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (appsMenuRef.current && !appsMenuRef.current.contains(event.target as Node)) {
        setAppsOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRec();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsMicListening(true);
        recognition.onresult = (e: any) => {
          const transcript = e.results[0][0].transcript;
          onSearchChange(transcript);
          setIsMicListening(false);
        };
        recognition.onerror = () => setIsMicListening(false);
        recognition.onend = () => setIsMicListening(false);
        recognition.start();
      } catch {
        setIsMicListening(false);
        onSearchChange('Gemini 1.5 Pro');
      }
    } else {
      onSearchChange('Gemini 1.5 Pro');
    }
  };

  const tabs = [
    { id: 'for-you', label: 'For you' },
    { id: 'following', label: 'Following' },
    { id: 'agentic-ai', label: 'Agentic AI' },
    { id: 'cloud-and-infra', label: 'Cloud & Infra' },
    { id: 'product-and-strategy', label: 'Product & Strategy' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#DADCE0]">
      {/* Row 1 — Top Google App Bar */}
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-2 md:gap-4 max-w-7xl mx-auto">
        {/* Left: Brand Logo & Title */}
        <div
          className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          onClick={() => onTabChange('for-you')}
        >
          <div className="flex items-center gap-1.5">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-xl md:text-[22px] text-[#1F1F1F] tracking-tight whitespace-nowrap">
              PulseDaily
            </span>
          </div>
        </div>

        {/* Center: Wide pill-shaped search bar */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-4">
          <div className="w-full bg-[#F1F3F4] rounded-full px-4 py-2 flex items-center gap-2.5 text-sm text-[#444746] transition-all hover:bg-[#ebeef4] focus-within:bg-white focus-within:shadow-[0_1px_6px_rgba(32,33,36,0.28)] focus-within:ring-1 focus-within:ring-[#1A73E8]/30">
            <span className="material-symbols-outlined text-[#727785] text-xl shrink-0">search</span>
            <input
              className="w-full bg-transparent border-0 outline-none text-sm text-[#1F1F1F] placeholder:text-[#444746]"
              placeholder="Search AI topics, models, or sources..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="p-1 text-[#727785] hover:text-[#1F1F1F] rounded-full cursor-pointer"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleVoiceSearch}
                className={`p-1.5 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
                  isMicListening
                    ? 'bg-[#FCE8E6] text-[#D93025] animate-pulse'
                    : 'text-[#727785] hover:text-[#1F1F1F] hover:bg-black/5'
                }`}
                title="Search by voice"
                type="button"
              >
                <span className="material-symbols-outlined text-xl">mic</span>
              </button>
              <button
                onClick={onOpenSynthesizerModal}
                className="p-1.5 text-[#727785] hover:text-[#1A73E8] hover:bg-[#E8F0FE] rounded-full transition-colors flex items-center justify-center cursor-pointer"
                title="AI Topic Deep Synthesis"
                type="button"
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions, Persona Indicator, Bell, Google Sign-In Avatar */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          {/* Persona Badge & Switcher Button */}
          <button
            onClick={() => onOpenSignInModal(2)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F0FE] hover:bg-[#dae2ff] text-[#005bbf] text-xs font-semibold rounded-full transition-colors cursor-pointer border border-[#c1c6d6]/40"
            title="Edit your professional persona"
          >
            <span className="material-symbols-outlined text-base">
              {userProfile.persona === 'Founder / Exec'
                ? 'rocket_launch'
                : userProfile.persona === 'Product Manager'
                ? 'explore'
                : 'terminal'}
            </span>
            <span>{userProfile.persona}</span>
            <span className="material-symbols-outlined text-xs">edit</span>
          </button>

          {/* Breaking Alert Bell Toggle */}
          <div className="relative" ref={notifMenuRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-[#727785] hover:text-[#181c20] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center relative cursor-pointer"
              title="Breaking alerts & notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#D93025] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
                3
              </span>
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#DADCE0] p-4 z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#DADCE0]">
                  <span className="font-semibold text-xs text-[#1F1F1F]">
                    Alerts for {userProfile.email}
                  </span>
                  <span className="text-[10px] bg-[#E6F4EA] text-[#1E8E3E] font-medium px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                {/* Push notification toggle */}
                <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#DADCE0] flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-medium text-[#1F1F1F]">Browser Push Alerts</div>
                    <div className="text-[11px] text-[#727785]">
                      {hasNotificationPermission ? 'Enabled for your browser' : 'Requires permission'}
                    </div>
                  </div>
                  <button
                    onClick={onRequestNotificationPermission}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors ${
                      hasNotificationPermission
                        ? 'bg-[#E6F4EA] text-[#1E8E3E] border border-[#1E8E3E]/30'
                        : 'bg-[#005bbf] text-white hover:bg-[#1a73e8]'
                    }`}
                  >
                    {hasNotificationPermission ? 'Active' : 'Enable'}
                  </button>
                </div>

                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setNotificationsOpen(false);
                      onOpenBreakdownModal();
                    }}
                    className="p-2.5 rounded-xl bg-[#FCE8E6]/60 hover:bg-[#FCE8E6] transition-colors cursor-pointer"
                  >
                    <div className="text-[11px] font-bold text-[#D93025]">CRITICAL BREAKING • 8m ago</div>
                    <div className="text-xs text-[#1F1F1F] font-medium mt-0.5">
                      Claude 3.5 Sonnet computer use & autonomous agent API verified
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-[#F1F3F4] transition-colors cursor-pointer">
                    <div className="text-[11px] font-semibold text-[#1A73E8]">arXiv Radar Alert • 32m ago</div>
                    <div className="text-xs text-[#1F1F1F]">
                      FlashAttention-3 CUDA kernel benchmarks hit 99.7% needle recall
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Google Apps Launcher (9 dots) */}
          <div className="relative hidden sm:block" ref={appsMenuRef}>
            <button
              onClick={() => setAppsOpen(!appsOpen)}
              className="p-2 text-[#727785] hover:text-[#181c20] hover:bg-[#F1F3F4] rounded-full transition-colors flex items-center justify-center cursor-pointer"
              title="Google AI Apps"
            >
              <span className="material-symbols-outlined text-xl">apps</span>
            </button>

            {appsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#DADCE0] p-4 grid grid-cols-3 gap-3 z-50">
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#1A73E8]">auto_awesome</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">AI Studio</span>
                </a>
                <a
                  href="https://cloud.google.com/vertex-ai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#34A853]">cloud</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">Vertex AI</span>
                </a>
                <a
                  href="https://deepmind.google"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#EA4335]">neurology</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">DeepMind</span>
                </a>
                <a
                  href="https://ai.google.dev/gemma"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#FBBC05]">diamond</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">Gemma</span>
                </a>
                <a
                  href="https://www.kaggle.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#1A73E8]">query_stats</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">Kaggle</span>
                </a>
                <a
                  href="https://developers.google.com/machine-learning"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#F1F3F4] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-[#727785]">code</span>
                  <span className="text-xs font-medium text-[#1F1F1F] mt-1">ML Devs</span>
                </a>
              </div>
            )}
          </div>

          {/* Sign In with Google / User Profile Chip */}
          {userProfile.isSignedIn ? (
            <div className="relative" ref={profileMenuRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-1.5 py-1 pr-2.5 rounded-full hover:bg-[#F1F3F4] transition-colors cursor-pointer border border-[#DADCE0]"
              >
                <div className="w-8 h-8 rounded-full bg-[#005bbf] text-white flex items-center justify-center font-bold text-xs ring-1 ring-[#DADCE0]">
                  {userProfile.name
                    ? userProfile.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()
                    : 'G'}
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-[#1F1F1F] leading-tight">
                    {userProfile.name}
                  </span>
                  <span className="text-[11px] text-[#444746] leading-tight truncate max-w-[120px]">
                    {userProfile.email}
                  </span>
                </div>
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#DADCE0] p-4 z-50 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-[#DADCE0]">
                    <div className="w-10 h-10 rounded-full bg-[#005bbf] text-white flex items-center justify-center font-bold text-sm">
                      {userProfile.name
                        ? userProfile.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()
                        : 'G'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[#1F1F1F] truncate">
                        {userProfile.name}
                      </div>
                      <div className="text-xs text-[#444746] truncate">{userProfile.email}</div>
                    </div>
                  </div>

                  <div className="text-xs space-y-2 text-[#444746]">
                    <div className="flex justify-between items-center">
                      <span>Current Persona:</span>
                      <span className="font-semibold text-[#005bbf]">{userProfile.persona}</span>
                    </div>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenSignInModal(2);
                      }}
                      className="w-full py-1.5 px-3 bg-[#E8F0FE] hover:bg-[#dae2ff] text-[#005bbf] font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">tune</span>
                      <span>Change Persona Lens</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onSignOut();
                      }}
                      className="w-full py-1.5 px-3 hover:bg-[#FCE8E6] text-[#D93025] font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenSignInModal(1)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-[#F8F9FA] text-[#1F1F1F] text-xs font-semibold rounded-full border border-[#DADCE0] shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}
        </div>
      </div>

      {/* Row 2 — Horizontal Google News Tab Bar */}
      <div className="px-6 border-t border-[#DADCE0] bg-white overflow-x-auto">
        <nav className="flex items-center justify-center space-x-1 md:space-x-4 h-12 max-w-7xl mx-auto min-w-max">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`h-full flex items-center px-3 md:px-4 text-sm font-medium transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-[#005bbf] font-semibold'
                    : 'text-[#444746] hover:text-[#1F1F1F] hover:bg-[#F1F3F4]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1A73E8] rounded-t-sm" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
