import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import ProductCard from "../utils/ProductCard";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../utils/SkeletonCard";
import { useLangStore } from "../zustand/useLangStore";

function CategoryProducts(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProductsData, categoriesData, loading } = useApiData();
  const { currentLanguage } = useLangStore();

  const getItemData = (item) => {
    if (currentLanguage === "uz") return item?.name_uz.split("/").slice(0, -2);
    if (currentLanguage === "ru") return item?.name_ru;
    return item?.name_en;
  };

  const data = allProductsData.filter(
    (product) => product.category === parseInt(id)
  );

  const category = categoriesData.find(
    (product) => product.id === parseInt(id)
  );

  return (
    <div className="myContainer">
      <h2 className="heading2">
        {getItemData(category) || <Skeleton width="50%" />}
      </h2>
      <div className="lg:mt-10 mt-4">
        {loading ? (
          <SkeletonCard height="300px" size={9} gridLg={3} />
        ) : (
          <div className="grid lg:grid-cols-3 lg:gap-8 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/products/${item.slug}`)}
              >
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;
