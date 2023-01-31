import Search from "../../../components/Search/Search";
import c from "../style.module.scss";
import BackButton from "../../../components/BackButton/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
import {
  peopleItemApi,
  planetsItemApi,
  ninePlanetsApi,
} from "../itemsApis";
import { Spinner } from "evergreen-ui";
import { ItemTypeEnum } from "../../../types/types";
import { useEffect } from "react";
import SwiperComponent from "../../../components/Swiper/SwiperComponent";

const PlanetPage: React.FC = () => {
  const navigate = useNavigate();
  let { id = "" } = useParams<{ id: string }>();
  const {
    isLoading: isPlanetLoading,
    data: planet,
    error,
  } = useQuery(["planetsItemApi", id], () => planetsItemApi(id));

  const peopleQueries = useQueries(
    planet?.residents.map((people) => ({
      queryKey: ["peopleItemApi", people],
      queryFn: () => peopleItemApi(people),
    })) || []
  );

  const { isLoading: isNinePlanetsLoading, data: ninePlanets } = useQuery(
    ["ninePlanetsApi", id],
    () => ninePlanetsApi(id)
  );

  useEffect(() => {
    if (error) navigate("/");
  }, [error, navigate]);

  return (
    <main className={c.wrapper}>
      <BackButton className={c.backButton} />
      <Search />
      {isPlanetLoading && (
        <main className={c.loading}>
          <Spinner />
        </main>
      )}
      {planet && (
        <main className={c.main}>
          <h1>{planet.name}</h1>
          <section className={c.data}>
            <div className={c.ava}>
              <img src={planet.img} alt={planet.name} />
            </div>
            <div className={c.table}>
              <div className={c.row}>
                <span>Climate:</span>
                <span>{planet.climate}</span>
              </div>
              <div className={c.row}>
                <span>Diameter:</span>
                <span>{planet.diameter}</span>
              </div>
              <div className={c.row}>
                <span>Gravity:</span>
                <span>{planet.gravity}</span>
              </div>
              <div className={c.row}>
                <span>Orbital period:</span>
                <span>{planet.orbital_period}</span>
              </div>
              <div className={c.row}>
                <span>Population:</span>
                <span>{planet.population}</span>
              </div>
              <div className={c.row}>
                <span>Rotation period:</span>
                <span>{planet.rotation_period}</span>
              </div>
              <div className={c.row}>
                <span>Surface water:</span>
                <span>{planet.surface_water}</span>
              </div>
              <div className={c.row}>
                <span>Terrain:</span>
                <span>{planet.terrain}</span>
              </div>
              <div className={c.row}>
                <span>Residents:</span>
                <div className={c.list}>
                  {peopleQueries.length
                    ? peopleQueries.map(
                        (
                          { isLoading: isStarshipLoading, data: person },
                          i
                        ) => (
                          <div key={planet.residents[i]} >
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
                  description: p.terrain,
                  img: p.img,
                }))}
                itemsType={ItemTypeEnum.planets}
              />
            </section>
          )}
        </main>
      )}
    </main>
  );
};

export default PlanetPage;
