import { makeStyles } from "@material-ui/core/styles";
import color from "@material-ui/core/colors/amber";

export const useStyles = makeStyles((theme) => ({
  cardSideMessageLogin: {
    minWidth: 275,
    width: "30%",
    position: "absolute",
    // top: '6%',

    transition: "0.4s ease-out",
    textAlign: "justify",
    boxShadow: "0px 0px 0px 0px",
    borderRadius: 41,
    "@media (min-width: 2001px)": {
      //web
      top: "24%",
      width: "26%",
      left: "67%",
    },
    "@media (max-width: 2000px)": {
      //web
      // top: "24%",
      top: "17%",
      width: "26%",
      left: "67%",
    },
    "@media (max-width: 1440px)": {
      //web
      top: "17%",
      left: "67%",
      width: "26%",
    },
    "@media (max-width:1050px)": {
      // web
      top: "60%",
      left: "4%",
      width: "90%",
    },
    "@media (max-width:768px)": {
      // web
      top: "56%",
      left: "4%",
      width: "90%",
    },
    "@media (max-width:468px)": {
      // web
      top: "52%",
      left: "4%",
      width: "90%",
    },
    "@media (max-width:320px)": {
      // web
      top: "52%",
      left: "4%",
      width: "90%",
    },

    "@media (max-width:1050px)": {
      top: "60%",
      left: "4%",
      width: "90%",
      "@media (max-height:780px)": {
        top: "68%",
        top: "60%",
        left: "4%",
        width: "90%",
      },
    },

    "@media (max-width:100px)": {
      top: "62%",
      "@media (max-height:800px)": {
        top: "57%",
      },
      "@media (max-height:735px)": {
        top: "57%",
      },
    },

    "@media (max-width:800px)": {
      top: "62%",
      "@media (max-height:800px)": {
        top: "57%",
      },
      "@media (max-height:735px)": {
        top: "57%",
      },
    },

    "@media (max-width:600px)": {
      //Todos los de acá funcionan cuando el width es 500px.
      top: "62%",
      "@media (max-height:840px)": {
        top: "60%",
      },
    },

    "@media (max-width:500px)": {
      //Todos los de acá funcionan cuando el width es 500px.
      "@media (max-height:888px)": {
        top: "62%",
      },
      "@media (max-height:830px)": {
        top: "58%",
      },
      "@media (max-height:799px)": {
        top: "60%",
      },
      "@media (max-height:720px)": {
        top: "52%",
      },
      "@media (max-height:690px)": {
        top: "54%",
      },
    },

    //iPhone X
    "@media (max-width:375px)": {
      // "@media (max-height:1000px)": {
      top: "62%",
      // },
    },
    //Galaxy S5
    "@media (max-width:360px)": {
      // "@media (max-height:1000px)": {
      top: "57%",
      // },
    },
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  title: {
    fontSize: 14,
  },

  pos: {
    transition: "0.4s ease-out",
    marginBottom: 12,
    "@media (max-width: 2000px)": {
      //web
      fontSize: "1.1rem",
    },
    "@media (max-width: 1688px)": {
      //web
      fontSize: "0.9rem",
    },
    "@media (max-width:1050px)": {
      // web
      fontSize: "0.8rem",
    },
    "@media (max-width:560px)": {
      // web
      fontSize: "0.7rem",
    },
  },

  note: {
    fontWeight: 800,
  },
}));
