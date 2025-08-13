import React from "react";
import { Item } from "../Item";

type ItemType = {
  type: "news" | "video" | "music";
  title: string;
  id: string;
};

const MainContent: React.FC = () => {
  const items: ItemType[] = [
    {
      type: "news",
      title: "Breaking News: Global Markets React to Economic Report",
      id: "news-20250810-001",
    },
    {
      type: "video",
      title: "How to Learn a New Language in 30 Days",
      id: "video-aBcDeFgHiJkLmNoP",
    },
    {
      type: "music",
      title: "Chill Lo-fi Beats for Study and Focus",
      id: "music-qRsTuVwXyZaBcDeF",
    },
    {
      type: "news",
      title: "Local Weather Forecast: Sunny with a Chance of Showers",
      id: "news-20250810-002",
    },
    {
      type: "video",
      title: "Top 10 Ancient Wonders of the World",
      id: "video-gHiJkLmNoPqRsTuV",
    },
    {
      type: "music",
      title: "Upbeat Indie Rock Playlist",
      id: "music-wXyZaBcDeFgHiJkL",
    },
    {
      type: "video",
      title: "DIY Home Decor Ideas on a Budget",
      id: "video-mNoPqRsTuVwXyZaB",
    },
  ];

  return (
    <div className="main-content">
      <div className="rss-item-list">
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            type={item.type}
            title={item.title}
            timeAgo="1h ago"
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
