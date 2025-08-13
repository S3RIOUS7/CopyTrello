import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/storage/store';
import styles from '../../styles/pagesStyles/DashBoard/Dashboard.module.scss';

export const DashBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);
  
  const backgroundStyle: React.CSSProperties = {
    paddingTop: '60px' // Добавляем отступ сверху равный высоте Header'а
  };
  
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