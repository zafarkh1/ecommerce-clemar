import { Route, Routes } from "react-router-dom";
import NavbarLng from "./components/NavbarLng";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";
import Product from "./pages/Product";
import NewsPage from "./pages/NewsPage";
import LikedProduct from "./pages/LikedProduct";
import About from "./pages/About";
import SearchedProducts from "./pages/SearchedProducts";
import SubCategoriesProducts from "./pages/SubCategoriesProducts";

function App(props) {
  return (
    <>
      <NavbarLng />
      <Navbar />
      <div className="mt-[96px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/:id" element={<CategoryProducts />} />
          <Route path="/products/:name" element={<Product />} />
          <Route path="/subCategory/:id" element={<SubCategoriesProducts />} />
          <Route path="/search" element={<SearchedProducts />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/likes" element={<LikedProduct />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
