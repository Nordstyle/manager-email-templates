import {
	CATEGORY_FETCH_READ,
	CATEGORY_FETCH_READ_FAILED,
	CATEGORY_FETCH_READ_SUCCESS,
	CATEGORY_CREATE_FAILED,
	CATEGORY_CREATE_INIT,
	CATEGORY_CREATE_SUCCESS,
	CATEGORY_DELETE_FAILED,
	CATEGORY_DELETE_INIT,
	CATEGORY_DELETE_SUCCESS,
	CATEGORY_UPDATE_FAILED,
	CATEGORY_UPDATE_INIT,
	CATEGORY_UPDATE_SUCCESS
} from "../constants";

import API from "../../api";

/* FETCH ALL */
const fetchCategoryAllInit = () => ({
	type: CATEGORY_FETCH_READ
});

const fetchCategoryAllSuccess = data => ({
	type: CATEGORY_FETCH_READ_FAILED,
	payload: data
});

const fetchCategoryAllFailed = () => ({
	type: CATEGORY_FETCH_READ_SUCCESS
});

export const fetchCategoryAll = params => dispatch => {
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

/* CREATE */
const categoryCreateInit = () => ({
	type: CATEGORY_CREATE_INIT
});

const categoryCreateSuccess = (data, title, parent) => ({
	type: CATEGORY_CREATE_SUCCESS,
	payload: {
		id: data["Primary key"]["id"],
		title,
		parent: parent ? { id: parent } : null
	}
});

const categoryCreateFailed = () => ({
	type: CATEGORY_CREATE_FAILED
});

export const categoryCreate = params => dispatch => {
	dispatch(categoryCreateInit());

	return API.categories.create(params).then(
		response => {
			const { title, parent } = params;
			dispatch(categoryCreateSuccess(response.result, title, parent));
		},
		error => {
			dispatch(categoryCreateFailed(error));
		}
	);
};

/* DELETE */
const categoryDeleteInit = () => ({
	type: CATEGORY_DELETE_INIT
});

const categoryDeleteSuccess = id => ({
	type: CATEGORY_DELETE_SUCCESS,
	payload: id
});

const categoryDeleteFailed = () => ({
	type: CATEGORY_DELETE_FAILED
});

export const categoryDelete = params => dispatch => {
	dispatch(categoryDeleteInit());

	return API.categories.delete(params).then(
		() => {
			dispatch(categoryDeleteSuccess(params.id));
		},
		error => {
			dispatch(categoryDeleteFailed(error));
		}
	);
};

/* UPDATE */
const categoryUpdateInit = () => ({
	type: CATEGORY_UPDATE_INIT
});

const categoryUpdateSuccess = id => ({
	type: CATEGORY_UPDATE_SUCCESS,
	payload: id
});

const categoryUpdateFailed = () => ({
	type: CATEGORY_UPDATE_FAILED
});

export const categoryUpdate = params => dispatch => {
	dispatch(categoryUpdateInit());

	return API.categories.update(params).then(
		() => {
			const { id, title, parent } = params;
			dispatch(categoryUpdateSuccess({ id, title, parent }));
		},
		error => {
			dispatch(categoryUpdateFailed(error));
		}
	);
};
