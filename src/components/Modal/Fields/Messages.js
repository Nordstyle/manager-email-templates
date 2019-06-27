import React, {useState} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const MessagesFields = (props) => {
	const { possibleCategories, isRowAction, payload, validateOptions: {titleLength}, classes } = props;
	console.log(payload)
	const [values, setValues] = useState({
		category: isRowAction && payload.category ? payload.category : ''
	});
	console.log(values,'values')
	const handleChange = (event) => {
		setValues(oldValues => ({
			...oldValues,
			[event.target.name]: event.target.value,
		}));
	};
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
				<FormControl className={classes.input}>
					<InputLabel htmlFor="age-simple">Category ID</InputLabel>
					<Select
						value={values.category}
						onChange={e => handleChange(e)}
						inputProps={{
							name: 'category',
							id: 'category',
						}}
					>
						{possibleCategories.map(item => (
							<MenuItem key={item} value={item}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
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