import { useEffect, useState, type FC } from "react";
import type { ModalData, ModalProps } from "../../store/types/modalWindowTypes/modalWindowType";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, updateModalData } from "../../store/redusers/features/slices/modalWindow/modalWindowSlice";
import { Input } from "../../components/base/input/Input";
import Button from "../../components/base/button/Button";
import type { RootState } from "../../store/storage/store";



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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
        </div>

        {/* Класс с чекбоксом */}
        <div className="modal-section">
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={localData.isChecked}
              onChange={(e) => handleInputChange('isChecked', e.target.checked)}
              className="modal-checkbox"
            />
            <label className="checkbox-label">{localData.className}</label>
          </div>
          <Input
            value={localData.className}
            onChange={(value) => handleInputChange('className', value)}
            placeholder="Введите название класса"
            className="modal-input"
          />
        </div>

        {/* Описание */}
        <div className="modal-section">
          <h3 className="section-title">Описание</h3>
          <Input
            value={localData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Введите описание"
            className="modal-input description-input"
          />
        </div>

        {/* Кнопки */}
        <div className="modal-actions">
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

export default  ModalWindow;