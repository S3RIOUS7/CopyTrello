
import { useDispatch, useSelector } from 'react-redux';
import '../../../../../styles/pagesStyles/MainPage/MainPageParts/mainPartCreateDelete.scss'
import { BoardPreview } from '../BoardPreview/BoardPreview';
import { CreateMenuDropdown } from "../CreateMenuDropdown/CreateMenuDropdown";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../../../../store/storage/store';
import type { Board } from '../../../../../services/localStorageService';
import { addBoard, removeBoard } from '../../../../base/features/slices/boardSlice/boardSlice';
import { clearSelection } from '../../../../base/features/slices/background/backgroundSlice';




const MainComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const boards = useSelector((state: RootState) => state.boards.boards);
  const { selectedBackground, selectedColor } = useSelector((state: RootState) => state.background);

  const handleCreate = () => {
    if (!inputValue.trim()) return;
    
    // Проверяем, существует ли доска с таким именем
    const existingBoard = boards.find(board => 
      board.name.toLowerCase() === inputValue.trim().toLowerCase()
    );
    
    if (existingBoard) {
      alert('Доска с таким именем уже существует');
      return;
    }
    
    const newBoard: Board = {
      id: Date.now().toString(), // Используем timestamp как ID для уникальности
      name: inputValue.trim(),
      background: selectedBackground,
      color: selectedColor,
      createdAt: Date.now()
    };
    
    dispatch(addBoard(newBoard));
    setInputValue('');
    // Очищаем выбор фона после создания доски
    dispatch(clearSelection());
    navigate(`/Dashboard/${newBoard.id}`);
  };

  const handleBoardClick = (boardId: string) => {
    navigate(`/Dashboard/${boardId}`);
  };

  const handleDeleteBoard = (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    dispatch(removeBoard(boardId));
  };

  return (
    <div className="main-content">
      <CreateMenuDropdown
        menuTitle="Создать доску"
        triggerIcon={
          <div className="button-trigger-wrapper">
            <div className="button-name">Создать доску</div>
          </div>
        }
        inputValue={inputValue}
        onInputChange={setInputValue}
        inputPlaceholder="Введите название доски"
        createButtonText="Создать"
        onCreate={handleCreate}
        className="main-component-create-menu"
        showTrelloIcon={true}
      />

      {boards.length > 0 && (
        <div className="boards-container">
          <div className="boards-grid">
            {boards.map(board => (
              <BoardPreview
                key={board.id}
                boardName={board.name}
                background={board.background}
                color={board.color}
                onBoardClick={() => handleBoardClick(board.id)}
                onDeleteClick={(e) => handleDeleteBoard(e, board.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainComponent;