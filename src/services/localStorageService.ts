type BackgroundStorage = {
  selectedBackground: string | null;
  selectedColor: string | null;
  lastSelectedType: 'background' | 'color' | null;
};
export interface Board {
  id: string;
  name: string;
  background: string | null;
  color: string | null;
  createdAt: number;
}


export class LocalStorageManager {
  private static readonly BACKGROUND_KEY = 'dashboardBackground';
  private static readonly BOARDS_KEY = 'userBoards';


  // Методы для фона
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

  // Методы для досок
  static saveBoards(boards: Board[]): void {
    try {
      localStorage.setItem(this.BOARDS_KEY, JSON.stringify(boards));
    } catch (error) {
      console.error('Error saving boards to localStorage:', error);
    }
  }

  static getBoards(): Board[] {
    try {
      const data = localStorage.getItem(this.BOARDS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading boards from localStorage:', error);
      return [];
    }
  }

  static clearBoards(): void {
    try {
      localStorage.removeItem(this.BOARDS_KEY);
    } catch (error) {
      console.error('Error clearing boards from localStorage:', error);
    }
  }
}