import React from 'react';
import PDV_cards_data_component from '@/components/PDV_cards_data_component';
import LastSixMonthsSalesChart from '@/components/Last_six_months_sales_chart';
import Sales_week from '@/components/Sales_week';

const Navbar = () => (
    <div className="navbar">
        <h1>kölbi Control Punto de Venta ⭐</h1>
    </div>
);

const Dash_home = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-tabs">
                <span className="tab active">Ventas en Tiempo Real</span>
                <span className="tab">Puntos de Venta</span>
                <span className="tab">Actividad de Clientes</span>
            </div>
            <div className="grid-container">
                <div className="grid-item">
                    <PDV_cards_data_component />
                </div>
                <div className="grid-item">
                    <LastSixMonthsSalesChart  />
                </div>
                <div className="grid-item">
                    <Sales_week  />
                </div>
            </div>
        </div>
    );
};

export default Dash_home;
