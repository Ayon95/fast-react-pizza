import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="px-4 py-6">
      <Link
        to="/menu"
        className="mb-7 inline-block text-sm text-blue-500 hover:text-blue-600"
      >
        &larr; Back to menu
      </Link>

      <p className="font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
