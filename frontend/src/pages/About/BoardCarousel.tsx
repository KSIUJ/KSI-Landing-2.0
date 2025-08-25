import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import BoardMemberCard from "../../components/BoardMemberCard";
import { boardMembersWithoutLeaders } from "../../assets/images/about/board25-26";
const BoardCarousel = () => {
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
        {boardMembersWithoutLeaders.map(({ image, memberName, role }) => (
          <SwiperSlide key={memberName} className="!h-auto !px-2">
            <BoardMemberCard
              imageSrc={image}
              name={memberName}
              role={role}
              className="p-3"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default BoardCarousel;
