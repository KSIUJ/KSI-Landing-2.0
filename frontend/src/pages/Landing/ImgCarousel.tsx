import React, { useMemo } from "react";

type AutoCarouselProps = {
  images: { src: string; alt?: string }[];
  durationSeconds?: number;
  heightClass?: string; 
};

export const AutoCarousel: React.FC<AutoCarouselProps> = ({
  images,
  durationSeconds,
  heightClass = "h-48",
}) => {

  const duration = useMemo(() => {
    if (typeof durationSeconds === "number" && durationSeconds > 0) {
      return `${durationSeconds}s`;
    }
    const perImage = 6; 
    const computed = Math.max(12, images.length * perImage); 
    return `${computed}s`;
  }, [images.length, durationSeconds]);

  
  if (!images || images.length === 0) return null;

  
  const doubled = [...images, ...images];

  return (
    <div className="marquee" aria-hidden="false">
      <div
        className="marquee__track"
        style={{ ["--marquee-duration" as any]: duration } as React.CSSProperties}
      >
        {doubled.map((img, idx) => (
          <div key={`${idx}-${img.src}`} className="marquee__item">
            <img
              src={img.src}
              className={`${heightClass} w-auto object-cover block rounded-3xl mt-5`}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoCarousel;
