import {
  CATEGORY_FETCH_READ,
  CATEGORY_FETCH_READ_FAILED,
  CATEGORY_FETCH_READ_SUCCESS
} from '../constants'

export const categories = (state = { isLoading: false, isError: false, data: [] }, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_READ: return ({ isLoading: true, isError: false, data: [] });
    case CATEGORY_FETCH_READ_SUCCESS: return ({ isLoading: false, isError: false, data: action.payload });
    case CATEGORY_FETCH_READ_FAILED: return ({ isLoading: false, isError: true, data: action.payload });
    default: return state;
  }
};