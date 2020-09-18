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
        name: "GamesHome",
        component: () => import("@/pages/Games"),
      },
      {
        path: "simon",
        name: "Simon",
        component: () => import("@/pages/Games/Simon"),
        meta: {
          title: "Playground | Simon",
        },
      },
      {
        path: "snake",
        name: "Snake",
        component: () => import("@/pages/Games/Snake"),
        meta: {
          title: "Playground | Snack",
        },
      },
      {
        path: "puissance4",
        name: "Puissance 4",
        component: () => import("@/pages/Games/Puissance4"),
        meta: {
          title: "Playground | Puissance4",
        },
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
        name: "ExperimentsHome",
        component: () => import("@/pages/Experiments"),
      },
      {
        path: "switch",
        name: "Switch",
        component: () => import("@/pages/Experiments/Switch"),
        meta: {
          title: "Playground | Switch",
        },
      },
      {
        path: "palindrome",
        name: "Palindrome",
        component: () => import("@/pages/Experiments/Palindrome"),
        meta: {
          title: "Playground | Palindrome",
        },
      },
    ],
  },
];
