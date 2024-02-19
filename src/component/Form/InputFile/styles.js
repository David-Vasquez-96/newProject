import { makeStyles } from '@material-ui/core/styles';

export  const useStyles = props => makeStyles(theme => ({
    rootFile: {
        width: (props.fileWidth) ? '25%' : null,
        // width: '25%',
        minWidth: 300,
        marginTop:'1%',
        marginBottom: 20,
        marginLeft: '10px',
        marginRight: '10px',
        border: '1px solid #d4d8c1',
        borderRadius: '5px',
        padding: '10px',
        // paddingRight: theme.spacing(2),
        // '@media (max-width: 768px)': {
        //     width: '100%'
        // }
    },
    rootFileWithWidth: {
        minWidth: 300,
        width: '100%',
        display: "flex",
		alignItems: "center",
        justifyContent: 'space-between',
        paddingRight: theme.spacing(2),
        marginTop: 20,
        '@media (max-width:768px)':{ //ipad
            paddingRight: 0,
            display: "block",
            marginTop: 30,
		},
    },
    containerInput : {
        // paddingRight: theme.spacing(2),
        // width: '85%',
        '@media (max-width:768px)':{ //ipad
            width: '100%',
		},
    },
    containerImg : {
        width: '10%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
	imageFile: {
        width: 75,
        height: 75,
		'@media (max-width:768px)':{ //ipad
			display: 'none',
            marginRight: '0px'
		},
	},
	imgFile: {
		maxHeight: '100%',
	},
    titleFile: {
        color: 'rgba(0, 0, 0, 0.54)',
        paddingBottom: "7px",
        fontSize: "1rem",
        fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"],
        fontWeight: 400,
        font: 'inherit',
        '@media (max-width:768px)':{ //ipad
            fontSize: "15px",
		},
    },
    designButtonFileWidth: {
        fontSize: "16px",
        background: "white",
        borderRadius: "50px",
        boxShadow: "0 2px 5px 1px #205690",
        width: "100%",
        '@media (max-width:768px)':{ //ipad
            width: "100%",
            fontSize: "15px",
		},
        '@media (max-width:576px)':{ //ipad
            fontSize: "13px",
		},
    },
    designButtonFile: {
        width: "100%",
        fontSize: "14px",
        background: "white",
        borderRadius: "50px",
        boxShadow: "0 2px 5px 1px #205690",
        outline: "none",
    },
    errorMessagesFile: {
        marginTop: 10,
        color: '#ff1744',
        fontSize: '0.75rem',
        '@media (max-width:768px)':{ //ipad
            fontSize: "0.75rem",
		},
    }
}));
