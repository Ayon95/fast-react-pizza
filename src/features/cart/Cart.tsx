import { Link } from "react-router-dom";
import Button from "@/ui/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch: AppDispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <Link to="/menu" className="text-sm text-blue-500 hover:text-blue-600">
        &larr; Back to menu
      </Link>

      <h2 className="mb-3 mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mb-6 divide-y divide-stone-200 border-b">
        {cart.map(cartItem => (
          <CartItem key={cartItem.pizzaId} item={cartItem} />
        ))}
      </ul>

      <div className="space-x-2">
        <Button as="link" to="/order/new">
          Order pizzas
        </Button>
        <Button color="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
