import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../Pages/Home/Home";
import AvailableFoods from "../Pages/Foods/AvailableFoods";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Profile from "../Pages/Profile/Profile";
import AddFood from "../Pages/Foods/AddFood";
import ManageMyFoods from "../Pages/Foods/ManageMyFoods";
import MyFoodRequests from "../Pages/Foods/MyFoodRequests";
import FoodDetails from "../Pages/Foods/FoodDetails";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import About from "../Pages/About/About";
import PrivateRoute from "./PrivateRoute";
import FoodCard from "../components/FoodCard";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/availableFoods",
        Component: AvailableFoods,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/search-food",
        Component: FoodCard,
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "add-food",
        element: <AddFood />
      },
      {
        path: "manage-foods", 
        element: <ManageMyFoods />
      },
      {
        path: "my-requests",
        element: <MyFoodRequests />
      }
    ]
  },
  { 
    path: "/*", 
    element: <ErrorPage /> 
  },
]);
