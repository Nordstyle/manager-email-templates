import {
  MESSAGES_FETCH_READ,
  MESSAGES_FETCH_READ_FAILED,
  MESSAGES_FETCH_READ_SUCCESS,
  MESSAGES_CREATE_SUCCESS,
  MESSAGES_DELETE_SUCCESS,
  MESSAGES_UPDATE_SUCCESS
} from "../constants";

export const messages = (
  state = { isLoading: false, isError: false, data: [] },
  action
) => {
  switch (action.type) {
    case MESSAGES_FETCH_READ:
      return { isLoading: true, isError: false, data: [] };
    case MESSAGES_FETCH_READ_SUCCESS:
      return { isLoading: false, isError: false, data: action.payload };
    case MESSAGES_FETCH_READ_FAILED:
      return { isLoading: false, isError: true, data: action.payload };
    case MESSAGES_CREATE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, data: [...state.data.data, action.payload] }
      };
    case MESSAGES_DELETE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, data: state.data.data.filter(item => item.id !== action.payload) }
      };
    case MESSAGES_UPDATE_SUCCESS:
      const { id, title, category } = action.payload;
      return {
        ...state,
        data: { ...state.data, data: state.data.data.map(item => {
            if (item.id === id) return { id, title, category: category ? { id: category } : null };
            return item;
          })}
      };
    default:
      return state;
  }
};
