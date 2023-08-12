interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="mt-3 text-sm font-medium text-red-500">{message}</p>;
}
