import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { type FC } from "react";

import styles from '../../../../styles/pagesStyles/ModalWindow/ModalWindow.module.scss'
import type { ModalData } from "../../../../store/types/modalWindowTypes/modalWindowType";
import Button from "../../../base/button/Button";
import ClockIcon from "../../../../assets/img/icon/ClockIcon";
import { ArrowLeftIcon } from "../../../../assets/img/icon/ArrowLeftMonth";
import { ArrowRightIcon } from "../../../../assets/img/icon/ArrowRightMonth";

interface DatePickerComponentProps {
  localData: ModalData;
  onDateChange: (date: Date | null) => void;
  onUpdateModalData: (data: Partial<ModalData>) => void;
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
  triggerElement: 'button' | 'selectedDate';
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  localData,
  onDateChange,
  onUpdateModalData,
  onToggle,
  isOpen,
  triggerElement,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    localData.startDate instanceof Date ? new Date(localData.startDate) : new Date()
  );
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Выбор одной даты вместо промежутка
  const handleDateChange = (date: Date | null) => {
    console.log('Date selected:', date);
    
    const newData = {
      startDate: date,
      endDate: null // Очищаем конечную дату при выборе одной даты
    };
    
    onDateChange(date);
    onUpdateModalData(newData);
    
    // Автоматически закрываем календарь после выбора даты
    onToggle(false);
  };

  const formatMonthForDisplay = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });
  };

  // Рендер только календаря (для выпадающего меню из selectedDate)
  if (triggerElement === 'selectedDate') {
    return (
      <div className={styles.datePicker} ref={datePickerRef}>
        <DatePicker
          selected={localData.startDate instanceof Date ? localData.startDate : null}
          onChange={handleDateChange}
          inline
          monthsShown={1}
          calendarStartDay={1}
          locale="ru"
          className={styles.datePicker}
          minDate={new Date()}
          shouldCloseOnSelect={true}
          // Управление отображаемым месяцем
          openToDate={currentMonth}
          onMonthChange={setCurrentMonth}
          // Кастомный заголовок с кнопками переключения месяцев
          renderCustomHeader={({
            monthDate,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div className={styles.customHeader}>
              <button
                onClick={decreaseMonth}
                className={styles.monthNavButton}
                aria-label="Предыдущий месяц"
                type="button"
              >
                <ArrowLeftIcon size={14} />
              </button>
              
              <h2 className={styles.currentMonth}>
                {formatMonthForDisplay(monthDate)}
              </h2>
              
              <button
                onClick={increaseMonth}
                className={styles.monthNavButton}
                aria-label="Следующий месяц"
                type="button"
              >
                <ArrowRightIcon size={14} />
              </button>
            </div>
          )}
        />
      </div>
    );
  }

  // Рендер с кнопкой "Даты" (для первоначального выбора)
  const handleDatesClick = () => {
    const newState = !isOpen;
    onToggle(newState);
    console.log("Даты clicked", newState);
  };

  return (
    <div className={styles.datePickerWrapper} ref={datePickerRef}>
      <Button
        buttonStyle="create"
        onClick={handleDatesClick}
        className={`${styles.actionButton} ${isOpen ? styles.active : ''}`}
      >
        <ClockIcon size={14} />
        <span>Даты</span>
      </Button>

      {isOpen && (
        <div className={styles.datePickerDropdown}>
          <DatePicker
            selected={localData.startDate instanceof Date ? localData.startDate : null}
            onChange={handleDateChange}
            inline
            monthsShown={1}
            calendarStartDay={1}
            locale="ru"
            className={styles.datePicker}
            minDate={new Date()}
            shouldCloseOnSelect={true}
            // Управление отображаемым месяцем
            openToDate={currentMonth}
            onMonthChange={setCurrentMonth}
            // Кастомный заголовок с кнопками переключения месяцев
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className={styles.customHeader}>
                <button
                  onClick={decreaseMonth}
                  className={styles.monthNavButton}
                  aria-label="Предыдущий месяц"
                  type="button"
                >
                  <ArrowLeftIcon size={14} />
                </button>
                
                <h2 className={styles.currentMonth}>
                  {formatMonthForDisplay(monthDate)}
                </h2>
                
                <button
                  onClick={increaseMonth}
                  className={styles.monthNavButton}
                  aria-label="Следующий месяц"
                  type="button"
                >
                  <ArrowRightIcon size={14} />
                </button>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;