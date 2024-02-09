import React from "react";
import "./styles.css";

export default function LoadingSpinner(props) {
  return (
    <React.Fragment>
      {props.open ? (
        <React.Fragment>
          <div id="overlay" className="overlay">
            <div className="loadingio-spinner-eclipse-q0rfudicgan">
              <div className="ldio-32tyvfdrsnu">
                <div></div>
              </div>
            </div>
            <div className="loadingSpinnerText">
              {props.message ? props.message : "Cargando..."}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
}
