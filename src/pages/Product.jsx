import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import BestProducts from "../components/BestProducts";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useLangStore } from "../zustand/useLangStore";
import { useTranslation } from "react-i18next";
import { useModalStore } from "../zustand/useModalStore";
import MessageModal from "../utils/Modal";
import { useEffect, useState } from "react";

function Product(props) {
  const [skeletonCount, setSkeletonCount] = useState(4);
  const { name } = useParams();
  const { allProductsData, loading } = useApiData();
  const { currentLanguage } = useLangStore();
  const { t } = useTranslation();
  const { openModal } = useModalStore();

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

  const getItemName = (item) => {
    if (currentLanguage === "uz") return item?.name_uz;
    if (currentLanguage === "ru") return item?.name_ru;
    return item?.name_en;
  };

  const getItemDesc = (item) => {
    if (currentLanguage === "uz") return item?.description_uz;
    if (currentLanguage === "ru") return item?.description_ru;
    return item?.description_en;
  };

  const product = allProductsData.find((item) => item.slug === name);

  const images = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
    product?.image5,
    product?.image6,
  ].filter(Boolean);

  const productFeatures = getItemDesc(product)
    ?.split("\r\n")
    .filter((item) => item !== "");

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

  const renderSkeleton = () => (
    <ul className="">
      {Array(10)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <li>
              <Skeleton
                height="40px"
                style={{ marginBottom: "8px" }}
                baseColor={skeletonBaseColor} // Set base color
                highlightColor={skeletonHighlightColor} // Set highlight color
              />
            </li>
          </div>
        ))}
    </ul>
  );

  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color

  return (
    <>
      <div className="myContainer lg:mt-0 mt-28">
        <h2 className="heading2">
          {loading ? (
            <Skeleton
              width="60%"
              baseColor={skeletonBaseColor} // Set base color
              highlightColor={skeletonHighlightColor} // Set highlight color
            />
          ) : (
            getItemName(product)
          )}
        </h2>

        <div className="flex lg:flex-row justify-between flex-col lg:gap-10 lg:mt-10 mt-6">
          {/* Images */}
          <div className="flex flex-col items-center lg:w-1/3 w-full">
            {/* Main Image */}
            <div className="lg:mb-4 mb-2 w-full">
              {loading ? (
                <Skeleton
                  className="mainImgSkeleton"
                  borderRadius="0.5rem"
                  baseColor={skeletonBaseColor} // Set base color
                  highlightColor={skeletonHighlightColor} // Set highlight color
                />
              ) : (
                // Render Image only if not loading
                product && (
                  <img
                    src={product.image1}
                    alt={getItemName(product)}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: "4 / 3", objectFit: "cover" }} // Aspect ratio for consistency
                  />
                )
              )}
            </div>

            {/* Slider Images */}
            <div className="w-full">
              {loading ? (
                <div
                  className={`grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-2`}
                >
                  {Array(skeletonCount)
                    .fill()
                    .map((_, index) => (
                      <div key={index}>
                        <Skeleton
                          className="trustSkeleton"
                          borderRadius="0.5rem"
                          baseColor={skeletonBaseColor} // Set base color
                          highlightColor={skeletonHighlightColor} // Set highlight color
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <Slider {...sliderSettings}>
                  {images?.map((image, index) => (
                    <div key={index} className="lg:px-3 px-2">
                      <img
                        src={image}
                        alt={`${index + 1}`}
                        className="cursor-pointer border-2 rounded-lg"
                        style={{
                          width: "100%",
                          height: "150px", // Fixed height for slider images
                          objectFit: "cover", // Ensure images don't overflow
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div className="lg:w-1/3 w-full lg:mt-0 mt-4">
            <h5 className="heading5 mb-6">
              {t("productPage.featuresHeading")}
            </h5>
            {loading ? (
              renderSkeleton()
            ) : (
              <ul>
                {productFeatures?.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"
                    } p-2 my-2 border-2 text`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Button */}
          <div className="lg:w-1/3 w-full lg:mt-0 mt-4">
            <h5 className="heading5 lg:mb-6 mb-2">
              0 {t("productPage.currency")}
            </h5>
            <p className="lg:mb-6 mb-3 text-gray-400 lg:text-xl text-base">
              {t("productPage.highQualityProducts")}
            </p>
            <div>
              <button
                className="w-full rounded-lg lg:py-3 py-2 bg-primary text-white text"
                onClick={openModal}
              >
                {t("productPage.buyNow")}
              </button>
            </div>
          </div>
        </div>

        {/* More info */}
        <h5 className="heading5 lg:my-10 my-6">{t("productPage.moreInfo")}</h5>
        <p className="text text-gray-500 border p-2 rounded-lg">
          {getItemName(product)}
        </p>
      </div>

      {/* Best products */}
      <div className="lg:mb-10 mb-8">
        <BestProducts />
      </div>
      <MessageModal />
    </>
  );
}

export default Product;
