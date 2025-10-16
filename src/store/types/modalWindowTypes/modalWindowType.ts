export interface ModalData {
  title: string;
  className: string;
  description: string;
  isChecked: boolean;
  cardId?: string;
  startDate?: Date | null; // Разрешаем null
  endDate?: Date | null;   // Разрешаем null
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ModalData) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  initialData?: Partial<ModalData>;
  title?: string;
}