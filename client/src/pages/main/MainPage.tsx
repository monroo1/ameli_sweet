import { useGetProductsQuery } from "../../services/ProductsService";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainInfo from "../../components/main/info/Info";
import MainCategory from "../../components/main/category/Category";
import MainProducts from "../../components/main/product/Product";
import AboutUs from "../../components/main/aboutus/Aboutus";
import WhyUs from "../../components/main/whyus/Whyus";

import "./mainPage.scss";

const MainPage = () => {
  const { data, isLoading } = useGetProductsQuery();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div
      className="
    main-page"
    >
      <MainInfo />
      <MainCategory />
      <AboutUs />
      {isLoading ? <div>Загрузка</div> : <MainProducts products={data} />}
      <WhyUs />
    </div>
  );
};

export default MainPage;
