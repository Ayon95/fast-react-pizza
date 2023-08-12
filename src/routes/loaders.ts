import { getMenu, getOrder } from "@/services/apiRestaurant";
import { LoaderFunctionArgs } from "react-router-dom";

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export async function orderLoader({ params }: LoaderFunctionArgs) {
  const order = await getOrder(params.orderId!);
  return order;
}
