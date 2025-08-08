import { createReducer } from '@reduxjs/toolkit';
import type { UnsplashState } from '../../types/unsplashTypes/unsplashTypes';
import { clearUnsplashPhotos, fetchUnsplashPhotosFailure, fetchUnsplashPhotosRequest, fetchUnsplashPhotosSuccess, setUnsplashQuery } from '../../actions/unsplashActions/unsplashActions';


const initialState: UnsplashState = {
  photos: [],
  isLoading: false,
  error: null,
  page: 1,
  query: '',
  hasMore: true,
};

const unsplashReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchUnsplashPhotosRequest, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchUnsplashPhotosSuccess, (state, action) => {
      state.isLoading = false;
      state.photos = [...state.photos, ...action.payload];
      state.page = state.page + 1;
      state.hasMore = action.payload.length > 0;
    })
    .addCase(fetchUnsplashPhotosFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(clearUnsplashPhotos, (state) => {
      state.photos = [];
      state.page = 1;
      state.hasMore = true;
    })
    .addCase(setUnsplashQuery, (state, action) => {
      state.query = action.payload;
    });
});

export default unsplashReducer;