import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useGetCourseDetailPurchaseStatusQuery } from "../features/api/purchaseApi";

export const PurChaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailPurchaseStatusQuery(courseId);

  if (isLoading) return <div>Loading</div>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <div>{children}</div>;
};

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (user?.role !== "instructor") {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};
