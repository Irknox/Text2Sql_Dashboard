import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import VTR_Services from "@/services/VTR_services";
import { red } from "@mui/material/colors";
import RectangleIcon from "@mui/icons-material/Rectangle";

const VTR_gauges = () => {
  const [SIMS_prevision, setSIMS_prevision] = useState(null);
  const [Recargas_prevision, setRecargas_prevision] = useState(null);

  const formatNumber = (value) => {
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(0)} Mill`;
    }
    return (value.toFixed(0)).toLocaleString("en-US");
  };

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
      })
      .catch((error) => {
        console.log("Error obteniendo datos de recargas:", error);
      });
  }, []);

  // Inicialización del Gauge
  const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
  });

  if (!SIMS_prevision || !Recargas_prevision) {
    return <div>Cargando...</div>;
  }

  // Cálculo de la previsión final de mes
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysRemaining = lastDayOfMonth.getDate() - today.getDate();

  const Recargas_daily_average = Recargas_prevision.monto_mes_actual / today.getDate();
  const SIMS_daily_average = SIMS_prevision.monto_mes_actual / today.getDate();

  const Recargas_projected_total =
    Recargas_prevision.monto_mes_actual +
    Recargas_daily_average * daysRemaining * (1 + Recargas_prevision.variacion / 100);
  const SIMS_projected_total =
    SIMS_prevision.monto_mes_actual +
    SIMS_daily_average * daysRemaining * (1 + SIMS_prevision.variacion / 100);

  const Recargas_maxValue = Recargas_projected_total;
  const SIMS_maxValue = SIMS_projected_total;

  return (
    <div>
      <div
        style={{
          width: "90%",
          margin: "50px",
          height: "40%",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          justifySelf: "center",
        }}
      >
        <h3
          style={{
            height: "30px",
            alignContent: "center",
            textAlign: "center",
            fontFamily: "system-ui",
            color: "#302e2e",
          }}
        >
          Previsión de SIMs a Fin de Mes
        </h3>
        <GaugeComponent
          style={{
            width: "80%",
            justifySelf: "center",
            alignContent: "center",
          }}
          type="semicircle"
          minValue={0}
          value={SIMS_prevision.monto_mes_actual}
          maxValue={SIMS_maxValue}
          arc={{
            emptyColor: "#747475",
            width: 0.35,
            padding: 0.02,
            colorArray: ["#16adf1", "#2ff465", "#747475"],
            subArcs: [
              {
                limit: SIMS_prevision.monto_mes_pasado,
                tooltip: { text: "Monto Mes Pasado" },
              },
              {
                limit: SIMS_prevision.monto_mes_actual,
                tooltip: { text: "Monto Actual" },
              },
              {
                limit: SIMS_maxValue,
                tooltip: { text: "Proyección Final" },
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
              ticks: [
                {
                  value: SIMS_prevision.monto_mes_pasado,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Mes Pasado",
                  },
                },
                {
                  value: SIMS_prevision.monto_mes_actual,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Mes Actual",
                  },
                },
                {
                  value: SIMS_maxValue,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Proyección",
                  },
                },
              ],
              defaultTickLineConfig: {
                length: 7,
              },
            },
          }}
        />
        <div
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
        >
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Monto Mes Pasado</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#16adf1" }} />
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Monto Mes Actual</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#2ff465" }} />
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Proyección Final</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#747475" }} />
        </div>
      </div>

      <div
        style={{
          width: "90%",
          margin: "50px",
          height: "40%",
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.45)",
          border: "1px solid rgba(58, 57, 57, 0.4)",
          justifySelf: "center",
        }}
      >
        <h3
          style={{
            height: "30px",
            alignContent: "center",
            textAlign: "center",
            fontFamily: "system-ui",
            color: "#302e2e",
          }}
        >
          Previsión de Recargas a Fin de Mes
        </h3>
        <GaugeComponent
          style={{
            width: "80%",
            justifySelf: "center",
            alignContent: "center",
          }}
          type="semicircle"
          minValue={0}
          value={Recargas_prevision.monto_mes_actual}
          maxValue={Recargas_maxValue}
          arc={{
            emptyColor: "#747475",
            width: 0.35,
            padding: 0.02,
            colorArray: ["#2ff465", "#16adf1", "#747475"],
            subArcs: [
              {
                limit: Recargas_prevision.monto_mes_actual,
                tooltip: { text: "Monto Actual" },
              },
              {
                limit: Recargas_prevision.monto_mes_pasado,
                tooltip: { text: "Monto Mes Pasado" },
              },
              {
                limit: Recargas_maxValue,
                tooltip: { text: "Proyección Final" },
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
              ticks: [
                {
                  value: Recargas_prevision.monto_mes_pasado,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Mes Pasado",
                  },
                },
                {
                  value: Recargas_prevision.monto_mes_actual,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Mes Actual",
                  },
                },
                {
                  value: Recargas_maxValue,
                  valueConfig: {
                    formatTextValue: (value) => formatNumber(value) + " Proyección",
                  },
                },
              ],
              defaultTickLineConfig: {
                length: 7,
              },
            },
          }}
        />
        <div
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-evenly",
          }}
        >
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Monto Mes Pasado</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#16adf1" }} />
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Monto Mes Actual</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#2ff465" }} />
          <p style={{ fontSize: "15px", fontFamily: "system-ui" }}>Proyección Final</p>
          <RectangleIcon style={{ alignSelf: "center", color: "#747475" }} />
        </div>
      </div>
    </div>
  );
};

export default VTR_gauges;
