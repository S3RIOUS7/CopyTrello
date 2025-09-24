import { useEffect, useState, type FC } from "react";
import type { ModalData, ModalProps } from "../../store/types/modalWindowTypes/modalWindowType";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalData } from "../../store/redusers/features/slices/modalWindow/modalWindowSlice";
import { Input } from "../../components/base/input/Input";
import Button from "../../components/base/button/Button";
import type { RootState } from "../../store/storage/store";
import styles from '../../styles/pagesStyles/ModalWindow/ModalWindow.module.scss'


const ModalWindow: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onCancel,
  onDelete,
  onEdit,
  initialData,
  title = 'Модальное окно',
}) => {
  const dispatch = useDispatch();
  const modalData = useSelector((state: RootState) => state.modal.data);
  
  const [localData, setLocalData] = useState<ModalData>({
    title: '',
    className: '',
    description: '',
    isChecked: false,
  });

  useEffect(() => {
    if (initialData) {
      setLocalData(prev => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    if (modalData) {
      setLocalData(modalData);
    }
  }, [modalData]);

  const handleClose = () => {
    dispatch(closeModal());
    onClose();
  };

  const handleSave = () => {
    onSave(localData);
    handleClose();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleDelete = () => {
    onDelete?.();
    handleClose();
  };

  const handleEdit = () => {
    onEdit?.();
  };

  const handleInputChange = (field: keyof ModalData, value: string | boolean) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    dispatch(updateModalData(newData));
  };

  // Обработчики для новых кнопок
  const handleAdd = () => {
    console.log("Добавить clicked");
    // Добавьте свою логику здесь
  };

  const handleLabels = () => {
    console.log("Метки clicked");
    // Добавьте свою логику здесь
  };

  const handleDates = () => {
    console.log("Даты clicked");
    // Добавьте свою логику здесь
  };

  const handleChecklist = () => {
    console.log("Чек-лист clicked");
    // Добавьте свою логику здесь
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>

        {/* Класс с чекбоксом и кнопками */}
        <div className={styles.modalSection}>
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={localData.isChecked}
              onChange={(e) => handleInputChange('isChecked', e.target.checked)}
              className={styles.modalCheckbox}
            />
            <label className={styles.checkboxLabel}>{localData.className}</label>
          </div>
         
          {/* Заменяем инпут на 4 кнопки в строке */}
          <div className={styles.buttonsRow}>
            <Button
              buttonStyle="create"
              onClick={handleAdd}
              label="Добавить"
              className={styles.actionButton}
            />
            <Button
              buttonStyle="search"
              onClick={handleLabels}
              label="Метки"
              className={styles.actionButton}
            />
            <Button
              buttonStyle="addCartButton"
              onClick={handleDates}
              label="Даты"
              className={styles.actionButton}
            />
            <Button
              buttonStyle="icon"
              onClick={handleChecklist}
              label="Чек-лист"
              className={styles.actionButton}
            />
          </div>
        </div>

        {/* Описание */}
        <div className={styles.modalSection}>
          <h3 className={styles.sectionTitle}>Описание</h3>
          <Input
            value={localData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Введите описание"
            className={`${styles.modalInput} ${styles.descriptionInput}`}
          />
        </div>

        {/* Кнопки действий */}
        <div className={styles.modalActions}>
          <Button
            buttonStyle="create"
            onClick={handleSave}
            label="Сохранить"
          />
          <Button
            buttonStyle="search"
            onClick={handleCancel}
            label="Отмена"
          />
          {onDelete && (
            <Button
              buttonStyle="addCartButton"
              onClick={handleDelete}
              label="Удалить"
            />
          )}
          {onEdit && (
            <Button
              buttonStyle="icon"
              onClick={handleEdit}
              label="Редактировать"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;