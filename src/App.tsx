/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import Input from "./components/Input";
import type { YouTubeVideoItem } from "./types/youtube";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import MainContent from "./components/MainContent/MainContent";

function App() {
  const [results, setResults] = useState<any>([]);

  const handleSearchResults = (results: YouTubeVideoItem[]) => {
    console.log("YouTube search results:", results);
    // You can add logic here to display or process the search results
    // For example, update state to show video thumbnails, titles, etc.
    setResults(results);
  };
  useEffect(() => {
    const ls: any = localStorage?.getItem("prefs");
    if (!ls) localStorage.setItem("prefs", "[]");
  }, []);

  return (
    <div className="App">
      <Sidebar />
      <MainContent />
      <h1>The complete animator's toolbox</h1>
      <div>{results.length}</div>
      <Input type="search" onSearchResults={handleSearchResults} />
      {results && results.length > 0 && (
        <div className="search-results">
          {results.map((r: any, index: number) => (
            <div
              key={r?.id?.videoId || index}
              className="video-result"
              onClick={() => {
                const ls: any = localStorage?.getItem("prefs");

                const parsedLs = JSON.parse(ls);
                console.log(parsedLs);
                if (parsedLs) parsedLs.push(r);
                localStorage.setItem("prefs", JSON.stringify(parsedLs));
              }}
            >
              <div className="video-title">{r?.snippet?.title}</div>
              <div className="video-channel">{r?.snippet?.channelTitle}</div>
              <div className="video-description">
                {r?.snippet?.description?.slice(0, 100) + "..."}
              </div>
              <div className="video-id">Video ID: {r?.id?.videoId}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
