import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Header';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';
import TrafficLights from './TrafficLights';

function Layout() {
  return (
      <>
        <Header />
        <Outlet />
      </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/horizontal",
        element: <TrafficLights orientation="horizontal" />,
      },
      {
        path: "/vertical",
        element: <TrafficLights orientation="vertical" />,
      },
    ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;