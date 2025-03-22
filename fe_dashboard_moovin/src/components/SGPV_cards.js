import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchDataService } from "../services/Services_cards2";
import CardActionArea from '@mui/material/CardActionArea';
import { Home, CreditCard, PhoneForwarded, Smartphone,MonitorCheck } from "lucide-react"; 

const SGPV_cards = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDataService();
      if (result) setData(result);
    };
    fetchData();
  }, []);

  const cards = [
    { id: 1, title: "Ingresos Totales", value: ` ${data.totalVentas || 0}`, icon: <Home size={24} /> },
    { id: 2, title: "Recargas Electrónicas", value: ` ${data.recargaTiempoAire || 0}`, icon: <MonitorCheck size={24} /> },
    { id: 3, title: "Recargas Físicas ₡", value: ` ${data.tarjetasFisicasColones || 0}`, icon: <CreditCard size={24} /> },
    { id: 4, title: "Recargas Físicas $", value: ` ${data.tarjetasFisicasDolares || 0}`, icon: <CreditCard size={24} /> },
    { id: 5, title: "Recargas Carcelarias ₡", value: ` ${data.recargasCarcelariasColones || 0}`, icon: <PhoneForwarded size={24} /> },
    { id: 6, title: "Recargas Carcelarias $", value: ` ${data.recargasCarcelariasDolares || 0}`, icon: <PhoneForwarded size={24} /> },
    { id: 7, title: "SIM Cards Vendidas", value: `${data.simsVendidas || 0}`, icon: <Smartphone size={24} /> },
    { id: 8, title: "SIM Cards Activadas", value: `${data.simsActivadas || 0}`, icon: <Smartphone size={24} /> }
  ];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(4, 1fr)"
      gap={2}
      sx={{ marginBottom: '20px' }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          sx={{
            padding: 2,
            boxShadow: '4px 6px 8px rgba(0, 0, 0, 0.51)',
            backgroundColor: '#ddeae1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center', 
          }}
        >
          <CardActionArea>
            <CardContent sx={{ display: 'flex', alignItems: 'rigth' }}>
              <Box sx={{ marginRight: 2 }}>{card.icon}</Box> {/* Espacio entre icono y texto */}
              <div>
                <Typography variant="h6" style={{ color: '#031B4A', fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="h4" style={{ color: '#31c3bc', marginTop: '10px' }}>
                  {card.value}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default SGPV_cards;
