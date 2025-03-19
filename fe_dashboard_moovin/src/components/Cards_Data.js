import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { fetchBalanceData } from "../redux/slices/balance_card_slice"; // Asegúrate de importar la acción correcta

const Cards_Data = () => {
  const dispatch = useDispatch();

  // Acceder al estado de Redux
  const { data: balance, status: balanceStatus, error: balanceError } = useSelector((state) => state.balance);

  useEffect(() => {
    if (balanceStatus === "idle") {
      dispatch(fetchBalanceData());
    }
  }, [dispatch, balanceStatus]);

  // Mostrar un loader mientras se cargan los datos
  if (balanceStatus === "loading") return <CircularProgress />;

  // Mostrar un mensaje de error si no se pudo cargar los datos
  if (balanceError) return <Alert severity="error">{balanceError}</Alert>;

  // Acceder al valor de Monto
  const monto = balance ? balance.Monto : null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Resumen de métricas importantes
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Card sx={{ flex: 1, backgroundColor: "#E3F2FD" }}>
          <CardContent>
            <Typography variant="h6">Balance X mes</Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {monto !== null ? monto : "Cargando..."} {/* Muestra el balance desde Redux */}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Todos balance por mes
            </Typography>
          </CardContent>
        </Card>
        {/* Puedes agregar más tarjetas para otros datos de `sales` o `variation` si es necesario */}
      </Box>
    </Box>
  );
};

export default Cards_Data;
