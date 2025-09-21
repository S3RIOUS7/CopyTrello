import React from 'react';
import styles from '../../../../styles/pagesStyles/DashBoard/MenuscssPartsList//Card/Card.module.scss'

interface CardProps {
  content: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export const Card: React.FC<CardProps> = ({ content, checked, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.card} ${checked ? styles.cardCompleted : ''}`}>
      <div className={styles.cardContentWrapper}>
        <label className={styles.checkboxLabel} onClick={handleLabelClick}>
          <input
            type="checkbox"
            checked={checked}
            onChange={handleChange}
            className={styles.checkboxInput}
          />
          <span 
            className={styles.customCheckbox}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </label>
        
        <div 
          className={styles.cardContent}
          onClick={handleLabelClick}
        >
          {checked ? 'Выполнено' : content}
        </div>
      </div>
    </div>
  );
};