import React from 'react';
import styles from '../../../../styles/pagesStyles/DashBoard/MenuscssPartsList//Card/Card.module.scss'

interface CardProps {
  content: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onEdit?: () => void; // Добавляем пропс для редактирования
}

export const Card: React.FC<CardProps> = ({ content, checked, onChange, onEdit }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  const handleLabelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(); // Вызываем функцию редактирования при клике на содержимое
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
          onClick={handleContentClick} // Добавляем обработчик клика
          style={{ cursor: onEdit ? 'pointer' : 'default' }} // Меняем курсор при наличии onEdit
        >
          {checked ? 'Выполнено' : content}
        </div>
      </div>
    </div>
  );
};