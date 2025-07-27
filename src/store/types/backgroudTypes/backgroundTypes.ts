export interface BackgroundButton {
  id: string;
  background: string;
  title: string;
}

export interface ColorButton {
  id: string;
  color: string;
  title: string;
}

export interface BackgroundState {
  selectedBackground: string | null;
  selectedColor: string | null;
  lastSelectedType: 'background' | 'color' | null;
}