import {
	CATEGORY_FETCH_ALL,
	CATEGORY_FETCH_ALL_FAILED,
	CATEGORY_FETCH_ALL_SUCCESS
} from '../constants'

import API from '../../api';

/* FETCH ALL */
const fetchCategoryAllInit = () => ({
	type: CATEGORY_FETCH_ALL
});

const fetchCategoryAllSuccess = (data) => ({
	type: CATEGORY_FETCH_ALL_FAILED,
	payload: data
});

const fetchCategoryAllFailed = () => ({
	type: CATEGORY_FETCH_ALL_SUCCESS
});

export const fetchCategoryAll = (params) => dispatch => {
	dispatch(fetchCategoryAllInit());

	return API.categories.all(params).then(
		response => {
			dispatch(fetchCategoryAllSuccess(response.result));
		},
		error => {
			dispatch(fetchCategoryAllFailed(error));
		}
	);
};