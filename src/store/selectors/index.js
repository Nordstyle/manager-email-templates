import { createSelector } from 'reselect';

const getCategories = (store) => store.categories;
const getMessages = (store) => store.messages;

export const getCategoriesSelector = createSelector(
	getCategories,
	data => data
);

export const getMessagesSelector = createSelector(
	getMessages,
	data => data
);