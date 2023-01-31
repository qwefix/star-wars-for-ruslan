import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import PeoplePage from "../pages/ItemsPage/PeoplePage/PeoplePage";
import SearchPage from "../pages/searchPage/SearchPage";
import { ItemTypeEnum } from "../types/types";
import PlanetPage from "../pages/ItemsPage/PlanetPage/PlanetPage";
import StarshipPage from "../pages/ItemsPage/StarshipPage/StarshipPage";
import AllItemsPage from "../pages/AllItemsPage/AllItemsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <SearchPage />,
      },
      {
        path: `${ItemTypeEnum.people}/:id`,
        element: <PeoplePage />,
      },
      {
        path: `${ItemTypeEnum.starships}/:id`,
        element: <StarshipPage />,
      },
      {
        path: `${ItemTypeEnum.planets}/:id`,
        element: <PlanetPage />,
      },
      {
        path: `${ItemTypeEnum.planets}/:id`,
        element: <PlanetPage />,
      },
      {
        path: `allItems`,
        element: <AllItemsPage />,
      },
      {
        path: "*",
        element: <Navigate to='/' />,
      },
    ],
  },
]);

export default router;
