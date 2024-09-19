import Slider from "react-slick";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function Trust(props) {
  const [skeletonCount, setSkeletonCount] = useState(4);
  const { trustData, loading } = useApiData();
  const { t } = useTranslation(); // Add translation hook

  const settings = {
    ...customSliderSettings,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // Mobile devices
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  useEffect(() => {
    const updateSkeletonCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSkeletonCount(2); // 2 skeletons on small screens
      } else {
        setSkeletonCount(4); // 4 skeletons on large screens
      }
    };

    updateSkeletonCount(); // Initial check
    window.addEventListener("resize", updateSkeletonCount);

    return () => {
      window.removeEventListener("resize", updateSkeletonCount);
    };
  }, []);

  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color

  return (
    <div className="myContainer py-6">
      <h2 className="heading2 lg:mb-8 mb-4">{t("trust.heading")}</h2>{" "}
      <div>
        {loading ? (
          <div className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-2`}>
            {Array(skeletonCount)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    className="trustSkeleton"
                    baseColor={skeletonBaseColor} // Set base color
                    highlightColor={skeletonHighlightColor} // Set highlight color
                  />
                </div>
              ))}
          </div>
        ) : (
          <Slider {...settings}>
            {trustData.map((item, index) => (
              <div key={index} className="lg:pe-3 pe-3">
                <div className="bg-primary rounded-lg flexCenter lg:h-40 h-25 lg:p-6 p-2 transition-transform transform lg:hover:scale-105 shadow-md lg:hover:shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-contain w-full xl:h-96 md:h-32 h-16 max-w-full max-h-full"
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default Trust;
