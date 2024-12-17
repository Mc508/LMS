import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };
  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to purchase course");
      }
    }
    if (isError) {
      toast.error(isError?.data?.message);
    }
  }, [data, isSuccess, isError]);
  return (
    <div>
      <Button
        disabled={isLoading}
        className="w-full"
        onClick={purchaseCourseHandler}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          "Purchase Course"
        )}
      </Button>
    </div>
  );
};
export default BuyCourseButton;
