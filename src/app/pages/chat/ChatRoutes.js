import React from 'react';

const chatRoutes = [
  {
    path: "/chat",
    component: React.lazy(() => import("./AppChat")),
    auth: ['ADMIN', 'ATENDENTE']
  }
];

export default chatRoutes;
