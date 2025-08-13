import { useState, useCallback } from "react";
import {
  YouTubeSearchParams,
  YouTubeSearchState,
  YouTubeSearchResponse,
} from "../types/youtube";

const API_KEY =
  import.meta.env.VITE_YOUTUBE_API_KEY ||
  "AIzaSyCS5vu_meyXkygZz6l5lq3qAZcKrmZ1JL4";

const BASE_URL = "https://youtube.googleapis.com/youtube/v3/search";

export const useYouTubeSearch = () => {
  const [searchState, setSearchState] = useState<YouTubeSearchState>({
    results: [],
    loading: false,
    error: null,
    hasMore: true,
  });

  const search = useCallback(
    async (query: string, params?: Partial<YouTubeSearchParams>) => {
      if (!query.trim()) {
        setSearchState({
          results: [],
          loading: false,
          error: null,
          hasMore: true,
        });
        return;
      }

      setSearchState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const searchParams = new URLSearchParams({
          part: "snippet",
          maxResults: (params?.maxResults || 5).toString(),
          type: params?.type || "video",
          key: API_KEY,
          q: query,
          ...(params?.order && { order: params.order }),
        });

        const response = await fetch(`${BASE_URL}?${searchParams}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Referer: "http://localhost:5173",
          },
        });

        if (!response.ok) {
          throw new Error(
            `YouTube API error: ${response.status} ${response.statusText}`
          );
        }

        const data: YouTubeSearchResponse = await response.json();

        setSearchState({
          results: data.items || [],
          loading: false,
          error: null,
          hasMore: data.pageInfo.totalResults > (data.items?.length || 0),
        });

        return data.items;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        setSearchState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        console.error("YouTube search error:", error);
        throw error;
      }
    },
    []
  );

  const clearResults = useCallback(() => {
    setSearchState({
      results: [],
      loading: false,
      error: null,
      hasMore: true,
    });
  }, []);

  return {
    ...searchState,
    search,
    clearResults,
  };
};
