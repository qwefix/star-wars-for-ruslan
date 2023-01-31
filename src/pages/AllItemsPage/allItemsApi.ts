import { ItemTypeEnum, PlanetsType, StarshipType } from "./../../types/types";
import axios from "axios";
import { AllItemsPageItem, MixedType, PeopleType } from "../../types/types";
import peopleImg from "../../assets/images/avatars/people.png";
import planetsImg from "../../assets/images/avatars/planets.png";
import starshipsImg from "../../assets/images/avatars/starships.png";

const imagesRelations: { [key in ItemTypeEnum]: string } = {
  people: peopleImg,
  planets: planetsImg,
  starships: starshipsImg,
};

export const allItemsApi: () => Promise<AllItemsPageItem[]> = async () => {
  const allPromises = [
    getAllCategory(ItemTypeEnum.people),
    getAllCategory(ItemTypeEnum.starships),
    getAllCategory(ItemTypeEnum.planets),
  ];
  const res = await Promise.all(allPromises);
  return res.flat().sort(() => 0.5 - Math.random());
};

const getAllCategory: (
  type: ItemTypeEnum
) => Promise<AllItemsPageItem[]> = async (type) => {
  let result: MixedType[] = [];
  const firstPageResponse = await axios.get<{
    results: MixedType[];
    count: number;
  }>(`https://swapi.dev/api/${type}/`);
  result = firstPageResponse.data.results;
  const count = firstPageResponse.data.count;
  const numberOfPagesLeft = Math.ceil((count - 1) / 10);
  let promises = [];
  for (let i = 2; i <= numberOfPagesLeft; i++) {
    promises.push(
      axios.get<{ results: MixedType[]; count: number }>(
        `https://swapi.dev/api/${type}?page=${i}`
      )
    );
  }
  const otherPagesResponse = await Promise.all(promises);
  result = otherPagesResponse.reduce(
    (acc, data) => [...acc, ...data.data.results],
    result
  );
  return result?.map((p) => ({
    id: p.url.split("/").reverse()[1],
    name: p.name,
    description:
      (p as PeopleType).gender ||
      (p as PlanetsType).terrain ||
      (p as StarshipType).model,
    img: imagesRelations[type],
    type: type,
  }));
};
