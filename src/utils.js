export const createDataCategory = (id, title, parent = null, messages = [], children = []) => {
	return {
		id,
		title,
		parent: parent ? parent.id : null,
		messages: messages ? messages.length : 0,
		children: children ? children.length : 0
	}
};

export const desc = (a, b, orderBy) => {
	let firstArg, secondArg, orderArg;
	if (orderBy === "parent") {
		firstArg = a.parent ? [a.parent.id] : [null];
		secondArg = b.parent ? [b.parent.id] : [null];
		orderArg = 0;
	} else {
		firstArg = a;
		secondArg = b;
		orderArg = orderBy;
	}
	if (secondArg[orderArg] < firstArg[orderArg]) {
		return -1;
	}
	if (secondArg[orderArg] > firstArg[orderArg]) {
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
