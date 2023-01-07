import React from 'react';
import './Main.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {Toaster} from "react-hot-toast";
import AuthenticatedRoute from "./components/GuardedRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element:
            <AuthenticatedRoute>
                <HomePage />
            </AuthenticatedRoute>
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
]);

const Main = () => (
    <React.Fragment>
        <Toaster />
        <RouterProvider router={router}/>
    </React.Fragment>
)

export default Main;
