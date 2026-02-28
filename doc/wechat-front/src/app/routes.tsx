import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CoursesPage } from "./pages/CoursesPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CoursesPage },
      { path: "orders", Component: OrdersPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
