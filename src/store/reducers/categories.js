import {
  CATEGORY_FETCH_ALL,
  CATEGORY_FETCH_ALL_FAILED,
  CATEGORY_FETCH_ALL_SUCCESS
} from '../constants'

export const categories = (state = { isLoading: false, isError: false, data: [] }, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_ALL: return ({ isLoading: true, isError: false, data: [] });
    case CATEGORY_FETCH_ALL_SUCCESS: return ({ isLoading: true, isError: false, data: action.payload });
    case CATEGORY_FETCH_ALL_FAILED: return ({ isLoading: false, isError: true, data: action.payload });
    default: return state;
  }
};