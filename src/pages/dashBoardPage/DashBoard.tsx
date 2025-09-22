import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/storage/store';
import styles from '../../styles/pagesStyles/DashBoard/Dashboard.module.scss';
import { AdaptiveTitle } from '../../components/parts/DashBoard/AdaptiveTitle/AdaptiveTitle';
import { useEffect } from 'react';
import { setBoardBackground } from '../../store/redusers/features/slices/background/backgroundSlice';
import { AddButton } from '../../components/parts/DashBoard/AddBoardButton/AbbBoardButton';
import { ContainersList, type ContainerItemType } from '../../components/parts/DashBoard/ContainerList/ContainerList';

export interface ContainerCard {
  id: string;
  content: string;
  containerId: string;
  checked: boolean;
}

export const DashBoard = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();
  
  const boards = useSelector((state: RootState) => state.boards.boards);
  const allContainers = useSelector((state: RootState) => state.container.containers);
  const allCards = useSelector((state: RootState) => state.cards.cards);
  
  const currentBoard = boards.find(board => board.id === boardId);
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);

  // Новая логика получения контейнеров с карточками
  const containers: ContainerItemType[] = boardId 
    ? allContainers
        .filter(container => container.boardId === boardId)
        .map(container => {
          // Получаем карточки из редюсера cards по их ID
          const containerCards = allCards.filter(card => 
            container.cards.includes(card.id)
          );
          
          return {
            id: container.id,
            content: container.content,
            boardId: container.boardId,
            cards: containerCards
          };
        })
    : [];
  
  useEffect(() => {
    if (currentBoard) {
      dispatch(setBoardBackground({
        background: currentBoard.background,
        color: currentBoard.color
      }));
    } else {
      dispatch(setBoardBackground({
        background: null,
        color: null
      }));
    }
  }, [boardId, currentBoard, dispatch]);

  const backgroundStyle: React.CSSProperties = {
    paddingTop: '60px'
  };
  
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
        
        <div className={styles.containersAndButtonWrapper}>
          <ContainersList containers={containers} />
          <AddButton 
            boardId={boardId}
            className={styles.addButton}
          />
        </div>
      </div>
    </>
  );
};