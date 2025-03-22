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
            <Box
                display="grid"
                gridTemplateColumns="repeat(4, 1fr, 1)" // Tres columnas, ajusta según sea necesario
                gap={2}
                justifyItems="center" 
                alignItems="center"  
                sx={{ width: '100%', margin: '0 auto' }} 
            >
                <Box sx={{ width: '80%', height: '500px' }}>
                    <SGPV_cards/>
                </Box>
                <Box sx={{ width: '50%', height: '500px' }}>
                    <VP_component/>
                </Box>
                <Box sx={{ width: '50%', height: '500px' }}>
                    <SPA_component />
                </Box>
                <Box sx={{ width: '80%', height: '500px' }}>
                    <VTR_gauges />
                </Box>
                <Box sx={{ width: '80%', height: '500px' }}>
                    <VSH_componente />
                </Box>
                <Box sx={{ width: '80%', height: '500px' }}>
                    <RPH_componente />
                </Box>
            </Box>
        </MainLayout>
    );
}
