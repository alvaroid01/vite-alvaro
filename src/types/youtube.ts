// YouTube Data API v3 types
export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideoItem[];
}

export interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeSearchParams {
  q: string;
  maxResults?: number;
  part?: string;
  type?: "video" | "channel" | "playlist";
  order?:
    | "date"
    | "rating"
    | "relevance"
    | "title"
    | "videoCount"
    | "viewCount";
}

export interface YouTubeSearchState {
  results: YouTubeVideoItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}
