import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useStore } from "../zustand/useStore";
import { useLangStore } from "../zustand/useLangStore";
import { useModalStore } from "../zustand/useModalStore";
import { useTranslation } from "react-i18next";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useStore();
  const { currentLanguage } = useLangStore();
  const { openModal } = useModalStore();
  const { t } = useTranslation();

  const isFavorited = (id) => favorites.some((item) => item.id === id);

  const getItemName = (item) => {
    if (currentLanguage === "uz") return item.name_uz;
    if (currentLanguage === "ru") return item.name_ru;
    return item.name_en;
  };

  return (
    <div className="rounded-lg flex flex-col border">
      <div className="p-2 cursor-pointer">
        {/*              Image with like icon            */}
        <div className="relative w-full lg:h-60 h-40 flexCenter rounded-lg border">
          <img
            src={item.image1}
            alt={item.slug}
            className="max-h-full max-w-full object-contain lg:p-8 p-4 lg:hover:scale-105 transition-all duration-300"
            onClick={() => {
              navigate(`/products/${item.slug}`);
              window.scroll(0, 0);
            }}
          />
          <span
            className="absolute lg:top-4 top-2 lg:right-4 right-2 text-gray-500 icon"
            onClick={() => toggleFavorite(item)}
          >
            {isFavorited(item.id) ? (
              <IoHeart className="text-primary" />
            ) : (
              <IoHeartOutline />
            )}
          </span>
        </div>
      </div>

      {/*             content with btn          */}
      <div className="px-2 pb-2">
        <p className="text-gray-500 text hidden lg:inline-block">
          {getItemName(item).length > 30
            ? `${getItemName(item).substring(0, 30)}...`
            : getItemName(item)}
        </p>
        <p className="text-gray-500 text lg:hidden">
          {getItemName(item).length > 15
            ? `${getItemName(item).substring(0, 15)}...`
            : getItemName(item)}
        </p>
        <p className="lg:my-3 my-1 font-medium text">
          0 {t("productCard.currency")}
        </p>
        <div className="">
          <button
            className="bg-gray-200 lg:hover:bg-primary lg:hover:text-white w-full rounded-lg py-1 
            textfont-medium transition-all duration-500"
            onClick={openModal}
          >
            {t("productCard.buy")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
