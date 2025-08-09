export interface BackgroundButton {
  id: string;
  background: string;
  title: string;
}

export interface ColorButton {
  id: string;
  color: string;
  title: string;
  isMenuTrigger?: boolean;
  isGradient?: boolean;
}

export interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

export interface BackgroundState {
  selectedBackground: string | null;
  selectedColor: string | null;
  lastSelectedType: 'background' | 'color' | null;
}