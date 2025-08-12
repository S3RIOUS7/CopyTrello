type BackgroundStorage = {
  selectedBackground: string | null;
  selectedColor: string | null;
  lastSelectedType: 'background' | 'color' | null;
};

export class LocalStorageManager {
  private static readonly BACKGROUND_KEY = 'dashboardBackground';

  static saveBackground(background: BackgroundStorage): void {
    try {
      localStorage.setItem(this.BACKGROUND_KEY, JSON.stringify(background));
    } catch (error) {
      console.error('Error saving background to localStorage:', error);
    }
  }

  static getBackground(): BackgroundStorage | null {
    try {
      const data = localStorage.getItem(this.BACKGROUND_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading background from localStorage:', error);
      return null;
    }
  }

  static clearBackground(): void {
    try {
      localStorage.removeItem(this.BACKGROUND_KEY);
    } catch (error) {
      console.error('Error clearing background from localStorage:', error);
    }
  }

  static isFirstLaunch(): boolean {
    return !localStorage.getItem(this.BACKGROUND_KEY);
  }
}