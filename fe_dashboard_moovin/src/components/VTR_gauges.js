import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import VTR_Services from "@/services/VTR_services";
import { red } from "@mui/material/colors";

const VTR_gauges = () => {
  const [SIMS_prevision, setSIMS_prevision] = useState(null);
  const [Recargas_prevision, setRecargas_prevision] = useState(null);

  useEffect(() => {
    VTR_Services.get_VTR_SIMS_prevision()
      .then((response) => {
        setSIMS_prevision(response.prevision_sims[0]);
      })
      .catch((error) => {
        console.log("Error obteniendo datos de SIMS:", error);
      });

    VTR_Services.get_VTR_recargas_prevision()
      .then((response) => {
        setRecargas_prevision(response.prevision_recargas[0]);
        console.log(Recargas_prevision);
      })
      .catch((error) => {
        console.log("Error obteniendo datos de SIMS:", error);
      });
  }, []);

  const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
  });

  if (!SIMS_prevision || !Recargas_prevision) {
    return <div>Cargando...</div>;
  }

  // Obtener la fecha actual y los días restantes del mes
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysRemaining = lastDayOfMonth.getDate() - today.getDate();

  // Calcular el promedio diario de ventas basado en lo que se ha vendido hasta el momento
  const Recargas_daily_average =
    Recargas_prevision.monto_mes_actual / today.getDate();
  const SIMS_daily_average = SIMS_prevision.monto_mes_actual / today.getDate();

  // Proyectar el total del mes actual basándose en la variación y lo vendido hasta el momento
  const Recargas_projected_total =
    Recargas_prevision.monto_mes_actual +
    Recargas_daily_average *
      daysRemaining *
      (1 + Recargas_prevision.variacion / 100);
  const SIMS_projected_total =
    SIMS_prevision.monto_mes_actual +
    SIMS_daily_average * daysRemaining * (1 + SIMS_prevision.variacion / 100);

  // Definir el valor máximo para el gauge
  const Recargas_maxValue = Recargas_projected_total;
  const SIMS_maxValue = SIMS_projected_total;

  return (
    <div>
      <div style={{ Height: "400px", width: "400px", justifySelf: "center" }}>
        <GaugeComponent
          type="semicircle"
          minValue={0}
          value={SIMS_prevision.monto_mes_actual}
          maxValue={SIMS_maxValue}
          arc={{
            emptyColor: "#747475",
            width: 0.35,
            padding: 0.02,
            colorArray: ["#16adf1","#2ff465", "#747475"],
            subArcs: [
              {
                limit: SIMS_prevision.monto_mes_pasado,
                showTick: true,
                tooltip: { text: "Monto mes pasado" },
              },
              {
                limit: SIMS_prevision.monto_mes_actual,
                showTick: true,
                color:red,
                tooltip: { text: "Monto actual" },
              },

              {
                limit: SIMS_maxValue,
                tooltip: { text: "Prevision final" },
                showTick: true,
              },
            ],
          }}
          pointer={{
            type: "blob",
            color: "white",
            baseColor: "#adf0c1",
            strokeWidth: 5,
            width: 20,
            elastic: true,
          }}
          labels={{
            valueLabel: {
              matchColorWithArc: true,
              formatTextValue: (value) => `${SIMS_prevision.variacion}%`,
              style: { fontSize: "40px", textShadow: "none" },
            },
            tickLabels: {
              type: "outer",
              hideMinMax: true,
              ticks: [{ value: SIMS_prevision.monto_mes_pasado }],
            },
          }}
        />
      </div>

      <div style={{ Height: "400px", width: "400px", justifySelf: "center" }}>
        <GaugeComponent
          type="semicircle"
          minValue={0}
          value={Recargas_prevision.monto_mes_actual}
          maxValue={Recargas_maxValue}
          arc={{
            emptyColor: "#747475",
            width: 0.35,
            padding: 0.02,
            colorArray: ["#2ff465", "#16adf1","#747475"],
            subArcs: [
              {
                limit: Recargas_prevision.monto_mes_actual,
                showTick: true,
                tooltip: { text: "Monto actual" },
              },
              {
                limit: Recargas_prevision.monto_mes_pasado,
                showTick: true,
                tooltip: { text: "Monto mes pasado" },
              },
              {
                limit: Recargas_maxValue,
                showTick: true,
                tooltip: { text: "Proyeccion Final" },
              },
            ],
          }}
          pointer={{
            type: "blob",
            color: "white",
            baseColor: "#adf0c1",
            strokeWidth: 5,
            width: 20,
            elastic: true,
          }}
          labels={{
            valueLabel: {
              matchColorWithArc: true,
              formatTextValue: (value) => `${Recargas_prevision.variacion}%`,
              style: { fontSize: "40px", textShadow: "none" },
            },
            tickLabels: {
              type: "outer",
              hideMinMax: true,
              ticks: [{ value: Recargas_prevision.monto_mes_pasado }],
            },
          }}
        />
      </div>
    </div>
  );
};

export default VTR_gauges;
