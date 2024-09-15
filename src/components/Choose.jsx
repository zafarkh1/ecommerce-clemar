import Skeleton from "react-loading-skeleton";
import { useApiData } from "../api/api";
import { useTranslation } from "react-i18next";

function Choose() {
  const { chooseData, loading } = useApiData();
  const { t } = useTranslation();

  const renderSkeleton = () => (
    <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 lg:mt-10 mt-4">
      {Array(4)
        .fill()
        .map((_, index) => (
          <div key={index}>
            <Skeleton height="80px" style={{ borderRadius: "0.5rem" }} />
          </div>
        ))}
    </div>
  );

  return (
    <div id="choose">
      <div className="myContainer">
        <h2 className="heading2">{t("choose.heading")}</h2>
        {loading ? (
          renderSkeleton()
        ) : (
          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 lg:mt-10 mt-4">
            {chooseData.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={index}
                className="lg:h-20 w-auto"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Choose;
