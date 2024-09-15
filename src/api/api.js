import { useState, useEffect } from "react";

export const useApiData = () => {
  const [slideData, setSlideData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [bestProductsData, setBestProductsData] = useState([]);
  const [chooseData, setChooseData] = useState([]);
  const [trustData, setTrustData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [allProductsData, setAllProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  useEffect(() => {
    const sliderUrl = "https://clean.maxone.uz/api/sliders/";
    const categoriesUrl = "https://clean.maxone.uz/api/categories/";
    const subCategoryUrl = "https://clean.maxone.uz/api/sub_categories/";
    const bestProductsUrl = "https://clean.maxone.uz/api/top_products/";
    const chooseUrl = "https://clean.maxone.uz/api/why_us/";
    const trustUrl = "https://clean.maxone.uz/api/partner/";
    const newsUrl = "https://clean.maxone.uz/api/news/";
    const allProductsUrl = "https://clean.maxone.uz/api/products_id/";

    Promise.all([
      fetchData(sliderUrl),
      fetchData(categoriesUrl),
      fetchData(subCategoryUrl),
      fetchData(bestProductsUrl),
      fetchData(chooseUrl),
      fetchData(trustUrl),
      fetchData(newsUrl),
      fetchData(allProductsUrl),
    ])
      .then(
        ([
          slideItem,
          categoriesItem,
          subCategoryItem,
          bestProductsItem,
          chooseItem,
          trustItem,
          newsItem,
          allProductsItem,
        ]) => {
          setSlideData(slideItem);
          setCategoriesData(categoriesItem);
          setSubCategoriesData(subCategoryItem);
          setBestProductsData(bestProductsItem);
          setChooseData(chooseItem);
          setTrustData(trustItem);
          setNewsData(newsItem);
          setAllProductsData(allProductsItem);
          setLoading(false);
        }
      )
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return {
    slideData,
    categoriesData,
    subCategoriesData,
    bestProductsData,
    chooseData,
    trustData,
    newsData,
    allProductsData,
    loading,
    error,
  };
};
