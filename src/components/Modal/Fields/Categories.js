import React, {useState} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const CategoriesFields = (props) => {
	const {possibleCategories, isRowAction, payload, validateOptions: {titleLength}, classes } = props;
	const [values, setValues] = useState({
		parent: isRowAction && payload.parent ? payload.parent : ''
	});
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
					<InputLabel htmlFor="age-simple">Parent id</InputLabel>
					<Select
						value={values.parent}
						onChange={e => handleChange(e)}
						inputProps={{
							name: 'parent',
							id: 'parent',
						}}
					>
						{possibleCategories.map(item => (
							<MenuItem key={item} value={item}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
			</DialogContent>
		</div>
	)
};

export default CategoriesFields;