import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "store";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <Input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
