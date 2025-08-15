import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Paper from "../../components/Assets/Paper";

type Props = {};

export default function HomeSlider({}: Props) {
  return (
    <Paper>
      <div className="slider-container">
        <Slider slidesToShow={1} slidesToScroll={1} dots rtl>
          {["/thumb.JPG"].map((item) => (
            <div className="flex justify-center" key={item}>
              <img className="mx-auto" src={`/${item}`} />
            </div>
          ))}
        </Slider>
      </div>
    </Paper>
  );
}
