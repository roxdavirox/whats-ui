import { authRoles } from "./auth/authRoles";

export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/analytics",
    icon: "dashboard",
    auth: authRoles.admin
  },
  {
    name: "Conectar",
    path: "/code",
    icon: "important_devices",
    auth: authRoles.admin
  },
  {
    name: "Chat",
    icon: "chat",
    path: "/chat",
    auth: authRoles.guest
  },
];
