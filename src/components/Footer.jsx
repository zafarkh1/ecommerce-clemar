import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import { MdMailOutline, MdOutlineLocationOn } from "react-icons/md";
import { FaInstagram, FaYoutube, FaFacebook, FaTelegram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";

function Footer(props) {
  const { t } = useTranslation(); // Initialize the translation hook
  const navigate = useNavigate();
  const navbarHeight = 80;

  const icons = [
    { icon: <FaFacebook />, link: "https://facebook.com" },
    { icon: <FaInstagram />, link: "https://instagram.com" },
    { icon: <FaTelegram />, link: "https://telegram.org" },
    { icon: <FaYoutube />, link: "https://youtube.com" },
  ];

  const products = [
    { title: t("footer.products.0.title"), link: "/categories/15" },
    { title: t("footer.products.1.title"), link: "/categories/16" },
    { title: t("footer.products.2.title"), link: "/categories/17" },
    { title: t("footer.products.3.title"), link: "/categories/18" },
  ];

  const info = [
    { title: t("footer.info.0.title"), link: "contact" },
    { title: t("footer.info.1.title"), link: "categories" },
    { title: t("footer.info.2.title"), link: "choose" },
    { title: t("footer.info.3.title"), link: "news" },
  ];

  const contact = [
    {
      icon: "",
      title: t("footer.contactItems.0.title"),
      link: "tel:+998990081411",
    },
    {
      icon: <MdOutlineLocationOn />,
      title: t("footer.contactItems.1.title"),
      link: "https://www.google.com/maps/place/Tashkent",
    },
    {
      icon: <MdMailOutline />,
      title: t("footer.contactItems.2.title"),
      link: "mailto:info@clemar.uz",
    },
  ];

  return (
    <div className="bg-gray-800 text-white lg:pt-10 lg:pb-6 pt-6 pb-3">
      <div className="container mx-auto grid lg:grid-cols-9 grid-cols-2 lg:gap-8 gap-4">
        {/* Contact, icons */}
        <div className="lg:col-span-3">
          <h5 className="heading5 lg:w-4/5">
            {t("footer.companyDescription")}
          </h5>
          <ul className="flex flex-col lg:gap-y-3 gap-y-1 lg:mt-4 mt-2">
            <li>{t("footer.contactTitle")}</li>
            {contact.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-2 underline underline-offset-2"
              >
                <span className="icon">{item?.icon}</span>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary underline transition"
                >
                  {item.title}
                </a>
              </li>
            ))}
            <li>
              <ul className="flex gap-4 items-center lg:mt-4 mt-2">
                {icons.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.link}
                      className="icon hover:text-primary transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Products */}
        <div className="lg:col-span-2">
          <h5 className="heading5">{t("footer.productsTitle")}</h5>
          <ul>
            {products.map((item, index) => (
              <li key={index} className="lg:mt-4 mt-2">
                <p
                  className="cursor-pointer hover:text-primary transition"
                  onClick={() => {
                    navigate(`${item.link}`);
                    window.scroll(0, 0);
                  }}
                >
                  {item.title}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="lg:col-span-2 lg:mt-0 mt-2">
          <h5 className="heading5">{t("footer.informationTitle")}</h5>
          <ul>
            {info.map((item, index) => (
              <li key={index} className="lg:mt-4 mt-2">
                <Link
                  className="cursor-pointer hover:text-primary transition"
                  to={item.link}
                  spy={true}
                  smooth={true}
                  duration={1500}
                  offset={-navbarHeight}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Map */}
        <div className="lg:col-span-2 flex justify-end lg:mt-0 mt-2">
          <div>
            <p className="text">{t("footer.address")}</p>
            <p className="text">{t("footer.mapLinkText")}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
        © 2024 Clemar. {t("footer.copyRight")}
      </div>
    </div>
  );
}

export default Footer;
