export interface ModalData {
  title: string;
  className: string;
  description: string;
  isChecked: boolean;
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