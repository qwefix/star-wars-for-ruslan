import Search from "../../../components/Search/Search";
import c from "../style.module.scss";
import BackButton from "../../../components/BackButton/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
import {
  peopleItemApi,
  starshipsItemApi,
  nineStarshipsApi,
} from "../itemsApis";
import { Spinner } from "evergreen-ui";
import { ItemTypeEnum } from "../../../types/types";
import { useEffect } from "react";
import SwiperComponent from "../../../components/Swiper/SwiperComponent";

const StarshipPage: React.FC = () => {
  const navigate = useNavigate();
  let { id = "" } = useParams<{ id: string }>();
  const {
    isLoading: isStarshipLoading,
    data: starship,
    error,
  } = useQuery(["planetsItemApi", id], () => starshipsItemApi(id));

  const peopleQueries = useQueries(
    starship?.pilots.map((people) => ({
      queryKey: ["peopleItemApi", people],
      queryFn: () => peopleItemApi(people),
    })) || []
  );

  const { isLoading: isNinePlanetsLoading, data: ninePlanets } = useQuery(
    ["nineStarshipsApi", id],
    () => nineStarshipsApi(id)
  );

  useEffect(() => {
    if (error) navigate("/");
  }, [error, navigate]);

  return (
    <main className={c.wrapper}>
      <BackButton className={c.backButton} />
      <Search />
      {isStarshipLoading && (
        <main className={c.loading}>
          <Spinner />
        </main>
      )}
      {starship && (
        <main className={c.main}>
          <h1>{starship.name}</h1>
          <section className={c.data}>
            <div className={c.ava}>
              <img src={starship.img} alt={starship.name} />
            </div>
            <div className={c.table}>
              <div className={c.row}>
                <span>MGLT:</span>
                <span>{starship.MGLT}</span>
              </div>
              <div className={c.row}>
                <span>Cargo capacity:</span>
                <span>{starship.cargo_capacity}</span>
              </div>
              <div className={c.row}>
                <span>Consumables:</span>
                <span>{starship.consumables}</span>
              </div>
              <div className={c.row}>
                <span>Cost in credits:</span>
                <span>{starship.cost_in_credits}</span>
              </div>
              <div className={c.row}>
                <span>Hyperdrive rating:</span>
                <span>{starship.hyperdrive_rating}</span>
              </div>
              <div className={c.row}>
                <span>Length:</span>
                <span>{starship.length}</span>
              </div>
              <div className={c.row}>
                <span>Manufacturer:</span>
                <span>{starship.manufacturer}</span>
              </div>
              <div className={c.row}>
                <span>Model:</span>
                <span>{starship.model}</span>
              </div>
              <div className={c.row}>
                <span>Passengers:</span>
                <span>{starship.passengers}</span>
              </div>
              <div className={c.row}>
                <span>Starship class:</span>
                <span>{starship.starship_class}</span>
              </div>
              <div className={c.row}>
                <span>Pilots:</span>
                <div className={c.list}>
                  {peopleQueries.length
                    ? peopleQueries.map(
                        (
                          { isLoading: isStarshipLoading, data: person },
                          i
                        ) => (
                          <div key={starship.pilots[i]} >
                            {isStarshipLoading ? (
                              "...loading"
                            ) : person ? (
                              <Link
                                className={c.link}
                                to={`/${ItemTypeEnum.people}/${person.url}`}
                              >
                                {person.name}
                              </Link>
                            ) : (
                              "Unknown"
                            )}
                          </div>
                        )
                      )
                    : "None"}
                </div>
              </div>
            </div>
          </section>
          <h2>Browse more</h2>
          {isNinePlanetsLoading && (
            <section className={c.loading}>
              <Spinner />
            </section>
          )}
          {ninePlanets?.length && (
            <section className={c.swiper}>
              <SwiperComponent
                data={ninePlanets?.map((p) => ({
                  id: p.url,
                  name: p.name,
                  description: p.model,
                  img: p.img,
                }))}
                itemsType={ItemTypeEnum.starships}
              />
            </section>
          )}
        </main>
      )}
    </main>
  );
};

export default StarshipPage;
