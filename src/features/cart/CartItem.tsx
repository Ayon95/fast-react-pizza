import { formatCurrency } from "@/utils/helpers";
import { CartItem as CartItemType } from "@/types/index";
import Button from "@/ui/Button";
import { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import UpdateItemQuantityButtons from "./UpdateItemQuantityButtons";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch: AppDispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex items-center gap-3">
          <UpdateItemQuantityButtons pizzaId={pizzaId} />
          <Button size="small" onClick={() => dispatch(deleteItem(pizzaId))}>
            Delete
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
