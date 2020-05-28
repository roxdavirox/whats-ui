import { authRoles } from "./auth/authRoles";

export const navigations = [
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
