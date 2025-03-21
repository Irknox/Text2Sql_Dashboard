import React from "react";
import MainLayout from "../pages/MainLayout";
import LastSixMonthsSalesChart from "@/components/Last_six_months_sales_chart";
import PDV_cards_data_component from "@/components/PDV_cards_data_component";
import Sales_week from "@/components/Sales_week";

export default function PDVPage() {
    return (
        <MainLayout>
            <div className="grid-container">
                <div className="grid-item">
                    <PDV_cards_data_component />
                </div>
                <div className="grid-item">
                    <LastSixMonthsSalesChart />
                </div>
                <div className="grid-item">
                    <Sales_week />
                </div>
            </div>
        </MainLayout>
    );
}
