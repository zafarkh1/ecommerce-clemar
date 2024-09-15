import Slider from "react-slick";
import { useApiData } from "../api/api";
import { customSliderSettings } from "../utils/sliderSettings";
import SkeletonCard from "../utils/SkeletonCard";
import { useTranslation } from "react-i18next";

function Trust(props) {
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

  return (
    <div className="myContainer py-6">
      <h2 className="heading2 lg:mb-8 mb-4">{t("trust.heading")}</h2>{" "}
      {/* Use translation here */}
      <div>
        {loading ? (
          <SkeletonCard height="150px" size={4} gridLg={4} />
        ) : (
          <Slider {...settings}>
            {trustData.map((item, index) => (
              <div key={index} className="lg:pe-3 pe-3">
                <div className="bg-primary rounded-lg flexCenter lg:h-40 h-25 lg:p-6 p-2 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
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
