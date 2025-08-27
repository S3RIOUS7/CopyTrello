import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/storage/store';
import styles from '../../styles/pagesStyles/DashBoard/Dashboard.module.scss';
import { AdaptiveTitle } from '../../components/parts/DashBoard/AdaptiveTitle/AdaptiveTitle';
import { useEffect } from 'react';
import { setBoardBackground } from '../../components/base/features/slices/background/backgroundSlice';
import type { BackgroundInfo } from '../../utils/hooks/colorText/useTextColor';
import { AddButton } from '../../components/parts/DashBoard/AddBoardButton/AbbBoardButton';

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
    }
  }, [boardId, currentBoard, dispatch]);

  const backgroundStyle: React.CSSProperties = {
    paddingTop: '60px'
  };
  
  if (selectedBackground) {
    backgroundStyle.backgroundImage = `url(${selectedBackground})`;
    backgroundStyle.backgroundSize = 'cover';
    backgroundStyle.backgroundPosition = 'center';
    backgroundStyle.backgroundRepeat = 'no-repeat';
  } else if (selectedColor) {
    if (selectedColor.startsWith('linear-gradient')) {
      backgroundStyle.backgroundImage = selectedColor;
    } else {
      backgroundStyle.backgroundColor = selectedColor; 
    }
  } else if (currentBoard) {
    if (currentBoard.background) {
      backgroundStyle.backgroundImage = `url(${currentBoard.background})`;
      backgroundStyle.backgroundSize = 'cover';
      backgroundStyle.backgroundPosition = 'center';
      backgroundStyle.backgroundRepeat = 'no-repeat';
    } else if (currentBoard.color) {
      if (currentBoard.color.startsWith('linear-gradient')) {
        backgroundStyle.backgroundImage = currentBoard.color;
      } else {
        backgroundStyle.backgroundColor = currentBoard.color; 
      }
    }
  }

  const backgroundInfo: BackgroundInfo = {
    selectedBackground,
    selectedColor
  };
  
  return (
    <>
      <div 
        className={styles.dashboardContainer} 
        style={backgroundStyle}
      />
      <div className={styles.content}>
        <AdaptiveTitle 
          boardId={boardId}
          backgroundInfo={backgroundInfo}
          className={styles.adaptiveTitle}
        />
        
        {/* Отдельный контейнер для списка созданных элементов */}
        <div className={styles.containersList}>
          {containers.map((container) => (
            <div
              key={container.id}
              className={styles.containerItem}
            >
              <div className={styles.containerContent}>
                {container.content}
              </div>
            </div>
          ))}
        </div>
        
        {/* Кнопка добавления - теперь она будет перемещаться вправо */}
        <AddButton 
          boardId={boardId}
          className={styles.addButton}
        />
      </div>
    </>
  );
};