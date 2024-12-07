import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import CourseTab from "./Coursetab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex i-c justify-between mb-5">
        <h1 className="font-bold text-xl">Add details</h1>
        <Link to="lecture">
          <Button className="hover:text-blue-600" variant="Link">
            Go to lectures Page
          </Button>
        </Link>
      </div>
      <div>
        <CourseTab />
      </div>
    </div>
  );
};
export default EditCourse;
