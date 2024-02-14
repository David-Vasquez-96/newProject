import React, { useState } from "react";
import {TextareaAutosize, FormControl, FormHelperText } from '@material-ui/core/';
import { useStyles } from "./style";


export default function FormControlTextAreaAutosize(props) {
	const classes = useStyles();
	const [self, setSelf] = useState(props.this);

	return (
		<>
			{
				// props.showInputControl && (
					<FormControl className={classes.formControl} style={props.minWidth ? { minWidth: props.minWidth } : {minWidth: '100%'}}>
						<TextareaAutosize 
							className={classes.area}
							aria-label="empty textarea"
							placeholder={props.label} 

							error={props.isError}
							key={props.name}
							id={props.name}
							name={props.name}
							autoComplete={props.autoComplete ? "" : "none"}
							value={props.value || ""}
							autoFocus={true}
							onChange={(event) => {
							props.handleChange(event, self);
							}}
							// onKeyPress={
							// props.keyPress
							// }
							disabled={props.disabled}
						/>

						{
							props.isError ? (
								<FormHelperText className="Mui-error" id="component-error-text">
									{props.errorMessages}
								</FormHelperText>
							) : null
						}
					</FormControl>
				// )
			}
		</>
	);
}

FormControlTextAreaAutosize.defaultProps = {
showInputControl: true,
};
