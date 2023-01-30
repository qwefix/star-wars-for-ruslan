import Search from "../../components/Search/Search";
import c from "./style.module.scss";
import logoImg from "../../assets/images/logo.png";
const SearchPage: React.FC = () => {
  return (
    <main className={c.wrapper}>
      <img className={c.logo} src={logoImg} alt='Star Wars Logo' />
      <Search />
    </main>
  );
};

export default SearchPage;
