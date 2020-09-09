export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/index"),
  },
  {
    path: "/games",
    name: "Games",
    component: { render: (c) => c("router-view") },

    children: [
      {
        path: "",
        name: "Games",
        component: () => import("@/pages/Games"),
      },
      {
        path: "simon",
        name: "Simon",
        component: () => import("@/pages/Games/Simon"),
      },
      {
        path: "snake",
        name: "Snake",
        component: () => import("@/pages/Games/Snake"),
      },
    ],
  },
  {
    path: "/experiments",
    name: "Experiments",
    component: { render: (c) => c("router-view") },
    children: [
      {
        path: "",
        name: "Experiments",
        component: () => import("@/pages/Experiments"),
      },
      {
        path: "switch",
        name: "Switch",
        component: () => import("@/pages/Experiments/Switch"),
      },
    ],
  },
];
