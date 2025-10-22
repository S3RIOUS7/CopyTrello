import { useEffect, useState, type FC } from "react";
import type { ModalData, ModalProps } from "../../store/types/modalWindowTypes/modalWindowType";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalData } from "../../store/redusers/features/slices/modalWindow/modalWindowSlice";

import Button from "../../components/base/button/Button";
import type { RootState } from "../../store/storage/store";
import styles from '../../styles/pagesStyles/ModalWindow/ModalWindow.module.scss'
import PlusIconSmall from "../../assets/img/icon/PlusIconSmall";
import MarkerIcon from "../../assets/img/icon/MarkerIcon";

import CheckBoxIcon from "../../assets/img/icon/CheckBoxIcon";
import { updateCardCheck } from "../../store/redusers/features/slices/cardSlice/cardSlice";
import DescriptionIcon from "../../assets/img/icon/DescriptionIcon";
import { TextArea } from "../../components/base/textArea/TextArea";
import DatePickerComponent from "../../components/parts/DashBoard/DataPicker/DatePickerComponent";
import CancelIcon from "../../assets/img/icon/CancelIcon";


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

  const [showDatePickerFromButton, setShowDatePickerFromButton] = useState(false);
  const [showDatePickerFromSelectedDate, setShowDatePickerFromSelectedDate] = useState(false);

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

  const handleUpdateModalData = (data: Partial<ModalData>) => {
    const newData = { ...localData, ...data };
    setLocalData(newData);
    dispatch(updateModalData(newData));
  };

  const handleAdd = () => {
    console.log("Добавить clicked");
  };

  const handleLabels = () => {
    console.log("Метки clicked");
  };

  const handleChecklist = () => {
    console.log("Чек-лист clicked");
  };

  const handleDatePickerFromButtonToggle = (isOpen: boolean) => {
    setShowDatePickerFromButton(isOpen);
  };

  const handleDatePickerFromSelectedDateToggle = (isOpen: boolean) => {
    setShowDatePickerFromSelectedDate(isOpen);
  };

  const handleSelectedDateClick = () => {
    setShowDatePickerFromSelectedDate(!showDatePickerFromSelectedDate);
    // Закрываем календарь от кнопки если он открыт
    setShowDatePickerFromButton(false);
  };

  // Функция для удаления выбранной даты
  const handleRemoveDate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    
    const newData = {
      startDate: null,
      endDate: null
    };
    
    setLocalData(prev => ({ ...prev, ...newData }));
    dispatch(updateModalData(newData));
    
    // Закрываем календарь если он открыт
    setShowDatePickerFromSelectedDate(false);
  };

  // Исправленная функция для DatePickerComponent
  const handleDateSelect = (date: Date | null) => {
    handleInputChange('startDate', date);
    // Закрываем оба календаря после выбора даты
    setShowDatePickerFromButton(false);
    setShowDatePickerFromSelectedDate(false);
  };

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
            
            {/* Кнопка "Даты" для первоначального выбора даты */}
            <DatePickerComponent
              localData={localData}
              onDateChange={handleDateSelect}
              onUpdateModalData={handleUpdateModalData}
              onToggle={handleDatePickerFromButtonToggle}
              isOpen={showDatePickerFromButton}
              triggerElement="button"
            />
            
            <Button
              buttonStyle="create"
              onClick={handleChecklist}
              className={styles.actionButton}
            >
              <CheckBoxIcon size={14} />
              <span>Чек-лист</span>
            </Button>
          </div>

          {/* Блок отображения выбранной даты с выпадающим календарем */}
          {localData.startDate && (
            <div className={styles.selectedDateWrapper}>
              <div 
                className={`${styles.selectedDateContainer} ${showDatePickerFromSelectedDate ? styles.active : ''}`}
                onClick={handleSelectedDateClick}
              >
                <span className={styles.selectedDate}>
                  {localData.startDate.toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <button 
                  className={styles.removeDateButton}
                  onClick={handleRemoveDate}
                  aria-label="Удалить дату"
                >
                  <CancelIcon size={14} />
                </button>
              </div>

              {/* Календарь выпадающий из selectedDateContainer */}
              {showDatePickerFromSelectedDate && (
                <div className={styles.datePickerDropdownFromDate}>
                  <DatePickerComponent
                    localData={localData}
                    onDateChange={handleDateSelect}
                    onUpdateModalData={handleUpdateModalData}
                    onToggle={handleDatePickerFromSelectedDateToggle}
                    isOpen={showDatePickerFromSelectedDate}
                    triggerElement="selectedDate"
                  />
                </div>
              )}
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