import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";

import "swiper/css/bundle";
import BoardMemberCard from "../../components/BoardMemberCard";
import { boardMembersWithoutLeaders } from "../../assets/images/about/board25-26";

// type RoleTitle = "president" | "vicepresident" | "treasurer" | "member";

// export async function fetchBoardMembers(
//   apiBaseUrl: string = "http://localhost:8000",
//   roleTitle?: RoleTitle
// ) {
//   const url = new URL(`${apiBaseUrl.replace(/\/$/, "")}/board`);
//   if (roleTitle) url.searchParams.set("role_title", roleTitle);

//   const res = await fetch(url.toString());
//   if (!res.ok) throw new Error(`HTTP ${res.status}`);
//   return res.json(); // Promise<BoardApiItem[]>
// }

// interface BoardMember {
//   id: number;
//   name: string;
//   role_title: RoleTitle;
//   image_url?: string | null;
// }

const BoardCarousel = () => {
  // const [members, setMembers] = useState<BoardMember[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       const membersFetched = await fetchBoardMembers(undefined, "member");
  //       const treasurers = await fetchBoardMembers(undefined, "treasurer");
  //       setMembers([...membersFetched, ...treasurers]);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   load();
  // }, []);

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
        {boardMembersWithoutLeaders.map(({ image, memberName, role }) => {
          // const safeImageSrc: string =
          //   image_url ??
          //   `https://ui-avatars.com/api/?name=${encodeURIComponent(
          //     name
          //   )}&background=CBD5E1&color=2B2D42`;
          return (
            <SwiperSlide key={memberName} className="!h-auto !px-2">
              <BoardMemberCard
                imageSrc={image}
                name={memberName}
                role={role}
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
