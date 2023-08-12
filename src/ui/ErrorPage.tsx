import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {isRouteErrorResponse(error) ? (
        <p>{error.error?.message}</p>
      ) : (
        <p>Failed to fetch</p>
      )}

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-500 hover:text-blue-600"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default ErrorPage;
