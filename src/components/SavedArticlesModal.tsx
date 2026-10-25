import React from 'react';
import { SavedArticle } from '../types';

interface SavedArticlesModalProps {
  articles: SavedArticle[];
  onOpenArticle: (article: SavedArticle) => void;
  onRemoveArticle: (id: string) => void;
  onClose: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  articles,
  onOpenArticle,
  onRemoveArticle,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#DADCE0] shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-[#DADCE0] px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#F9AB00] text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bookmark
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base md:text-lg font-semibold text-[#1F1F1F]">
              Saved Reading List ({articles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#727785] hover:text-[#1F1F1F] rounded-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="p-6 space-y-3">
          {articles.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#727785]">
              No saved reading items. Save stories from your feed for offline study.
            </div>
          ) : (
            articles.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#DADCE0] hover:border-[#005bbf]/40 bg-white transition-colors flex items-start justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onOpenArticle(item);
                    onClose();
                  }}
                  className="space-y-1 flex-1 cursor-pointer"
                >
                  <h4 className="text-sm font-medium text-[#1F1F1F] group-hover:text-[#005bbf] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-[#727785]">
                    <span className="font-medium text-[#444746]">{item.source}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                    <span>•</span>
                    <span>Saved {item.savedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveArticle(item.id)}
                  className="p-1.5 text-[#727785] hover:text-[#D93025] hover:bg-[#FCE8E6] rounded-full transition-colors cursor-pointer"
                  title="Remove from saved"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-[#F8F9FA] border-t border-[#DADCE0] px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005bbf] hover:bg-[#1a73e8] text-white text-xs font-semibold rounded-full cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
