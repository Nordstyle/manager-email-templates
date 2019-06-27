import React from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const CategoriesFields = (props) => {
	const { isRowAction, payload, validateOptions: {titleLength}, classes } = props;
	return (
		<div>
			<DialogContent>
				<TextField
					margin="dense"
					id="title"
					label='Title'
					defaultValue={isRowAction ? payload.title : ""}
					type="text"
					required
					inputProps={{ maxLength: titleLength }}
					className={classes.input}
					fullWidth
				/>
				<TextField
					margin="dense"
					id="parent"
					label="Parent id"
					defaultValue={isRowAction ? payload.parent : ""}
					type="number"
					className={classes.input}
					fullWidth
				/>
			</DialogContent>
		</div>
	)
};

export default CategoriesFields;