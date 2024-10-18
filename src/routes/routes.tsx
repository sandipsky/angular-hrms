import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Home from "../pages/home/home";
import Layout from "../layout/layout";
import Register from "../pages/register/register";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            {
                path: "products",
                // element: <Products />
            },
            {
                path: "products/:id",
                // element: <ProductDetail />
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