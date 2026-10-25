import React, { useState } from 'react';
import { RadarTopic } from '../types';

interface AddRadarModalProps {
  onAddTopic: (topic: RadarTopic) => void;
  onClose: () => void;
}

export const AddRadarModal: React.FC<AddRadarModalProps> = ({ onAddTopic, onClose }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('🔍');
  const [frequency, setFrequency] = useState('6/day');
  const [category, setCategory] = useState('Custom');

  const icons = ['🔍', '🤖', '⚡', '🛡️', '⚖️', '🚀', '🧠', '🌐', '📊'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddTopic({
      id: `radar-${Date.now()}`,
      icon,
      name: name.trim(),
      frequency,
      enabled: true,
      category,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-[#DADCE0] shadow-2xl">
        <div className="border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005bbf] text-xl">sensors</span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-semibold text-[#1F1F1F]">
              Add Custom Topic Radar
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#727785] hover:text-[#1F1F1F] rounded-full"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1F1F1F]">Select Icon</label>
            <div className="flex gap-2">
              {icons.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border transition-colors cursor-pointer ${
                    icon === ic ? 'bg-[#E8F0FE] border-[#005bbf]' : 'border-[#DADCE0] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1F1F1F]">Radar Topic / Trigger Query</label>
            <input
              type="text"
              placeholder="e.g. KV-Cache Quantization, Triton JIT"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005bbf]/40"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#1F1F1F]">Estimated Threshold Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#DADCE0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005bbf]/40"
            >
              <option value="2/day">Low Sensitivity (2/day)</option>
              <option value="6/day">Medium Sensitivity (6/day)</option>
              <option value="12/day">High Sensitivity (12/day)</option>
              <option value="All">Real-Time Stream (Instant)</option>
            </select>
          </div>

          <div className="bg-[#F8F9FA] border-t border-[#DADCE0] -mx-6 -mb-6 px-6 py-3 flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#DADCE0] hover:bg-white text-xs font-medium rounded-full cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full disabled:opacity-50 cursor-pointer"
            >
              Add Radar Trigger
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
