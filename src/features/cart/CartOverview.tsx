import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTotalCartPrice, selectTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(selectTotalCartQuantity);
  const totalPrice = useSelector(selectTotalCartPrice);

  return (
    <div className="flex w-full justify-between bg-stone-800 p-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalCartQuantity} {totalCartQuantity === 1 ? "pizza" : "pizzas"}
        </span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
