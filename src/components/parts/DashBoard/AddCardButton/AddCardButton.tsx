import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '../../../base/input/Input';
import Button from '../../../base/button/Button';
import styles from '../../../../styles/pagesStyles/DashBoard/MenuscssPartsList/AddCardButton/AddCardButton.module.scss';
import { addCardToContainer } from '../../../../store/redusers/addButtonReducer/addButtonReducer';
import { addCard } from '../../../../store/redusers/features/slices/cardSlice/cardSlice';
interface AddCardButtonProps {
  containerId: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({ containerId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardContent, setCardContent] = useState('');
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardContent.trim()) {
      const cardId = Date.now().toString();
      
      // Создаем карточку в редюсере cards
      dispatch(addCard({
        id: cardId,
        content: cardContent.trim(),
        containerId: containerId,
        checked: false
      }));
      
      // Добавляем ID карточки в контейнер
      dispatch(addCardToContainer({
        cardId: cardId,
        containerId: containerId
      }));
      
      setCardContent('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setCardContent('');
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCard();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isAdding) {
    return (
      <div className={styles.addCardForm}>
        <Input
          value={cardContent}
          onChange={setCardContent}
          onKeyDown={handleKeyDown}
          placeholder="Введите название карточки"
          autoFocus
          withSearchIcon={false}
        />
        <div className={styles.cardButtons}>
          <Button
            buttonStyle="addList"
            onClick={handleAddCard}
            label="Добавить карточку"
          />
          <Button
            buttonStyle="icon"
            onClick={handleCancel}
            label="×"
          />
        </div>
      </div>
    );
  }

  return (
    <Button
      buttonStyle="addList"
      onClick={() => setIsAdding(true)}
      label="Добавить карточку"
      customClassName={styles.addCardButton}
    />
  );
};