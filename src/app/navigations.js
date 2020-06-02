import { authRoles } from "./auth/authRoles";

export const navigations = [
  {
    name: "QR code",
    path: "/code",
    icon: "important_devices",
    auth: ['ADMIN']
  },
  {
    name: "Chat",
    icon: "chat",
    path: "/chat",
    auth: ['ADMIN', 'ATENDENTE']
  },
];
