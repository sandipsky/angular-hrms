import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Layout from "../layout/layout";
import Register from "../pages/register/register";
import Accounts from "../pages/accounts/accounts";
import Transactions from "../pages/transactions/transactions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            {
                path: "accounts",
                element: <Accounts />
            },
            {
                path: "transactions",
                element: <Transactions />
            },
            {
                path: "products",
                element: <Accounts />
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
]);