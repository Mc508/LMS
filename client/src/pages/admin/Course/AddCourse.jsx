import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCreateCourseMutation } from "../../../features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const [creatCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const getSelectedCategory = async (value) => {
    refetch();
    setCategory(value);
  };

  const createCourseHandler = async () => {
    console.log(courseTitle, category);
    await creatCourse({ courseTitle, category });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add course and basic details for your new course
        </h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur</p>
      </div>

      <div className="space-y-4">
        <Label>Title</Label>
        <Input
          type="text"
          name="courseTitle"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Your Course Name"
        />
      </div>

      <div className="space-y-4">
        <Label>Category</Label>
        <Select onValueChange={getSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="Next JS">Next JS</SelectItem>
              <SelectItem value="Data Science">Data Science</SelectItem>
              <SelectItem value="Frontend Development">
                Frontend Development
              </SelectItem>
              <SelectItem value="Fullstack Development">
                Fullstack Development
              </SelectItem>
              <SelectItem value="MERN Stack Development">
                MERN Stack Development
              </SelectItem>
              <SelectItem value="Javascript">Javascript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Docker">Docker</SelectItem>
              <SelectItem value="MongoDB">MongoDB</SelectItem>
              <SelectItem value="HTML">HTML</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex item-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/course")}>
            Cancel
          </Button>

          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-3 w-5" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AddCourse;
