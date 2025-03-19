import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as echarts from "echarts";
import Last_six_months_sales_chart from "@/components/Last_six_months_sales_chart";
import Sales_week from "@/components/sales_week";

export default function Dashboard() {

  return (
    <div>

      <div id="pieChart" style={{ width: "600px", height: "400px" }}>
        <Sales_week />
      </div>
    </div>
  );
}
