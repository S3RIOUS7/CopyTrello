import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/storage/store';

import styles from '../../styles/pagesStyles/DashBoard/Dashboard.module.scss';
import { setHeaderTransparent } from '../../components/base/features/background/backgroundSlice';

export const DashBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Устанавливаем прозрачность при монтировании
    dispatch(setHeaderTransparent(true));
    
    // Возвращаем обычный стиль при размонтировании
    return () => {
      dispatch(setHeaderTransparent(false));
    };
  }, [dispatch]);

  const backgroundStyle: React.CSSProperties = {};
  
  if (selectedBackground) {
    backgroundStyle.backgroundImage = `url(${selectedBackground})`;
  } else if (selectedColor) {
    if (selectedColor.startsWith('linear-gradient')) {
      backgroundStyle.backgroundImage = selectedColor;
    } else {
       backgroundStyle.backgroundColor = selectedColor; 
    }
  }
  
  return (
    <>
      <div 
        className={styles.dashboardContainer} 
        style={backgroundStyle}
      />
      <div className={styles.content}>
        <h1>Доска: {boardId}</h1>
      </div>
    </>
  );
};