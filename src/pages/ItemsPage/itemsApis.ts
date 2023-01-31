import { PlanetsType, StarshipType } from "./../../types/types";
import axios from "axios";
import { PeopleType } from "../../types/types";
import peopleImg from "../../assets/images/avatars/people.png";
import planetsImg from "../../assets/images/avatars/planets.png";
import starshipsImg from "../../assets/images/avatars/starships.png";

export const peopleItemApi: (
  id: string | undefined
) => Promise<PeopleType | null> = async (id) => {
  if (!id) return null;
  const response = await axios.get<PeopleType>(
    `https://swapi.dev/api/people/${id}`
  );
  return {
    ...response.data,
    img: peopleImg,
    url: response.data.url.split("/").reverse()[1],
    homeworld: response.data.homeworld.split("/").reverse()[1],
    starships: response.data.starships.map(
      (starship) => starship.split("/").reverse()[1]
    ),
  };
};

export const ninePeopleApi: (
  id: string | undefined
) => Promise<PeopleType[] | null> = async (id) => {
  if (!id) return null;
  const {
    data: { count },
  } = await axios.get<{ results: PeopleType[]; count: number }>(
    `https://swapi.dev/api/people`
  );
  const firstPageNumber = Math.ceil(
    (Math.ceil(count / 10) - 1) * Math.random()
  );

  const {
    data: { results: firstPageArray },
  } = await axios.get<{ results: PeopleType[]; count: number }>(
    `https://swapi.dev/api/people/?page=${firstPageNumber}`
  );
  const {
    data: { results: secondPageArray },
  } = await axios.get<{ results: PeopleType[]; count: number }>(
    `https://swapi.dev/api/people/?page=${firstPageNumber + 1}`
  );

  const result = [...firstPageArray, ...secondPageArray];
  console.log(result.map((r) => r.name));

  const transformed = result.map((item) => ({
    ...item,
    img: peopleImg,
    url: item.url.split("/").reverse()[1],
  }));
  const shuffled = transformed
    .filter((item) => item.url !== id)
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 9);
};

export const planetsItemApi: (
  id: string | undefined
) => Promise<PlanetsType | null> = async (id) => {
  if (!id) return null;
  const response = await axios.get<PlanetsType>(
    `https://swapi.dev/api/planets/${id}`
  );
  return {
    ...response.data,
    img: planetsImg,
    url: response.data.url.split("/").reverse()[1],
    residents: response.data.residents.map(
      (resident) => resident.split("/").reverse()[1]
    ),
  };
};

export const ninePlanetsApi: (
  id: string | undefined
) => Promise<PlanetsType[] | null> = async (id) => {
  if (!id) return null;
  const {
    data: { count },
  } = await axios.get<{ results: PlanetsType[]; count: number }>(
    `https://swapi.dev/api/planets`
  );
  const firstPageNumber = Math.ceil(
    (Math.ceil(count / 10) - 1) * Math.random()
  );

  const {
    data: { results: firstPageArray },
  } = await axios.get<{ results: PlanetsType[]; count: number }>(
    `https://swapi.dev/api/planets/?page=${firstPageNumber}`
  );
  const {
    data: { results: secondPageArray },
  } = await axios.get<{ results: PlanetsType[]; count: number }>(
    `https://swapi.dev/api/planets/?page=${firstPageNumber + 1}`
  );

  const result = [...firstPageArray, ...secondPageArray];
  console.log(result.map((r) => r.name));

  const transformed = result.map((item) => ({
    ...item,
    img: planetsImg,
    url: item.url.split("/").reverse()[1],
  }));
  const shuffled = transformed
    .filter((item) => item.url !== id)
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 9);
};

export const starshipsItemApi: (
  id: string | undefined
) => Promise<StarshipType | null> = async (id) => {
  if (!id) return null;
  const response = await axios.get<StarshipType>(
    `https://swapi.dev/api/starships/${id}`
  );
  return {
    ...response.data,
    img: starshipsImg,
    url: response.data.url.split("/").reverse()[1],
    pilots: response.data.pilots.map(
      (pilot) => pilot.split("/").reverse()[1]
    ),
  };
};

export const nineStarshipsApi: (
  id: string | undefined
) => Promise<StarshipType[] | null> = async (id) => {
  if (!id) return null;
  const {
    data: { count },
  } = await axios.get<{ results: StarshipType[]; count: number }>(
    `https://swapi.dev/api/starships`
  );
  const firstPageNumber = Math.ceil(
    (Math.ceil(count / 10) - 1) * Math.random()
  );

  const {
    data: { results: firstPageArray },
  } = await axios.get<{ results: StarshipType[]; count: number }>(
    `https://swapi.dev/api/starships/?page=${firstPageNumber}`
  );
  const {
    data: { results: secondPageArray },
  } = await axios.get<{ results: StarshipType[]; count: number }>(
    `https://swapi.dev/api/starships/?page=${firstPageNumber + 1}`
  );

  const result = [...firstPageArray, ...secondPageArray];
  console.log(result.map((r) => r.name));

  const transformed = result.map((item) => ({
    ...item,
    img: starshipsImg,
    url: item.url.split("/").reverse()[1],
  }));
  const shuffled = transformed
    .filter((item) => item.url !== id)
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 9);
};
