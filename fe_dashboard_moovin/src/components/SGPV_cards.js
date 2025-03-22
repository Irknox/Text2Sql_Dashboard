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
    { id: 1, title: "Ingresos Totales", value: `${(data.totalVentas || 0).toLocaleString('es-ES')}`, icon: <Home size={22} /> },
    { id: 2, title: "Recargas Electrónicas", value: `${(data.recargaTiempoAire || 0).toLocaleString('es-ES')}`, icon: <MonitorCheck size={22} /> },
    { id: 3, title: "Recargas Físicas ₡", value: `${(data.tarjetasFisicasColones || 0).toLocaleString('es-ES')}`, icon: <CreditCard size={22} /> },
    { id: 4, title: "Recargas Físicas $", value: `${(data.tarjetasFisicasDolares || 0).toLocaleString('es-ES')}`, icon: <CreditCard size={22} /> },
    { id: 5, title: "Recargas Carcelarias ₡", value: `${(data.recargasCarcelariasColones || 0).toLocaleString('es-ES')}`, icon: <PhoneForwarded size={22} /> },
    { id: 6, title: "Recargas Carcelarias $", value: `${(data.recargasCarcelariasDolares || 0).toLocaleString('es-ES')}`, icon: <PhoneForwarded size={22} /> },
    { id: 7, title: "SIM Cards Vendidas", value: `${(data.simsVendidas || 0).toLocaleString('es-ES')}`, icon: <Smartphone size={22} /> },
    { id: 8, title: "SIM Cards Activadas", value: `${(data.simsActivadas || 0).toLocaleString('es-ES')}`, icon: <Smartphone size={22} /> }
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
            width: '250px',  
            height: '100px', 
            padding: 2,
            boxShadow: '3px 5px 7px rgba(8, 160, 160, 0.4)',
            backgroundColor:'rgb(255, 255, 255)',
            borderRadius: '10px',
            border: '1px solid rgba(99, 96, 96, 0.62)',
            display: 'flex',
            alignItems: 'center', 
          }}
        >
          <CardActionArea>
            <CardContent sx={{ display: 'flex', alignItems: 'rigth' }}>
              <Box sx={{ marginRight: 2 }}>{card.icon}</Box> {/* Espacio entre icono y texto */}
              <div>
                <Typography variant="h6" style={{ color: '#031B4A', fontWeight: 'bold', fontSize: '15px' }}>
                  {card.title}
                </Typography>
                <Typography variant="h4" style={{ color: '#31c3bc', marginTop: '8px', textAlign: 'left' }}>
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
