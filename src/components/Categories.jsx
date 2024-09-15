import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useNavigate } from "react-router-dom";
import { useLangStore } from "../zustand/useLangStore";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

function Categories(props) {
  const [skeletonCount, setSkeletonCount] = useState(4);
  const navigate = useNavigate();
  const { categoriesData, loading } = useApiData();
  const { currentLanguage } = useLangStore();
  const { t } = useTranslation();

  const getItemName = (item) => {
    if (currentLanguage === "uz") return item.name_uz.split("/").slice(0, -2);
    if (currentLanguage === "ru") return item.name_ru;
    return item.name_en;
  };

  const sliderSettings = {
    ...customSliderSettings,
    slidesToShow: 4,
    dots: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
    <div id="categories">
      <div className="myContainer">
        <h2 className="heading2">{t("categories.heading")}</h2>
        <div className="lg:mt-8 mt-4">
          {loading ? (
            <div className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-2`}>
              {Array(skeletonCount)
                .fill()
                .map((_, index) => (
                  <div key={index}>
                    <Skeleton
                      className="categoriesSkeleton"
                      borderRadius="0.5rem"
                    />
                  </div>
                ))}
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {categoriesData.map((item, index) => (
                <div className="lg:pe-4 pe-2" key={index}>
                  <div
                    key={index}
                    className="flex flex-col cursor-pointer "
                    onClick={() => {
                      navigate(`/categories/${item.id}`);
                      window.scroll(0, 0);
                    }}
                  >
                    <div className="border rounded-lg lg:p-4 p-3 flex flex-col">
                      <h5 className="heading5 lg:max-h-[20px] max-h-[18px]">
                        {getItemName(item)}
                      </h5>
                      <div className="w-full lg:h-48 h-20 flexCenter lg:my-8 my-6 hover:scale-105 transition-all duration-300">
                        <img
                          src={item.image}
                          alt={item.slug}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="mt-auto text">{`5 ${t(
                        "categories.products"
                      )}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
