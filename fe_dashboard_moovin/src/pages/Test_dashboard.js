import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts";
import Last_six_months_sales_chart from "@/components/Last_six_months_sales_chart";
import PDV_cards_data_component from "@/components/PDV_cards_data_component";

export default function Dashboard() {

  return (
    <div className="dashboard_body">
      <div className="pdv_data_cards">
        <PDV_cards_data_component />
      </div>
      <div id="pieChart" className="pdv_sales_chart" style={{ width: "600px", height: "400px" }}>
        <Last_six_months_sales_chart />
      </div>
    </div>
  );
}
