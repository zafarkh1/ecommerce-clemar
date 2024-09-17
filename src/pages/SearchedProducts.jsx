import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApiData } from "../api/api";
import ProductCard from "../utils/ProductCard";
import { useTranslation } from "react-i18next";

function SearchedProducts() {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { allProductsData, loading } = useApiData();
  const searchQuery = searchParams.get("q");
  const { t } = useTranslation();

  useEffect(() => {
    if (searchQuery) {
      const results = allProductsData.filter((product) =>
        product.name_en.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, allProductsData]);

  return (
    <div
      className={`myContainer ${
        filteredProducts.length === 0 ? "mb-32" : "mb-8"
      }`}
    >
      {filteredProducts.length > 0 && (
        <h2 className="heading2">
          {t("searchedProducts.searchResults")}: "{searchQuery}"
        </h2>
      )}
      {loading ? (
        <p>{t("searchedProducts.loading")}</p>
      ) : (
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-y-4 lg:mt-10 mt-5">
              {filteredProducts.map((product, index) => (
                <div key={index} className="lg:pe-4 pe-2">
                  <ProductCard item={product} />
                </div>
              ))}
            </div>
          ) : (
            <h2 className="heading2">
              {t("searchedProducts.noProductsFound")}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchedProducts;
