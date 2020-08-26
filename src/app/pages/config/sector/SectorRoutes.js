import React from 'react';

const chatRoutes = [
  {
    path: "/config/sector",
    component: React.lazy(() => import("./Sector")),
    auth: ['ADMIN']
  }
];

export default chatRoutes;
