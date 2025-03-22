import React from "react";
import MainLayout from "../pages/MainLayout";
import AC_users_cards from "@/components/AC_active_users_cards";
import AC_active_users_weekly from "@/components/AC_active_users_weekly";
import AC_provinces_postpay_weekly from "@/components/AC_provinces_postpay_weekly";
import AC_provinces_prepay_weekly from "@/components/AC_provinces_prepay_weekly";

export default function PDVPage() {
    return (
        <MainLayout>
            <div className="grid-container">
                <div className="grid-item">
                    <AC_users_cards/>
                </div>
                <div className="grid-item">
                    <AC_active_users_weekly />
                </div>
                <div className="grid-item">
                    <AC_provinces_postpay_weekly />
                </div>
                <div className="grid-item">
                    <AC_provinces_prepay_weekly />
                </div>
            </div>
        </MainLayout>
    );
}

