// Helper to get date N days ago
const getDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const mockWebtoons = [
  {
    id: "1",
    name: "Tower of God",
    currentChapter: 612,
    url: "https://www.webtoons.com/en/fantasy/tower-of-god/list?title_no=95",
    status: "ongoing",
    genre: "Fantasy",
    lastRead: getDaysAgo(8) // 8 days ago - should show NEW tag (needs update)
  },
  {
    id: "2", 
    name: "Solo Leveling",
    currentChapter: 200,
    url: "https://www.webtoons.com/en/action/solo-leveling/list?title_no=4086",
    status: "completed",
    genre: "Action",
    lastRead: getDaysAgo(10) // 10 days ago but completed - no NEW tag
  },
  {
    id: "3",
    name: "The Beginning After The End",
    currentChapter: 187,
    url: "https://tapas.io/series/tbate-comic/info",
    status: "ongoing",
    genre: "Fantasy",
    lastRead: getDaysAgo(3) // 3 days ago - no NEW tag (too recent)
  },
  {
    id: "4",
    name: "Omniscient Reader's Viewpoint", 
    currentChapter: 156,
    url: "https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154",
    status: "ongoing", 
    genre: "Action",
    lastRead: getDaysAgo(7) // Exactly 7 days ago - should show NEW tag
  },
  {
    id: "5",
    name: "Lookism",
    currentChapter: 475,
    url: "https://www.webtoons.com/en/drama/lookism/list?title_no=1049",
    status: "ongoing",
    genre: "Drama", 
    lastRead: getDaysAgo(1) // 1 day ago - no NEW tag (too recent)
  },
  {
    id: "6",
    name: "Unordinary",
    currentChapter: 324,
    url: "https://www.webtoons.com/en/super-hero/unordinary/list?title_no=679",
    status: "ongoing",
    genre: "Super Hero",
    lastRead: getDaysAgo(14) // 14 days ago - should show NEW tag (definitely needs update)
  }
];

export const getWebtoons = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockWebtoons]);
    }, 300);
  });
};

export const updateWebtoonChapter = (id, newChapter) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const webtoon = mockWebtoons.find(w => w.id === id);
      if (webtoon) {
        webtoon.currentChapter = newChapter;
        webtoon.lastRead = new Date().toISOString().split('T')[0];
      }
      resolve(webtoon);
    }, 200);
  });
};

export const addNewWebtoon = (webtoonData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWebtoon = {
        id: Date.now().toString(),
        ...webtoonData,
        lastRead: new Date().toISOString().split('T')[0]
      };
      mockWebtoons.push(newWebtoon);
      resolve(newWebtoon);
    }, 300);
  });
};

export const deleteWebtoon = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockWebtoons.findIndex(w => w.id === id);
      if (index > -1) {
        mockWebtoons.splice(index, 1);
      }
      resolve(true);
    }, 200);
  });
};