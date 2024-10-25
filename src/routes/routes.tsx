import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Layout from "../layout/layout";
import Register from "../pages/register/register";
import Accounts from "../pages/accounts/accounts";
import Transactions from "../pages/transactions/transactions";
import { AuthProvider } from "../auth/authcontext";
import ProtectedRoute from "./protected-route";
import Budgets from "../pages/budgets/budgets";

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
                path: "accounts",
                element: <Accounts />
            },
            {
                path: "transactions",
                element: <Transactions />
            },
            {
                path: "budgets",
                element: <Budgets />
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