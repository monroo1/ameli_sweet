import { CreateOrder } from "../../components/order/Create";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useGetOrderUserQuery } from "../../services/OrderService";
import { useEffect } from "react";

export const CreateOrderPage = () => {
  const { id } = useParams();
  const { data: order, isLoading: isLoadingOrder } = useGetOrderUserQuery(id);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoadingOrder && !order) {
      navigate("/profile");
    }
  }, [isLoadingOrder, order]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <div>
      <CreateOrder isLoadingOrder={isLoadingOrder} />
    </div>
  );
};
