import SearchOrder from "@/features/order/SearchOrder";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "store";

export default function Header() {
  const username = useSelector((state: RootState) => state.user.username);
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      {username && (
        <p className="hidden text-sm font-semibold md:block">{username}</p>
      )}
    </header>
  );
}
