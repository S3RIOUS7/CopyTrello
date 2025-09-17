import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../../../store/redusers/addButtonReducer/addButtonReducer';
import { Input } from '../../../base/input/Input';
import Button from '../../../base/button/Button';
import styles from '../../../../styles/pagesStyles/DashBoard/MenuscssPartsList/AddCardButton/AddCardButton.module.scss';

interface AddCardButtonProps {
  containerId: string;
}

export const AddCardButton: React.FC<AddCardButtonProps> = ({ containerId }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardContent, setCardContent] = useState('');
  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (cardContent.trim()) {
      dispatch(addCard({
        content: cardContent,
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

  if (isAdding) {
    return (
      <div className={styles.addCardForm}>
        <Input
          value={cardContent}
          onChange={setCardContent}
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