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

  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color

  const renderSkeletons = () => (
    <div>
      <Skeleton
        className="showcaseSkeleton"
        borderRadius="0.5rem"
        baseColor={skeletonBaseColor} // Set base color
        highlightColor={skeletonHighlightColor}
      />
    </div>
  );

  return (
    <div className="myContainer slider-container relative lg:mt-0 mt-28">
      {loading ? (
        renderSkeletons()
      ) : (
        <Slider {...sliderSettings}>
          {repeatedData.map((data, index) => (
            <img
              key={index}
              src={data.image}
              alt={`Slide ${index}`}
              className="rounded-lg h-32 md:h-auto"
            />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Showcase;
