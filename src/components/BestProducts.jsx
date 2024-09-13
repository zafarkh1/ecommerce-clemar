import Slider from "react-slick";
import ProductCard from "../utils/ProductCard";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import SkeletonCard from "../utils/SkeletonCard";

function BestProducts(props) {
  const { bestProductsData, loading } = useApiData();

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

  return (
    <div className="myContainer">
      <h2 className="heading2">Best Products</h2>
      <div className="lg:mt-10 mt-4">
        {loading ? (
          <SkeletonCard height="300px" size={4} gridLg={4} />
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
      <div className="lg:mt-10 mt-4">
        {loading ? (
          <SkeletonCard height="300px" size={4} gridLg={4} />
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
