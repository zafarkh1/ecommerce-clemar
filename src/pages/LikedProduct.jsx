import ProductCard from "../utils/ProductCard";
import { useStore } from "../utils/useStore";

function LikedProduct(props) {
  const { favorites } = useStore();

  return (
    <div className={`myContainer ${favorites.length === 0 ? "mb-32" : "mb-8"}`}>
      <h2 className="heading2">
        {favorites.length > 0 ? "Favorites" : "No liked porducts :("}
      </h2>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-y-4 lg:mt-10 mt-5">
        {favorites.slice(0, 4).map((item, index) => (
          <div key={index} className="lg:pe-4 pe-2">
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedProduct;
