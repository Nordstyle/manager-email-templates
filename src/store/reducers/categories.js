import {
  CATEGORY_FETCH_READ,
  CATEGORY_FETCH_READ_FAILED,
  CATEGORY_FETCH_READ_SUCCESS,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_UPDATE_SUCCESS, CATEGORY_GET_ALL_SUCCESS
} from "../constants";

export const categories = (
  state = { isLoading: false, isError: false, data: {}, allCategories: []},
  action
) => {
  switch (action.type) {
    case CATEGORY_FETCH_READ:
      return { ...state, isLoading: true, isError: false, data: {} };
    case CATEGORY_FETCH_READ_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case CATEGORY_FETCH_READ_FAILED:
      return { ...state, isLoading: false, isError: true, data: action.payload };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, count: state.data.count++, data: [...state.data.data, action.payload] }
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, count: state.data.count--, data: state.data.data.filter(item => item.id !== action.payload) }
      };
    case CATEGORY_UPDATE_SUCCESS:
      const { id, title, parent } = action.payload;
      return {
        ...state,
        data: { ...state.data, data: state.data.data.map(item => {
            if (item.id === id) return { id, title, parent: parent ? { id: parent } : null };
            return item;
          })}
      };
    case CATEGORY_GET_ALL_SUCCESS:
      return {
        ...state,
        allCategories: action.payload.data.map(item => item.id)
      };
    default:
      return state;
  }
};
