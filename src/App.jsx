import { useDispatch } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";

import Layout from "./component/Layout";

import Home from "./component/Home";

function App() {
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
      ],
      errorElement: <h1>Not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
