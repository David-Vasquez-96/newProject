import React from 'react';
import {Dialog, CircularProgress} from '@material-ui/core/';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function AlertDialog(props) {

	const logo="/assets/loading2.gif";

	return (
		<div>       
			<Dialog open={props.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
				<DialogContent>
					{/* <img src={logo} alt="loading..." /> */}
					<div style={{textAlign: 'center'}}>
						<CircularProgress />
					</div>
					<DialogContentText id="alert-dialog-description" style={{color: 'black'}}>
						<strong>{props.text}</strong>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}
