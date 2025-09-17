import React from 'react';
import styles from "../../../../styles/pagesStyles/DashBoard/MenuscssPartsList/ContainerItem/ContainerItem.module.scss";
import { ContainerItem } from '../ContainerItem/ContainerItem';

interface ContainerItemType {
  id: string;
  boardId: string;
  content: string;
  cards: Array<{
    id: string;
    content: string;
    containerId: string;
  }>;
}

interface ContainersListProps {
  containers: ContainerItemType[];
}

export const ContainersList: React.FC<ContainersListProps> = ({ containers }) => {
  return (
    <div className={styles.containersList}>
      {containers.map((container) => (
        <ContainerItem
          key={container.id}
          container={container}
        />
      ))}
    </div>
  );
};