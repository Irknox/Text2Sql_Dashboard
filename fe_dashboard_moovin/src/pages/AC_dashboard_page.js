import React from "react";
import MainLayout from "../pages/MainLayout";
import AC_users_cards from "@/components/AC_active_users_cards";
import AC_active_users_weekly from "@/components/AC_active_users_weekly";
import AC_provinces_postpay_weekly from "@/components/AC_provinces_postpay_weekly";
import AC_provinces_prepay_weekly from "@/components/AC_provinces_prepay_weekly";
import { Box } from "@mui/material"; 


export default function PDVPage() {
    return (
        <MainLayout>
            
            <Box sx={{ width: '75%', height: '200px', justifyItems:"center", 
                       alignItems:"center", marginRight: 'auto', marginLeft: 'auto' }}>
                    <AC_users_cards/>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(2, 1fr)" // Dos columnas para un mejor ajuste
                gap={3}
                justifyItems="center"
                alignItems="center"
                sx={{ width: '100%', margin: '0 auto' }}
            >
                <Box sx={{ width: '50%', height: '500px' }}>
                <AC_provinces_prepay_weekly />
                </Box>
                <Box sx={{ width: '50%', height: '500px' }}>
                <AC_provinces_postpay_weekly />
                </Box>
                <Box sx={{ width: '80%', height: '500px' }}>
                  <AC_active_users_weekly />
                </Box>
            </Box>
        </MainLayout>
    );
}

    

