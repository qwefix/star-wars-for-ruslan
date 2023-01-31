import axios from "axios";
import peopleImg from "../../assets/images/avatars/people.png";
import planetsImg from "../../assets/images/avatars/planets.png";
import starshipsImg from "../../assets/images/avatars/starships.png";
import { FilterType, ItemTypeEnum, MixedResponseType, MixedType } from "../../types/types";

const avatarsRelations = {
  people: peopleImg,
  planets: planetsImg,
  starships: starshipsImg,
};

export const searchApi: (
  searchString: string,
  filters: FilterType[]
) => Promise<MixedType[]> = async (searchString, filters) => {
  const filtersSelectedCount = filters.filter((f) => f.isSelected).length;
  let categories: ItemTypeEnum[] = [
    ItemTypeEnum.people,
    ItemTypeEnum.starships,
    ItemTypeEnum.planets,
  ];
  if (filtersSelectedCount !== 0) {
    categories = filters.filter((f) => f.isSelected).map((f) => f.value);
  }
  if (!searchString) return [];
  console.log(categories, searchString);

  const allPromises = categories.map((category) =>
    axios
      .get<{ results: MixedResponseType[] }>(
        `https://swapi.dev/api/${category}?search=${searchString}`
      )
      .then((r) =>
        r.data.results
          .filter(({ name }) =>
            name.toLowerCase().includes(searchString.toLowerCase())
          )
          .map(
            (item) =>
              ({
                ...item,
                type: category,
                img: avatarsRelations[category],
                request: item.url.split("/").slice(-3, -1).join("/"),
              } as MixedType)
          )
      )
  );

  const allResponses = await Promise.all(allPromises);

  return allResponses.flat();
};
