import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { fetchDataService } from "../services/Services_cards2";

const SGPV_cards= () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataService();
      if (result) setData(result);
    };
    fetchData();
  }, []);

  const cards = [
    { id: 1, title: "Ventas total todos los productos", value: `₡ ${data.totalVentas || 0}` },
    { id: 2, title: "Recarga Tiempo aire", value: `₡ ${data.recargaTiempoAire || 0}` },
    { id: 3, title: "Recargas Tarjetas físicas colones", value: `₡ ${data.tarjetasFisicasColones || 0}` },
    { id: 4, title: "Recargas Tarjetas físicas dólares", value: `$ ${data.tarjetasFisicasDolares || 0}` },
    { id: 5, title: "Recargas Carcelarias colones", value: `₡ ${data.recargasCarcelariasColones || 0}` },
    { id: 6, title: "Recargas Carcelarias dólares", value: `$ ${data.recargasCarcelariasDolares || 0}` },
    { id: 7, title: "SIMs vendidas", value: `${data.simsVendidas || 0}` },
    { id: 8, title: "SIMs activadas", value: `${data.simsActivadas || 0}` }
  ];

  return (
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      {cards.map((card) => (
        <Card key={card.id} sx={{ padding: 2 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h4" color="text.secondary">
                {card.value}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default SGPV_cards;
