import React from "react";
import { useRouter } from "next/router";

const Navbar = () => (
    <div className="navbar">
        <h1>kölbi Control Tower ⭐</h1>
    </div>
);

const MainLayout = ({ children }) => {
    const router = useRouter();

    const navigateTo = (path) => {
        router.push(path);
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-tabs">
                <span className="tab" onClick={() => navigateTo("/VT_page")}>
                    Ventas en Tiempo Real
                </span>
                <span className="tab" onClick={() => navigateTo("/PDV_page")}>
                    Puntos de Venta
                </span>
                <span className="tab" onClick={() => navigateTo("/customer_activity")}>
                    Actividad de Clientes
                </span>
            </div>
            <div className="content-area">{children}</div>
        </div>
    );
};

export default MainLayout;
