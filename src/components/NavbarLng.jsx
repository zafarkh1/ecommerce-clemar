import { MdOutlineLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../zustand/useLangStore";

function NavbarLng() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const { currentLanguage, setCurrentLanguage } = useLangStore();
  const dropdownRef = useRef(null); // Ref for dropdown

  const languages = ["uz", "en", "ru"];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Close the dropdown if clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const items = [
    {
      title: "Instagram",
      icon: <FaInstagram />,
      link: "https://instagram.com",
    },
    {
      title: "Telegram",
      icon: <FaTelegramPlane />,
      link: "https://telegram.org",
    },
  ];

  return (
    <div className="bg-primary text-white">
      <div className="container mx-auto flexBetween py-4">
        {/* Location */}
        <div className="flexBetween lg:gap-2 gap-1">
          <span className="text-2xl lg:text-xl icon">
            <MdOutlineLocationOn />
          </span>
          <span className="text lg:text-base">
            {t("navbarLng.txtLocation")}
          </span>{" "}
          {/* Translated text */}
          <a
            href="https://www.google.com/maps/place/Tashkent"
            target="_blank"
            rel="noopener noreferrer"
            className="text underline hover:text-gray-300 transition-colors duration-300"
          >
            {t("navbarLng.txtTashkent")} {/* Translated city name */}
          </a>
        </div>

        {/* Icons, Number, Lng */}
        <ul className="flexBetween lg:gap-10 gap-4">
          {items.map((item, index) => (
            <li key={index} className="hidden lg:block">
              <a
                href={item.link}
                className="flexBetween gap-2 hover:text-gray-300 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-2xl">{item.icon}</span>{" "}
                <span className="text lg:text-base">{item.title}</span>{" "}
                {/* Translated titles */}
              </a>
            </li>
          ))}
          <li className="hidden lg:block">
            <a
              href="tel:+998901234567"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              +998 55 500 14 11
            </a>
          </li>
          <li
            className="relative flexBetween text lg:text-base cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            ref={dropdownRef} // Attach the ref to the dropdown container
          >
            <span>{currentLanguage.toUpperCase()}</span>
            <span className="text-2xl">
              <MdKeyboardArrowDown />
            </span>
            <ul
              className={`absolute left-0 top-8 z-30 px-4 py-2 rounded-lg bg-gray-600 transition-all duration-300 ${
                showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              {languages.map((lang, index) => (
                <li
                  key={index}
                  onClick={() => handleLanguageChange(lang)}
                  className="hover:text-gray-300 cursor-pointer transition-colors duration-300"
                >
                  {lang.toUpperCase()}
                </li>
              ))}
            </ul>
          </li>
          <li className="hidden lg:block">
            <button className="px-6 py-3 rounded-md text-primary bg-white font-medium hover:bg-gray-100 hover:shadow-md active:scale-105 transition-all duration-300">
              {t("navbarLng.btnBonus")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLng;
