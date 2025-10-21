import { useState } from "react";
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
  onDateChange: (field: keyof ModalData, value: Date | null) => void;
  onUpdateModalData: (data: Partial<ModalData>) => void;
  onToggle: (isOpen: boolean) => void;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  localData,
  onDateChange,
  onUpdateModalData,
  onToggle,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    localData.startDate instanceof Date ? new Date(localData.startDate) : new Date()
  );

  const handleDates = () => {
    const newState = !showDatePicker;
    setShowDatePicker(newState);
    onToggle(newState);
    console.log("Даты clicked", newState);
  };

  // Выбор одной даты вместо промежутка
  const handleDateChange = (date: Date | null) => {
    console.log('Date selected:', date);
    
    const newData = {
      startDate: date,
      endDate: null // Очищаем конечную дату при выборе одной даты
    };
    
    onDateChange('startDate', date);
    onUpdateModalData(newData);
    
    // Автоматически закрываем календарь после выбора даты
    setShowDatePicker(false);
    onToggle(false);
  };

  const formatMonthForDisplay = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.datePickerWrapper}>
      <Button
        buttonStyle="create"
        onClick={handleDates}
        className={`${styles.actionButton} ${showDatePicker ? styles.active : ''}`}
      >
        <ClockIcon size={14} />
        <span>Даты</span>
      </Button>

      {showDatePicker && (
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
                <Button
                  buttonStyle="search"
                  onClick={decreaseMonth}
                  className={styles.monthNavButton}
                  aria-label="Предыдущий месяц"
                >
                  <ArrowLeftIcon size={14} />
                </Button>
                
                <h2 className={styles.currentMonth}>
                  {formatMonthForDisplay(monthDate)}
                </h2>
                
                <Button
                  buttonStyle="search"
                  onClick={increaseMonth}
                  className={styles.monthNavButton}
                  aria-label="Следующий месяц"
                >
                  <ArrowRightIcon size={14} />
                </Button>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default DatePickerComponent;