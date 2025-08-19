
import React from 'react';
import '../../../../../styles/pagesStyles/MainPage/MainPageParts/boardPreview.scss'
import Button from '../../../../base/button/Button';
import { TrashIcon } from '../../../../../assets/img/icon/TrasIcon';

interface BoardPreviewProps {
  boardName: string;
  background: string | null;
  color: string | null;
  onBoardClick: () => void;
  onDeleteClick: (e: React.MouseEvent) => void;
}

export const BoardPreview: React.FC<BoardPreviewProps> = ({ 
  boardName, 
  background, 
  color, 
  onBoardClick,
  onDeleteClick 
}) => {
  const boardStyle: React.CSSProperties = {
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  if (background) {
    boardStyle.backgroundImage = `url(${background})`;
  } else if (color) {
    if (color.startsWith('linear-gradient')) {
      boardStyle.backgroundImage = color;
    } else {
      boardStyle.backgroundColor = color;
    }
  }
  
  return (
    <div 
      className="board-preview"
      style={boardStyle}
      onClick={onBoardClick}
    >

      <div className="board-preview-actions">
        <Button
          buttonStyle="icon"
          onClick={onDeleteClick}
          customClassName="delete-board-button"
          icon={<TrashIcon size={16} />}
          title="Удалить доску"
        />
      </div>
      
      <div className="board-preview-content">
        <h3 className="board-preview-title">{boardName}</h3>
      </div>
    </div>
  );
};