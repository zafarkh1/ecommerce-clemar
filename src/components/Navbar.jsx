import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { useStore } from "../zustand/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

function Navbar(props) {
  const { favorites } = useStore();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Get translation function from i18next
  const [isScrolled, setIsScrolled] = useState(false);

  const navbarHeight = 300;

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

  return (
    <div
      className={`bg-white fixed right-0 left-0 z-20 ${
        isScrolled ? "top-0 shadow-lg" : "lg:top-20"
      } transition-all duration-500`}
    >
      <div
        className={`myContainer grid lg:grid-cols-12 grid-cols-3 items-center`}
      >
        {/* Logo & Catalog */}
        <div className="lg:col-start-1 lg:col-span-3 col-span-full flexBetween lg:gap-8 gap-4 lg:mb-0 mb-2">
          <button className="flexBetween bg-primary text-white lg:px-5 px-2 lg:py-2 py-1 rounded-md hover:bg-primary-dark transition duration-300">
            <span className="icon mr-2">
              <MdMenu />
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
        <div className="lg:col-start-5 lg:col-span-5 col-span-2">
          <div className="flexBetween border border-gray-300 rounded-md overflow-hidden w-full shadow-sm">
            <input
              type="text"
              className="outline-none lg:px-4 px-2 lg:py-2 py-1 w-full text"
              placeholder={t("navbar.searchPlaceholder")}
            />
            <button className="bg-primary text-white hover:bg-primary-dark lg:w-16 w-8 lg:h-10 h-8 flexCenter justify-center">
              <MdOutlineSearch className="icon" />
            </button>
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
              <IoHeartOutline className="icon" />
              <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 text-xs text-center">
                {favorites.length || 0}
              </span>
            </div>
            <span className="font-medium lg:text-lg">
              {t("navbar.favourites")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
