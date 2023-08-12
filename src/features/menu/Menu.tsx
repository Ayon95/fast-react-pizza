import { menuLoader } from "@/routes/loaders";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as Awaited<ReturnType<typeof menuLoader>>;
  return (
    <ul className="divide-y divide-stone-200 px-4 pb-20 pt-8">
      {menu.map(pizza => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default Menu;
