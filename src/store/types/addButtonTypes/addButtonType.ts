export interface Container {
  id: string;
  content: string;
  boardId: string;
}

export interface ContainerState {
  containers: Container[];
}

export const ADD_CONTAINER = 'ADD_CONTAINER';

interface AddContainerAction {
  type: typeof ADD_CONTAINER;
  payload: {
    content: string;
    boardId: string;
  };
}

export type ContainerActionTypes = AddContainerAction;