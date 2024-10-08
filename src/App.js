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
import { useEffect, useRef, useState } from "react";

function App(props) {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarLngRef = useRef(null);

  useEffect(() => {
    // Calculate and set the height of NavbarLng
    if (navbarLngRef.current) {
      setNavbarHeight(navbarLngRef.current.offsetHeight);
    }
  }, []);

  return (
    <>
      <NavbarLng ref={navbarLngRef} />
      <Navbar navbarLngHeight={navbarHeight} />
      <div className={`mt-[96px]`}>
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
