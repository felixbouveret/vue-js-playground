export default [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/index"),
  },
  {
    path: "/simon",
    name: "Simon",
    component: () => import("@/pages/Simon"),
  },
];
