import React from "react";
import { Redirect } from "react-router-dom";

import sessionRoutes from "./pages/sessions/SessionRoutes";
import chatRoutes from "./pages/chat/ChatRoutes";
import qrcodeRoutes from './pages/qrcode/QrcodeRoutes';
import sectorRoutes from './pages/config/sector/SectorRoutes';

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
  ...qrcodeRoutes,
  ...chatRoutes,
  ...sectorRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
