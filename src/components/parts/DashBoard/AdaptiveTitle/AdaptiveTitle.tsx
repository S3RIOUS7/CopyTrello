import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/storage/store";
import { useTextColor, type BackgroundInfo } from "../../../../utils/hooks/colorText/useTextColor";

interface AdaptiveTitleProps {
  boardId?: string;
  className?: string;
}

export const AdaptiveTitle: React.FC<AdaptiveTitleProps> = ({
  boardId,
  className = ''
}) => {
  // Получаем все доски чтобы найти название текущей
  const boards = useSelector((state: RootState) => state.boards.boards);
  const currentBoard = boards.find(board => board.id === boardId);
  
  // Получаем текущий фон из состояния
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);
  
  // Создаем backgroundInfo для useTextColor
  const backgroundInfo: BackgroundInfo = {
    selectedBackground: selectedBackground || currentBoard?.background,
    selectedColor: selectedColor || currentBoard?.color
  };
  
  const textStyle = useTextColor(backgroundInfo);

  return (
    <h1 
      style={textStyle}
      className={className}
    >
      {currentBoard?.name || `Доска: ${boardId}`}
    </h1>
  );
};