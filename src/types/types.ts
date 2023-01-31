export type PeopleResponseType = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
};

export type StarshipResponseType = {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
};

export type PlanetResponseType = {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
};

export type MixedResponseType =
  | PeopleResponseType
  | StarshipResponseType
  | PlanetResponseType;

export enum ItemTypeEnum {
  planets = "planets",
  starships = "starships",
  people = "people",
}

export type PlanetsType = PlanetResponseType & {
  type: ItemTypeEnum.planets;
  img: string;
  request: string;
};
export type PeopleType = PeopleResponseType & {
  type: ItemTypeEnum.people;
  img: string;
  request: string;
};
export type StarshipType = StarshipResponseType & {
  type: ItemTypeEnum.starships;
  img: string;
  request: string;
};

export type MixedType = PlanetsType | PeopleType | StarshipType;

export type FilterType = {
  label: string;
  value: ItemTypeEnum;
  isSelected: boolean;
};

export type AllItemsPageItem = {
  id: string;
  name: string;
  description: string;
  img: string;
  type: ItemTypeEnum;
};
