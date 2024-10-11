import React from "react";
import { useTranslation } from "react-i18next";

function Choose() {
  const { t } = useTranslation();

  const items = [
    {
      id: 1,
      title: t("choose.items.0.title"),
      description: t("choose.items.0.description"),
      src: "/assets/workWithUs1.svg",
    },
    {
      id: 2,
      title: t("choose.items.1.title"),
      description: t("choose.items.1.description"),
      src: "/assets/workWithUs2.svg",
    },
    {
      id: 3,
      title: t("choose.items.2.title"),
      description: t("choose.items.2.description"),
      src: "/assets/workWithUs3.svg",
    },
    {
      id: 4,
      title: t("choose.items.3.title"),
      description: t("choose.items.3.description"),
      src: "/assets/workWithUs4.svg",
    },
  ];

  return (
    <div id="choose">
      <div className="myContainer">
        <h2 className="heading2">{t("choose.heading")}</h2>
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-8 gap-4 lg:mt-10 mt-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#f7f7f7] flex flex-col gap-2 items-center py-6 px-6 border rounded-lg"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-16 w-16 filter-blue"
              />
              <h3 className="lg:text-xl text-base font-semibold mt-4">
                {item.title}
              </h3>
              <p className="text text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Choose;
