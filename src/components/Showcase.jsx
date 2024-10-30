import Slider from "react-slick";
import { customSliderSettings } from "../utils/sliderSettings";

const items = [
  {
    id: 1,
    image: "/assets/showcase1.jpg",
  },
  {
    id: 2,
    image: "/assets/showcase2.webp",
  },
];

function Showcase() {
  const repeatedData = Array(2).fill(items).flat();

  const sliderSettings = {
    ...customSliderSettings,
  };

  return (
    <div className="myContainer slider-container relative lg:mt-0 mt-28">
      <Slider {...sliderSettings}>
        {repeatedData.map((data, index) => (
          <img
            key={index}
            src={data.image}
            alt={`Slide ${index}`}
            className="rounded-lg h-32 md:h-96 object-fill"
          />
        ))}
      </Slider>
    </div>
  );
}

export default Showcase;
