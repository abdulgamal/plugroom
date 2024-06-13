import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Home, Orders, Profile, Tables } from "@/pages/dashboard";
import Product from "./pages/dashboard/product";
import Venue from "./pages/dashboard/venue";
import Bookings from "./pages/dashboard/bookings";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   path: "/home",
      //   element: <Home />,
      // },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "users",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "bookings",
        path: "/bookings",
        element: <Bookings />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "orders",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "product",
        path: "/product",
        element: <Product />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "venues",
        path: "/venues",
        element: <Venue />,
      },
    ],
  },
];

export default routes;
