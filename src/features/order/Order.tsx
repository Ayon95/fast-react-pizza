// Test ID: IIDSAT
// Test ID: O9J2XZ

import { useEffect } from "react";
import { orderLoader } from "@/routes/loaders";
import { calcMinutesLeft, formatCurrency, formatDate } from "@/utils/helpers";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
import { Pizza } from "@/types/index";
import Button from "@/ui/Button";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData() as Awaited<ReturnType<typeof orderLoader>>;
  const deliveryIn = calcMinutesLeft(order.estimatedDelivery);
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
        <h2 className="text-xl font-semibold">Order #{order.id} status</h2>

        <div>
          {order.priority && (
            <span className="mr-2 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="mr-2 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {order.status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 rounded bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(order.estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-500">
          Estimated delivery: {formatDate(order.estimatedDelivery)}
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {order.cart.map(cartItem => {
          const pizza =
            (fetcher.data as Pizza[]) &&
            (fetcher.data as Pizza[]).find(
              pizza => pizza.id === cartItem.pizzaId,
            );
          return (
            <OrderItem
              key={cartItem.pizzaId}
              item={cartItem}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={pizza?.ingredients ?? []}
            />
          );
        })}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5 ">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(order.orderPrice)}
        </p>
        {order.priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(order.priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-stone-600">
          To pay on delivery:{" "}
          {formatCurrency(order.orderPrice + order.priorityPrice)}
        </p>
      </div>
      {!order.priority && (
        <fetcher.Form method="patch">
          <Button>Make Priority</Button>
        </fetcher.Form>
      )}
    </div>
  );
}

export default Order;
