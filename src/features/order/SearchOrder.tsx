import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchTerm) return;

    navigate(`/order/${searchTerm}`);
    setSearchTerm("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search order #"
        className="w-32 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-transform placeholder:text-stone-400 focus:scale-x-110 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 sm:w-64"
      />
    </form>
  );
}
