import React from 'react';
import { Card } from '../Card/Card';
import { AddCardButton } from '../AddCardButton/AddCardButton';
import styles from '../../../../styles/pagesStyles/DashBoard/MenuscssPartsList//ContainerItem/ContainerItem.module.scss';

interface ContainerItemProps {
  container: {
    id: string;
    content: string;
    boardId: string;
    cards: Array<{
      id: string;
      content: string;
      containerId: string;
      checked: boolean;
    }>;
  };
  onCardCheck?: (cardId: string, checked: boolean) => void;
  onCardEdit?: (cardId: string) => void; // Добавляем пропс для редактирования карточки
}

export const ContainerItem: React.FC<ContainerItemProps> = ({ 
  container, 
  onCardCheck,
  onCardEdit 
}) => {
  const handleCardCheck = (cardId: string, checked: boolean) => {
    onCardCheck?.(cardId, checked);
  };

  const handleCardEdit = (cardId: string) => {
    onCardEdit?.(cardId);
  };

  return (
    <div className={styles.containerItem}>
      <div className={styles.containerHeader}>
        <h3 className={styles.containerTitle}>{container.content}</h3>
      </div>
      
      <div className={styles.cardsList}>
        {container.cards.map((card) => (
          <Card 
            key={card.id} 
            content={card.content}
            checked={card.checked}
            onChange={(checked) => handleCardCheck(card.id, checked)}
            onEdit={() => handleCardEdit(card.id)} // Передаем функцию редактирования
          />
        ))}
      </div>
      
      <AddCardButton containerId={container.id} />
    </div>
  );
};