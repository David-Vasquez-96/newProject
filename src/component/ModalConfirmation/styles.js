import { makeStyles } from "@material-ui/core";

export default makeStyles( (theme) => ({
    title: {
        width: '100%',
        fontSize: "1.8rem",
        fontWeight: 600,
        textAlign: 'center',
        color: '#595959',
        marginTop: 30,
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
          fontSize: 22,
        },
      },
      description: {
        width: '100%',
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: '27px',
        color: '#545454',
        textAlign: 'center',
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
          fontSize: 18,
        },
      },
    icon : {
        fontSize: 80, display: 'block',
        "background":"linear-gradient(45deg, #205690 30%, #3890EE 90%)",
        "border":"0px", "borderRadius":"100%",
        "boxShadow":"0 3px 5px 2px rgba(33, 203, 243, .3)", "color":"white",
    },
    button:{
        "background":"linear-gradient(45deg, #205690 30%, #3890EE 90%)",
        "border":"0px", "borderRadius":"3",
        "boxShadow":"0 3px 5px 2px rgba(33, 203, 243, .3)", "color":"white",
        width: 200,
        marginRight: 15,
        marginBottom: 10,
        textAlign: 'center',
        '@media (max-width:768px)':{ //ipad
            width: '100%',
		},
    },
    buttonCancel: {
        width: 200,
        marginRight: 15,
        marginBottom: 10,
        textAlign: 'center',
        "background":"linear-gradient(45deg, #B90000 30%, #E07777 90%)",
        "border":"0px", "borderRadius":"3",
        "boxShadow":"0 3px 5px 2px rgba(33, 203, 243, .3)", "color":"white",
        '@media (max-width:768px)':{ //ipad
            width: '100%',
		},
    },
}));