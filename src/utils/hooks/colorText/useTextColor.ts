import { useMemo } from 'react';
import { getColorBrightness } from '../../colorUtils';

export interface BackgroundInfo {
  selectedBackground?: string | null;
  selectedColor?: string | null;
}

export const useTextColor = ({ selectedBackground, selectedColor }: BackgroundInfo): React.CSSProperties => {
  return useMemo(() => {
    if (selectedBackground) {
      return {
        color: '#ffffff',
        textShadow: '0 0 8px rgba(0, 0, 0, 0.8)'
      };
    }

    if (selectedColor) {
      if (selectedColor.startsWith('linear-gradient')) {
        return {
          color: '#ffffff',
          textShadow: '0 0 4px rgba(0, 0, 0, 0.6)'
        };
      }

      const brightness = getColorBrightness(selectedColor);
      return {
        color: brightness > 128 ? '#000000' : '#ffffff',
        textShadow: 'none'
      };
    }

    return {
      color: '#ffffff',
      textShadow: 'none'
    };
  }, [selectedBackground, selectedColor]);
};