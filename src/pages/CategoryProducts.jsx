import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import ProductCard from "../utils/ProductCard";
import Skeleton from "react-loading-skeleton";
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

  const skeletonBaseColor = "#e0e0e0"; // Custom base color
  const skeletonHighlightColor = "#f5f5f5"; // Custom highlight color

  return (
    <div className="myContainer">
      <h2 className="heading2">
        {getItemData(category) || <Skeleton width="50%" />}
      </h2>
      <div className="lg:my-10 my-4">
        {loading ? (
          <div className={`grid lg:grid-cols-3 grid-cols-2 lg:gap-6 gap-2`}>
            {Array(9)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <Skeleton
                    className="categoryProductsSkeleton"
                    borderRadius="0.5rem"
                    baseColor={skeletonBaseColor} // Set base color
                    highlightColor={skeletonHighlightColor} // Set highlight color
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-8 gap-3">
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
