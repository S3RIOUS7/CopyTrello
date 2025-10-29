export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChecklist: (title: string) => void;
}