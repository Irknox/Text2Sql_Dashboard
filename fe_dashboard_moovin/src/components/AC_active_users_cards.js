import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import AC_Services from "@/services/AC_services";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

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
        console.log("Error obteniendo datos de postpagos:", error);
      });
  }, []); // Añadido el array vacío para evitar la repetición de solicitudes

  // Tarjetas que se mostrarán con títulos ajustados
  const cards = [
    {
      id: 1,
      title: "Usuarios Activos Plan Prepagado (Últimas 24h)",
      description: prepay_active.toLocaleString("de-DE"),
    },
    {
      id: 2,
      title: "Usuarios Activos Plan Postpago (Últimas 24h)",
      description: postpay_active.toLocaleString("de-DE"),
    },
  ];

  return (
    <div className="pdv_cards_containter" style={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection:"column",
          height: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            sx={{
              width: "300px",
              height: "120px",
              padding: 2,
              boxShadow: "3px 5px 7px rgba(8, 160, 160, 0.4)",
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "10px",
              border: "1px solid rgba(99, 96, 96, 0.62)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#031B4A",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#31c3bc",
                    marginTop: "8px",
                    textAlign: "left",
                  }}
                >
                  <ArrowDropUpIcon sx={{ color: "green", marginRight: 1 }} />
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
