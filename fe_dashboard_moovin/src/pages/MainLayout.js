import React from "react";
import { useRouter } from "next/router";

const Navbar = () => (
  <div
    className="navbar"
    style={{
      backgroundColor: "#0cb4ac",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.34)",
    }}
  >
    <h1
      style={{
        width: "100%",
        fontSize: "1rem",
        margin: 0,
        textAlign:"center",
        fontFamily:"system-ui"
      }}
    >
      ⭐ Kölbi Control Tower ⭐
    </h1>
  </div>
);

const MainLayout = ({ children }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div
      style={{
        backgroundColor: "#ddeae1",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(7, 209, 149, 0.31)",
            width: "80%",
            height: "40px",
          }}
        >
          <span
            className="tab"
            onClick={() => navigateTo("/VT_page")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#031B4A",
              fontSize: "1.2rem", 
              fontFamily:"system-ui"
            }}
          >
            Ventas en Tiempo Real
          </span>
          <span
            className="tab"
            onClick={() => navigateTo("/PDV_page")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#031B4A",
              fontSize: "1.2rem",
              fontFamily:"system-ui"
            }}
          >
            Puntos de Venta
          </span>
          <span
            className="tab"
            onClick={() => navigateTo("/AC_dashboard_page")}
            style={{
              cursor: "pointer",
              fontWeight: "bold",
              color: "#031B4A",
              fontSize: "1.2rem",
              fontFamily:"system-ui"
            }}
          >
            Actividad de Clientes
          </span>
        </div>
      </div>
      <div className="content-area" style={{ marginTop: "30px" }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
