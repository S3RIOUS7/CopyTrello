import { ADD_CONTAINER,  } from "../../types/addButtonTypes/addButtonType";

export const addContainer = (content: string, boardId: string) => ({
  type: ADD_CONTAINER,
  payload: { content, boardId },
});

