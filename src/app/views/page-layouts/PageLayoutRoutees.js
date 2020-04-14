import React from 'react';

const pageLayoutRoutes = [
  {
    path: "/page-layouts/Left-sidebar-card",
    component: React.lazy(() => import("./LeftSidebarCard"))
  },
  {
    path: "/page-layouts/user-profile",
    component: React.lazy(() => import("./UserProfile"))
  }
];

export default pageLayoutRoutes;
