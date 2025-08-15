import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef } from "react";
import Button from "../Assets/Button";
import { RemoveBoldSolid } from "../Icons/RemoveBoldSolid";
type SliderStatus = {
  open: boolean;
  slide: number;
};
export default function ImageSlider({
  slideState,
  setSlideStatus,
  images,
}: {
  slideState: SliderStatus;
  setSlideStatus: (s: SliderStatus) => void;
  images: Array<string>;
}) {
  let sliderRef = useRef<any>(null);

  useEffect(() => {
    sliderRef.current.slickGoTo(slideState.slide);
  }, [slideState]);
  return (
    <div className="fixed top-0 right-0 z-[99] w-screen h-screen bg-black/60">
      <div className="flex relative items-center h-full justify-center">
        <Button
          className="absolute bg-transparent cursor-pointer top-5 right-5"
          onClick={() => setSlideStatus({ open: false, slide: 0 })}
        >
          <RemoveBoldSolid width={32} height={32} />{" "}
        </Button>
        <div className="block  w-[90%]">
          <div className="slider-container">
            <Slider
              ref={(slider) => {
                sliderRef.current = slider!;
              }}
              slidesToShow={1}
              slidesToScroll={1}
              dots
              rtl
            >
              {images.map((item) => (
                <div
                  className="flex relative z-20 items-center justify-center"
                  key={item}
                >
                  <img className="mx-auto max-w-full md:max-w-5xl" src={item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
