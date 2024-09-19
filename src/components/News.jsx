import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function News(props) {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the translation hook

  const text1 = t("news.installmentText");
  const text2 = t("news.promotionsText");

  return (
    <div id="news">
      <div className="myContainer">
        <h2 className="heading2 lg:mb-8 mb-4">{t("news.heading")}</h2>{" "}
        {/* Translated heading */}
        <div className="grid lg:grid-cols-8 gap-8">
          {/* First Card */}
          <div
            className="bg-primary text-white lg:col-span-5 lg:py-8 py-4 lg:px-6 px-3 rounded-lg flex transition-transform 
          transform lg:hover:scale-105 shadow-md lg:hover:shadow-lg"
          >
            {/* Content */}
            <div className="lg:w-2/3 w-full flex-shrink-0 flex flex-col">
              <h5 className="heading5">{t("news.installmentTitle")}</h5>{" "}
              {/* Translated title */}
              <p className="my-3 text lg:hidden">
                {text1.substring(0, 300)} {" ..."}
              </p>
              <p className="my-6 text hidden lg:inline-block">{text1}</p>{" "}
              {/* Translated text */}
              <div className="mt-auto">
                <button
                  className="lg:px-8 px-4 lg:py-3 py-2 lg:text-base text-sm bg-white text-primary transition-colors ease-in-out duration-300 shadow-sm lg:hover:shadow-md active:scale-105 rounded-lg"
                  onClick={() => {
                    navigate(`/news/2`);
                    window.scroll(0, 0);
                  }}
                >
                  {t("news.readMore")}{" "}
                  {/* Assuming a "readMore" key in your translation file */}
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="w-1/3 lg:flex justify-end items-center hidden">
              <img
                src="https://clemar.uz/static/media/discount.3f979949e7fdcee33844.png"
                alt="Discount Icon"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-blue-900 text-white lg:col-span-3 lg:py-8 py-4 lg:px-6 px-3 rounded-lg flex transition-transform transform lg:hover:scale-105 shadow-md lg:hover:shadow-lg">
            <div className="lg:w-2/3 w-full flex-shrink-0 flex flex-col">
              <h5 className="heading5">{t("news.promotionsTitle")}</h5>{" "}
              {/* Translated title */}
              <p className="my-3 text lg:hidden">
                {text2.substring(0, 300)} {" ..."}
              </p>
              <p className="my-6 text hidden lg:inline-block">{text2}</p>{" "}
              {/* Translated text */}
              <div className="mt-auto">
                <button
                  className="lg:px-8 px-4 lg:py-3 py-2 lg:text-base text-sm bg-white text-primary transition-colors ease-in-out duration-300 shadow-sm lg:hover:shadow-md active:scale-105 rounded-lg"
                  onClick={() => {
                    navigate(`/news/3`);
                    window.scroll(0, 0);
                  }}
                >
                  {t("news.readMore")} {/* Translated "Read More" button */}
                </button>
              </div>
            </div>
            <div className="w-1/3 lg:flex justify-end items-center hidden">
              <img
                src="https://clemar.uz/static/media/deposit.ccf4bf8a4e0caf2da3d0.png"
                alt="Promotion Icon"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
