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
import type { Checklist } from "../../store/types/modalWindowTypes/Checklist/checkList";
import ChecklistComponent from "../../components/parts/DashBoard/CheckList/CheckList";


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
    checklists: [],
  });

  const [showDatePickerFromButton, setShowDatePickerFromButton] = useState(false);
  const [showDatePickerFromSelectedDate, setShowDatePickerFromSelectedDate] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  // Инициализация данных
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
        checklists: initialData.checklists || [],
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

  // Обработчики модального окна
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

  // Обработчики полей ввода
  const handleInputChange = (field: keyof ModalData, value: string | boolean | Date | null | Checklist[]) => {
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

  // Обработчики кнопок действий
  const handleAdd = () => {
    console.log("Добавить clicked");
  };

  const handleLabels = () => {
    console.log("Метки clicked");
  };

  const handleChecklist = () => {
    setShowChecklist(true);
  };

  const handleAddChecklist = (checklistTitle: string) => {
    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title: checklistTitle,
      items: [],
    };
    
    const updatedChecklists = [...(localData.checklists || []), newChecklist];
    handleInputChange('checklists', updatedChecklists);
    setShowChecklist(false);
  };

  const handleCloseChecklist = () => {
    setShowChecklist(false);
  };

  // Обработчики дат
  const handleDatePickerFromButtonToggle = (isOpen: boolean) => {
    setShowDatePickerFromButton(isOpen);
  };

  const handleDatePickerFromSelectedDateToggle = (isOpen: boolean) => {
    setShowDatePickerFromSelectedDate(isOpen);
  };

  const handleSelectedDateClick = () => {
    setShowDatePickerFromSelectedDate(!showDatePickerFromSelectedDate);
    setShowDatePickerFromButton(false);
  };

  const handleRemoveDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newData = {
      startDate: null,
      endDate: null
    };
    
    setLocalData(prev => ({ ...prev, ...newData }));
    dispatch(updateModalData(newData));
    setShowDatePickerFromSelectedDate(false);
  };

  const handleDateSelect = (date: Date | null) => {
    handleInputChange('startDate', date);
    setShowDatePickerFromButton(false);
    setShowDatePickerFromSelectedDate(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.modalOverlay} onClick={handleClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          {/* Заголовок модального окна */}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
          </div>

          {/* Основная секция с чекбоксом и кнопками действий */}
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
           
            {/* Ряд кнопок действий */}
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
              
              {/* Компонент выбора даты */}
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

            {/* Блок отображения выбранной даты */}
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

                {/* Выпадающий календарь для выбранной даты */}
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

            {/* Отображение добавленных чек-листов */}
            {localData.checklists && localData.checklists.length > 0 && (
              <div className={styles.checklistsSection}>
                <h4 className={styles.checklistsTitle}>Чек-листы:</h4>
                {localData.checklists.map(checklist => (
                  <div key={checklist.id} className={styles.checklistItem}>
                    <CheckBoxIcon size={14} />
                    <span className={styles.checklistName}>{checklist.title}</span>
                    <span className={styles.checklistStats}>
                      ({checklist.items.filter(item => item.completed).length}/{checklist.items.length})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Секция описания */}
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
          </div>
        </div>
      </div>

      {/* Компонент добавления чек-листа */}
      <ChecklistComponent
        isOpen={showChecklist}
        onClose={handleCloseChecklist}
        onAddChecklist={handleAddChecklist}
      />
    </>
  );
};

export default ModalWindow;