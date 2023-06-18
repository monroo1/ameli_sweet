import CatalogConfigpag from "../../components/catalog/config&pagination/configpag";
import CatalogHeader from "../../components/catalog/header/header";
import { useGetProductsQuery } from "../../services/ProductsService";

const Catalog = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  return !isLoading && !!products ? (
    <div>
      <CatalogHeader />
      <CatalogConfigpag products={products} />
    </div>
  ) : (
    <div>Загрузка</div>
  );
};

export default Catalog;
