import { useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import { useTranslation } from "react-i18next";
import ProductCard from "../utils/ProductCard";
import { useLangStore } from "../zustand/useLangStore";

function SubCategoriesProducts(props) {
  const { id } = useParams();
  const { allProductsData, subCategoriesData } = useApiData();
  const { t } = useTranslation();
  const { currentLanguage } = useLangStore();

  const filteredSubCategoryProducts = allProductsData.filter(
    (item) => item.sub_category === parseInt(id)
  );

  const filteredSubCategory = subCategoriesData.find(
    (item) => item.id === parseInt(id)
  );

  const getItemName = (item) => {
    if (currentLanguage === "uz") return item.name_uz;
    if (currentLanguage === "ru") return item.name_ru;
    return item.name_en;
  };

  console.log(filteredSubCategory); // [...]
  console.log(currentLanguage); //ru

  return (
    <div
      className={`myContainer ${
        filteredSubCategoryProducts.length === 0 ? "mb-32" : "mb-8"
      }`}
    >
      <h2 className="heading2">
        {filteredSubCategoryProducts.length > 0 && filteredSubCategory
          ? getItemName(filteredSubCategory)
          : t("subCategoryProducts.noProducts")}
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-y-4 lg:mt-10 mt-5">
        {filteredSubCategoryProducts.map((item, index) => (
          <div key={index} className="lg:pe-4 pe-2">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategoriesProducts;
