import { useTranslation } from "react-i18next"; // Import the useTranslation hook

function About(props) {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <div className="myContainer">
      <h2 className="heading2 lg:text-left text-center">
        {t("aboutPage.heading")}
      </h2>
      <img
        src="https://clemar.uz/static/media/news.64886bd9fd6058aab8bd.png"
        alt="aboutImg"
        className="lg:my-10 my-5"
      />
      <p className="text mb-4">{t("aboutPage.content")}</p>
    </div>
  );
}

export default About;
