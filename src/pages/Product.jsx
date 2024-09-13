import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import BestProducts from "../components/BestProducts";
import SkeletonCard from "../utils/SkeletonCard";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";

function Product(props) {
  const { name } = useParams();
  const { allProductsData, loading } = useApiData();

  const product = allProductsData.find((item) => item.name_en === name);

  const images = [
    product?.image1,
    product?.image2,
    product?.image3,
    product?.image4,
    product?.image5,
    product?.image6,
  ].filter(Boolean);

  const productFeatures = product?.description_en
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
              <Skeleton height="40px" style={{ marginBottom: "8px" }} />
            </li>
          </div>
        ))}
    </ul>
  );

  return (
    <>
      <div className="myContainer">
        <h2 className="heading2">
          {loading ? <Skeleton width="400px" /> : product?.name_en}
        </h2>

        <div className="flex lg:flex-row justify-between flex-col lg:gap-10 lg:mt-10 mt-6">
          {/*             Images           */}
          <div className="flex flex-col items-center lg:w-1/3 w-full">
            {/* Main Image */}
            <div className="lg:mb-4 mb-2">
              {loading ? (
                <Skeleton height="500px" />
              ) : (
                product && (
                  <img
                    src={product.image1}
                    alt={product.name_en}
                    className="w-full h-auto object-cover"
                  />
                )
              )}
            </div>

            {/* Slider Images */}
            <div className="w-full">
              {loading ? (
                <SkeletonCard gridLg={4} height="150px" size={4} />
              ) : (
                <Slider {...sliderSettings}>
                  {images?.map((image, index) => (
                    <div key={index} className="lg:px-3 px-2">
                      <img
                        src={image}
                        alt={index}
                        className="cursor-pointer border-2 rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>

          {/*              Descriptions       */}
          <div className="lg:w-1/3 w-full lg:mt-0 mt-4">
            <h5 className="heading5 mb-6">Product features</h5>
            {loading ? (
              renderSkeleton()
            ) : (
              <ul>
                {productFeatures?.map((item, index) => (
                  <li
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-300" : "bg-gray-100"
                    }  p-2 my-2 border-2 text`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/*               Button           */}
          <div className="lg:w-1/3 w-full lg:mt-0 mt-4">
            <h5 className="heading5 lg:mb-6 mb-2">0 Sum</h5>
            <p className="lg:mb-6 mb-3 text-gray-400 lg:text-xl text-base">
              Rest assured, we have the highest quality products!
            </p>
            <div>
              <button className="w-full rounded-lg lg:py-3 py-2 bg-primary text-white text">
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/*          More info      */}
        <h5 className="heading5 lg:my-10 my-6">More about the product</h5>
        <p className="text text-gray-500 border p-2 rounded-lg">
          {product?.name_en}
        </p>
      </div>

      {/*        Best products           */}
      <BestProducts />
    </>
  );
}

export default Product;
