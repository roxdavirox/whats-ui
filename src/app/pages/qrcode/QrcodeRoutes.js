import React from 'react';

const chatRoutes = [
  {
    path: "/code",
    component: React.lazy(() => import("./Qrcode"))
  }
];

export default chatRoutes;
