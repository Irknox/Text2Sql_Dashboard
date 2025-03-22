import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalanceData } from "../redux/slices/balance_card_slice";
import { fetch_variation_data } from "@/redux/slices/variation_card_slice";
import { fetch_current_sales } from "@/redux/slices/current_sales_slice";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RemoveIcon from '@mui/icons-material/Remove';
import { Home, CreditCard, ChartNoAxesCombined } from "lucide-react"; 

const PDV_cards_data_component = () => {
  const dispatch = useDispatch();
  const balance_data = useSelector((state) => state.balance.data);
  const balance_status = useSelector((state) => state.balance.status);
  const variation_data = useSelector((state) => state.variation.data);
  const variation_status = useSelector((state) => state.variation.status);
  const current_sales_data = useSelector((state) => state.current_sales.data);
  const current_sales_status = useSelector((state) => state.current_sales.status);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchBalanceData());
    dispatch(fetch_variation_data());
    dispatch(fetch_current_sales());
  }, [dispatch]);

  // Lógica para determinar qué ícono y valor mostrar para la variación
  const variation_card_description = () => {
    if (variation_data > 0) {
      return (
        <div>
          <ArrowDropUpIcon sx={{ color: 'green', marginRight: 1 }} />
          {variation_data.toFixed(2)}%
        </div>
      );
    } else if (variation_data < 0) {
      return (
        <div>
          <ArrowDropDownIcon sx={{ color: 'red', marginRight: 1 }} />
          {variation_data.toFixed(2)}%
        </div>
      );
    } else {
      return (
        <div>
          <RemoveIcon sx={{ color: 'gray', marginRight: 1 }} />
          0%
        </div>
      );
    }
  };

  // Tarjetas que se mostrarán
  const cards = [
    { id: 1, title: "Saldo actual", monto: "" + balance_data , icon: <Home size={24} /> },
    { id: 2, title: "Variación mes anterior", description: variation_card_description(), icon: <ChartNoAxesCombined size={24} /> },
    { id: 3, title: "Monto Vendido", description: "" + current_sales_data , icon: <CreditCard size={24} /> },
  ];

  return (
    <div className="pdv_cards_containter">
  
      {balance_status === "loading" || variation_status === "loading" ? (
        <p>Cargando datos...</p>
      ) : balance_status === "failed" || variation_status === "failed" ? (
        <p>Error al cargar los datos.</p>
      ) : (
      
        <Box
        display="flex"
        justifyContent="center" // Centrado horizontal
        alignItems="center" // Centrado vertical
        gap={6}
        sx={{ marginBottom: '20px' }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              sx={{
                padding: 2,
                boxShadow: '4px 6px 8px rgba(0, 0, 0, 0.51)',
                backgroundColor: '#ddeae1',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center', 
                justifyContent: 'center',
              }}
            >
              <CardActionArea
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? "" : undefined}
                sx={{
                  height: "90%",
                  "&[data-active]": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selectedHover",
                    },
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'right' }}>
                  <Box sx={{ marginRight: 2 }}>
                    {card.icon}
                  </Box>
                  <div>
                    <Typography variant="h6" sx={{ color: '#031B4A', fontWeight: 'bold' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#31c3bc', marginTop: '10px' }}>
                      {card.monto || card.description}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
};

export default PDV_cards_data_component;
