/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from './style';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Tags(props) {
	const classes = useStyles(),
	[arrayDeDatos] = useState(props.list),
	fixedOptions = [arrayDeDatos],      
	[value, setValue] = useState([]);

	return (
		<Grid className={classes.grid}>
			<Autocomplete
				multiple
				id={props.name}
				name={props.name}
				// value={value}
				onChange={(event, newValue) => {
					// setValue([
					//   ...newValue?.filter((option) => fixedOptions.indexOf(option) === -1),
					// ]);
					if(newValue !== null) {
						var event = {
							target: {value:newValue.id, name:props.name}
						}
						props.handleChange(event);
					}          
				}}
				noOptionsText="No encontrado"
				options={arrayDeDatos}
				getOptionLabel={(option) => option.name}
				defaultValue={props.defaultValue||[]}
				renderInput={(params) => (
					<TextField
						{...params}
						id={props.name}
						name={props.name}
						value={props.value}		
						variant="standard"
						label={props.label || ""}
						placeholder={props.placeholder || ""}
						className={classes.textField}
					/>
				)}
			/>   
			{(props.isError) ? <FormHelperText className="Mui-error" id="component-error-text">{props.errorMessages}</FormHelperText> : null }
		</Grid> 
	);
}