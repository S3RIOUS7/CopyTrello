import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/storage/store';
import styles from '../../styles/pagesStyles/DashBoard/Dashboard.module.scss';
import { AdaptiveTitle } from '../../components/parts/DashBoard/AdaptiveTitle/AdaptiveTitle';
import { useEffect } from 'react';
import { setBoardBackground } from '../../components/base/features/slices/background/backgroundSlice';
import { AddButton } from '../../components/parts/DashBoard/AddBoardButton/AbbBoardButton';
import { ContainersList } from '../../components/parts/DashBoard/ContainerList/ContainerList';

export const DashBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();
  
  const boards = useSelector((state: RootState) => state.boards.boards);
  const containers = useSelector((state: RootState) => 
    boardId ? state.container.containers.filter(container => container.boardId === boardId) : []
  );

  const currentBoard = boards.find(board => board.id === boardId);
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);
  
  useEffect(() => {
    if (currentBoard) {
      dispatch(setBoardBackground({
        background: currentBoard.background,
        color: currentBoard.color
      }));
    } else {
      // Сброс фона если доска не найдена
      dispatch(setBoardBackground({
        background: null,
        color: null
      }));
    }
  }, [boardId, currentBoard, dispatch]);

  const backgroundStyle: React.CSSProperties = {
    paddingTop: '60px'
  };
  
  // Определяем стиль фона
  const effectiveBackground = selectedBackground || currentBoard?.background;
  const effectiveColor = selectedColor || currentBoard?.color;
  
  if (effectiveBackground) {
    backgroundStyle.backgroundImage = `url(${effectiveBackground})`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
    backgroundStyle.backgroundRepeat = 'no-repeat';
  } else if (effectiveColor) {
    if (effectiveColor.startsWith('linear-gradient')) {
      backgroundStyle.backgroundImage = effectiveColor;
    } else {
      backgroundStyle.backgroundColor = effectiveColor; 
    }
  }

  return (
    <>
      <div 
        className={styles.dashboardContainer} 
        style={backgroundStyle}
      />
      <div className={styles.content}>
        <AdaptiveTitle 
          boardId={boardId}
          className={styles.adaptiveTitle}
        />
        
        {/* Общий контейнер для списка элементов и кнопки */}
        <div className={styles.containersAndButtonWrapper}>
          {/* Используем новый компонент для списка контейнеров */}
          <ContainersList containers={containers} />
          
          {/* Кнопка добавления - будет всегда справа от контейнеров */}
          <AddButton 
            boardId={boardId}
            className={styles.addButton}
          />
        </div>
      </div>
    </>
  );
};