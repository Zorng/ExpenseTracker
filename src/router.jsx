import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Summary from "./pages/Summary";
import NotFound from "./pages/NotFound.jsx";

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/records", element: <Records /> },
    { path: "/summary", element: <Summary /> },
    { path: "*", element: <NotFound /> }, // 404 Page
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}