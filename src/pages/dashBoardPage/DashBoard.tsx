import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/storage/store';
import { useEffect } from 'react';
import { LocalStorageManager } from '../../services/localStorageService';


export const DashBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);
  
  // Проверяем localStorage при монтировании компонента
  useEffect(() => {
    const savedBackground = LocalStorageManager.getBackground();
    if (savedBackground) {
      console.log('Loaded background from localStorage:', savedBackground);
    }
  }, []);

  // Стиль для всей страницы
  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    padding: '20px',
  };
  
  if (selectedBackground) {
    pageStyle.backgroundImage = `url(${selectedBackground})`;
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
  } else if (selectedColor) {
    if (selectedColor.startsWith('linear-gradient')) {
      pageStyle.backgroundImage = selectedColor;
    } else {
      pageStyle.backgroundColor = selectedColor;
    }
  }
  
  return (
    <div className="board-page" style={pageStyle}>
      <h1>Доска: {boardId}</h1>
    </div>
  );
};