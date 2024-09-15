import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function Contact(props) {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div id="contact">
      <div className="myContainer grid lg:grid-cols-2 lg:gap-8 gap-4">
        <div>
          <h2 className="heading2">{t("contact.heading")}</h2>{" "}
          {/* Translated heading */}
          <p className="lg:mt-6 mt-2 text">
            {t("contact.description")} {/* Translated description */}
          </p>
        </div>
        <form className="flex flex-col lg:gap-4 gap-2">
          <input
            type="text"
            placeholder={t("contact.namePlaceholder")} // Translated placeholder
            className="input text"
          />
          <input
            type="text"
            placeholder={t("contact.phonePlaceholder")} // Translated placeholder
            className="input text"
          />
          <textarea
            placeholder={t("contact.messagePlaceholder")} // Translated placeholder
            className="input text"
            rows="5"
            cols="33"
          />
          <div>
            <button className="bg-primary text-white py-4 w-full rounded-lg text lg:mb-0 mb-4">
              {t("contact.sendButton")} {/* Translated button text */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
