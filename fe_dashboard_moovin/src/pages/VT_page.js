import React from "react";
import MainLayout from "../pages/MainLayout";
import SGPV_cards from "@/components/SGPV_cards";
import VP_component from "@/components/VP_component";
import SPA_component from "@/components/SPA_component";
import PS_component from "@/components/PS_component";

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
            </div>
        </MainLayout>
    );
}
