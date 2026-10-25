import React, { useState } from 'react';
import { PersonaType, UserProfile } from '../types';

interface GoogleSignInModalProps {
  currentProfile: UserProfile;
  initialStep?: 1 | 2;
  onComplete: (profile: UserProfile) => void;
  onClose: () => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  currentProfile,
  initialStep = 1,
  onComplete,
  onClose,
}) => {
  const [step, setStep] = useState<1 | 2>(initialStep);
  const [name, setName] = useState<string>(currentProfile.name || 'Prasad Ayare');
  const [email, setEmail] = useState<string>(currentProfile.email || 'prasadayare1996@gmail.com');
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>(
    currentProfile.persona || 'Software Engineer'
  );
  const [emailError, setEmailError] = useState<string | null>(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    if (!email.toLowerCase().includes('@')) {
      setEmailError('Please enter a valid Google email address.');
      return;
    }

    setEmailError(null);
    setStep(2);
  };

  const handleFastTrackSignIn = () => {
    setName('Prasad Ayare');
    setEmail('prasadayare1996@gmail.com');
    setEmailError(null);
    setStep(2);
  };

  const handleFinishOnboarding = () => {
    const updatedProfile: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      persona: selectedPersona,
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDinkTsykMrQ-NikWWpQ4gE9lKm-yeiTiifBXEqfJWwOr_9iYWE8gkrDZXSNaLh36Et4WisrRWicl6gC8psVzYy6fnZs_EGeyHM2jpGrMktPKr84Zj7FDufW9XqezP3TAxqpj_9CmUsab1mt-h9E63sAqZwSNz04zEz2wDFSJ8Qz_RKznjc6Plng95tgfPN_cr8YaPcbwvWZ--Sx7PHi-vT6li3Rc3FQnoWflXPoEI1z1l5wXjUAmeE',
      isSignedIn: true,
    };
    onComplete(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden border border-[#DADCE0] shadow-2xl">
        {/* Top Header with Google Brand */}
        <div className="border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-base text-[#1F1F1F]">
              Google PulseDaily Onboarding
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#727785] font-medium bg-[#F1F3F4] px-2 py-0.5 rounded-full">
              Step {step} of 2
            </span>
            <button
              onClick={onClose}
              className="p-1 text-[#727785] hover:text-[#1F1F1F] rounded-full cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* STEP 1: Sign in with Gmail */}
        {step === 1 && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#1F1F1F]">
                Sign in with your Google Account
              </h3>
              <p className="text-xs md:text-sm text-[#444746] max-w-md mx-auto leading-relaxed">
                Unlock real-time Gemini AI role synthesis, persistent reading lists, and custom breaking alert radars tied to your Gmail.
              </p>
            </div>

            {/* Fast-Track 1-Click Google Account Option */}
            <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#DADCE0] space-y-3">
              <div className="text-[11px] font-semibold text-[#727785] uppercase tracking-wider">
                Active Google Session Detected
              </div>
              <button
                type="button"
                onClick={handleFastTrackSignIn}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#E8F0FE] border border-[#DADCE0] hover:border-[#005bbf] transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#005bbf] text-white flex items-center justify-center font-bold text-sm">
                    PA
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-semibold text-[#1F1F1F] group-hover:text-[#005bbf]">
                      Prasad Ayare
                    </div>
                    <div className="text-[11px] text-[#444746]">prasadayare1996@gmail.com</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#005bbf] flex items-center gap-1">
                  Continue <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#727785]">
              <div className="h-px flex-1 bg-[#DADCE0]"></div>
              <span>OR ENTER CREDENTIALS</span>
              <div className="h-px flex-1 bg-[#DADCE0]"></div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1F1F]">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm border border-[#DADCE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005bbf]/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1F1F1F]">Gmail / Google Workspace Email</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  className="w-full px-4 py-2.5 text-sm border border-[#DADCE0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005bbf]/40"
                />
                {emailError && (
                  <p className="text-[11px] text-[#D93025] font-medium">{emailError}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-sm font-semibold rounded-full shadow-sm transition-all transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Persona Selection</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: Choose Your Professional Persona */}
        {step === 2 && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E8E3E] text-xs font-medium border border-[#1E8E3E]/20 mb-1">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                <span>Signed in as {email}</span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#1F1F1F]">
                Choose Your Professional Persona
              </h3>
              <p className="text-xs text-[#444746] max-w-md mx-auto leading-relaxed">
                Gemini 2.5 Flash tailors every technical breakdown, latency metric, and ROI calculation to your daily responsibilities.
              </p>
            </div>

            {/* 3 Selectable Persona Cards */}
            <div className="space-y-3">
              {/* Card 1: Founder / Exec */}
              <div
                onClick={() => setSelectedPersona('Founder / Exec')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedPersona === 'Founder / Exec'
                    ? 'border-[#005bbf] bg-[#E8F0FE]/50 shadow-xs'
                    : 'border-[#DADCE0] bg-white hover:border-[#adc7ff] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#dae2ff] text-[#005bbf] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1F1F1F]">
                      🚀 Founder / Exec
                    </h4>
                    {selectedPersona === 'Founder / Exec' && (
                      <span className="material-symbols-outlined text-[#005bbf] text-lg">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#444746] leading-relaxed">
                    Focuses Gemini impact analysis on <strong>unit economics</strong>, <strong>enterprise ROI</strong>, <strong>competitive moats</strong>, and <strong>build-vs-buy strategy</strong>.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Capex/Opex
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Margin Moats
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Vendor Independence
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Software Engineer */}
              <div
                onClick={() => setSelectedPersona('Software Engineer')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedPersona === 'Software Engineer'
                    ? 'border-[#005bbf] bg-[#E8F0FE]/50 shadow-xs'
                    : 'border-[#DADCE0] bg-white hover:border-[#adc7ff] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#dae2ff] text-[#005bbf] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">terminal</span>
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1F1F1F]">
                      💻 Software Engineer
                    </h4>
                    {selectedPersona === 'Software Engineer' && (
                      <span className="material-symbols-outlined text-[#005bbf] text-lg">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#444746] leading-relaxed">
                    Focuses Gemini impact analysis on <strong>system architecture</strong>, <strong>SDK patterns</strong>, <strong>latency benchmarks</strong>, and <strong>Cloud Run deployment</strong>.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      P99 Latency
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Zero-Copy CUDA
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Monorepo Refactoring
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 3: Product Manager */}
              <div
                onClick={() => setSelectedPersona('Product Manager')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedPersona === 'Product Manager'
                    ? 'border-[#005bbf] bg-[#E8F0FE]/50 shadow-xs'
                    : 'border-[#DADCE0] bg-white hover:border-[#adc7ff] hover:bg-[#F8F9FA]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#dae2ff] text-[#005bbf] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">explore</span>
                </div>
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#1F1F1F]">
                      🧭 Product Manager
                    </h4>
                    {selectedPersona === 'Product Manager' && (
                      <span className="material-symbols-outlined text-[#005bbf] text-lg">
                        check_circle
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#444746] leading-relaxed">
                    Focuses Gemini impact analysis on <strong>user adoption loops</strong>, <strong>roadmap prioritization</strong>, <strong>UX workflows</strong>, and <strong>retention</strong>.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Activation Loops
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Time-to-Value
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#DADCE0] text-[#727785]">
                      Compliance Feasibility
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[#727785] hover:text-[#1F1F1F] font-medium flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Change Email</span>
              </button>

              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="px-6 py-2.5 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full shadow-sm transition-all transform active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Confirm & Personalize My Feed</span>
                <span className="material-symbols-outlined text-base">check</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
