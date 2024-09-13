import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";

function Showcase() {
  const { slideData, loading } = useApiData();
  const repeatedData = Array(2).fill(slideData).flat();

  const sliderSettings = {
    ...customSliderSettings,
  };

  const renderSkeletons = () => (
    <div>
      <Skeleton height={400} style={{ borderRadius: "0.5rem" }} />
    </div>
  );

  return (
    <div className="myContainer slider-container relative">
      {loading ? (
        renderSkeletons()
      ) : (
        <Slider {...sliderSettings}>
          {repeatedData.map((data, index) => (
            <img
              key={index}
              src={data.image}
              alt={`Slide ${index}`}
              className="rounded-lg"
            />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Showcase;
