import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import c from "./style.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import { ItemTypeEnum } from "../../types/types";
import { Link } from "react-router-dom";

type SwiperProps = {
  data: {
    id: string;
    name: string;
    description: string;
    img: string;
  }[];
  itemsType: ItemTypeEnum;
};

const SwiperComponent: React.FC<SwiperProps> = ({ data, itemsType }) => {
  return (
    <div className={c.wrapper}>
      <Swiper
        slidesPerView={"auto"}
        className={c.swiper}
        spaceBetween={10}
        mousewheel
        modules={[Mousewheel]}
      >
        {data.map((item) => (
          <SwiperSlide>
            <Link
              to={`/${itemsType}/${item.id}`}
              className={c.button}
              key={item.id}
            >
              <div className={c.ava}>
                <img src={item.img} alt={itemsType} />
              </div>
              <p className={c.name}>{item.name}</p>
              <p className={c.desc}>{item.description}</p>
            </Link>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <Link to={`/allItems`} className={c.button}>
            <p className={c.name}>Browse more ...</p>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
