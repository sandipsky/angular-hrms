import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Layout from "../layout/layout";
import Register from "../pages/register/register";
import Transactions from "../pages/transactions/transactions";
import { AuthProvider } from "../context/authcontext";
import ProtectedRoute from "./protected-route";
import Category from "../pages/category/category";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthProvider> <ProtectedRoute><Layout /></ProtectedRoute> </AuthProvider>,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "transactions",
                element: <Transactions />
            },
            {
                path: "category",
                element: <Category />
            },
        ],
    },
    {
        path: "/login",
        element: <AuthProvider> <Login /> </AuthProvider>
    },
    {
        path: "/register",
        element: <Register />
    },
]);