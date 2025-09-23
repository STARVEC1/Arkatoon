export const mockWebtoons = [
  {
    id: "1",
    name: "Tower of God",
    currentChapter: 612,
    url: "https://www.webtoons.com/en/fantasy/tower-of-god/list?title_no=95",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    status: "ongoing",
    description: "Follow Bam as he climbs the mysterious Tower to find his friend Rachel.",
    genre: "Fantasy",
    lastRead: "2024-09-15"
  },
  {
    id: "2", 
    name: "Solo Leveling",
    currentChapter: 200,
    url: "https://www.webtoons.com/en/action/solo-leveling/list?title_no=4086",
    cover: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=400&fit=crop",
    status: "completed",
    description: "Sung Jin-Woo rises from the weakest Hunter to humanity's greatest hope.",
    genre: "Action",
    lastRead: "2024-09-14"
  },
  {
    id: "3",
    name: "The Beginning After The End",
    currentChapter: 187,
    url: "https://tapas.io/series/tbate-comic/info",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop", 
    status: "ongoing",
    description: "King Grey is reborn in a magical world as Arthur Leywin.",
    genre: "Fantasy",
    lastRead: "2024-09-13"
  },
  {
    id: "4",
    name: "Omniscient Reader's Viewpoint", 
    currentChapter: 156,
    url: "https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    status: "ongoing", 
    description: "Kim Dokja finds himself in the world of his favorite web novel.",
    genre: "Action",
    lastRead: "2024-09-12"
  },
  {
    id: "5",
    name: "Lookism",
    currentChapter: 475,
    url: "https://www.webtoons.com/en/drama/lookism/list?title_no=1049",
    cover: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=400&fit=crop",
    status: "ongoing",
    description: "Daniel Park navigates high school in two different bodies.",
    genre: "Drama", 
    lastRead: "2024-09-11"
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