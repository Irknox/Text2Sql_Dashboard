import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import AC_Services from "@/services/AC_services";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const AC_users_cards = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [prepay_active, setPrepayActive] = useState([]);
  const [postpay_active, setPostpayActive] = useState([]);

  useEffect(() => {
    AC_Services.get_prepay_active_24h()
      .then((response) => {
        setPrepayActive(response.activos_prepago[0].cantidad_usuarios); 
      })
      .catch((error) => {
        console.log("Error obteniendo datos de prepagos:", error);
      });
      AC_Services.get_postpay_active_24h()
      .then((response) => {
        setPostpayActive(response.activos_postpago[0].cantidad_usuarios); 
      })
      .catch((error) => {
        console.log("Error obteniendo datos de prepagos:", error);
      });
  });

  // Tarjetas que se mostrarán
  const cards = [
    { id: 1, title: "Prepagos activos ultimas 24h", description: prepay_active.toLocaleString("de-DE") },
    { id: 2, title: "Postpagos activos ultimas 24h", description: postpay_active.toLocaleString("de-DE") },
  ];

  return (
    <div className="pdv_cards_containter">
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
                  <Typography
                    id="card_data"
                    variant="h4"
                    color="text.secondary"
                  >
                    <ArrowDropUpIcon sx={{ color: 'green', marginRight: 1 }} />
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
    </div>
  );
};

export default AC_users_cards;
