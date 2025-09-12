export interface Card {
  id: string;
  content: string;
  containerId: string;
}

export interface Container {
  id: string;
  content: string;
  boardId: string;
  cards: Card[]; // Добавляем массив карточек
}

export interface ContainerState {
  containers: Container[];
}

export const ADD_CONTAINER = 'ADD_CONTAINER';
export const ADD_CARD = 'ADD_CARD';

interface AddContainerAction {
  type: typeof ADD_CONTAINER;
  payload: {
    content: string;
    boardId: string;
  };
}

interface AddCardAction {
  type: typeof ADD_CARD;
  payload: {
    content: string;
    containerId: string;
  };
}

export type ContainerActionTypes = AddContainerAction | AddCardAction;