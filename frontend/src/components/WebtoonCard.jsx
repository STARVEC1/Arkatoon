import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Minus, Plus, ExternalLink, Trash2, Edit } from 'lucide-react';

const WebtoonCard = ({ 
  webtoon, 
  onChapterChange, 
  onVisitLink, 
  onEdit,
  onDelete 
}) => {
  // Helper function to check if webtoon is new (within 7 days and ongoing)
  const isWebtoonNew = (webtoon) => {
    if (webtoon.status !== 'ongoing') return false;
    const lastReadDate = new Date(webtoon.lastRead);
    const today = new Date();
    const daysDiff = Math.floor((today - lastReadDate) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  };
  const handleChapterDecrease = () => {
    if (webtoon.currentChapter > 0) {
      onChapterChange(webtoon.id, webtoon.currentChapter - 1);
    }
  };

  const handleChapterIncrease = () => {
    onChapterChange(webtoon.id, webtoon.currentChapter + 1);
  };

  const handleVisit = () => {
    onVisitLink(webtoon.url);
  };

  const statusColors = {
    ongoing: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    paused: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200 min-h-[180px]">
      <CardContent className="p-5">
        <div className="relative">
          {/* Header with name and actions */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 text-base truncate flex-1">
                  {webtoon.name}
                </h3>
                {isWebtoonNew(webtoon) && (
                  <Badge className="bg-red-100 text-red-800 border-red-200 text-xs px-2 py-0.5 animate-pulse">
                    🆕 NEW
                  </Badge>
                )}
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={statusColors[webtoon.status] || statusColors.ongoing}>
                    {webtoon.status}
                  </Badge>
                  <span className="px-2 py-1 bg-gray-100 rounded-full font-medium text-xs">
                    {webtoon.genre}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Last: {new Date(webtoon.lastRead).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1 ml-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(webtoon);
                }}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(webtoon.id);
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Chapter counter and Read button */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Chapter:</span>
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-gray-200"
                  onClick={handleChapterDecrease}
                  disabled={webtoon.currentChapter <= 0}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="min-w-[3rem] text-center font-semibold text-gray-900">
                  {webtoon.currentChapter}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-gray-200"
                  onClick={handleChapterIncrease}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            {/* Visit link button - full width */}
            <Button
              className="w-full bg-gray-900 hover:bg-gray-800 text-white h-9"
              onClick={handleVisit}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Read
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebtoonCard;