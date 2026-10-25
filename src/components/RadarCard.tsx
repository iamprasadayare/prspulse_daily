import React, { useState } from 'react';
import { RadarTopic, PersonaType } from '../types';

interface RadarCardProps {
  topics: RadarTopic[];
  onToggleTopic: (id: string) => void;
  onOpenAddModal: () => void;
  onTriggerBreakingAlert: (topic: string) => Promise<void>;
  isDetecting: boolean;
  userEmail: string;
  persona: PersonaType;
}

export const RadarCard: React.FC<RadarCardProps> = ({
  topics,
  onToggleTopic,
  onOpenAddModal,
  onTriggerBreakingAlert,
  isDetecting,
  userEmail,
  persona,
}) => {
  const [breakingQuery, setBreakingQuery] = useState('');
  const activeCount = topics.filter((t) => t.enabled).length;

  const quickAlertPresets = [
    'DeepSeek-R1 Open-Weights Reasoning Release',
    'OpenAI o3-mini Frontier Model Launch',
    'NVIDIA Blackwell GB200 Cluster Benchmark',
  ];

  const handleSimulate = async (customTopic?: string) => {
    const topicToTrigger = customTopic || breakingQuery;
    if (!topicToTrigger.trim()) return;
    await onTriggerBreakingAlert(topicToTrigger.trim());
    setBreakingQuery('');
  };

  return (
    <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-xs p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#005bbf] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#005bbf]"></span>
          </div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-base md:text-[18px] text-[#1F1F1F] font-medium">
            Breaking Alert Radar
          </h3>
        </div>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#1E8E3E] font-semibold border border-[#1E8E3E]/20">
          {activeCount} Active
        </span>
      </div>

      <p className="text-xs text-[#444746] leading-relaxed">
        Real-time threshold triggers monitored across arXiv, GitHub releases, and model registries.
      </p>

      {/* Tracking Topic Chips */}
      <div className="space-y-2">
        {topics.map((topic) => (
          <label
            key={topic.id}
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-colors cursor-pointer ${
              topic.enabled
                ? 'bg-[#F8F9FA] border-[#DADCE0] hover:bg-[#ebeef4]'
                : 'bg-white border-[#ebeef4] opacity-60 hover:opacity-100'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <input
                type="checkbox"
                checked={topic.enabled}
                onChange={() => onToggleTopic(topic.id)}
                className="w-4 h-4 rounded text-[#005bbf] focus:ring-[#005bbf] accent-[#005bbf] cursor-pointer"
              />
              <span className="text-xs font-medium text-[#1F1F1F] truncate">
                {topic.icon} {topic.name}
              </span>
            </div>
            <span className="text-[11px] text-[#444746] bg-white border border-[#DADCE0] px-2 py-0.5 rounded shadow-2xs font-mono">
              {topic.frequency}
            </span>
          </label>
        ))}
      </div>

      {/* Interactive Breaking Alert Detector */}
      <div className="pt-2 border-t border-[#DADCE0] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#D93025] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            <span>Detect Breaking AI News</span>
          </span>
          <span className="text-[10px] text-[#727785]">Desktop push to {userEmail.split('@')[0]}</span>
        </div>

        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="e.g. DeepSeek-R1 release, Grok 3..."
            value={breakingQuery}
            onChange={(e) => setBreakingQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSimulate()}
            className="flex-1 px-3 py-1.5 text-xs border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D93025]"
          />
          <button
            onClick={() => handleSimulate()}
            disabled={isDetecting || !breakingQuery.trim()}
            className="px-3 py-1.5 bg-[#D93025] hover:bg-[#b3261e] text-white text-xs font-semibold rounded-lg disabled:opacity-50 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
            title="Trigger Breaking Alert & Browser Notification"
          >
            {isDetecting ? (
              <span className="material-symbols-outlined text-xs animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined text-xs">bolt</span>
            )}
            <span>Trigger</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-1">
          <span className="text-[10px] text-[#727785] uppercase tracking-wider font-semibold block">
            Instant Test Radar Events:
          </span>
          <div className="flex flex-col gap-1">
            {quickAlertPresets.map((preset, i) => (
              <button
                key={i}
                onClick={() => handleSimulate(preset)}
                disabled={isDetecting}
                className="text-left text-[11px] p-1.5 rounded-md bg-[#F8F9FA] hover:bg-[#FCE8E6] text-[#444746] hover:text-[#D93025] border border-[#DADCE0]/70 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="truncate">{preset}</span>
                <span className="material-symbols-outlined text-xs text-[#D93025] shrink-0">
                  play_arrow
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onOpenAddModal}
        className="w-full py-2 px-3 text-center text-[#005bbf] text-xs font-semibold hover:bg-[#E8F0FE] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#c1c6d6]/40"
        type="button"
      >
        <span className="material-symbols-outlined text-base">add</span>
        <span>Add custom topic radar</span>
      </button>
    </div>
  );
};
