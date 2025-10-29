import { useState, type FC } from "react";
import Button from "../../../base/button/Button";
import { Input } from "../../../base/input/Input";

import styles from '../../../../styles/baseComponentsStyles/CheckList/checkList.module.scss';
import type { ChecklistProps } from "../../../../store/types/modalWindowTypes/Checklist/checkList";

const ChecklistComponent: FC<ChecklistProps> = ({
  isOpen,
  onClose,
  onAddChecklist,
}) => {
  const [checklistTitle, setChecklistTitle] = useState('');

  const handleAddChecklist = () => {
    if (checklistTitle.trim()) {
      onAddChecklist(checklistTitle.trim());
      setChecklistTitle('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddChecklist();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.checklistOverlay} onClick={onClose}>
      <div className={styles.checklistContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.checklistHeader}>
          <h3 className={styles.checklistTitle}>Добавление списка задач</h3>
        </div>
        
        <div className={styles.checklistBody}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Название чек-листа</label>
            <Input
              value={checklistTitle}
              onChange={setChecklistTitle}
              placeholder="Введите название чек-листа"
              className={styles.checklistInput}
              autofocus={true}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>

        <div className={styles.checklistActions}>
          <Button
            buttonStyle="create"
            onClick={handleAddChecklist}
            disabled={!checklistTitle.trim()}
            className={styles.addButton}
          >
            Добавить
          </Button>
          <Button
            buttonStyle="search"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistComponent;