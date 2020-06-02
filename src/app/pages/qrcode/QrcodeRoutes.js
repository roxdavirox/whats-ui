import React from 'react';

const chatRoutes = [
  {
    path: "/code",
    component: React.lazy(() => import("./QrcodeContainer")),
    auth: ['ADMIN']
  }
];

export default chatRoutes;
