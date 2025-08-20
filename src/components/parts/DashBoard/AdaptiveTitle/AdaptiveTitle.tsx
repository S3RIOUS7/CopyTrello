import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/storage/store";
import { useTextColor, type BackgroundInfo } from "../../../../utils/hooks/colorText/useTextColor";

interface AdaptiveTitleProps {
  boardId?: string;
  backgroundInfo: BackgroundInfo;
  className?: string;
}

export const AdaptiveTitle: React.FC<AdaptiveTitleProps> = ({
  boardId,
  backgroundInfo,
  className = ''
}) => {
  const textStyle = useTextColor(backgroundInfo);
  
  // Получаем все доски чтобы найти название текущей
  const boards = useSelector((state: RootState) => state.boards.boards);
  const currentBoard = boards.find(board => board.id === boardId);

  return (
    <h1 
      style={textStyle}
      className={className}
    >
      {currentBoard?.name || `Доска: ${boardId}`}
    </h1>
  );
};