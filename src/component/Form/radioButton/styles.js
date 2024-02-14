import { makeStyles } from '@material-ui/core/styles';

export  const stylesRadio = makeStyles(theme => ({
    formControl:{
		minWidth: 300,
        marginTop:'1%',
        paddingRight: theme.spacing(2),
    },
    radioGroup: {
        display: 'inline-block',
    },
}));
