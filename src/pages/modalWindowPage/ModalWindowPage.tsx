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
      const newData = {
        title: initialData.title || '',
        className: initialData.className || '',
        description: initialData.description || '',
        isChecked: initialData.isChecked || false,
        startDate: initialData.startDate instanceof Date ? initialData.startDate : null,
        endDate: initialData.endDate instanceof Date ? initialData.endDate : null,
        cardId: initialData.cardId,
      };
      setLocalData(newData);
    }
  }, [initialData]);

  useEffect(() => {
    if (modalData) {
      setLocalData(prev => ({
        ...prev,
        ...modalData,
        startDate: modalData.startDate instanceof Date ? modalData.startDate : null,
        endDate: modalData.endDate instanceof Date ? modalData.endDate : null,
      }));
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

  const handleInputChange = (field: keyof ModalData, value: string | boolean | Date | null) => {
    let processedValue = value;
    
    // Если это дата, убедимся что это объект Date или null
    if (field === 'startDate' || field === 'endDate') {
      processedValue = value instanceof Date ? value : null;
    }
    
    const newData = { 
      ...localData, 
      [field]: processedValue 
    };
    
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

  // Выбор одной даты вместо промежутка
  const handleDateChange = (date: Date | null) => {
    console.log('Date selected:', date);
    
    const newData = {
      ...localData,
      startDate: date,
      endDate: null // Очищаем конечную дату при выборе одной даты
    };
    
    setLocalData(newData);
    dispatch(updateModalData(newData));
    
    // Автоматически закрываем календарь после выбора даты
    setShowDatePicker(false);
  };

  const formatDateForDisplay = (date: Date | null | undefined): string => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const hasDate = localData.startDate;

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

          {/* Блок отображения выбранной даты - только сама дата */}
          {hasDate && (
            <div className={styles.selectedDateContainer}>
              <span className={styles.selectedDate}>
                {formatDateForDisplay(localData.startDate)}
              </span>
            </div>
          )}

          {showDatePicker && (
            <div className={styles.datePickerContainer}>
              <DatePicker
                selected={localData.startDate}
                onChange={handleDateChange}
                inline
                monthsShown={1}
                calendarStartDay={1}
                locale="ru"
                className={styles.datePicker}
                minDate={new Date()}
                
                shouldCloseOnSelect={true} // Закрываем календарь после выбора
              />
            </div>
          )}
        </div>

        <div className={styles.modalSection}>
          <h3 className={styles.sectionTitle}>
            <DescriptionIcon size={18} color="#42526E" className={styles.icon} />
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
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;