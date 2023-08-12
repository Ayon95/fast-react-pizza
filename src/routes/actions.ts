import { createOrder, updateOrder } from "@/services/apiRestaurant";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { CreateOrderFormData, CreateOrderFormDataParsed } from "@/types/index";
import { isValidPhone } from "@/utils/helpers";
import store from "../store";
import { clearCart } from "@/features/cart/cartSlice";

export async function createOrderAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as CreateOrderFormData;
  const errors: { phone?: string } = {};

  if (!isValidPhone(data.phone)) {
    errors.phone = "Please provide a valid phone number";
  }

  if (Object.keys(errors).length > 0) return errors;

  const order: CreateOrderFormDataParsed = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export async function UpdateOrderAction({ params }: ActionFunctionArgs) {
  await updateOrder(params.orderId!, { priority: true });
  return null;
}
