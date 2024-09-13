import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import Skeleton from "react-loading-skeleton";

function NewsPage(props) {
  const { id } = useParams();
  const { newsData, loading } = useApiData();
  const navigate = useNavigate();

  const news = newsData.find((item) => item.id === parseInt(id));
  const otherNews = newsData.filter((item) => item.id !== parseInt(id));

  return (
    <div className="myContainer">
      <div>
        <h2 className="heading2 text-center px-4">
          {loading ? <Skeleton width={600} /> : news?.name_en}
        </h2>
        <div className="flexCenter">
          {loading ? (
            <div className="w-full flexCenter">
              <Skeleton height={500} width={1000} />
            </div>
          ) : (
            news?.image1 && (
              <img
                src={news.image1}
                alt={news.name_en}
                className="rounded-lg lg:my-6 my-3"
              />
            )
          )}
        </div>

        <p className="text-gray-500 text">
          {loading ? <Skeleton height="200px" /> : news?.description_en}
        </p>
      </div>

      {/*     Other news */}
      <div className="lg:mt-10 mt-5">
        <h5 className="heading5">Other news</h5>
        <div className="flex lg:gap-8 gap-4 lg:mt-6 mt-4">
          {otherNews.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg lg:px-2 px-1 lg:py-4 py-2 max-w-80"
            >
              <img
                src={item?.image1}
                alt={item?.name_en}
                className="object-cover lg:h-36 h-20 w-full lg:mb-6 mb-3"
              />
              <h6 className="lg:text-base text-sm font-semibold">
                {item?.name_en}
              </h6>
              <p className="text lg:my-6 my-3">
                {item?.description_en.length > 100
                  ? `${item?.description_en.substring(0, 100)} ...`
                  : item?.description_en}
              </p>
              <p
                className="underline text-primary text"
                onClick={() => {
                  navigate(`/news/${item.id}`);
                  window.scroll(0, 0);
                }}
              >
                Read More
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
