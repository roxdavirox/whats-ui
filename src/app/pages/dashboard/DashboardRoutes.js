import React from "react";
import { authRoles } from "../../auth/authRoles";

const dashboardRoutes = [
  {
    path: "/dashboard/analytics",
    component: React.lazy(() => import("./Analytics")),
    auth: 'ADMIN'
  }
];

export default dashboardRoutes;
