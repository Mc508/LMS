import { Link, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ArrowLeft } from "lucide-react";

const UpdateLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button size="icon" varient="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>{" "}
        <h1 className="font-bold text-xl">UpdateLecture</h1>
      </div>
    </div>
  );
};
export default UpdateLecture;
