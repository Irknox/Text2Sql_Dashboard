import React from "react";
import { useEffect } from "react";
import AC_users_cards from "@/components/AC_active_users_cards";
import AC_active_users_weekly from "@/components/AC_active_users_weekly";
import AC_provinces_prepay_weekly from "@/components/AC_provinces_prepay_weekly";
import AC_provinces_postpay_weekly from "@/components/AC_provinces_postpay_weekly";

const AC_dashboard_page = () => {
  return (
    <div>
      <div>
        <AC_users_cards />
      </div>

      <div>
        <AC_provinces_prepay_weekly />
      </div>
    </div>
  );
};

export default AC_dashboard_page;
