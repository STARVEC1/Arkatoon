import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import WebtoonCard from './WebtoonCard';
import AddWebtoonDialog from './AddWebtoonDialog';
import { getWebtoons, updateWebtoonChapter, addNewWebtoon, deleteWebtoon } from '../mock/webtoonData';
import { useToast } from '../hooks/use-toast';

const WebtoonHub = () => {
  const [webtoons, setWebtoons] = useState([]);
  const [filteredWebtoons, setFilteredWebtoons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load webtoons on component mount
  useEffect(() => {
    loadWebtoons();
  }, []);

  // Filter webtoons when search or filters change
  useEffect(() => {
    let filtered = webtoons;

    if (searchQuery) {
      filtered = filtered.filter(webtoon =>
        webtoon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        webtoon.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(webtoon => webtoon.status === statusFilter);
    }

    if (genreFilter !== 'all') {
      filtered = filtered.filter(webtoon => webtoon.genre === genreFilter);
    }

    setFilteredWebtoons(filtered);
  }, [webtoons, searchQuery, statusFilter, genreFilter]);

  const loadWebtoons = async () => {
    try {
      setIsLoading(true);
      const data = await getWebtoons();
      setWebtoons(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load webtoons",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChapterChange = async (id, newChapter) => {
    try {
      await updateWebtoonChapter(id, newChapter);
      setWebtoons(prev => 
        prev.map(w => w.id === id ? { ...w, currentChapter: newChapter } : w)
      );
      toast({
        title: "Updated",
        description: "Chapter progress updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error", 
        description: "Failed to update chapter",
        variant: "destructive"
      });
    }
  };

  const handleVisitLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddWebtoon = async (webtoonData) => {
    try {
      const newWebtoon = await addNewWebtoon(webtoonData);
      setWebtoons(prev => [...prev, newWebtoon]);
      toast({
        title: "Success",
        description: `${webtoonData.name} added to your hub!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add webtoon",
        variant: "destructive"
      });
    }
  };

  const handleDeleteWebtoon = async (id) => {
    try {
      await deleteWebtoon(id);
      setWebtoons(prev => prev.filter(w => w.id !== id));
      toast({
        title: "Deleted",
        description: "Webtoon removed from your hub",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete webtoon",
        variant: "destructive"
      });
    }
  };

  const handleEditWebtoon = (webtoon) => {
    // For now, just show a toast - in backend integration this would open edit dialog
    toast({
      title: "Edit Feature",
      description: "Edit functionality will be available after backend integration",
    });
  };

  const uniqueGenres = [...new Set(webtoons.map(w => w.genre).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your webtoon hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Grid className="h-8 w-8 text-gray-900 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Webtoon Hub</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {filteredWebtoons.length} webtoons
              </span>
              <AddWebtoonDialog 
                onAddWebtoon={handleAddWebtoon}
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search webtoons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-500 bg-white"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 border-gray-300 focus:border-gray-500 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-40 border-gray-300 focus:border-gray-500 bg-white">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {uniqueGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Webtoon Grid */}
        {filteredWebtoons.length === 0 ? (
          <div className="text-center py-12">
            <Grid className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || statusFilter !== 'all' || genreFilter !== 'all' 
                ? 'No webtoons match your filters'
                : 'No webtoons added yet'
              }
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || statusFilter !== 'all' || genreFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Add your first webtoon to get started!'
              }
            </p>
            {!searchQuery && statusFilter === 'all' && genreFilter === 'all' && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Grid className="h-4 w-4 mr-2" />
                Add Your First Webtoon
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredWebtoons.map(webtoon => (
              <WebtoonCard
                key={webtoon.id}
                webtoon={webtoon}
                onChapterChange={handleChapterChange}
                onVisitLink={handleVisitLink}
                onEdit={handleEditWebtoon}
                onDelete={handleDeleteWebtoon}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebtoonHub;