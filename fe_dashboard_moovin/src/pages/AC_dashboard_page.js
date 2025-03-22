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
      <Box
        display="grid"
        gridTemplateColumns="70% 1fr" // Dos columnas para un mejor ajuste
        gridTemplateRows="1fr 1fr 1fr"
        gap={3}
        justifyItems="center"
        alignItems="center"
        sx={{ width: "100%", margin: "0 auto" }}
      >
        <Box
          gridColumn="2"
          gridRow="1 / span 2"
          sx={{
            width: "75%",
            height: "100%",
            justifyItems: "center",
            alignItems: "center",
            marginRight: "auto",
            marginLeft: "auto",
            display:"flex",
            flexDirection:"column",
          }}
        >
          <AC_users_cards />
        </Box>
        <Box gridColumn="1" sx={{ width: "100%", height: "350px" }}>
          <AC_provinces_prepay_weekly />
        </Box>
        <Box gridColumn="1" sx={{ width: "100%", height: "350px" }}>
          <AC_provinces_postpay_weekly />
        </Box>
        <Box gridColumn="1 / span 2" width="100%">
          <AC_active_users_weekly />
        </Box>
      </Box>
    </MainLayout>
  );
}
