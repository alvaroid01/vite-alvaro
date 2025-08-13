import React, { FC, useState, useEffect } from "react";
import "./Input.css";
import { useYouTubeSearch } from "../hooks/useYouTubeSearch";
import { useDebounce } from "../hooks/useDebounce";
import type { YouTubeVideoItem } from "../types/youtube";

interface InputProps {
  type: string;
  onSearchResults?: (results: YouTubeVideoItem[]) => void;
}

const Input: FC<InputProps> = ({ type, onSearchResults }) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // 500ms debounce
  const { search, results, loading, error } = useYouTubeSearch();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  // Call onSearchResults callback when results change
  useEffect(() => {
    if (onSearchResults && results) {
      onSearchResults(results);
    }
  }, [results, onSearchResults]);

  const renderInput = () => {
    switch (type) {
      case "search":
        return (
          <div className="search-container">
            <input
              className="input_search"
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Type to search for a topic, channel etc"
            />
            {loading && <div className="search-loading">Searching...</div>}
            {error && <div className="search-error">Error: {error}</div>}
          </div>
        );
    }
  };

  return <div>{renderInput()}</div>;
};

export default Input;
