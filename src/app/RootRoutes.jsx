import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import chatRoutes from "./views/chat-box/ChatRoutes";
import qrcodeRoutes from './views/qrcode/QrcodeRoutes';
// import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
// import materialRoutes from "./views/material-kit/MaterialRoutes";
// import chartsRoute from "./views/charts/ChartsRoute";
// import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";
// import invoiceRoutes from "./views/invoice/InvoioceRoutes";
// import calendarRoutes from "./views/calendar/CalendarRoutes";
// import crudRoute from "./views/CRUD/CrudRoutes";
// import inboxRoute from "./views/inbox/InboxRoutes";
// import formsRoutes from "./views/forms/FormsRoutes";
// import mapRoutes from "./views/map/MapRoutes";
// import todoRoutes from "./views/todo/TodoRoutes";
// import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
// import ListRoute from "./views/list/ListRoute";


// import otherRoutes from "./views/others/OtherRoutes";
// import scrumBoardRoutes from "./views/scrum-board/ScrumBoardRoutes";
// import ecommerceRoutes from "./views/ecommerce/EcommerceRoutes";

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
  // ...materialRoutes,
  // ...utilitiesRoutes,
  // ...chartsRoute,
  // ...dragAndDropRoute,
  // ...calendarRoutes,
  // ...invoiceRoutes,
  // ...crudRoute,
  // ...inboxRoute,
  // ...formsRoutes,
  // ...mapRoutes,
  ...chatRoutes,
  // ...todoRoutes,
  // ...scrumBoardRoutes,
  // ...ecommerceRoutes,
  // ...pageLayoutRoutes,
  // ...otherRoutes,
  // ...ListRoute,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
