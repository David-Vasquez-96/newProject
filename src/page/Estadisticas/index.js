import React, { Fragment } from "react";
import Title from "component/Title";
import BarChartIcon from "@material-ui/icons/BarChart";
import Footer from "page/Home/Footer2";
import { makeStyles } from "@material-ui/core/styles";
//import { useStyles } from "./styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Media from "react-media";

function SmallGraphics(props) {
  //console.log("props en SmallGraphics:", props)
  const classes = props.classes;
  //console.log("classes en SmallGraphics:", classes);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.childDiv}>
        <Grid item xs={12} className={classes.childDiv}>
          <Paper className={(classes.paper, classes.paperChildDiv)}>
            <iframe
              width="100%"
              height="90%"
              src={props.url}
              allowFullScreen={true}
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

function MediumGraphics(props) {
  //console.log("props en MediumGraphics:", props)
  const classes = props.classes;
  //console.log("classes en MediumGraphics:", classes);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.childDiv}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} className={classes.childDiv}>
          <Paper className={(classes.paper, classes.paperChildDiv)}>
            <iframe
              width="100%"
              height="100%"
              src={props.url}
              allowFullScreen={true}
            ></iframe>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

function LargeGraphics(props) {
  //console.log("props en LargeGraphics:", props)
  const classes = props.classes;
  //console.log("classes en LargeGraphics:", classes);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.childDiv}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} className={classes.childDiv}>
          <Paper className={(classes.paper, classes.paperChildDiv)}>
            <iframe
              width="100%"
              height="100%"
              src={props.url}
              allowFullScreen={true}
            ></iframe>
          </Paper>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );
}

function Estadisticas(props) {
  const { title, url } = props;
  const classes = props.useStyles();

  return (
    <div>
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <Title title={title} icon={<BarChartIcon />} />
      </div>
      <div>
        <Media
          /*  queries={{
            small: "(max-width: 1023px)",
            medium: "(min-width: 1024px) and (max-width: 1399px)",
            large: "(min-width: 1400px)",
          }} */
          queries={{
            small: "(max-width: 1023px)",
            large: "(min-width: 1024px)",
          }}
        >
          {(matches) => (
            <Fragment>
              {matches.small && <SmallGraphics url={url} classes={classes} />}
              {matches.large && <LargeGraphics url={url} classes={classes} />}
              {/*   {matches.small && <SmallGraphics url={url} classes={classes} />}
              {matches.medium && <MediumGraphics url={url} classes={classes} />}
              {matches.large && <LargeGraphics url={url} />} */}
            </Fragment>
          )}
        </Media>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Estadisticas;
