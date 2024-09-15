import Slider from "react-slick";
import ProductCard from "../utils/ProductCard";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function BestProducts(props) {
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
                  <Skeleton className="categoriesSkeleton" />
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
                  <Skeleton className="categoriesSkeleton" />
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
    </div>
  );
}

export default BestProducts;
