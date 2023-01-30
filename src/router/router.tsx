import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import Layout from "../pages/Layout/Layout";
import SearchPage from "../pages/searchPage/SearchPage";
import { ItemTypeEnum } from "../types/types";

const Test: React.FC = (props) => {
   let location = useParams();
  console.log(location);
  return <>test</>;
};

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
        element: <Test />,
      },
      {
        path: `${ItemTypeEnum.starships}/:id`,
        element: <Test />,
      },
      {
        path: `${ItemTypeEnum.planets}/:id`,
        element: <Test />,
      },
      {
        path: "*",
        element: <Navigate to='/' />,
      },
    ],
  },
]);

export default router;
