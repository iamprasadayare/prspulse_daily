import React from 'react';
import { Story } from '../types';

interface FullCoverageModalProps {
  story: Story | null;
  onClose: () => void;
}

export const FullCoverageModal: React.FC<FullCoverageModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  const coverageItems = story.coverageItems || [
    {
      id: 'cov-gen-1',
      source: `${story.source} Official Release`,
      sourceType: 'Official',
      title: `${story.title} - Official Announcement & Specifications`,
      timeAgo: story.timeAgo,
      keyTakeaway: 'Architectural specifications and API reference implementation released for production clusters.',
      sentiment: 'Bullish',
    },
    {
      id: 'cov-gen-2',
      source: 'arXiv CS AI',
      sourceType: 'Paper',
      title: 'Formal Benchmarks and Scaling Curves Across Monorepo Workloads',
      timeAgo: '1h ago',
      keyTakeaway: 'Peer-reviewed verification confirms minimal latency degradation under high-concurrency requests.',
      sentiment: 'Bullish',
    },
    {
      id: 'cov-gen-3',
      source: 'Hacker News (418 points)',
      sourceType: 'Community',
      title: 'Ask HN: Who has deployed this in production? Real-world benchmark thread',
      timeAgo: '2h ago',
      keyTakeaway: 'Engineers report positive developer velocity gains and discuss token cache hit rates.',
      sentiment: 'Neutral',
    },
    {
      id: 'cov-gen-4',
      source: 'TechCrunch Enterprise',
      sourceType: 'Industry',
      title: 'How new inference protocols are shifting cloud unit economics',
      timeAgo: '4h ago',
      keyTakeaway: 'Cloud providers compete to offer native hardware integration for enterprise accounts.',
      sentiment: 'Bullish',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#DADCE0] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005bbf] text-2xl">
              chrome_reader_mode
            </span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#1F1F1F]">
                Full Coverage
              </h2>
              <p className="text-xs text-[#444746]">
                Google News consensus grounded across {story.coverageCount || coverageItems.length} industry sources
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#727785] hover:text-[#1F1F1F] hover:bg-[#F1F3F4] rounded-full transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Story Reference */}
          <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-4">
            <span className="text-xs font-semibold text-[#005bbf] uppercase tracking-wider">
              Primary Story
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-base md:text-lg font-medium text-[#1F1F1F] mt-1">
              {story.title}
            </h3>
            <p className="text-xs text-[#444746] mt-1">{story.summary}</p>
          </div>

          {/* Perspective Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-[#1F1F1F]">
                Source Perspectives & Verification
              </h4>
              <span className="text-xs bg-[#E6F4EA] text-[#1E8E3E] px-2.5 py-0.5 rounded-full font-medium">
                High Consensus (98%)
              </span>
            </div>

            <div className="space-y-3">
              {coverageItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-[#DADCE0] hover:border-[#adc7ff] bg-white transition-all space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#005bbf]">{item.source}</span>
                      <span className="text-[#727785]">•</span>
                      <span className="text-[#727785]">{item.timeAgo}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        item.sourceType === 'Official'
                          ? 'bg-[#E8F0FE] text-[#005bbf]'
                          : item.sourceType === 'Paper'
                          ? 'bg-[#FEF7E0] text-[#B06000]'
                          : 'bg-[#ebeef4] text-[#414754]'
                      }`}
                    >
                      {item.sourceType}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-[#1F1F1F] hover:text-[#005bbf] transition-colors cursor-pointer">
                    {item.title}
                  </div>

                  <p className="text-xs text-[#444746] bg-[#F8F9FA] p-2.5 rounded-lg border border-[#DADCE0]/60">
                    <strong className="text-[#1F1F1F]">Key Takeaway: </strong>
                    {item.keyTakeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#F8F9FA] border-t border-[#DADCE0] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
