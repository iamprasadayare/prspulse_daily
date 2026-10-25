import React from 'react';
import { Story, RoleLensType } from '../types';

interface ArticleModalProps {
  story: Story | null;
  roleLens: RoleLensType;
  onClose: () => void;
  onToggleSave: (story: Story) => void;
  isSaved: boolean;
  onShare: (story: Story) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  story,
  roleLens,
  onClose,
  onToggleSave,
  isSaved,
  onShare,
}) => {
  if (!story) return null;

  const roleInsight =
    story.roleInsights[roleLens] ||
    story.roleInsights['Software Engineer'] || {
      leadImpact: 'Architecture impact',
      description: 'Streamlines engineering workflows and reduces inference overhead.',
      icon: 'psychology',
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#DADCE0] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#ebeef4] flex items-center justify-center text-xs text-[#005bbf]">
              <span className="material-symbols-outlined text-base">
                {story.sourceIcon || 'neurology'}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#1F1F1F]">{story.source}</span>
            <span className="text-[#727785] text-xs">•</span>
            <span className="text-xs text-[#727785]">{story.timeAgo}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleSave(story)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isSaved ? 'text-[#F9AB00] bg-[#FEF7E0]' : 'hover:bg-[#F1F3F4] text-[#444746]'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
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
              className="p-2 hover:bg-[#F1F3F4] text-[#444746] rounded-full transition-colors cursor-pointer"
              title="Share"
            >
              <span className="material-symbols-outlined text-lg">share</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#727785] hover:text-[#1F1F1F] hover:bg-[#F1F3F4] rounded-full transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <h1 className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-bold text-[#1F1F1F] leading-snug">
              {story.title}
            </h1>
            <p className="text-sm md:text-base text-[#444746] leading-relaxed">
              {story.summary}
            </p>
          </div>

          {/* Media image if present */}
          {story.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[#DADCE0] shadow-xs relative max-h-72">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-full object-cover"
              />
              {story.badgeOverlay && (
                <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#181c20]/90 text-white rounded text-xs font-mono">
                  {story.badgeOverlay}
                </div>
              )}
            </div>
          )}

          {/* Material 3 Tonal Box: Why This Matters */}
          <div className="bg-[#E8F0FE] border border-[#c1c6d6]/30 rounded-xl p-5 flex gap-3.5">
            <span
              className="material-symbols-outlined text-[#005bbf] text-2xl shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {roleInsight.icon || 'psychology'}
            </span>
            <div className="space-y-1.5">
              <span className="text-xs text-[#005bbf] font-semibold uppercase tracking-wider block">
                ✨ Role Impact Lens: {roleLens}
              </span>
              <p className="text-sm text-[#414754] leading-relaxed">
                <strong className="text-[#181c20] font-medium">{roleInsight.leadImpact}: </strong>
                {roleInsight.description}
              </p>
            </div>
          </div>

          {/* Deep Architectural Breakdown */}
          {story.fullContent && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-[#1F1F1F] border-b border-[#DADCE0] pb-2">
                Engineering Analysis
              </h3>
              <p className="text-sm text-[#444746] leading-relaxed">
                {story.fullContent.overview}
              </p>

              {story.fullContent.architectureDetails && (
                <ul className="space-y-2 text-sm text-[#444746]">
                  {story.fullContent.architectureDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#005bbf] font-bold mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Benchmarks if present */}
              {story.fullContent.benchmarks && (
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-[#727785] uppercase tracking-wider mb-2">
                    Verified Performance Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {story.fullContent.benchmarks.map((bench, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-[#F8F9FA] border border-[#DADCE0] rounded-xl text-center"
                      >
                        <div className="text-xl font-bold text-[#005bbf]">{bench.value}</div>
                        <div className="text-xs font-medium text-[#1F1F1F] mt-0.5">
                          {bench.label}
                        </div>
                        <div className="text-[11px] text-[#1E8E3E] font-medium">{bench.delta}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Snippet if present */}
              {story.fullContent.codeSnippet && (
                <div className="pt-2 space-y-1.5">
                  <h4 className="text-xs font-semibold text-[#727785] uppercase tracking-wider">
                    Integration Code
                  </h4>
                  <pre className="p-4 bg-[#181c20] text-[#adc7ff] rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
                    {story.fullContent.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#DADCE0]">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#F8F9FA] text-[#444746] border border-[#DADCE0] rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F9FA] border-t border-[#DADCE0] px-6 py-4 flex items-center justify-between">
          <span className="text-xs text-[#727785]">
            Google News Editorial Curation • Verified for {roleLens}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
