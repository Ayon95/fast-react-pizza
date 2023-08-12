import { Pizza } from "@/types/index";
import Button from "@/ui/Button";
import { formatCurrency } from "@/utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  addItem,
  deleteItem,
  selectPizzaInCart,
} from "@/features/cart/cartSlice";
import UpdateItemQuantityButtons from "../cart/UpdateItemQuantityButtons";

interface MenuItemProps {
  pizza: Pizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
  const pizzaInCart = useSelector((state: RootState) =>
    selectPizzaInCart(state, id),
  );
  const dispatch: AppDispatch = useDispatch();

  function handleAddToCart() {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice,
      }),
    );
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-medium uppercase text-stone-500">
            {!soldOut ? formatCurrency(unitPrice) : "Sold out"}
          </p>
          {pizzaInCart && (
            <div className="flex items-center gap-3">
              <UpdateItemQuantityButtons pizzaId={id} />
              <Button size="small" onClick={() => dispatch(deleteItem(id))}>
                Delete
              </Button>
            </div>
          )}

          {!soldOut && !pizzaInCart && (
            <Button size="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
