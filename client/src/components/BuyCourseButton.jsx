import { Loader2 } from "lucide-react";
import { useCreateCheckoutSessionMutation } from "../features/api/purchaseApi";
import { Button } from "./ui/button";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };
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
