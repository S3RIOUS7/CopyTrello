import React from 'react';
import styles from '../../../../styles/pagesStyles/DashBoard/Dashboard.module.scss';

interface CardProps {
  content: string;
}

export const Card: React.FC<CardProps> = ({ content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {content}
      </div>
    </div>
  );
};