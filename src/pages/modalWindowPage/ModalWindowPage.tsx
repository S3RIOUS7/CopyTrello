import { useEffect, useState, type FC } from "react";
import type { ModalData, ModalProps } from "../../store/types/modalWindowTypes/modalWindowType";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalData } from "../../store/redusers/features/slices/modalWindow/modalWindowSlice";

import Button from "../../components/base/button/Button";
import type { RootState } from "../../store/storage/store";
import styles from '../../styles/pagesStyles/ModalWindow/ModalWindow.module.scss'
import PlusIconSmall from "../../assets/img/icon/PlusIconSmall";
import MarkerIcon from "../../assets/img/icon/MarkerIcon";
import ClockIcon from "../../assets/img/icon/ClockIcon";
import CheckBoxIcon from "../../assets/img/icon/CheckBoxIcon";
import { updateCardCheck } from "../../store/redusers/features/slices/cardSlice/cardSlice";
import DescriptionIcon from "../../assets/img/icon/DescriptionIcon";
import { TextArea } from "../../components/base/textArea/TextArea";
import DatePicker from "react-datepicker";

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
    startDate: null,
    endDate: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setLocalData(prev => ({
        ...prev,
        ...initialData,
        startDate: initialData.startDate || null,
        endDate: initialData.endDate || null,
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

  const handleInputChange = (field: keyof ModalData, value: string | boolean | Date | null) => {
    const newData = { ...localData, [field]: value };
    setLocalData(newData);
    dispatch(updateModalData(newData));

    if (field === 'isChecked' && initialData?.cardId) {
      dispatch(updateCardCheck({ 
        cardId: initialData.cardId, 
        checked: value as boolean 
      }));
    }
  };

  const handleAdd = () => {
    console.log("Добавить clicked");
  };

  const handleLabels = () => {
    console.log("Метки clicked");
  };

  const handleDates = () => {
    console.log("Даты clicked");
    setShowDatePicker(prev => !prev);
  };

  const handleChecklist = () => {
    console.log("Чек-лист clicked");
  };

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    handleInputChange('startDate', start);
    handleInputChange('endDate', end);
  };

  const formatDateRange = () => {
    if (!localData.startDate) return "Выберите даты";
    
    const start = localData.startDate.toLocaleDateString('ru-RU');
    
    if (!localData.endDate) {
      return start;
    }
    
    const end = localData.endDate.toLocaleDateString('ru-RU');
    
    return localData.startDate.getTime() !== localData.endDate.getTime()
      ? `${start} - ${end}`
      : start;
  };

  // Функция handleClearDates больше не нужна и может быть удалена

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>

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
         
          <div className={styles.buttonsRow}>
            <Button
              buttonStyle="create"
              onClick={handleAdd}
              className={styles.actionButton}
            >
              <PlusIconSmall size={14} />
              <span>Добавить</span>
            </Button>
            <Button
              buttonStyle="create"
              onClick={handleLabels}
              className={styles.actionButton}
            >
              <MarkerIcon size={14} />
              <span>Метки</span>
            </Button>
            <Button
              buttonStyle="create"
              onClick={handleDates}
              className={`${styles.actionButton} ${showDatePicker ? styles.active : ''}`}
            >
              <ClockIcon size={14} />
              <span>Даты</span>
            </Button>
            <Button
              buttonStyle="create"
              onClick={handleChecklist}
              className={styles.actionButton}
            >
              <CheckBoxIcon size={14} />
              <span>Чек-лист</span>
            </Button>
          </div>

          {showDatePicker && (
            <div className={styles.datePickerContainer}>
              <div className={styles.datePickerHeader}>
                <span className={styles.dateRangeText}>
                  {formatDateRange()}
                </span>
              </div>
              <DatePicker
               selected={localData.startDate}
                onChange={handleDateChange}
                startDate={localData.startDate}
                endDate={localData.endDate}
                selectsRange
                inline
                monthsShown={1}
                calendarStartDay={1}
                locale="ru"
                className={styles.datePicker}
             
                minDate={new Date()}

              />
              <div className={styles.datePickerActions}>
                {/* Кнопка "Очистить" удалена отсюда */}
                <Button
                  buttonStyle="search"
                  onClick={() => setShowDatePicker(false)}
                  label="Готово"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalSection}>
          <h3 className={styles.sectionTitle}>
            <DescriptionIcon size={20} color="#42526E" className={styles.icon} />
            Описание
          </h3>
          <TextArea
            value={localData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Введите описание"
            className={`${styles.modalTextArea} ${styles.descriptionTextArea}`}
            rows={4}
            autoResize={true}
          />
        </div>

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