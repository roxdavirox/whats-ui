import { authRoles } from "./auth/authRoles";

export const navigations = [
  {
    name: "Dashboard",
    path: "/dashboard/analytics",
    icon: "dashboard",
    // auth: authRoles.guest
  },
  {
    name: "Conectar",
    path: "/code",
    icon: "important_devices"
  },
  // {
  //   name: "CRUD Table",
  //   icon: "format_list_bulleted",
  //   path: "/crud-table",
    
  // },
  // {
  //   name: "Ecommerce",
  //   icon: "shopping_basket",
    
  //   children: [
  //     {
  //       name: "Shop",
  //       path: "/ecommerce/shop",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Cart",
  //       path: "/ecommerce/cart",
  //       iconText: "C"
  //     },
  //     {
  //       name: "Checkout",
  //       path: "/ecommerce/checkout",
  //       iconText: "CO"
  //     }
  //   ]
  // },
  // {
  //   name: "Scrum Board",
  //   icon: "group_work",
  //   path: "/scrum-board",
    
  // },
  {
    name: "Matx List",
    icon: "list",
    
    children: [
      {
        name: "Infinite Scroll",
        path: "/infinite-scroll",
        iconText: "I"
      },
      {
        name: "List",
        path: "/matx-list",
        iconText: "L"
      }
    ]
  },
  // {
  //   name: "Invoice Builder",
  //   icon: "receipt",
  //   path: "/invoice/list",
    
  // },
  // {
  //   name: "Calendar",
  //   icon: "date_range",
  //   path: "/calendar",
    
  // },
  {
    name: "Chat",
    icon: "chat",
    path: "/chat",
    
  },
  // {
  //   name: "Inbox",
  //   icon: "inbox",
  //   path: "/inbox",
    
  // },
  // {
  //   name: "Todo",
  //   icon: "center_focus_strong",
  //   path: "/todo/list",
    
  // },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     {
  //       name: "Auto Complete",
  //       path: "/material/autocomplete",
  //       iconText: "A"
  //     },
  //     {
  //       name: "Buttons",
  //       path: "/material/buttons",
  //       iconText: "B"
  //     },
  //     {
  //       name: "Checkbox",
  //       path: "/material/checkbox",
  //       iconText: "C"
  //     },
  //     {
  //       name: "Dialog",
  //       path: "/material/dialog",
  //       iconText: "D"
  //     },
  //     {
  //       name: "Expansion Panel",
  //       path: "/material/expansion-panel",
  //       iconText: "E"
  //     },
  //     {
  //       name: "Form",
  //       path: "/material/form",
  //       iconText: "F"
  //     },
  //     {
  //       name: "Icons",
  //       path: "/material/icons",
  //       iconText: "I"
  //     },
  //     {
  //       name: "Menu",
  //       path: "/material/menu",
  //       iconText: "M"
  //     },
  //     {
  //       name: "Progress",
  //       path: "/material/progress",
  //       iconText: "P"
  //     },
  //     {
  //       name: "Radio",
  //       path: "/material/radio",
  //       iconText: "R"
  //     },
  //     {
  //       name: "Switch",
  //       path: "/material/switch",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Slider",
  //       path: "/material/slider",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Snackbar",
  //       path: "/material/snackbar",
  //       iconText: "S"
  //     },
  //     {
  //       name: "Table",
  //       path: "/material/table",
  //       iconText: "T"
  //     }
  //   ]
  // },
  // {
  //   name: "Forms",
  //   icon: "description",
  //   children: [
  //     {
  //       name: "Basic",
  //       path: "/forms/basic",
  //       iconText: "B"
  //     },
  //     {
  //       name: "Editor",
  //       path: "/forms/editor",
  //       iconText: "E"
  //     },
  //     {
  //       name: "Upload",
  //       path: "/forms/upload",
  //       iconText: "U",
        
  //     },
  //     {
  //       name: "Wizard",
  //       path: "/forms/wizard",
  //       iconText: "W",
        
  //     }
  //   ]
  // },
  // {
  //   name: "Drag and Drop",
  //   icon: "pan_tool",
  //   path: "/others/drag-and-drop"
  // },
  // {
  //   name: "Multilevel",
  //   icon: "dynamic_feed",
  //   children: [
  //     {
  //       name: "Level 1",
  //       iconText: "L1",
  //       children: [
  //         {
  //           name: "Level 2",
  //           path: "/charts/victory-charts",
  //           iconText: "L2"
  //         },
  //         {
  //           name: "Level 2",
  //           path: "/charts/react-vis",
  //           iconText: "L2"
  //         },
  //         {
  //           name: "Level 2",
  //           path: "/charts/recharts",
  //           iconText: "L2"
  //         },
  //         {
  //           name: "Level 2",
  //           path: "/charts/echarts",
  //           iconText: "L2"
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   name: "Utilities",
  //   icon: "format_list_bulleted",
  //   children: [
  //     {
  //       name: "Color",
  //       path: "/utilities/color",
  //       iconText: "C",
  //       auth: authRoles.admin
  //     },
  //     {
  //       name: "Spacing",
  //       path: "/utilities/spacing",
  //       iconText: "S",
  //       auth: authRoles.admin
  //     },
  //     {
  //       name: "Typography",
  //       path: "/utilities/typography",
  //       iconText: "T"
  //     },
  //     {
  //       name: "Display",
  //       path: "/utilities/display",
  //       iconText: "D"
  //     },
  //     {
  //       name: "Position",
  //       path: "/utilities/position",
  //       iconText: "P"
  //     },
  //     {
  //       name: "Shadow",
  //       path: "/utilities/shadow",
  //       iconText: "S"
  //     }
  //   ]
  // },
  // {
  //   name: "Sessions",
  //   icon: "trending_up",
  //   children: [
  //     {
  //       name: "Sign in",
  //       iconText: "SI",
  //       path: "/session/signin"
  //     },
  //     {
  //       name: "Sign up",
  //       iconText: "SU",
  //       path: "/session/signup"
  //     },
  //     {
  //       name: "Forgot Password",
  //       iconText: "FP",
  //       path: "/session/forgot-password"
  //     },
  //     {
  //       name: "Error",
  //       iconText: "404",
  //       path: "/session/404"
  //     }
  //   ]
  // },
  // {
  //   name: "Pages",
  //   icon: "view_carousel",
    
  //   children: [
  //     {
  //       name: "Pricing",
  //       icon: "blur_on",
  //       path: "/others/pricing",
        
  //     },
  //     {
  //       name: "Left Sidebar Card",
  //       path: "/page-layouts/Left-sidebar-card",
  //       iconText: "L"
  //     }

  //     // {
  //     //   name: "User Profile",
  //     //   path: "/page-layouts/user-profile",
  //     //   iconText: "U"
  //     // }
  //   ]
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
    
  //   children: [
  //     {
  //       name: "Echarts",
  //       path: "/charts/echarts",
  //       iconText: "E"
  //     },
  //     // {
  //     //   name: "Recharts",
  //     //   path: "/charts/recharts",
  //     //   iconText: "R"
  //     // },
  //     {
  //       name: "React Vis",
  //       path: "/charts/react-vis",
  //       iconText: "R"
  //     },
  //     {
  //       name: "Victory Chart",
  //       path: "/charts/victory-charts",
  //       iconText: "V"
  //     }
  //   ]
  // },
  // {
  //   name: "Map",
  //   icon: "add_location",
  //   path: "/map"
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];
