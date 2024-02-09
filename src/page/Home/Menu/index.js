import React from "react";
import { connect } from "react-redux";
import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import mapStateToProps from "./mapStateToProps";
import mapDispatchToProps from "./mapDispatchToProps";
import { ListItem, ListItemIcon } from "@material-ui/core";
import "./style.css";

const Menu = (props) => {
  const classes = useStyles(props);
  let history = useHistory();
  const menu = props.menu;

  const menuCardsAmount = props.menu.length;
  let has4components = false;

  if (menuCardsAmount > 3) {
    has4components = true;
  }

  function InsideCode(props) {
    const classes = props.classes;
    const menu = props.menu;

    return (
      <React.Fragment>
        {menu !== null
          ? menu.map((item, index) => {
              return (
                 <div className="card" key={index}>
                {/* <div className={classes.card} key={index}> */}
                  <div className="card-inner" key={index}>
                    <div>
                      <img
                        src={"/menu/" + item.icon}
                        alt={item.name}
                        className={classes.registerImage}
                      />
                      <h2 className={classes.cardTitle}>{item.name}</h2>
                      <div className={classes.lineaDegradadaBottom}></div>
                      {item.form !== null
                        ? item.form.map((form, formIndex) => {
                            return (
                              <ListItem
                                className={classes.listItem}
                                key={formIndex}
                                button
                                onClick={() => {
                                  history.push(form.path, {});
                                }}
                              >
                                <ListItemIcon className={classes.listItemIcon}>
                                  <img
                                    className={classes.icon}
                                    src={"/menu/" + form.icon}
                                    alt="Icon"
                                  />
                                </ListItemIcon>
                                <p className={classes.listButton}>
                                  {" "}
                                  {form.name}{" "}
                                </p>
                              </ListItem>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {has4components ? (
        <div className={classes.cardContainerMenuLarge}>
          <InsideCode menu={menu} classes={classes}></InsideCode>
        </div>
      ) : (
        <div className={classes.cardContainerMenu}>
          <InsideCode menu={menu} classes={classes}></InsideCode>
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
