import React from 'react';
import { Card } from '../Card/Card';
import { AddCardButton } from '../AddCardButton/AddCardButton';
import styles from '../../../../styles/pagesStyles/DashBoard/Dashboard.module.scss';

interface ContainerItemProps {
  container: {
    id: string;
    content: string;
    boardId: string;
    cards: Array<{
      id: string;
      content: string;
      containerId: string;
    }>;
  };
}

export const ContainerItem: React.FC<ContainerItemProps> = ({ container }) => {
  return (
    <div className={styles.containerItem}>
      <div className={styles.containerHeader}>
        <h3 className={styles.containerTitle}>{container.content}</h3>
      </div>
      
      <div className={styles.cardsList}>
        {container.cards.map((card) => (
          <Card key={card.id} content={card.content} />
        ))}
      </div>
      
      <AddCardButton containerId={container.id} />
    </div>
  );
};