import { MdOutlineLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

function NavbarLng(props) {
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
          <span className="text lg:text-base">Location:</span>
          <a
            href="https://www.google.com/maps/place/Tashkent"
            target="_blank"
            rel="noopener noreferrer"
            className="text underline hover:text-gray-300 transition-colors duration-300"
          >
            Tashkent
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
                <span className="text lg:text-base">{item.title}</span>
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
          <li className="flexBetween text lg:text-base">
            <span>Eng</span>
            <span className="text-2xl">
              <MdKeyboardArrowDown />
            </span>
          </li>
          <li className="hidden lg:block">
            <button className="px-6 py-3 rounded-md text-primary bg-white font-medium hover:bg-gray-100 hover:shadow-md active:scale-105 transition-all duration-300">
              Get a bonus
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLng;
