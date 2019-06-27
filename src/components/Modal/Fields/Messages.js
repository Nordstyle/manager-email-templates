import React from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const MessagesFields = (props) => {
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
					id="category"
					label="Category ID"
					defaultValue={isRowAction ? payload.category : ""}
					type="number"
					className={classes.input}
					fullWidth
				/>
				<TextField
					id="body"
					label="Body"
					defaultValue={isRowAction ? payload.body : ""}
					type="text"
					className={classes.input}
					multiline
					rowsMax="4"
					variant="outlined"
					fullWidth
				/>
			</DialogContent>
		</div>
	)
};

export default MessagesFields;