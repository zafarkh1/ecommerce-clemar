import { useState } from "react";
import { useApiData } from "../api/api";
import { useLangStore } from "../zustand/useLangStore";

function Catalog(props) {
  const [activeCategory, setActiveCategory] = useState(null);
  const { categoriesData, subCategoriesData } = useApiData();
  const { currentLanguage } = useLangStore();

  // Filter subCategoriesData based on activeCategory
  const filteredSubCategories = subCategoriesData.filter(
    (subCategory) => subCategory.category === activeCategory
  );

  const getItemName = (item) => {
    if (currentLanguage === "uz") {
      if (item.name_uz.split("/").includes("rn")) {
        return item.name_uz.split("/").slice(0, -2);
      } else {
        return item.name_uz;
      }
    }
    if (currentLanguage === "ru") return item.name_ru;
    return item.name_en;
  };

  return (
    <div className="bg-white">
      <div className="myContainer flex">
        {/* Categories List */}
        <div className="w-1/4 border-r-2 pr-4">
          {categoriesData.map((item, index) => (
            <div
              key={index}
              className={`py-4 hover:bg-gray-100 cursor-pointer ${
                activeCategory === item.id ? "bg-gray-200" : ""
              }`}
              onMouseEnter={() => setActiveCategory(item.id)}
            >
              <p className="text-lg font-medium">{getItemName(item)}</p>
            </div>
          ))}
        </div>

        {/* Subcategories List */}
        <div className="w-3/4 pl-4">
          {activeCategory && (
            <div className="grid grid-cols-2 gap-4">
              {filteredSubCategories.map((subCategory) => (
                <div key={subCategory.id} className="subcategory-item">
                  <p className="text font-medium">{getItemName(subCategory)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
