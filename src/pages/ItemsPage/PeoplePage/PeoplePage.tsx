import Search from "../../../components/Search/Search";
import c from "../style.module.scss";
import BackButton from "../../../components/BackButton/BackButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
import {
  peopleItemApi,
  planetsItemApi,
  starshipsItemApi,
  ninePeopleApi,
} from "../itemsApis";
import { Spinner } from "evergreen-ui";
import { ItemTypeEnum } from "../../../types/types";
import { useEffect } from "react";
import SwiperComponent from "../../../components/Swiper/SwiperComponent";

const PeoplePage: React.FC = () => {
  const navigate = useNavigate();
  let { id = "" } = useParams<{ id: string }>();
  const {
    isLoading: isPeopleLoading,
    data: item,
    error,
  } = useQuery(["peopleItemApi", id], () => peopleItemApi(id));

  const { isLoading: isPlanetLoading, data: homeworld } = useQuery(
    ["planetsItemApi", item?.homeworld],
    () => {
      if (!item) return undefined;
      return planetsItemApi(item.homeworld);
    }
  );

  const starshipsQueries = useQueries(
    item?.starships.map((starship) => ({
      queryKey: ["starshipsItemApi", starship],
      queryFn: () => starshipsItemApi(starship),
    })) || []
  );

  const { isLoading: isNinePeoplesLoading, data: ninePeoples } = useQuery(
    ["ninePeopleApi", id],
    () => ninePeopleApi(id)
  );

  useEffect(() => {
    if (error) navigate("/");
  }, [error, navigate]);

  return (
    <main className={c.wrapper}>
      <BackButton className={c.backButton} />
      <Search />
      {isPeopleLoading && (
        <main className={c.loading}>
          <Spinner />
        </main>
      )}
      {item && (
        <main className={c.main}>
          <h1>{item.name}</h1>
          <section className={c.data}>
            <div className={c.ava}>
              <img src={item.img} alt={item.name} />
            </div>
            <div className={c.table}>
              <div className={c.row}>
                <span>Birth year:</span>
                <span>{item.birth_year}</span>
              </div>
              <div className={c.row}>
                <span>Gender:</span>
                <span>{item.gender}</span>
              </div>
              <div className={c.row}>
                <span>Hair color:</span>
                <span>{item.hair_color}</span>
              </div>
              <div className={c.row}>
                <span>Eye color:</span>
                <span>{item.eye_color}</span>
              </div>
              <div className={c.row}>
                <span>Skin color:</span>
                <span>{item.skin_color}</span>
              </div>
              <div className={c.row}>
                <span>Height:</span>
                <span>{item.height}</span>
              </div>
              <div className={c.row}>
                <span>Mass:</span>
                <span>{item.mass}</span>
              </div>
              <div className={c.row}>
                <span>Homeworld:</span>
                <span>
                  {isPlanetLoading ? (
                    "...loading"
                  ) : homeworld ? (
                    <Link
                      className={c.link}
                      to={`/${ItemTypeEnum.planets}/${homeworld.url}`}
                    >
                      {homeworld.name}
                    </Link>
                  ) : (
                    "Unknown"
                  )}
                </span>
              </div>
              <div className={c.row}>
                <span>Starships:</span>
                <div className={c.list}>
                  {starshipsQueries.length
                    ? starshipsQueries.map(
                        (
                          { isLoading: isStarshipLoading, data: starship },
                          i
                        ) => (
                          <div key={item.starships[i]} >
                            {isStarshipLoading ? (
                              "...loading"
                            ) : starship ? (
                              <Link
                                className={c.link}
                                to={`/${ItemTypeEnum.starships}/${starship.url}`}
                              >
                                {starship.name}
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
          {isNinePeoplesLoading && (
            <section className={c.loading}>
              <Spinner />
            </section>
          )}
          {ninePeoples?.length && (
            <section className={c.swiper}>
              <SwiperComponent
                data={ninePeoples?.map((p) => ({
                  id: p.url,
                  name: p.name,
                  description: p.gender,
                  img: p.img,
                }))}
                itemsType={ItemTypeEnum.people}
              />
            </section>
          )}
        </main>
      )}
    </main>
  );
};

export default PeoplePage;
