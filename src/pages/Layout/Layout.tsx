import { Outlet } from "react-router-dom";
import c from "./style.module.scss";

const Layout: React.FC = () => {
  return (
    <div className={c.wrapper}>
      <Outlet />
    </div>
  );
};

export default Layout;
