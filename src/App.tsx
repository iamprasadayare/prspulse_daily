/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PersonaType, UserProfile, Story, RadarTopic, SavedArticle, BreakingAlert } from './types';
import {
  INITIAL_STORIES,
  INITIAL_RADAR_TOPICS,
  INITIAL_SAVED_ARTICLES,
  DAILY_AUDIO_EPISODE,
} from './data/mockStories';
import { Header } from './components/Header';
import { BriefingHeader } from './components/BriefingHeader';
import { BreakingBanner } from './components/BreakingBanner';
import { StoryCard } from './components/StoryCard';
import { RadarCard } from './components/RadarCard';
import { AudioPlayerCard } from './components/AudioPlayerCard';
import { SavedLaterCard } from './components/SavedLaterCard';
import { FullCoverageModal } from './components/FullCoverageModal';
import { LiveBreakdownModal } from './components/LiveBreakdownModal';
import { ArticleModal } from './components/ArticleModal';
import { AISynthesizerModal } from './components/AISynthesizerModal';
import { CustomizeInterestsModal } from './components/CustomizeInterestsModal';
import { AddRadarModal } from './components/AddRadarModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { GoogleSignInModal } from './components/GoogleSignInModal';
import { Footer } from './components/Footer';

const DEFAULT_BREAKING_ALERT: BreakingAlert = {
  id: 'default-break',
  title: 'Anthropic releases Claude 3.5 Sonnet computer use capability & autonomous agent API',
  summary:
    'Anthropic has deployed an autonomous computer use capability via an updated Claude 3.5 Sonnet model. The model interprets screenshots, calculates pixel coordinates, emits mouse moves, clicks, and keystrokes.',
  sourcesVerifiedCount: 42,
  timestamp: '8m ago',
  leadImpact: 'Workflow transformation',
  roleAnalysis:
    'Immediate strategic shift for automating complex repetitive desktop engineering and QA workflows without custom APIs.',
  bullets: [
    'Autonomous agent API with screenshot analysis and coordinate emission',
    '49.0% on SWE-bench Verified frontier coding benchmark',
    'Requires sandboxed ephemeral VM execution for strict security isolation',
  ],
  isCustom: false,
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('for-you');

  // User Profile with Gmail and Persona
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('pulsedaily_user_profile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored user profile:', e);
    }
    return {
      name: 'Prasad Ayare',
      email: 'prasadayare1996@gmail.com',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDinkTsykMrQ-NikWWpQ4gE9lKm-yeiTiifBXEqfJWwOr_9iYWE8gkrDZXSNaLh36Et4WisrRWicl6gC8psVzYy6fnZs_EGeyHM2jpGrMktPKr84Zj7FDufW9XqezP3TAxqpj_9CmUsab1mt-h9E63sAqZwSNz04zEz2wDFSJ8Qz_RKznjc6Plng95tgfPN_cr8YaPcbwvWZ--Sx7PHi-vT6li3Rc3FQnoWflXPoEI1z1l5wXjUAmeE',
      persona: 'Software Engineer',
      isSignedIn: true,
    };
  });

  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [radarTopics, setRadarTopics] = useState<RadarTopic[]>(INITIAL_RADAR_TOPICS);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>(() => {
    try {
      const saved = localStorage.getItem('pulsedaily_saved_articles');
      return saved ? JSON.parse(saved) : INITIAL_SAVED_ARTICLES;
    } catch {
      return INITIAL_SAVED_ARTICLES;
    }
  });

  const [currentBreakingAlert, setCurrentBreakingAlert] = useState<BreakingAlert>(DEFAULT_BREAKING_ALERT);
  const [isDetectingBreaking, setIsDetectingBreaking] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isHnConnected, setIsHnConnected] = useState<boolean>(true);
  const [hnStories, setHnStories] = useState<any[]>([]);

  // Browser push notification state
  const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(() => {
    return typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted';
  });

  // Modals state
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [signInModalInitialStep, setSignInModalInitialStep] = useState<1 | 2>(1);
  const [fullCoverageStory, setFullCoverageStory] = useState<Story | null>(null);
  const [articleModalStory, setArticleModalStory] = useState<Story | null>(null);
  const [breakdownModalOpen, setBreakdownModalOpen] = useState<boolean>(false);
  const [synthesizerModalOpen, setSynthesizerModalOpen] = useState<boolean>(false);
  const [interestsModalOpen, setInterestsModalOpen] = useState<boolean>(false);
  const [addRadarModalOpen, setAddRadarModalOpen] = useState<boolean>(false);
  const [savedModalOpen, setSavedModalOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync user profile & saved articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pulsedaily_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('pulsedaily_saved_articles', JSON.stringify(savedArticles));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [savedArticles]);

  // Request native browser push notification permission
  const handleRequestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        if (result === 'granted') {
          setHasNotificationPermission(true);
          showToast(`🔔 Push notifications active for ${userProfile.email}`);
          new Notification('Google PulseDaily Alerts Activated', {
            body: `You will receive instant breaking alerts for ${userProfile.persona} focus.`,
            icon: 'https://lh3.googleusercontent.com/aida/AEtjO1Vtyh4RVT6dVG7xXlOZkhUxx4V-5eo68F8ZVIO851s8kDRf1WK5BnYRMekz-CDjDikxhDXdzq599paXB5kh879ASTbhPSMhsMpnEA6YU7fkflANmburWtBamsWqAsImFibjfSqBzEkQfcCaWIuC30ayx1XS0JfEQyu4z4ZlvCt-9ki7ow_8cOgS5QV8NlkhAK-G9SqvBVcJj8x-z2NoiCvC_qsefcM2eaA6M54qwaKwNytnsQ3FNPBN-Q',
          });
        } else {
          showToast('Notification permission was not granted');
        }
      } catch (err) {
        console.warn('Notification permission error:', err);
      }
    } else {
      showToast('Browser notifications not supported on this device');
    }
  };

  // Fetch Live HackerNews tech stories
  const fetchHnStories = async () => {
    try {
      const res = await fetch('/api/hackernews');
      if (res.ok) {
        const json = await res.json();
        if (json.stories && json.stories.length > 0) {
          setHnStories(json.stories);
          setIsHnConnected(true);
        }
      }
    } catch (e) {
      console.warn('Failed to fetch live HN stories:', e);
    }
  };

  useEffect(() => {
    fetchHnStories();
  }, []);

  // Refresh Feed action
  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    await fetchHnStories();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(`Briefing refreshed for ${userProfile.persona} with latest signals`);
    }, 600);
  };

  // Audio Play trigger
  const handlePlayAudioBrief = () => {
    setIsAudioPlaying(true);
    const audioCard = document.getElementById('dailyAudioCard');
    if (audioCard) {
      audioCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Trigger Breaking News Alert Detector
  const handleTriggerBreakingAlert = async (topic: string) => {
    setIsDetectingBreaking(true);
    try {
      const res = await fetch('/api/breaking-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          persona: userProfile.persona,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const json = await res.json();
      const newAlert: BreakingAlert = json.alert || {
        id: `break-${Date.now()}`,
        title: `Breaking: ${topic} Deployed with Immediate Relevance`,
        summary: `Real-time threshold triggered across arXiv preprints, GitHub releases, and model registries for ${topic}.`,
        sourcesVerifiedCount: 38,
        timestamp: 'Just now',
        leadImpact: userProfile.persona === 'Founder / Exec' ? 'Competitive Advantage' : 'Architecture Shift',
        roleAnalysis: `Immediate strategic implications for teams deploying ${topic} in production with high SLA guarantees.`,
        bullets: [
          `Benchmarked with 42% latency reduction on distributed inference clusters`,
          `Drop-in compatibility with OpenAI and Vertex AI API endpoints`,
          `Grounded in 28 verified industry and academic sources`,
        ],
        isCustom: true,
      };

      setCurrentBreakingAlert(newAlert);

      // Dispatch native desktop notification if permission granted
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(`🚨 BREAKING AI ALERT: ${newAlert.title}`, {
          body: `Priority alert for ${userProfile.email} (${userProfile.persona}):\n${newAlert.summary}`,
          icon: 'https://lh3.googleusercontent.com/aida/AEtjO1Vtyh4RVT6dVG7xXlOZkhUxx4V-5eo68F8ZVIO851s8kDRf1WK5BnYRMekz-CDjDikxhDXdzq599paXB5kh879ASTbhPSMhsMpnEA6YU7fkflANmburWtBamsWqAsImFibjfSqBzEkQfcCaWIuC30ayx1XS0JfEQyu4z4ZlvCt-9ki7ow_8cOgS5QV8NlkhAK-G9SqvBVcJj8x-z2NoiCvC_qsefcM2eaA6M54qwaKwNytnsQ3FNPBN-Q',
        });
      }

      showToast(`🚨 Breaking Alert Triggered & Pushed to ${userProfile.email}`);

      // Smooth scroll to top to see the breaking banner
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Breaking alert detection failed:', err);
      showToast('Breaking alert triggered with local synthesis');
    } finally {
      setIsDetectingBreaking(false);
    }
  };

  // Toggle Save story
  const handleToggleSave = (story: Story) => {
    const exists = savedArticles.some(
      (a) => a.id === story.id || a.title.toLowerCase() === story.title.toLowerCase()
    );

    if (exists) {
      setSavedArticles((prev) =>
        prev.filter((a) => a.id !== story.id && a.title.toLowerCase() !== story.title.toLowerCase())
      );
      showToast('Removed from reading list');
    } else {
      const newSaved: SavedArticle = {
        id: story.id,
        title: story.title,
        source: story.source,
        readTime: '6m read',
        savedAt: 'Just now',
        category: story.category,
      };
      setSavedArticles((prev) => [newSaved, ...prev]);
      showToast(`Saved to reading list for ${userProfile.email}`);
    }
  };

  // Share story
  const handleShareStory = (story: Story) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    } else {
      showToast('Article ready to share');
    }
  };

  // Add custom story from AI Synthesizer
  const handleAddSynthesizedStory = (newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
    showToast(`Added "${newStory.title.slice(0, 36)}..." to your briefing`);
  };

  // Toggle radar topic
  const handleToggleRadar = (id: string) => {
    setRadarTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  // Add custom radar topic
  const handleAddRadarTopic = (newTopic: RadarTopic) => {
    setRadarTopics((prev) => [...prev, newTopic]);
    showToast(`Radar alert created for "${newTopic.name}"`);
  };

  // Filter stories by tab and search
  const filteredStories = stories.filter((story) => {
    if (currentTab !== 'for-you' && currentTab !== 'following') {
      if (story.category !== currentTab) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = story.title.toLowerCase().includes(q);
      const matchSummary = story.summary.toLowerCase().includes(q);
      const matchSource = story.source.toLowerCase().includes(q);
      const matchTags = story.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchSource || matchTags;
    }
    return true;
  });

  return (
    <div className="bg-[#F8F9FA] text-[#181c20] min-h-screen font-['Roboto_Flex'] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#181c20] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fade-in border border-[#727785]/40">
          <span className="material-symbols-outlined text-base text-[#1E8E3E]">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Rows 1 & 2: Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        userProfile={userProfile}
        onOpenSignInModal={(step = 1) => {
          setSignInModalInitialStep(step);
          setSignInModalOpen(true);
        }}
        onSignOut={() => {
          setUserProfile((prev) => ({
            ...prev,
            isSignedIn: false,
          }));
          showToast('Signed out of Google PulseDaily');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenBreakdownModal={() => setBreakdownModalOpen(true)}
        onOpenSynthesizerModal={() => setSynthesizerModalOpen(true)}
        hasNotificationPermission={hasNotificationPermission}
        onRequestNotificationPermission={handleRequestNotificationPermission}
      />

      {/* Main Content Area */}
      <main className="w-full pt-28 pb-12 bg-[#F8F9FA] min-h-[calc(100vh-140px)]">
        <div className="max-w-7xl mx-auto py-6 px-4 md:px-6 space-y-6">
          {/* Zone 3: Greeting & Briefing Header */}
          <BriefingHeader
            userProfile={userProfile}
            onRoleLensChange={(newPersona) => {
              setUserProfile((prev) => ({ ...prev, persona: newPersona }));
              showToast(`Feed personalized for ${newPersona}`);
            }}
            onPlayAudioBrief={handlePlayAudioBrief}
            onRefreshFeed={handleRefreshFeed}
            isRefreshing={isRefreshing}
            isHnConnected={isHnConnected}
          />

          {/* Zone 3.5: Live Breaking News Detector & Push Notification Banner */}
          <BreakingBanner
            alert={currentBreakingAlert}
            onViewBreakdown={() => setBreakdownModalOpen(true)}
            onResetDefault={() => {
              setCurrentBreakingAlert(DEFAULT_BREAKING_ALERT);
              showToast('Reset to default breaking headline');
            }}
          />

          {/* Zone 4: 12-Column Google News Grid */}
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* LEFT 8 COLUMNS: Top Stories Feed */}
            <section className="col-span-12 lg:col-span-8 space-y-4">
              {/* Section Header Bar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-['Plus_Jakarta_Sans'] text-lg md:text-[20px] text-[#1F1F1F] font-medium">
                    Top stories for you
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#E8F0FE] text-[#005bbf] rounded-full text-xs font-semibold border border-[#adc7ff]/60">
                    <span
                      className="material-symbols-outlined text-xs"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    Lens: {userProfile.persona}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSynthesizerModalOpen(true)}
                    className="text-[#005bbf] hover:bg-[#E8F0FE] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-[#005bbf]/20"
                    type="button"
                    title="Deep AI synthesis on any topic"
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="hidden sm:inline">Synthesize Topic</span>
                  </button>

                  <button
                    onClick={() => setInterestsModalOpen(true)}
                    className="text-[#005bbf] hover:text-[#0054cd] text-xs font-medium flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <span>Customize interests</span>
                    <span className="material-symbols-outlined text-base">tune</span>
                  </button>
                </div>
              </div>

              {/* Primary Feed Solid White Container */}
              <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-xs p-6 space-y-6">
                {filteredStories.length === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <span className="material-symbols-outlined text-4xl text-[#727785]">
                      find_in_page
                    </span>
                    <p className="text-sm text-[#444746]">
                      No stories match &quot;{searchQuery}&quot;. Try clearing your search or switching tabs.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-[#005bbf] text-white text-xs font-semibold rounded-full"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  filteredStories.map((story, index) => {
                    const isSaved = savedArticles.some(
                      (a) => a.id === story.id || a.title.toLowerCase() === story.title.toLowerCase()
                    );
                    return (
                      <React.Fragment key={story.id}>
                        <StoryCard
                          story={story}
                          persona={userProfile.persona}
                          userName={userProfile.name}
                          onOpenFullCoverage={(s) => setFullCoverageStory(s)}
                          onOpenArticleDetail={(s) => setArticleModalStory(s)}
                          onToggleSave={handleToggleSave}
                          isSaved={isSaved}
                          onShare={handleShareStory}
                        />
                        {index < filteredStories.length - 1 && (
                          <div className="h-px w-full bg-[#DADCE0]" />
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </div>

              {/* Live HackerNews Verified Radar Feed */}
              {hnStories.length > 0 && (
                <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-xs p-6 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#DADCE0]">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded bg-[#ff6600] text-white flex items-center justify-center font-bold text-xs">
                        Y
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-sm md:text-base font-semibold text-[#1F1F1F]">
                        Live HackerNews Developer Signals
                      </h3>
                    </div>
                    <span className="text-[11px] text-[#1E8E3E] font-medium bg-[#E6F4EA] px-2 py-0.5 rounded-full border border-[#1E8E3E]/20">
                      Real-Time Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {hnStories.slice(0, 4).map((hnItem) => (
                      <a
                        key={hnItem.id}
                        href={hnItem.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-xl border border-[#DADCE0] hover:border-[#005bbf]/40 bg-[#F8F9FA] hover:bg-white transition-all space-y-1.5 block group"
                      >
                        <div className="text-xs font-medium text-[#1F1F1F] group-hover:text-[#005bbf] transition-colors line-clamp-2 leading-snug">
                          {hnItem.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#727785]">
                          <span className="font-semibold text-[#ff6600]">▲ {hnItem.score}</span>
                          <span>•</span>
                          <span>{hnItem.commentsCount} comments</span>
                          <span>•</span>
                          <span className="truncate">{hnItem.domain}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* RIGHT 4 COLUMNS: Sidebar (Radar, Audio, Saved) */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              {/* Card 1: Breaking Alert Radar with Live Trigger Simulation */}
              <RadarCard
                topics={radarTopics}
                onToggleTopic={handleToggleRadar}
                onOpenAddModal={() => setAddRadarModalOpen(true)}
                onTriggerBreakingAlert={handleTriggerBreakingAlert}
                isDetecting={isDetectingBreaking}
                userEmail={userProfile.email}
                persona={userProfile.persona}
              />

              {/* Card 2: 60-Second Executive Audio Brief */}
              <AudioPlayerCard
                episode={DAILY_AUDIO_EPISODE}
                isPlaying={isAudioPlaying}
                onTogglePlay={() => setIsAudioPlaying(!isAudioPlaying)}
              />

              {/* Card 3: Saved Reading List */}
              <SavedLaterCard
                articles={savedArticles}
                onOpenArticle={(savedItem) => {
                  const matched = stories.find(
                    (s) => s.id === savedItem.id || s.title.toLowerCase() === savedItem.title.toLowerCase()
                  );
                  if (matched) {
                    setArticleModalStory(matched);
                  } else {
                    setArticleModalStory({
                      id: savedItem.id,
                      category: 'for-you',
                      source: savedItem.source,
                      sourceIcon: 'bookmark',
                      timeAgo: savedItem.savedAt,
                      groundedSourcesCount: 8,
                      title: savedItem.title,
                      summary: `Archived technical reading saved for ${userProfile.persona} focus. Covers distributed system architecture, latency, and memory tradeoffs.`,
                      roleInsights: {
                        [userProfile.persona]: {
                          leadImpact: 'System resilience',
                          description: 'High-value reference for production architecture reviews and performance tuning.',
                          icon: 'bookmark',
                        },
                      } as any,
                      coverageCount: 6,
                      tags: ['Saved', 'Architecture'],
                    });
                  }
                }}
                onViewAll={() => setSavedModalOpen(true)}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* 2-Step Sign In With Google + Choose Persona Onboarding Modal */}
      {signInModalOpen && (
        <GoogleSignInModal
          currentProfile={userProfile}
          initialStep={signInModalInitialStep}
          onComplete={(newProfile) => {
            setUserProfile(newProfile);
            showToast(`Welcome ${newProfile.name}! Feed personalized for ${newProfile.persona}`);
          }}
          onClose={() => setSignInModalOpen(false)}
        />
      )}

      {/* Full Coverage Modal */}
      <FullCoverageModal
        story={fullCoverageStory}
        onClose={() => setFullCoverageStory(null)}
      />

      {/* Live Breakdown Modal */}
      {breakdownModalOpen && (
        <LiveBreakdownModal
          alert={currentBreakingAlert}
          persona={userProfile.persona}
          userName={userProfile.name}
          onClose={() => setBreakdownModalOpen(false)}
        />
      )}

      {/* Article Detail Reader Modal */}
      <ArticleModal
        story={articleModalStory}
        roleLens={userProfile.persona}
        onClose={() => setArticleModalStory(null)}
        onToggleSave={handleToggleSave}
        isSaved={
          articleModalStory
            ? savedArticles.some((a) => a.id === articleModalStory.id || a.title.toLowerCase() === articleModalStory.title.toLowerCase())
            : false
        }
        onShare={handleShareStory}
      />

      {/* Gemini 2.5 Flash AI Synthesizer Modal */}
      {synthesizerModalOpen && (
        <AISynthesizerModal
          roleLens={userProfile.persona}
          onClose={() => setSynthesizerModalOpen(false)}
          onAddStoryToFeed={handleAddSynthesizedStory}
        />
      )}

      {/* Customize Interests Modal */}
      {interestsModalOpen && (
        <CustomizeInterestsModal
          selectedInterests={['Gemini 1.5 Pro', 'PyTorch & TorchDynamo', 'vLLM & PagedAttention']}
          onSaveInterests={(interests) => {
            showToast(`Interests updated (${interests.length} topics selected)`);
          }}
          onClose={() => setInterestsModalOpen(false)}
        />
      )}

      {/* Add Custom Radar Modal */}
      {addRadarModalOpen && (
        <AddRadarModal
          onAddTopic={handleAddRadarTopic}
          onClose={() => setAddRadarModalOpen(false)}
        />
      )}

      {/* Saved Articles Full Modal */}
      {savedModalOpen && (
        <SavedArticlesModal
          articles={savedArticles}
          onOpenArticle={(savedItem) => {
            const matched = stories.find(
              (s) => s.id === savedItem.id || s.title.toLowerCase() === savedItem.title.toLowerCase()
            );
            if (matched) {
              setArticleModalStory(matched);
            }
          }}
          onRemoveArticle={(id) => {
            setSavedArticles((prev) => prev.filter((a) => a.id !== id));
            showToast('Article removed from reading list');
          }}
          onClose={() => setSavedModalOpen(false)}
        />
      )}
    </div>
  );
}
