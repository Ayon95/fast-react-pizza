import Button from "@/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  selectQuantityByPizzaId,
} from "./cartSlice";

interface UpdateItemQuantityButtonsProps {
  pizzaId: number;
}

export default function UpdateItemQuantityButtons({
  pizzaId,
}: UpdateItemQuantityButtonsProps) {
  const pizzaQuantity = useSelector((state: RootState) =>
    selectQuantityByPizzaId(state, pizzaId),
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="space-x-1 md:space-x-2">
      <Button
        size="xsmall"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
      <span>{pizzaQuantity}</span>
      <Button
        size="xsmall"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
    </div>
  );
}
