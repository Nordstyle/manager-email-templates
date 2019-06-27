export const createNormalizeDataCategory = (id, title, parent = null, messages, children) => {
	return {
		id,
		title,
		parent: parent ? parent.id : null,
		messages: messages ? (messages.length > 0 ? messages.length : null) : null,
		children: children ? (children.length > 0 ? children.length : null) : null
	}
};

export const createNormalizeDataMessages = (id, title, body, category) => {
	return {
		id,
		title,
		body: body ? body : null,
		category: category ? category.id : null
	}
};

export const desc = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

export const stableSort = (array, cmp) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
};

export const getSorting = (order, orderBy) => {
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
};
