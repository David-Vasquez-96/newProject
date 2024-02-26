import React from 'react';
import {IconButton, Tooltip} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, makeStyles } from "@material-ui/core/styles";

function CustomToolTip({title, size, color, handleFunction, children, style, icon, colorTooltip}) {
	const useStyles = makeStyles(() => ({
		iconButton: {
			color: '#205690',
		}
	}));

	const theme = createMuiTheme({
		overrides: {
			MuiTooltip: {
			tooltip: {
				fontSize: "1rem",
				color: "white",
				backgroundColor: "#205690",
				borderRadius: 10,
				padding: '1rem',
				fontWeight: 'bold',
				textTransform: 'uppercase',
				textAlign: 'center'
			}
			}
		}
	});

	const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title={title}>
          <IconButton size={size} className={(style) ? style : classes.iconButton} onClick={handleFunction}>{icon}</IconButton>
      </Tooltip>
    </MuiThemeProvider>

  );
}

CustomToolTip.defaultProps = {
  size: "medium",
  handleFunction: () => {}
}

export default CustomToolTip;