import { useNavigate, useParams } from "react-router-dom";
import { useApiData } from "../api/api";
import ProductCard from "../utils/ProductCard";
import Skeleton from "react-loading-skeleton";
import SkeletonCard from "../utils/SkeletonCard";

function CategoryProducts(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProductsData, categoriesData, loading } = useApiData();

  const data = allProductsData.filter(
    (product) => product.category === parseInt(id)
  );

  const categoryTitle = categoriesData.find(
    (product) => product.id === parseInt(id)
  )?.name_en;

  return (
    <div className="myContainer">
      <h2 className="heading2">{categoryTitle || <Skeleton width="50%" />}</h2>
      <div className="lg:mt-10 mt-4">
        {loading ? (
          <SkeletonCard height="300px" size={9} gridLg={3} />
        ) : (
          <div className="grid lg:grid-cols-3 lg:gap-8 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/products/${item.name_en}`)}
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

/*
        "id": 107,
        "name_uz": "Sens",
        "name_ru": "Sens",
        "name_en": "Sens",
        "slug": "sens",
        "description_uz": "Tavsif\r\nSens ko'pikli sovun 20L suyuq qo'l yuvish vositasi\r\n\r\nXususiyatlari\r\nSuyuq sovun\r\n\r\nKod\r\n7903274",
        "description_ru": "Описание\r\nЖидкое средство для мытья рук SENS FOAM SOAP 20L\r\n\r\nХарактеристики\r\nЖидкое мыло\r\n\r\nКод\r\n7903274",
        "description_en": "Description\r\nLiquid hand wash SENS FOAM SOAP 20L\r\n\r\nSpecifications\r\nLiquid soap\r\n\r\nCode\r\n7903274",
        "text_uz": "Sens",
        "text_ru": "Sens",
        "text_en": "Sens",
        "image1": "https://clean.maxone.uz/files/1.webp",
        "image2": "https://clean.maxone.uz/files/1_h3QwsEg.webp",
        "image3": "https://clean.maxone.uz/files/1_ZvAYbsV.webp",
        "image4": "https://clean.maxone.uz/files/1_5kK48bE.webp",
        "image5": "https://clean.maxone.uz/files/1_CMUQlEt.webp",
        "image6": "https://clean.maxone.uz/files/1_xftnukT.webp",
        "top": false,
        "price": 0,
        "category": 18,
        "sub_category": 30
*/
