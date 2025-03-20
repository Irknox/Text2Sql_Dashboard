
import React from "react";
import Last_six_months_sales_chart from "@/components/Last_six_months_sales_chart";
import PDV_cards_data_component from "@/components/PDV_cards_data_component";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        {/* Aquí puedes agregar tu menú de navegación */}
        <h2>Punto de venta 112</h2>
        <ul>
          <li>Inicio</li>
          <li>Ventas</li>
          <li>Reportes</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="pdv_data_cards">
          <PDV_cards_data_component />
        </div>
        <div id="pieChart" className="pdv_sales_chart">
          <Last_six_months_sales_chart />
        </div>
      </div>
    </div>
  );
}
