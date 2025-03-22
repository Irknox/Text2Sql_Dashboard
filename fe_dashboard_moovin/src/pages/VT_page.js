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
            <Box sx={{ width: '75%', height: '350px', justifyItems:"center", 
                       alignItems:"center", marginRight: 'auto', marginLeft: 'auto' }}>
                <SGPV_cards />
            </Box>

            <Box
                display="grid"
                gridTemplateRows="1fr 1fr" 
                gridTemplateColumns="1fr 1fr" 
                gap={3}
                sx={{height:"700px", width: '100%', margin: '0 auto' }}
                
            >
                {/* Primer Box: Columna 1 */}
                <Box 
                    gridRow="1 / span 2" 
                    gridColumn="1"
                    sx={{
                        display: "flex",
                        justifySelf:"center", 
                        justifyContent:"center",
                        width: '100%', 
                        height:"100%",
                        padding:"5px",
                    }}
                >
                    <Box width="100%" sx={{display:"flex", justifyContent:"right"}}>
                    <VP_component />
                    </Box>
                    
                </Box>

                {/* Segundo Box: Columna 2 */}
                <Box gridColumn="2" gridRow="1" >
                    <SPA_component />
                </Box>
                <Box gridColumn="2" gridRow="2">
                    <RPH_componente />
                </Box>
            </Box>

            <Box gridRow={2}
                display="grid"
                gridTemplateColumns="60% 1fr"
                sx={{height:"750px", width: '100%', margin: '0 auto' }}
                >
                <Box gridColumn="1"
                 sx={{
                    display: "flex",
                    justifySelf:"center", 
                    justifyContent:"center",
                    width: '100%', 
                    height:"100%",
                    padding:"5px",
                }}
                >
                    <VSH_componente />
                </Box>

                <Box gridColumn="2" display="flex" flexDirection="column" >
                    <VTR_gauges />
                </Box>
            </Box>
        </MainLayout>
    );
}
