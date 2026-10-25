import React, { useState } from 'react';

interface CustomizeInterestsModalProps {
  selectedInterests: string[];
  onSaveInterests: (interests: string[]) => void;
  onClose: () => void;
}

const AVAILABLE_TOPICS = [
  'Gemini 1.5 Pro',
  'PyTorch & TorchDynamo',
  'vLLM & PagedAttention',
  'Claude 3.5 Sonnet',
  'Agentic Frameworks',
  'Kubernetes GPU Scheduling',
  'Triton CUDA Kernels',
  'WebGPU & Gemini Nano',
  'Mixture-of-Experts (MoE)',
  'FlashAttention-3',
  'Open Source LLMs',
  'RAG & Vector Retrieval',
  'Model Context Protocol',
  'Inference Quantization (FP8/INT4)',
  'AI Safety & Red Teaming',
];

export const CustomizeInterestsModal: React.FC<CustomizeInterestsModalProps> = ({
  selectedInterests,
  onSaveInterests,
  onClose,
}) => {
  const [current, setCurrent] = useState<string[]>(selectedInterests);

  const toggleTag = (tag: string) => {
    if (current.includes(tag)) {
      setCurrent(current.filter((t) => t !== tag));
    } else {
      setCurrent([...current, tag]);
    }
  };

  const handleSave = () => {
    onSaveInterests(current);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#DADCE0] shadow-2xl">
        <div className="border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005bbf] text-xl">tune</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#1F1F1F]">
              Customize Technical Interests
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#727785] hover:text-[#1F1F1F] rounded-full"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-[#444746] leading-relaxed">
            Select the technologies, infrastructure components, and models you want prioritized in your Google PulseDaily briefing.
          </p>

          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-1">
            {AVAILABLE_TOPICS.map((topic) => {
              const isSelected = current.includes(topic);
              return (
                <button
                  key={topic}
                  onClick={() => toggleTag(topic)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#E8F0FE] text-[#005bbf] border-[#005bbf]'
                      : 'bg-[#F8F9FA] text-[#444746] border-[#DADCE0] hover:bg-[#ebeef4]'
                  }`}
                >
                  <span>{topic}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-xs">check</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-[#F8F9FA] border-t border-[#DADCE0] px-6 py-3 flex justify-between items-center">
          <button
            onClick={() => setCurrent([])}
            className="text-xs text-[#727785] hover:text-[#1F1F1F] underline cursor-pointer"
          >
            Clear all
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#DADCE0] hover:bg-white text-xs font-medium rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full cursor-pointer"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
