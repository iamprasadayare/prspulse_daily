import React from 'react';
import { SavedArticle } from '../types';

interface SavedLaterCardProps {
  articles: SavedArticle[];
  onOpenArticle: (article: SavedArticle) => void;
  onViewAll: () => void;
}

export const SavedLaterCard: React.FC<SavedLaterCardProps> = ({
  articles,
  onOpenArticle,
  onViewAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-[#DADCE0] shadow-xs p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[#F9AB00] text-xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bookmark
          </span>
          <h3 className="font-['Plus_Jakarta_Sans'] text-base md:text-[18px] text-[#1F1F1F] font-medium">
            Saved for later
          </h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs text-[#005bbf] hover:underline font-medium cursor-pointer"
        >
          View all ({articles.length})
        </button>
      </div>

      <div className="space-y-2.5">
        {articles.length === 0 ? (
          <div className="text-xs text-[#727785] text-center py-4">
            No saved articles yet. Bookmark stories from your feed to read offline.
          </div>
        ) : (
          articles.slice(0, 3).map((article) => (
            <div
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="group p-2.5 rounded-lg hover:bg-[#F8F9FA] border border-transparent hover:border-[#DADCE0] transition-colors flex items-start justify-between gap-3 cursor-pointer"
            >
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs md:text-sm font-medium text-[#1F1F1F] group-hover:text-[#005bbf] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#444746]">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <button
                aria-label="Open article"
                className="text-[#727785] group-hover:text-[#1F1F1F] p-1 shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
