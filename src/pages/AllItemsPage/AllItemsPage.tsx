import { Pagination, Spinner } from "evergreen-ui";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import Search from "../../components/Search/Search";
import { ItemTypeEnum } from "../../types/types";
import { allItemsApi } from "./allItemsApi";
import c from "./style.module.scss";

const AllItemsPage: React.FC = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["allItemsApi"],
    queryFn: allItemsApi,
    staleTime: Infinity,
  });

  const [appliedFilters, setAppliedFilters] = useState<ItemTypeEnum[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onFilterSelect = useCallback((filters: ItemTypeEnum[]) => {
    setCurrentPage(1);
    setAppliedFilters(filters);
  }, []);

  const allItems = useMemo(() => {
    if (!data?.length) return [];
    if (appliedFilters.length) {
      return data.filter((item) => appliedFilters.includes(item.type));
    }
    return data;
  }, [appliedFilters, data]);
  return (
    <main className={c.wrapper}>
      <BackButton className={c.backButton} />
      <Search onFilterSelect={onFilterSelect} />
      {isLoading ? (
        <section className={c.loading}>
          <Spinner color='white' />
        </section>
      ) : (
        <section className={c.listWrapper}>
          <div className={c.list}>
            {allItems
              .slice((currentPage - 1) * 25, currentPage * 25)
              .map((item) => (
                <Link
                  to={`/${item.type}/${item.id}`}
                  className={c.button}
                  key={`/${item.type}/${item.id}`}
                >
                  <div className={c.ava}>
                    <img src={item.img} alt={item.type} />
                  </div>
                  <p className={c.name}>{item.name}</p>
                  <p className={c.desc}>{item.description}</p>
                </Link>
              ))}
          </div>
          <Pagination
            className={c.pagination}
            onPageChange={(page) => setCurrentPage(page)}
            page={currentPage}
            totalPages={Math.ceil(allItems.length / 25)}
            onPreviousPage={() => setCurrentPage((page) => page - 1)}
            onNextPage={() => setCurrentPage((page) => page + 1)}
          ></Pagination>
        </section>
      )}
    </main>
  );
};

export default AllItemsPage;
