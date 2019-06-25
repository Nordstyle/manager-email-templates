import {
	CATEGORY_FETCH_READ,
	CATEGORY_FETCH_READ_FAILED,
	CATEGORY_FETCH_READ_SUCCESS
} from '../constants'

import API from '../../api';

/* FETCH ALL */
const fetchCategoryAllInit = () => ({
	type: CATEGORY_FETCH_READ
});

const fetchCategoryAllSuccess = (data) => ({
	type: CATEGORY_FETCH_READ_FAILED,
	payload: data
});

const fetchCategoryAllFailed = () => ({
	type: CATEGORY_FETCH_READ_SUCCESS
});

export const fetchCategoryAll = (params) => dispatch => {
	dispatch(fetchCategoryAllInit());

	return API.categories.read(params).then(
		response => {
			dispatch(fetchCategoryAllSuccess(response.result));
		},
		error => {
			dispatch(fetchCategoryAllFailed(error));
		}
	);
};