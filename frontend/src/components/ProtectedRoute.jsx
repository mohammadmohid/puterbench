import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import LoadingSpinner from "./Loader";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (adminOnly && !user.isAdmin) {
        router.push("/");
      }
    }
  }, [user, loading, router, adminOnly]);

  if (loading) return <LoadingSpinner />;
  if (!user) return null;
  if (adminOnly && !user.isAdmin) return null;

  return children;
};

export default ProtectedRoute;
