import { useState } from "react";
import ImageSlider from "./ImageSlider";
import { Media } from "../../types";

type SliderStatus = {
  open: boolean;
  slide: number;
};
export default function ImageGallery({ images }: { images: Array<Media> }) {
  const [slideState, setSlideState] = useState<SliderStatus>({
    open: false,
    slide: 0,
  });
  return (
    <div className="w-full lg:max-w-[200px]">
      {slideState.open ? (
        <ImageSlider
          images={images.map((i) => i.url)}
          slideState={slideState}
          setSlideStatus={setSlideState}
        />
      ) : null}
      <div
        onClick={() => setSlideState({ open: true, slide: 0 })}
        className="rounded-lg cursor-pointer overflow-hidden"
      >
        <img
          className="w-full"
          src={images.length > 0 ? images[0].url : "/No-Image.png"}
        />
      </div>

      <div className="flex gap-4 mt-4">
        {images.slice(1).map((i) => (
          <div
            key={i.url}
            onClick={() => setSlideState({ open: true, slide: i.id })}
            className="rounded-lg cursor-pointer overflow-hidden"
          >
            <img className="" src={`${i.url}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
