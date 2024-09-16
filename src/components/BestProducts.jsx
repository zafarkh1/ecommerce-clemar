import Slider from "react-slick";
import ProductCard from "../utils/ProductCard";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import MessageModal from "../utils/Modal";
import "react-loading-skeleton/dist/skeleton.css";

function BestProducts() {
  const [skeletonCount, setSkeletonCount] = useState(4);
  const { bestProductsData, loading } = useApiData();
  const { t } = useTranslation();

  const sliderSettings = {
    ...customSliderSettings,
    slidesToShow: 4,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
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
    <div className="myContainer">
      <h2 className="heading2">{t("bestProducts.heading")}</h2>
      <div className="lg:mt-10 mt-4">
        {loading ? (
          <div className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-2`}>
            {Array(skeletonCount)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    className="categoriesSkeleton"
                    borderRadius="0.5rem"
                    baseColor={skeletonBaseColor} // Set base color
                    highlightColor={skeletonHighlightColor} // Set highlight color
                  />
                </div>
              ))}
          </div>
        ) : (
          <Slider {...sliderSettings}>
            {bestProductsData.map((item, index) => (
              <div key={index} className="lg:pe-4 pe-2">
                <ProductCard item={item} />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <div className="lg:mt-10 mt-2">
        {loading ? (
          <div className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-2`}>
            {Array(4)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    className="categoriesSkeleton"
                    borderRadius="0.5rem"
                    baseColor={skeletonBaseColor} // Set base color
                    highlightColor={skeletonHighlightColor} // Set highlight color
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-y-4">
            {bestProductsData.slice(0, 4).map((item, index) => (
              <div key={index} className="lg:pe-4 pe-2">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
      <MessageModal />
    </div>
  );
}

export default BestProducts;
