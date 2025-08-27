import { useState, type FC } from "react";

import { useDispatch } from "react-redux";
import { addContainer } from "../../../../store/redusers/addButtonReducer/addButtonReducer";
import Button from "../../../base/button/Button";
import { Input } from "../../../base/input/Input";
import styles from '../../../../styles/pagesStyles/DashBoard/DashboardParts/addButton/AddButton.module.scss'

interface AddButtonProps {
  boardId?: string;
  className?: string;
}

export const AddButton: FC<AddButtonProps> = ({ boardId, className }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  
  const dispatch = useDispatch();

  const handleAddContainer = (): void => {
    if (inputValue.trim() && boardId) {
      dispatch(addContainer({ content: inputValue.trim(), boardId }));
      setInputValue('');
      setIsEditing(false);
    }
  };

  const handleInputChange = (value: string): void => {
    setInputValue(value);
  };

  const handleCancel = (): void => {
    setInputValue('');
    setIsEditing(false);
  };

  if (!boardId) {
    return null;
  }

  if (!isEditing) {
    return (
      <div className={`${styles.addButton} ${className || ''}`}>
        <Button
          buttonStyle="addCartButton"
          type="button"
          onClick={() => setIsEditing(true)}
          label="Добавить контейнер"
          customClassName={styles.addButton__toggle}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.addButton} ${styles.editing} ${className || ''}`}>
      <div className={styles.addButton__controls}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите содержимое контейнера..."
          className={styles.addButton__input}
          withSearchIcon={false}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddContainer();
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          autoFocus 
        />
        
        <div className={styles.addButton__actions}>
          <Button
            buttonStyle="addCartButton"
            type="button"
            onClick={handleAddContainer}
            label="Добавить"
            disabled={!inputValue.trim()}
            customClassName={styles.addContainerButton}
          />
          <Button
            buttonStyle="addCartButton"
            type="button"
            onClick={handleCancel}
            label="Отмена"
            customClassName={styles.cancelButton}
          />
        </div>
      </div>
    </div>
  );
};

export default AddButton;