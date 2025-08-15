import { useState } from "react";
import ImageSlider from "../../components/DetailPage/ImageSlider";

const images = ["kooleh-book.jpg","page_1.png","page_2.png","page_3.png","page_4.png"]
type SliderStatus = {
  open: boolean;
  slide: number;
};
export default function ImageGallery() {
  const [slideState, setSlideState] = useState<SliderStatus>({
    open: false,
    slide: 0,
  });
  return (
    <div className="w-full lg:max-w-[200px]">
      {slideState.open ? (
        <ImageSlider images={images}  slideState={slideState} setSlideStatus={setSlideState} />
      ) : null}
      <div
        onClick={() => setSlideState({ open: true, slide: 0 })}
        className="rounded-lg cursor-pointer overflow-hidden"
      >
        <img className="w-full" src="/kooleh-book.jpg" />
      </div>

      <div className="flex overflow-x-scroll gap-4 mt-4">
        {images.map(
          (i, index) => (
            <div
              key={i}
              onClick={() => setSlideState({ open: true, slide: index })}
              className="rounded-lg min-w-[100px] cursor-pointer overflow-hidden"
            >
              <img  key={i} className="" src={`/${i}`} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
