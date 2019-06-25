import {
  CATEGORY_FETCH_READ,
  CATEGORY_FETCH_READ_FAILED,
  CATEGORY_FETCH_READ_SUCCESS,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS
} from "../constants";

export const categories = (
  state = { isLoading: false, isError: false, data: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_FETCH_READ:
      return { isLoading: true, isError: false, data: [] };
    case CATEGORY_FETCH_READ_SUCCESS:
      return { isLoading: false, isError: false, data: action.payload };
    case CATEGORY_FETCH_READ_FAILED:
      return { isLoading: false, isError: true, data: action.payload };
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, data: [...state.data.data, action.payload] }
      };
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, data: state.data.data.filter(item => item.id !== action.payload)}
      };
    default:
      return state;
  }
};
