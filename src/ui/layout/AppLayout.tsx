import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "@/features/cart/CartOverview";
import LoadingSpinner from "@/ui/LoadingSpinner";

export default function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="grid h-[100svh] h-screen grid-rows-[auto_1fr_auto]">
      {navigation.state === "loading" && <LoadingSpinner />}
      <Header />
      <div>
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
