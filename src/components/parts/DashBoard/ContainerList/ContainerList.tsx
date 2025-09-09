import React from 'react';
import styles from '../../../../styles/pagesStyles/DashBoard/Dashboard.module.scss';

interface ContainerItem {
  id: string;
  boardId: string;
  content: string;
}

interface ContainersListProps {
  containers: ContainerItem[];
}

export const ContainersList: React.FC<ContainersListProps> = ({ containers }) => {
  return (
    <div className={styles.containersList}>
      {containers.map((container) => (
        <div
          key={container.id}
          className={styles.containerItem}
        >
          <div className={styles.containerContent}>
            {container.content}
          </div>
        </div>
      ))}
    </div>
  );
};