import Slider from "react-slick";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import { useNavigate } from "react-router-dom";
import SkeletonCard from "../utils/SkeletonCard";

function Categories(props) {
  const navigate = useNavigate();
  const { categoriesData, loading } = useApiData();

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

  return (
    <div id="categories">
      <div className="myContainer">
        <h2 className="heading2">Categories</h2>
        <div className="lg:mt-8 mt-2">
          {loading ? (
            <SkeletonCard height="300px" size={4} gridLg={4} />
          ) : (
            <Slider {...sliderSettings}>
              {categoriesData.map((item, index) => (
                <div className="lg:pe-4 pe-2">
                  <div
                    key={index}
                    className="flex flex-col cursor-pointer "
                    onClick={() => {
                      navigate(`/categories/${item.id}`);
                      window.scroll(0, 0);
                    }}
                  >
                    {" "}
                    {/* Removed border and added p-4 */}
                    <div className="border rounded-lg lg:p-4 p-2 flex flex-col">
                      {" "}
                      {/* Border and padding inside */}
                      <h5 className="heading5 lg:max-h-[20px] max-h-[18px]">
                        {item.name_en}
                      </h5>
                      <div className="w-full lg:h-48 h-16 flexCenter lg:my-8 my-4 hover:scale-105 transition-all duration-300">
                        <img
                          src={item.image}
                          alt={item.slug}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <p className="mt-auto text">5 PC. Products</p>
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
