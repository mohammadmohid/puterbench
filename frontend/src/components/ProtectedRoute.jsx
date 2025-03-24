import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  const jwt = document.cookie.split("; ").find((row) => row.startsWith("jwt="));

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    }
  });

  return children;
};

export default ProtectedRoute;
