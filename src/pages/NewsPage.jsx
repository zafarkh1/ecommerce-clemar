import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function NewsPage(props) {
  const { id } = useParams();
  const { newsData, loading } = useApiData();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize the translation hook

  const news = newsData.find((item) => item.id === parseInt(id));
  const otherNews = newsData.filter((item) => item.id !== parseInt(id));

  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color

  return (
    <div className="myContainer">
      <div>
        <h2 className="heading2 text-center px-4">
          {loading ? <Skeleton width="60%" /> : news?.[`name_${i18n.language}`]}
        </h2>
        <div className="flexCenter">
          {loading ? (
            <div className="flexCenter lg:my-6 my-3">
              <Skeleton
                className="newsImgSkeleton"
                width={350}
                borderRadius="0.5rem"
                baseColor={skeletonBaseColor} // Set base color
                highlightColor={skeletonHighlightColor} // Set highlight color
              />
            </div>
          ) : (
            news?.image1 && (
              <img
                src={news.image1}
                alt={news?.[`name_${i18n.language}`]}
                className="rounded-lg lg:my-6 my-3 md:h-96"
              />
            )
          )}
        </div>

        <p className="text-gray-500 text">
          {loading ? (
            <Skeleton
              height="200px"
              borderRadius="0.5rem"
              baseColor={skeletonBaseColor} // Set base color
              highlightColor={skeletonHighlightColor} // Set highlight color
            />
          ) : (
            news?.[`description_${i18n.language}`]
          )}
        </p>
      </div>

      {/* Other news */}
      <div className="lg:mt-10 mt-5">
        <h5 className="heading5">{t("newsPage.otherNews")}</h5>
        {loading ? (
          <div className="flex lg:flex-row flex-col lg:gap-8 gap-2 lg:mt-6 mt-4">
            {Array(2)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    width={300}
                    className="otherNewsSkeleton"
                    borderRadius="0.5rem"
                    baseColor={skeletonBaseColor} // Set base color
                    highlightColor={skeletonHighlightColor} // Set highlight color
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="flex lg:gap-8 gap-4 lg:mt-6 mt-4">
            {otherNews.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg lg:px-2 px-1 lg:py-4 py-2 max-w-80"
              >
                <img
                  src={item?.image1}
                  alt={item?.[`name_${i18n.language}`]}
                  className="object-cover lg:h-36 h-20 w-full lg:mb-6 mb-3"
                />
                <h6 className="lg:text-base text-sm font-semibold">
                  {item?.[`name_${i18n.language}`]}
                </h6>
                <p className="text lg:my-6 my-3">
                  {item?.[`description_${i18n.language}`].length > 100
                    ? `${item?.[`description_${i18n.language}`].substring(
                        0,
                        100
                      )} ...`
                    : item?.[`description_${i18n.language}`]}
                </p>
                <p
                  className="underline text-primary text cursor-pointer"
                  onClick={() => {
                    navigate(`/news/${item.id}`);
                    window.scroll(0, 0);
                  }}
                >
                  {t("newsPage.readMore")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsPage;
