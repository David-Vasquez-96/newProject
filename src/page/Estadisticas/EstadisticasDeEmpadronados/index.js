import React, { Fragment } from "react";
import Estadisticas from "page/Estadisticas";
import { Redirect } from "react-router-dom";
import { useStyles } from "./styles";

function EstadisticasDeEmpadronados() {
  //Redirección hacia sitio web tercero.

  return Redirect(
    (window.location =
      "https://tse.org.gt/index.php/sistema-de-estadisticas/estadisticas-de-empadronados")
  );
  // Gráficas se despliegan de forma limpia y responsiva en componente.
  /* return (
    <div>
      <Estadisticas
        url="https://app.powerbi.com/view?r=eyJrIjoiZmM3ZDk1MTMtMzhiNi00YjAyLTg1YzktYWU5NTNkZTIwMzFkIiwidCI6ImEwNzc5ZDFiLTJkYzUtNDE1OC1iY2M5LTBkNWQyMGJlMzg5NiJ9"
        title="Estadísticas de Empadronados"
        useStyles={useStyles}
      />
    </div>
  ); */
}

export default EstadisticasDeEmpadronados;
