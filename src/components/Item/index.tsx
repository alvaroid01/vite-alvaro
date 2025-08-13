import React from "react";
import "./styles.css";

type ItemProps = {
  id: string;
  type: "news" | "video" | "music";
  title: string;
  timeAgo?: string;
};

export const Item: React.FC<ItemProps> = ({
  id,
  type,
  title,
  timeAgo = "1h ago",
}) => {
  return (
    <div className="rss-item" key={id}>
      <div className="rss-item-content">
        <div className={`dot dot-${type}`}></div>
        <span className="item-title">{title}</span>
      </div>
      <div className="time-ago">{timeAgo}</div>
    </div>
  );
};

export default Item;
