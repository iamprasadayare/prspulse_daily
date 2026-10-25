import React, { useState } from 'react';
import { Story, PersonaType } from '../types';

interface StoryCardProps {
  story: Story;
  persona: PersonaType;
  userName: string;
  onOpenFullCoverage: (story: Story) => void;
  onOpenArticleDetail: (story: Story) => void;
  onToggleSave: (story: Story) => void;
  isSaved: boolean;
  onShare: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  persona,
  userName,
  onOpenFullCoverage,
  onOpenArticleDetail,
  onToggleSave,
  isSaved,
  onShare,
}) => {
  const [likes, setLikes] = useState<number>(42);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const roleInsight =
    story.roleInsights[persona] ||
    story.roleInsights['Software Engineer'] || {
      leadImpact: 'Architecture impact',
      description: 'Streamlines engineering workflows and reduces inference overhead.',
      icon: 'psychology',
    };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <article className="space-y-4">
      {/* Source Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#ebeef4] flex items-center justify-center font-bold text-xs text-[#005bbf] overflow-hidden">
            <span className="material-symbols-outlined text-base text-[#005bbf]">
              {story.sourceIcon || 'neurology'}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#1F1F1F]">{story.source}</span>
          <span className="text-[#444746] text-xs">•</span>
          <span className="text-xs text-[#444746]">{story.timeAgo}</span>
        </div>

        {story.groundedSourcesCount > 0 && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E8E3E] text-xs font-medium border border-[#1E8E3E]/20">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span>Grounded in {story.groundedSourcesCount} sources</span>
          </span>
        )}
      </div>

      {/* Headline & Media Split */}
      <div className={`grid grid-cols-1 ${story.imageUrl ? 'md:grid-cols-12' : ''} gap-4`}>
        <div className={`${story.imageUrl ? 'md:col-span-8' : ''} space-y-2`}>
          <h3
            onClick={() => onOpenArticleDetail(story)}
            className="font-['Plus_Jakarta_Sans'] text-lg md:text-[20px] font-medium text-[#1F1F1F] hover:text-[#005bbf] transition-colors cursor-pointer leading-snug"
          >
            {story.title}
          </h3>
          <p className="text-sm text-[#444746] leading-relaxed line-clamp-2">
            {story.summary}
          </p>
        </div>

        {story.imageUrl && (
          <div className="md:col-span-4">
            <div
              onClick={() => onOpenArticleDetail(story)}
              className="w-full h-32 rounded-lg bg-[#f1f4fa] overflow-hidden relative shadow-inner cursor-pointer group"
            >
              <img
                alt={story.imageAlt || story.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                src={story.imageUrl}
                loading="lazy"
              />
              {story.badgeOverlay && (
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#2d3135]/90 text-white rounded text-[10px] font-mono tracking-wider">
                  {story.badgeOverlay}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3-Bullet Highlights container */}
      {story.highlights && story.highlights.length > 0 && (
        <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-lg p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-[#005bbf] text-xs font-semibold">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span>{story.highlightsTitle || 'Developer Highlights'}</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#444746]">
            {story.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#005bbf] font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Material 3 Tonal Box: Why this matters for <User Name> (<Chosen Persona>) */}
      <div className="bg-[#E8F0FE] border border-[#c1c6d6]/30 rounded-xl p-4 flex gap-3">
        <span
          className="material-symbols-outlined text-[#005bbf] text-xl shrink-0 mt-0.5"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {roleInsight.icon || (persona === 'Founder / Exec' ? 'rocket_launch' : persona === 'Product Manager' ? 'explore' : 'psychology')}
        </span>
        <div className="space-y-1 min-w-0">
          <span className="text-xs text-[#005bbf] font-semibold block">
            ✨ Why this matters for {userName} ({persona})
          </span>
          <p className="text-xs text-[#414754] leading-relaxed">
            <strong className="text-[#181c20] font-medium">{roleInsight.leadImpact}: </strong>
            {roleInsight.description}
          </p>
        </div>
      </div>

      {/* Story Footer Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onOpenFullCoverage(story)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ebeef4] hover:bg-[#e5e8ee] text-[#005bbf] text-xs font-medium transition-colors cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-base">chrome_reader_mode</span>
          <span>Full coverage ({story.coverageCount || 12} articles)</span>
        </button>

        <div className="flex items-center gap-1 text-[#444746]">
          <button
            onClick={() => onToggleSave(story)}
            aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
            className={`p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer ${
              isSaved
                ? 'text-[#F9AB00] bg-[#FEF7E0]'
                : 'hover:bg-[#ebeef4] hover:text-[#1F1F1F]'
            }`}
            title={isSaved ? 'Saved in reading list' : 'Save for later'}
            type="button"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              bookmark
            </span>
          </button>

          <button
            onClick={() => onShare(story)}
            aria-label="Share article"
            className="p-2 hover:bg-[#ebeef4] hover:text-[#1F1F1F] rounded-full transition-colors flex items-center justify-center cursor-pointer"
            title="Share article link"
            type="button"
          >
            <span className="material-symbols-outlined text-lg">share</span>
          </button>

          <button
            onClick={handleLike}
            aria-label="Thumbs up"
            className={`p-2 rounded-full transition-colors flex items-center gap-1 cursor-pointer ${
              hasLiked ? 'text-[#005bbf] bg-[#E8F0FE]' : 'hover:bg-[#ebeef4] hover:text-[#1F1F1F]'
            }`}
            title="Like this story"
            type="button"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={hasLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              thumb_up
            </span>
            <span className="text-[11px] font-medium">{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
