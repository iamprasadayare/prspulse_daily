import React, { useState } from 'react';
import { RoleLensType } from '../types';

interface AISynthesizerModalProps {
  roleLens: RoleLensType;
  onClose: () => void;
  onAddStoryToFeed: (storyData: any) => void;
}

export const AISynthesizerModal: React.FC<AISynthesizerModalProps> = ({
  roleLens,
  onClose,
  onAddStoryToFeed,
}) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleTopics = [
    'DeepSeek-V3 MoE Multi-Head Latent Attention',
    'Model Context Protocol (MCP) by Anthropic',
    'Llama 3.3 70B 4-bit Quantization Benchmarks',
    'FlashAttention-3 vs Triton CUDA Kernels',
    'Google Gemini 2.5 Flash Tool Calling Latency',
  ];

  const handleSynthesize = async (targetTopic?: string) => {
    const query = targetTopic || topic;
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: query,
          role: roleLens,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const json = await res.json();
      setResult(json.data);
    } catch (err: any) {
      console.error('Synthesis error:', err);
      setError('Failed to complete AI synthesis. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToBriefing = () => {
    if (!result) return;
    const newStory = {
      id: `ai-${Date.now()}`,
      category: 'for-you',
      source: 'Gemini 2.5 Flash Synthesis',
      sourceIcon: 'auto_awesome',
      timeAgo: 'Just now',
      groundedSourcesCount: 16,
      title: topic || 'Custom AI Architecture Analysis',
      summary: result.roleAnalysis,
      highlightsTitle: result.highlightsTitle || 'Developer Highlights',
      highlights: result.bullets?.map((b: any) => `${b.headline}: ${b.detail}`) || [],
      roleInsights: {
        [roleLens]: {
          leadImpact: result.leadImpact || 'Architecture impact',
          description: result.roleAnalysis,
          icon: 'psychology',
        },
      },
      coverageCount: 12,
      tags: ['Custom Synthesis', 'Gemini 2.5 Flash', roleLens],
    };
    onAddStoryToFeed(newStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#DADCE0] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#005bbf] text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-lg font-semibold text-[#1F1F1F]">
                Gemini 2.5 Flash Role Synthesizer
              </h2>
              <p className="text-xs text-[#444746]">
                Generate structured 3-bullet technical takeaways + tailored role analysis
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

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1F1F1F]">
              Enter Any AI Model, Architecture, Paper, or GitHub PR:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. DeepSeek-V3 MoE Architecture, Triton Kernels, Llama 3.3..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSynthesize()}
                className="flex-1 px-4 py-2 text-sm border border-[#DADCE0] rounded-full focus:outline-none focus:ring-2 focus:ring-[#005bbf]/40 focus:border-[#005bbf]"
              />
              <button
                onClick={() => handleSynthesize()}
                disabled={loading || !topic.trim()}
                className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                    <span>Synthesizing...</span>
                  </>
                ) : (
                  <>
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span>Synthesize</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sample quick prompts */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-[#727785] uppercase tracking-wider font-semibold">
              Trending Technical Topics:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopic(item);
                    handleSynthesize(item);
                  }}
                  className="px-2.5 py-1 bg-[#F8F9FA] hover:bg-[#ebeef4] border border-[#DADCE0] text-[11px] text-[#1F1F1F] rounded-full transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-[#FCE8E6] border border-[#FAD2CF] rounded-xl text-xs text-[#D93025]">
              {error}
            </div>
          )}

          {/* Results Output */}
          {result && (
            <div className="mt-4 p-5 bg-[#F8F9FA] border border-[#DADCE0] rounded-2xl space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#005bbf] uppercase tracking-wider flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  Gemini 2.5 Flash Structured Analysis
                </span>
                <span className="text-xs bg-[#E8F0FE] text-[#005bbf] px-2.5 py-0.5 rounded-full font-medium">
                  Lens: {roleLens}
                </span>
              </div>

              {/* 3 Bullets */}
              <div className="bg-white border border-[#DADCE0] rounded-xl p-3.5 space-y-2">
                <div className="text-xs font-semibold text-[#1F1F1F]">
                  {result.highlightsTitle || 'Developer Highlights'}
                </div>
                <ul className="space-y-1.5 text-xs text-[#444746]">
                  {result.bullets?.map((b: any, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#005bbf] font-bold">•</span>
                      <span>
                        <strong className="text-[#1F1F1F]">{b.headline}: </strong>
                        {b.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why this matters container */}
              <div className="bg-[#E8F0FE] border border-[#c1c6d6]/30 rounded-xl p-4 flex gap-3">
                <span
                  className="material-symbols-outlined text-[#005bbf] text-xl shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  psychology
                </span>
                <div className="space-y-1">
                  <span className="text-xs text-[#005bbf] font-semibold block">
                    ✨ Why this matters for you ({roleLens})
                  </span>
                  <p className="text-xs text-[#414754] leading-relaxed">
                    <strong className="text-[#181c20] font-medium">{result.leadImpact}: </strong>
                    {result.roleAnalysis}
                  </p>
                </div>
              </div>

              {/* Action item */}
              <div className="p-3 bg-white border border-[#DADCE0] rounded-xl text-xs text-[#444746]">
                <strong className="text-[#1F1F1F]">Recommended Action: </strong>
                {result.technicalActionItem}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleAddToBriefing}
                  className="px-4 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Add to My Briefing</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
