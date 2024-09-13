import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom Previous Arrow
export const PreviousArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 z-10 bg-white border border-gray-500 lg:p-2 rounded-full"
    style={{ top: "50%", transform: "translateY(-50%)" }}
  >
    <IoIosArrowBack className="text-gray-500 icon" />
  </button>
);

// Custom Next Arrow
export const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 z-10 bg-white border border-gray-500 lg:p-2 rounded-full"
    style={{ top: "50%", transform: "translateY(-50%)" }}
  >
    <IoIosArrowForward className="text-gray-500 icon" />
  </button>
);

// Slider Settings
export const customSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <PreviousArrow />,
  nextArrow: <NextArrow />,
  appendDots: (dots) => (
    <div>
      <ul style={{ margin: "30px" }}>{dots}</ul>
    </div>
  ),
};
