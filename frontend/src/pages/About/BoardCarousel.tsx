import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { mapBoardRoles } from "../http";
import "swiper/css/bundle";
import BoardMemberCard from "../../components/BoardMemberCard";
import { fetchBoardMembers } from "../http";
import type { BoardMember } from "../http";
const BoardCarousel = () => {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const membersFetched = await fetchBoardMembers(undefined, "member");
        const treasurers = await fetchBoardMembers(undefined, "treasurer");
        setMembers([...membersFetched, ...treasurers]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl w-full mt-6">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        grabCursor
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        watchOverflow
        centeredSlides
        breakpoints={{
          0: { slidesPerView: 1, centeredSlides: true },
          640: { slidesPerView: 2, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: true },
        }}
        className="!pb-8"
        style={{
          //@ts-ignore
          "--swiper-pagination-color": "#2b2d42",
          "--swiper-pagination-bullet-inactive-color": "#CBD5E1",
        }}
      >
        {members.map(({ photo_url, name, role_title }) => {
          const roleName = mapBoardRoles[role_title];

          return (
            <SwiperSlide key={name} className="!h-auto !px-2">
              <BoardMemberCard
                imageSrc={photo_url}
                name={name}
                role={roleName}
                className="p-3"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default BoardCarousel;
