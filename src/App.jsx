import React, { Suspense, lazy, Component } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

import Layout from "./component/Layout";
import Home from "./component/Home";
import SearchMovie from "./pages/SearchMovie";

const DynamicPage = lazy(() => import("./pages/DynamicPage"));
const TvShow = lazy(() => import("./pages/TVExplore"));
const MovieShow = lazy(() => import("./pages/MovieExplore"));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
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
        {
          path: "Details/:id",
          element: <DynamicPage />,
        },
        {
          path: "search/:query",
          element: <SearchMovie/>,
        },
        {
          path: "Explore/Movie",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ErrorBoundary>
                <MovieShow />
              </ErrorBoundary>
            </Suspense>
          ),
        },
        {
          path: "Explore/TV",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ErrorBoundary>
                <TvShow />
              </ErrorBoundary>
            </Suspense>
          ),
        },
      ],
      errorElement: <h1>Not found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
