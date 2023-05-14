// import CatalogConfigpag from "@/components/catalog/config&pagination/configpag";
// import CatalogHeader from "@/components/catalog/header/header";
// import { IProduct } from "@/models/Product";

import CatalogConfigpag from "../../components/catalog/config&pagination/configpag";
import CatalogHeader from "../../components/catalog/header/header";
import { useGetProductsQuery } from "../../services/ProductsService";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Catalog = () => {
  const { data, isLoading } = useGetProductsQuery();

  return isLoading ? (
    <div>Загрузка</div>
  ) : (
    <div>
      <CatalogHeader />
      <CatalogConfigpag products={data} />
    </div>
  );
};

export default Catalog;
