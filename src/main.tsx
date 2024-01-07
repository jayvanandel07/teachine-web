import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.tsx";
import RegisterPage from "./pages/register.tsx";
import LaunchScreen from "./pages/launchscreen.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LaunchScreen />,
    },
    {
        path: "/home",
        element: <App />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
