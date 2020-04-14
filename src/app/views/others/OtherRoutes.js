import React from 'react';

const otherRoutes = [
  {
    path: "/others/pricing",
    component: React.lazy(() => import("./Pricing"))
  }
];

export default otherRoutes;
