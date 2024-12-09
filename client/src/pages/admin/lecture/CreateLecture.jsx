import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "../../../features/api/courseApi";
import { toast } from "sonner";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Lecture created");
      refetch();
      navigate("/admin/course");
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add lecture and basic details for your new lecture
        </h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className="space-y-4">
        <Label>Title</Label>
        <Input
          type="text"
          name="lectureTitle"
          value={lectureTitle}
          onChange={(e) => setLectureTitle(e.target.value)}
          placeholder="Your Lecture Title"
        />
      </div>

      <div className="mt-4">
        <div className="flex item-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to Course
          </Button>

          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-3 w-5" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-4">
          {lectureLoading ? (
            <LoadingSpinner />
          ) : lectureError ? (
            <p>Failed to load letures</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lecture availabel</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default CreateLecture;
