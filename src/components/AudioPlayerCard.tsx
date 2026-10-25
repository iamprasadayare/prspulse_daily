import React, { useState, useEffect, useRef } from 'react';
import { AudioEpisode } from '../types';

interface AudioPlayerCardProps {
  episode: AudioEpisode;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({
  episode,
  isPlaying,
  onTogglePlay,
}) => {
  const [currentTime, setCurrentTime] = useState<number>(44);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showQueue, setShowQueue] = useState<boolean>(false);

  const duration = episode.durationSeconds || 138;
  const timerRef = useRef<any>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Synchronize browser speech synthesis if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(episode.script);
        utterance.rate = playbackSpeed;
        utterance.pitch = 1.0;

        utterance.onend = () => {
          onTogglePlay();
          setCurrentTime(0);
        };

        speechUtteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
  }, [isPlaying, episode.script, playbackSpeed]);

  // Audio timer increment
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            onTogglePlay();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, playbackSpeed, onTogglePlay]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5, 2.0];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div
      id="dailyAudioCard"
      className="bg-white rounded-2xl border border-[#DADCE0] shadow-xs p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#005bbf] text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            podcasts
          </span>
          <h3 className="font-['Plus_Jakarta_Sans'] text-base md:text-[18px] text-[#1F1F1F] font-medium">
            Daily Audio Brief
          </h3>
        </div>
        <span className="text-xs text-[#444746] font-mono bg-[#ebeef4] px-2 py-0.5 rounded-full">
          Ep. {episode.number}
        </span>
      </div>

      <p className="text-xs text-[#444746] leading-relaxed">
        {episode.summary}
      </p>

      {/* Waveform & Time Container */}
      <div className="bg-[#F8F9FA] border border-[#DADCE0] rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-[#444746]">
          <span id="audioCurrentTime" className="text-[#005bbf] font-semibold">
            {formatSeconds(currentTime)}
          </span>
          <span>{formatSeconds(duration)}</span>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="w-full h-9 flex items-center gap-1 justify-between px-1 bg-white rounded-lg border border-[#ebeef4] py-1">
          {[
            { height: 'h-3', playHeight: 'h-6', delay: '0ms' },
            { height: 'h-6', playHeight: 'h-8', delay: '100ms' },
            { height: 'h-4', playHeight: 'h-7', delay: '200ms' },
            { height: 'h-7', playHeight: 'h-9', delay: '300ms' },
            { height: 'h-5', playHeight: 'h-7', delay: '150ms' },
            { height: 'h-2', playHeight: 'h-5', delay: '250ms' },
            { height: 'h-5', playHeight: 'h-8', delay: '350ms' },
            { height: 'h-8', playHeight: 'h-6', delay: '120ms' },
            { height: 'h-4', playHeight: 'h-7', delay: '280ms' },
            { height: 'h-6', playHeight: 'h-9', delay: '180ms' },
            { height: 'h-3', playHeight: 'h-5', delay: '320ms' },
            { height: 'h-5', playHeight: 'h-8', delay: '90ms' },
            { height: 'h-2', playHeight: 'h-4', delay: '220ms' },
            { height: 'h-4', playHeight: 'h-7', delay: '170ms' },
            { height: 'h-7', playHeight: 'h-9', delay: '310ms' },
            { height: 'h-3', playHeight: 'h-6', delay: '140ms' },
          ].map((bar, i) => {
            const isPlayed = (i / 16) <= (currentTime / duration);
            return (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isPlayed ? 'bg-[#005bbf]' : 'bg-[#adc7ff]'
                } ${isPlaying ? 'animate-pulse' : ''} ${isPlaying ? bar.playHeight : bar.height}`}
                style={{ animationDelay: bar.delay }}
              />
            );
          })}
        </div>

        {/* Scrubber track */}
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => setCurrentTime(parseInt(e.target.value))}
          className="w-full h-1.5 bg-[#ebeef4] rounded-lg appearance-none cursor-pointer accent-[#005bbf]"
        />

        {/* Player Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={cycleSpeed}
            className="px-2 py-0.5 rounded text-xs font-mono font-medium text-[#444746] hover:bg-[#ebeef4] border border-[#DADCE0] transition-colors cursor-pointer"
            type="button"
            title="Toggle playback speed"
          >
            {playbackSpeed.toFixed(1)}x
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSkip(-10)}
              className="p-1.5 hover:bg-[#ebeef4] rounded-full text-[#444746] hover:text-[#1F1F1F] flex items-center justify-center cursor-pointer"
              type="button"
              title="Rewind 10 seconds"
            >
              <span className="material-symbols-outlined text-lg">replay_10</span>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-9 h-9 rounded-full bg-[#005bbf] hover:bg-[#1a73e8] text-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
              id="audioPlayToggle"
              type="button"
              title={isPlaying ? 'Pause audio brief' : 'Play audio brief'}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              onClick={() => handleSkip(10)}
              className="p-1.5 hover:bg-[#ebeef4] rounded-full text-[#444746] hover:text-[#1F1F1F] flex items-center justify-center cursor-pointer"
              type="button"
              title="Fast forward 10 seconds"
            >
              <span className="material-symbols-outlined text-lg">forward_10</span>
            </button>
          </div>

          <button
            onClick={() => setShowQueue(!showQueue)}
            className={`p-1.5 rounded-full text-[#444746] hover:text-[#1F1F1F] flex items-center justify-center cursor-pointer ${
              showQueue ? 'bg-[#E8F0FE] text-[#005bbf]' : 'hover:bg-[#ebeef4]'
            }`}
            type="button"
            title="Episode queue"
          >
            <span className="material-symbols-outlined text-lg">queue_music</span>
          </button>
        </div>

        {/* Episode Queue Dropdown */}
        {showQueue && (
          <div className="mt-2 pt-2 border-t border-[#DADCE0] space-y-1.5">
            <div className="text-[11px] font-semibold text-[#727785] uppercase">
              Recent Audio Briefs
            </div>
            <div className="p-1.5 rounded bg-white text-xs flex justify-between items-center text-[#005bbf] font-medium border border-[#DADCE0]">
              <span>Ep. 142 (Today) • 2m 18s</span>
              <span className="text-[10px] bg-[#E8F0FE] px-1.5 py-0.5 rounded">Active</span>
            </div>
            <div className="p-1.5 rounded hover:bg-white text-xs flex justify-between items-center text-[#444746] cursor-pointer">
              <span>Ep. 141 (Yesterday) • 1m 54s</span>
              <span className="material-symbols-outlined text-xs">play_circle</span>
            </div>
            <div className="p-1.5 rounded hover:bg-white text-xs flex justify-between items-center text-[#444746] cursor-pointer">
              <span>Ep. 140 (Oct 22) • 2m 05s</span>
              <span className="material-symbols-outlined text-xs">play_circle</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
