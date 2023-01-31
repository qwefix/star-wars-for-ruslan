import {
  Button,
  Group,
  IconButton,
  Popover,
  SearchIcon,
  Spinner,
  TextInput,
} from "evergreen-ui";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { searchApi } from "./searchApi";
import {
  FilterType,
  ItemTypeEnum,
  MixedType,
  PeopleType,
  PlanetsType,
  StarshipType,
} from "../../types/types";
import c from "./style.module.scss";
import { Link, useNavigate } from "react-router-dom";

const renderDescriptionText = (item: MixedType) => {
  if (item.type === ItemTypeEnum.people) {
    return (item as PeopleType).gender;
  }
  if (item.type === ItemTypeEnum.starships) {
    return (item as StarshipType).model;
  }
  if (item.type === ItemTypeEnum.planets) {
    return (item as PlanetsType).terrain;
  }
};

type SearchProps = {
  onFilterSelect?: (filters: ItemTypeEnum[]) => void;
};

const Search: React.FC<SearchProps> = ({ onFilterSelect }) => {
  const navigate = useNavigate();

  const [searchString, setSearchString] = useState("");

  const [filters, setFilters] = useState<FilterType[]>([
    {
      label: "Peoples",
      value: ItemTypeEnum.people,
      isSelected: false,
    },
    {
      label: "Starships",
      value: ItemTypeEnum.starships,
      isSelected: false,
    },
    {
      label: "Planets",
      value: ItemTypeEnum.planets,
      isSelected: false,
    },
  ]);

  useEffect(() => {
    if (onFilterSelect)
      onFilterSelect(filters.filter((f) => f.isSelected).map((f) => f.value));
  }, [onFilterSelect, filters]);

  const [isListOpened, setIsListOpened] = useState(false);

  const { isLoading, data } = useQuery(["search", filters, searchString], () =>
    searchApi(searchString, filters)
  );

  const onFilterClick = (value: string) => {
    if (
      filters.filter((f) => f.value !== value).filter((f) => f.isSelected)
        .length >= 2
    ) {
      setFilters(filters.map((f) => ({ ...f, isSelected: false })));
      return;
    }
    setFilters(
      filters.map((f) =>
        f.value === value ? { ...f, isSelected: !f.isSelected } : f
      )
    );
  };

  const onSearchEnter = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (isLoading || !data?.length) return;
    navigate(data[0].request);
  };

  const renderList = useMemo(() => {
    if (!searchString) {
      return <div className={c.emptyList}>Start typing to see results</div>;
    }
    if (isLoading) {
      return (
        <div className={c.emptyList}>
          <Spinner size={16} />
        </div>
      );
    }
    if (!data?.length) {
      return <div className={c.emptyList}>No results</div>;
    }
    return (
      <div className={c.searchListContainer}>
        <div className={c.list}>
          {data.map((item) => (
            <Link to={`/${item.request}`} className={c.item} key={item.url}>
              <div className={c.ava}>
                <img src={item.img} alt={item.type} />
              </div>
              <p className={c.name}>{item.name}</p>
              <p className={c.desc}>{renderDescriptionText(item)}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }, [searchString, isLoading, data]);

  return (
    <div className={c.wrapper}>
      <Link className={c.allLink} to='/allItems'>
        Browse all
      </Link>
      <Popover content={renderList} minHeight={150} isShown={isListOpened}>
        <Group className={c.inputGroup}>
          <TextInput
            onFocus={() => setIsListOpened(true)}
            onBlur={() => setIsListOpened(false)}
            className={c.input}
            type='search'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchString(e.target.value)
            }
            value={searchString}
            size='large'
            placeholder='Search by name'
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onSearchEnter(e);
              }
            }}
          />
          <IconButton
            className={c.searchButton}
            onClick={onSearchEnter}
            size='large'
            icon={SearchIcon}
            disabled={!data?.length}
          />
        </Group>
      </Popover>
      <Group className={c.filters}>
        {filters.map(({ label, value, isSelected }) => (
          <Button
            className={c.filter}
            key={label}
            isActive={isSelected}
            onClick={() => onFilterClick(value)}
          >
            {label}
          </Button>
        ))}
      </Group>
    </div>
  );
};

export default Search;
