import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useStore } from "./useStore";
import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useStore();

  const isFavorited = (id) => favorites.some((item) => item.id === id);

  return (
    <div className="rounded-lg flex flex-col border">
      <div className="p-2 cursor-pointer">
        {/*              Image with like icon            */}
        <div className="relative w-full lg:h-60 h-40 flexCenter rounded-lg border">
          <img
            src={item.image1}
            alt={item.slug}
            className="max-h-full max-w-full object-contain lg:p-8 p-4 hover:scale-105 transition-all duration-300"
            onClick={() => {
              navigate(`/products/${item.name_en}`);
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
          {item.name_en.length > 30
            ? `${item.name_en.substring(0, 30)}...`
            : item.name_en}
        </p>
        <p className="text-gray-500 text lg:hidden">
          {item.name_en.length > 15
            ? `${item.name_en.substring(0, 15)}...`
            : item.name_en}
        </p>
        <p className="lg:my-3 my-1 font-medium text">0 Sum</p>
        <div className="">
          <button
            className="bg-gray-200 hover:bg-primary hover:text-white w-full rounded-lg py-1 
            textfont-medium transition-all duration-500"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
