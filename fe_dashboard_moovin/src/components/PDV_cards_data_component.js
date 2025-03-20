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
    { id: 1, title: "Balance en venta", monto: "₡" + balance_data },
    { id: 2, title: "Variación mes anterior", description: variation_card_description() },
    { id: 3, title: "Monto Vendido", description: "₡" + current_sales_data },
  ];

  return (
    <div className="pdv_cards_containter">
      {/* Mostrar mensaje si aún no hay datos */}
      {balance_status === "loading" || variation_status === "loading" ? (
        <p>Cargando datos...</p>
      ) : balance_status === "failed" || variation_status === "failed" ? (
        <p>Error al cargar los datos.</p>
      ) : (
        // Mostrar las tarjetas solo si ambos datos están listos
        <Box className="pdv_card_box">
          {cards.map((card, index) => (
            <Card key={card.id} className="pdv_card">
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
                <CardContent className="card_content" sx={{ height: "90%" }}>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography id="card_data" variant="h4" color="text.secondary">
                    {card.monto || card.description}
                  </Typography>
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
