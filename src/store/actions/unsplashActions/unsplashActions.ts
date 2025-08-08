import { createAction } from '@reduxjs/toolkit';
import type { FetchUnsplashPhotosPayload, UnsplashPhoto } from '../../types/unsplashTypes/unsplashTypes';


export const fetchUnsplashPhotosRequest = createAction<FetchUnsplashPhotosPayload>('unsplash/fetchPhotosRequest');
export const fetchUnsplashPhotosSuccess = createAction<UnsplashPhoto[]>('unsplash/fetchPhotosSuccess');
export const fetchUnsplashPhotosFailure = createAction<string>('unsplash/fetchPhotosFailure');
export const clearUnsplashPhotos = createAction('unsplash/clearPhotos');
export const setUnsplashQuery = createAction<string>('unsplash/setQuery');