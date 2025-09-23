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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-gray-200">
      <CardContent className="p-0">
        <div className="relative">
          {/* Cover Image */}
          <div className="relative overflow-hidden rounded-t-lg">
            <img 
              src={webtoon.cover} 
              alt={webtoon.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Actions overlay */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(webtoon);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(webtoon.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <Badge className={statusColors[webtoon.status] || statusColors.ongoing}>
                {webtoon.status}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-3">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
                {webtoon.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-4">
                {webtoon.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span className="px-2 py-1 bg-gray-100 rounded-full font-medium">
                  {webtoon.genre}
                </span>
                <span className="truncate">Last: {new Date(webtoon.lastRead).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Chapter counter and Read button */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Chapter:</span>
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 hover:bg-gray-200"
                    onClick={handleChapterDecrease}
                    disabled={webtoon.currentChapter <= 0}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="min-w-[2.5rem] text-center font-semibold text-gray-900 text-sm">
                    {webtoon.currentChapter}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 hover:bg-gray-200"
                    onClick={handleChapterIncrease}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {/* Visit link button - full width */}
              <Button
                size="sm"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-8"
                onClick={handleVisit}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Read
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebtoonCard;