import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  useGetCourseProgressQuery,
  useMarkAsCompleteCourseMutation,
  useMarkAsInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "../../features/api/courseProgressApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  console.log(data);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    markAsCompleteCourse,
    { data: completeData, isSuccess: isCompleteSuccess },
  ] = useMarkAsCompleteCourseMutation();

  const [
    markAsIncompleteCourse,
    { data: inCompleteData, isSuccess: isInCompleteSuccess },
  ] = useMarkAsInCompleteCourseMutation();

  useEffect(() => {
    if (isCompleteSuccess) {
      refetch();
      toast.success(completeData.message);
    }
    if (isInCompleteSuccess) {
      refetch();
      toast.success(inCompleteData.message);
    }
  }, [isCompleteSuccess, isInCompleteSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Failed </p>;
  }
  const { courseDetails, progress, completed } = data.data;
  // console.log(courseDetails);
  const { courseTitle } = courseDetails;
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };
  const handleCompleteCourse = async () => {
    await markAsCompleteCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await markAsIncompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button
          variant={completed ? "outline" : "default"}
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as Complete"
          )}
        </Button>
        {/* {video section} */}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(
                  currentLecture?._id || initialLecture?._id
                )
              }
            />
          </div>

          <div className="mt-2">
            <h2 className="font-medium text-lg">{`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            } : ${
              currentLecture?.lectureTitle || initialLecture.lectureTitle
            }`}</h2>
          </div>
        </div>
        {/* {lecture Sidebar} */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-300 md:pl-4 md:pt-0 pt-4">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                onClick={() => handleSelectLecture(lecture)}
                className={`mb-4 hover:cursor-pointer transition transform  ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-300 dark:bg-gray-500"
                    : ""
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center ">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
