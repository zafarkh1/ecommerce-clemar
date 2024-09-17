import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { useStore } from "../zustand/useStore";
import { Link } from "react-scroll";
import Catalog from "../utils/Catalog";
import { useApiData } from "../api/api";
import debounce from "lodash.debounce"; // Import debounce function from lodash

function Navbar(props) {
  const [searchedData, setSearchedData] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showError, setShowError] = useState(false); // State to manage error display
  const searchRef = useRef(null);
  const catalogRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { favorites } = useStore();
  const { allProductsData } = useApiData();

  const navbarHeight = 300;

  useEffect(() => {
    // Close the dropdown if clicking outside of it
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setIsCatalogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [catalogRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close the dropdown if clicking outside of it
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchedData([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Debounced search handler to avoid too many searches on input change
  const debouncedSearch = debounce((query) => {
    if (query.length > 0) {
      const filteredData = allProductsData.filter((f) =>
        f.name_en.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedData(filteredData);
    } else {
      setSearchedData([]);
    }
  }, 300);

  // Handle input change and pass it to debounced search function
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Call debounced search function
    setShowError(false); // Hide error when user types
  };

  // Handle button click to navigate to search page with query
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    } else {
      setShowError(true); // Show inline error message if query is empty
    }
  };

  // Trigger search when "Enter" is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(); // Call the same submit function
    }
  };

  // Clear the search query when navigating to any page
  useEffect(() => {
    setSearchQuery(""); // Clear the search input whenever the route changes
    setSearchedData([]); // Optionally clear search results
  }, [location.pathname]); // Trigger when the path changes

  return (
    <div
      className={`bg-white fixed right-0 left-0 z-20 ${
        isScrolled ? "top-0 shadow-lg" : "lg:top-20"
      } transition-all duration-500`}
    >
      <div
        className={`myContainer grid lg:grid-cols-12 grid-cols-5 items-center relative`}
        ref={catalogRef}
      >
        <div className="absolute top-full left-0 right-0">
          {isCatalogOpen && <Catalog close={setIsCatalogOpen} />}
        </div>

        {/* Logo & Catalog */}
        <div className="lg:col-start-1 lg:col-span-3 col-span-full flexBetween lg:gap-8 gap-4 lg:mb-0 mb-4">
          <button
            className="flexBetween bg-primary text-white lg:px-5 px-2 lg:py-2 py-1 rounded-md hover:bg-primary-dark transition duration-300"
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
          >
            <span className="icon mr-2">
              {isCatalogOpen ? <FaTimes /> : <MdMenu />}
            </span>
            <span className="text">{t("navbar.catalog")}</span>
          </button>

          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={1500}
            offset={-navbarHeight}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://clemar.uz/static/media/logo.429f48cab1bd213fe676.png"
              alt="logo"
              className="lg:h-10 h-8 cursor-pointer"
            />
          </Link>

          <p
            className="hover:text-primary transition duration-300 cursor-pointer lg:hidden text-sm font-medium"
            onClick={() => {
              navigate("/about");
              window.scroll(0, 0);
            }}
          >
            {t("navbar.aboutUs")}
          </p>
        </div>

        {/* Search input */}
        <div className="lg:col-start-5 lg:col-span-5 col-span-4">
          <div className="relative" ref={searchRef}>
            <div className="flexBetween border border-gray-300 rounded-md overflow-hidden w-full shadow-sm">
              <input
                type="text"
                className={`outline-none lg:px-4 px-2 lg:py-2 py-1 w-full text search-input ${
                  showError ? "border-red-500" : ""
                }`}
                placeholder={
                  showError
                    ? t("navbar.emptySearchPl")
                    : t("navbar.searchPlaceholder")
                }
                onKeyDown={handleKeyDown} // Detect Enter key press
                value={searchQuery}
                onChange={handleSearchInput}
              />
              <button
                onClick={handleSearchSubmit}
                className={`search-button bg-primary text-white hover:bg-primary-dark lg:w-16 w-8 lg:h-10 h-8 flexCenter justify-center`}
              >
                <MdOutlineSearch className="icon" />
              </button>
            </div>

            {/* Display search results */}
            {searchedData.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md z-10 max-h-56 overflow-y-scroll">
                {searchedData.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate(`/products/${item.slug}`);
                      setSearchedData([]);
                      setSearchQuery("");
                    }}
                  >
                    {item.name_en}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Like & About us */}
        <div className="lg:col-start-10 lg:col-span-3 flex items-center justify-end gap-8 col-span-1">
          <p
            className="hover:text-primary transition duration-300 cursor-pointer hidden lg:block text-lg font-medium"
            onClick={() => {
              navigate("/about");
              window.scroll(0, 0);
            }}
          >
            {t("navbar.aboutUs")}
          </p>
          <div
            className="flexBetween gap-2 cursor-pointer hover:text-primary transition duration-300"
            onClick={() => {
              navigate("/likes");
              window.scroll(0, 0);
            }}
          >
            <div className="relative">
              <IoHeartOutline className="text-2xl" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs text-center">
                {favorites.length || 0}
              </span>
            </div>
            <span className="font-medium text-lg hidden lg:inline-block">
              {t("navbar.favourites")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
