import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus } from 'lucide-react';

const AddWebtoonDialog = ({ onAddWebtoon, isOpen, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    currentChapter: 0,
    genre: '',
    status: 'ongoing'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      onAddWebtoon({
        ...formData,
        currentChapter: parseInt(formData.currentChapter) || 0
      });
      setFormData({
        name: '',
        url: '',
        currentChapter: 0,
        genre: '',
        status: 'ongoing'
      });
      onOpenChange(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Webtoon
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add New Webtoon
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter webtoon name"
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-gray-700">
              URL *
            </Label>
            <Input
              id="url"
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://webtoons.com/..."
              className="border-gray-300 focus:border-gray-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chapter" className="text-sm font-medium text-gray-700">
                Current Chapter
              </Label>
              <Input
                id="chapter"
                type="number"
                min="0"
                value={formData.currentChapter}
                onChange={(e) => handleInputChange('currentChapter', e.target.value)}
                placeholder="0"
                className="border-gray-300 focus:border-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                Status
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="border-gray-300 focus:border-gray-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-sm font-medium text-gray-700">
              Genre
            </Label>
            <Input
              id="genre"
              type="text"
              value={formData.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
              placeholder="Action, Fantasy, Romance..."
              className="border-gray-300 focus:border-gray-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              Add Webtoon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWebtoonDialog;