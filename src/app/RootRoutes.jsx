import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./pages/dashboard/DashboardRoutes";
import sessionRoutes from "./pages/sessions/SessionRoutes";
import chatRoutes from "./pages/chat/ChatRoutes";
import qrcodeRoutes from './pages/qrcode/QrcodeRoutes';

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard/analytics" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...qrcodeRoutes,
  ...chatRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
