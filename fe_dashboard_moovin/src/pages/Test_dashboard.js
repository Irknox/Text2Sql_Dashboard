import Last_six_months_sales_chart from "@/components/Last_six_months_sales_chart";
import PDV_cards_data_component from "@/components/PDV_cards_data_component";
import Sales_week from "@/components/Sales_week";

export default function Dashboard() {

  return (
    <div className="dashboard_body">
      <div className="pdv_data_cards">
        <PDV_cards_data_component />
      </div>
      <div className="pdv_sales_chart">
        <Last_six_months_sales_chart/>
      </div>
      <div className="pdv_sales_week">
        <Sales_week />
      </div>
    </div>
  );
}
