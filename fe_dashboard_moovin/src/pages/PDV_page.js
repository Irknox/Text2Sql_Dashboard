import React from "react";
import MainLayout from "../pages/MainLayout";
import LastSixMonthsSalesChart from "@/components/Last_six_months_sales_chart";
import PDV_cards_data_component from "@/components/PDV_cards_data_component";
import Sales_week from "@/components/Sales_week";
import { Box } from "@mui/material"; 

export default function PDVPage() {
    return (
        <MainLayout>
        <Box
            display="grid"
            gridTemplateColumns="repeat(1, 1fr, 1fr)" 
            justifyItems="center" 
            alignItems="center"  
            sx={{ width: '100%', margin: '0 auto' }} 
        >
            <Box sx={{ width: '75%', height: '200px' }}>
              <PDV_cards_data_component />
            </Box>
            <Box sx={{ width: '50%', height: '600px' }}>
              <LastSixMonthsSalesChart />
            </Box>
            <Box sx={{ width: '50%', height: '500px' }}>
               <Sales_week />
            </Box>
        </Box>
    </MainLayout>
        
    );
}
