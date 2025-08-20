import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../../store/storage/store';
import { clearUnsplashPhotos, fetchUnsplashPhotosRequest } from '../../../../../store/actions/unsplashActions/unsplashActions';
import { selectBackground } from '../../../../base/features/slices/background/backgroundSlice';
import { CheckIcon } from '../../../../../assets/img/icon/CheckIcon';
import Button from '../../../../base/button/Button';

interface UnsplashPhotosPanelProps {
  onClose: () => void;
}

export const UnsplashPhotosPanel: React.FC<UnsplashPhotosPanelProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { photos, isLoading, hasMore } = useSelector((state: RootState) => state.unsplash);
  const { selectedBackground, lastSelectedType } = useSelector((state: RootState) => state.background);

  useEffect(() => {
    dispatch(clearUnsplashPhotos());
    dispatch(fetchUnsplashPhotosRequest({}));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchUnsplashPhotosRequest({}));
  };

  const handleBackgroundSelect = (url: string, title: string) => {
    dispatch(selectBackground({ 
      background: url, 
      title: title || 'Unsplash photo', 
      id: `unsplash-${Date.now()}` 
    }));
    onClose();
  };

  return (
    <div className="unsplash-photos-panel">
      <div className="additional-options-dropdown">
        <div className="additional-backgrounds-section">
          <div className="additional-backgrounds-header">
            <h4 className="additional-options-title">Фотографии из Unsplash</h4>
          </div>
          
          <div className="additional-backgrounds-grid">
            {photos.map((photo) => (
              <button
                key={photo.id}
                className={`background-button ${
                  lastSelectedType === 'background' && selectedBackground === photo.urls.regular ? 'selected' : ''
                }`}
                style={{ backgroundImage: `url(${photo.urls.small})` }}
                title={photo.alt_description || `Photo by ${photo.user.name}`}
                onClick={() => handleBackgroundSelect(photo.urls.regular, photo.alt_description || `Photo by ${photo.user.name}`)}
              >
                {lastSelectedType === 'background' && selectedBackground === photo.urls.regular && (
                  <span className="selected-check">
                    <CheckIcon size={16} color="#fff" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {hasMore && !isLoading && (
        <div className="unsplash-load-more">
          <Button
            buttonStyle="create"
            onClick={handleLoadMore}
            label="Загрузить еще"
            className="unsplash-load-more-button"
          />
        </div>
      )}
    </div>
  );
};