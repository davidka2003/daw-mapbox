import React from "react";

export interface NavbarRouteI {
  title: Required<string>;
  link: Required<string>;
  component: Required<React.FC>;
}
export const NavbarRoutes = <NavbarRouteI[]>[
  {
    title: "Main",
    link: "*",
    // component
  },
];
