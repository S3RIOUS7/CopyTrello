import { call, put, takeLatest, select } from 'redux-saga/effects';

import { fetchUnsplashPhotosFailure, fetchUnsplashPhotosRequest, fetchUnsplashPhotosSuccess } from '../../actions/unsplashActions/unsplashActions';
import type { RootState } from '../../storage/store';
import type { UnsplashPhoto } from '../../types/unsplashTypes/unsplashTypes';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com';
interface UnsplashApiPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

interface UnsplashApiResponse {
  results?: UnsplashApiPhoto[];
}

async function fetchPhotosFromUnsplash(query: string, page: number): Promise<UnsplashPhoto[]> {
 
  const url = query
    ? `${UNSPLASH_API_URL}/search/photos?query=${query}&page=${page}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
    : `${UNSPLASH_API_URL}/photos?page=${page}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`;

  const response = await fetch(url);
  const data: UnsplashApiResponse | UnsplashApiPhoto[] = await response.json();

  if (query && 'results' in data && data.results) {
    return data.results.map((photo) => ({
      id: photo.id,
      urls: {
        small: photo.urls.small,
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
      },
      alt_description: photo.alt_description || undefined,
      user: {
        name: photo.user.name,
      },
    }));
  }

  if (!query && Array.isArray(data)) {
    return data.map((photo) => ({
      id: photo.id,
      urls: {
        small: photo.urls.small,
        regular: photo.urls.regular,
        thumb: photo.urls.thumb,
      },
      alt_description: photo.alt_description || undefined,
      user: {
        name: photo.user.name,
      },
    }));
  }

  return [];
}

function* fetchPhotosSaga(action: ReturnType<typeof fetchUnsplashPhotosRequest>) {
  try {
    const { query, page } = action.payload;
    const state: RootState = yield select();
    const currentQuery = query ?? state.unsplash.query;
    const currentPage = page ?? state.unsplash.page;

    const photos: UnsplashPhoto[] = yield call(fetchPhotosFromUnsplash, currentQuery, currentPage);
    yield put(fetchUnsplashPhotosSuccess(photos));
  } catch (error) {
    yield put(fetchUnsplashPhotosFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
}

export function* unsplashSaga() {
  yield takeLatest(fetchUnsplashPhotosRequest.type, fetchPhotosSaga);
}