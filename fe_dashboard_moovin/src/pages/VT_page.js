import React from "react";
import MainLayout from "../pages/MainLayout";
import SGPV_cards from "@/components/SGPV_cards";
import VP_component from "@/components/VP_component";
import SPA_component from "@/components/SPA_component";
import VSH_componente from "@/components/VSH_componente";
import RPH_componente from "@/components/RPH_componente";
import VTR_gauges from "@/components/VTR_gauges";
import { Box } from "@mui/material"; 

export default function VT_page() {
    return (
        <MainLayout>

            <Box sx={{ width: '75%', height: '400px', justifyItems:"center", 
                       alignItems:"center", marginRight: 'auto', marginLeft: 'auto' }}>
                    <SGPV_cards />
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
                    <VP_component />
                </Box>

                <Box sx={{ width: '50%', height: '500px' }}>
                    <SPA_component />
                </Box>
            
                <Box sx={{ width: '50%', height: '500px' }}>
                    <RPH_componente />
                </Box>

                <Box sx={{ width: '50%', height: '500px' }}>
                    <VSH_componente />
                </Box>

                <Box sx={{ width: '100%', height: '500px' }}>
                    <VTR_gauges />
                </Box>

            </Box>
        </MainLayout>
    );
}
