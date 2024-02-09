import React from "react";
import Estadisticas from "page/Estadisticas";
import { Redirect } from "react-router-dom";
import { useStyles } from "./styles";

function EstadisticasDeAfiliados() {
  //Redirección hacia sitio web tercero.
  return Redirect(
    (window.location =
      "https://tse.org.gt/index.php/sistema-de-estadisticas/estadisticas-de-organizaciones-politicas")
  );
  // Gráficas se despliegan de forma limpia y responsiva en componente.
  /* return (
    <div>
      <Estadisticas
        url="https://app.powerbi.com/view?r=eyJrIjoiNGQxODlkMDEtOTRiMi00NjU4LThkODItODkzNzE5MGJjYTRkIiwidCI6ImEwNzc5ZDFiLTJkYzUtNDE1OC1iY2M5LTBkNWQyMGJlMzg5NiJ9"
        title="Estadísticas de Afiliados"
        useStyles={useStyles}
      />
    </div>
  ); */
}

export default EstadisticasDeAfiliados;
