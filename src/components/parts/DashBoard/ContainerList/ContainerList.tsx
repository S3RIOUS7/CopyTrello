import React from 'react';
import styles from "../../../../styles/pagesStyles/DashBoard/MenuscssPartsList/ContainerItem/ContainerItem.module.scss";
import { ContainerItem } from '../ContainerItem/ContainerItem';
import { useDispatch } from 'react-redux';
import { updateCardCheck } from '../../../../store/redusers/features/slices/cardSlice/cardSlice';
import { useModal } from '../../../../utils/hooks/useModal/useModal';


export interface ContainerItemType {
  id: string;
  boardId: string;
  content: string;
  cards: Array<{
    id: string;
    content: string;
    containerId: string;
    checked: boolean;
  }>;
}

interface ContainersListProps {
  containers: ContainerItemType[];
}

export const ContainersList: React.FC<ContainersListProps> = ({ containers }) => {
  const dispatch = useDispatch();
  const { showModal } = useModal(); // Используем хук модального окна

  const handleCardCheck = (cardId: string, checked: boolean) => {
    dispatch(updateCardCheck({ cardId, checked }));
  };

  const handleCardEdit = (cardId: string) => {
    // Находим карточку по ID
    const card = containers
      .flatMap(container => container.cards)
      .find(card => card.id === cardId);

    if (card) {
      // Открываем модальное окно с данными карточки
      showModal({
        title: 'Редактировать карточку',
        className: card.content,
        description:'', // Или другое поле для описания
        isChecked: card.checked
      });
    }
  };

  return (
    <div className={styles.containersList}>
      {containers.map((container) => (
        <ContainerItem
          key={container.id}
          container={container}
          onCardCheck={handleCardCheck}
          onCardEdit={handleCardEdit} // Передаем функцию редактирования
        />
      ))}
    </div>
  );
};