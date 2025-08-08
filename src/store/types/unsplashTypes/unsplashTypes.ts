export interface UnsplashUser {
  name: string;
}

export interface UnsplashPhotoUrls {
  small: string;
  regular: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  urls: UnsplashPhotoUrls;
  alt_description?: string;
  user: UnsplashUser;
}

export interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
  total: number;
  total_pages: number;
}

export interface UnsplashState {
  photos: UnsplashPhoto[];
  isLoading: boolean;
  error: string | null;
  page: number;
  query: string;
  hasMore: boolean;
}

export interface FetchUnsplashPhotosPayload {
  query?: string;
  page?: number;
}