import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { AppDispatch, RootState } from "store";
import EmptyCart from "../cart/EmptyCart";
import { useState } from "react";
import { selectTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "@/utils/helpers";
import { fetchAddress } from "@/features/user/userSlice";
import ErrorMessage from "@/ui/ErrorMessage";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const formErrors = useActionData() as { phone?: string };
  const isSubmitting = navigation.state === "submitting";

  const dispatch: AppDispatch = useDispatch();

  const { username, addressStatus, address, addressError } = useSelector(
    (state: RootState) => state.user,
  );
  const cart = useSelector((state: RootState) => state.cart.cart);
  const totalCartPrice = useSelector(selectTotalCartPrice);

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const isLoadingAddress = addressStatus === "loading";

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="px-4 py-10">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      {/* Specifying action here is optional; React Router will automatically use the nearest matching route */}
      <Form method="POST" action="/order/new">
        <div className="mb-5">
          <label className="mb-3 block font-medium">First Name</label>
          <Input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 block font-medium">Phone number</label>
          <div>
            <Input type="tel" name="phone" required />
            {formErrors?.phone && <ErrorMessage message={formErrors.phone} />}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-3 block font-medium">Address</label>
          <div className="relative">
            <Input
              type="text"
              name="address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressError && <ErrorMessage message={addressError} />}
            {!address && (
              <Button
                className="absolute right-2 top-[5px]"
                size="small"
                type="button"
                onClick={() => dispatch(fetchAddress())}
                disabled={isLoadingAddress}
              >
                {isLoadingAddress ? "Fetching" : "Get Address"}
              </Button>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority.toString()}
            checked={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now for ${formatCurrency(
                  totalCartPrice + priorityPrice,
                )}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
