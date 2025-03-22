import React from "react";
import MainLayout from "../pages/MainLayout";
import SGPV_cards from "@/components/SGPV_cards";
import VP_component from "@/components/VP_component";
import SPA_component from "@/components/SPA_component";
import PS_component from "@/components/PS_component";
import VSH_componente from "@/components/VSH_componente";
import RPH_componente from "@/components/RPH_componente";

export default function VT_page() {
    return (
        <MainLayout>
            <div className="grid-container">
                <div className="grid-item">
                    <SGPV_cards/>
                </div>
                <div className="grid-item">
                    <VP_component/>
                </div>
                <div className="grid-item">
                    <SPA_component />
                </div>
                <div className="grid-item">
                    <PS_component />
                </div>
                <div className="grid-item">
                    <VSH_componente />
                </div>
                <div className="grid-item">
                    <RPH_componente />
                </div>
            </div>
        </MainLayout>
    );
}
