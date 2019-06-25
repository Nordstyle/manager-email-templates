import { createSelector } from 'reselect';

const getCategories = (store) => store.categories;

export const getCategoriesSelector = createSelector(
	getCategories,
	data => data
);

