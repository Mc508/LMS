import { CheckCircle2, CirclePlay } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const CourseProgress = () => {
  const isCompleted = true;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Progress</h1>
        <Button>Completed</Button>
        {/* {video section} */}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video />
          </div>

          <div className="mt-2">
            <h2 className="font-medium text-lg">Lecture -1 : Introduction</h2>
          </div>
        </div>
        {/* {lecture Sidebar} */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-300 md:pl-4 md:pt-0 pt-4">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4].map((lecture, idx) => (
              <Card
                key={idx}
                className="mb-4 hover:cursor-pointer transition transform "
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-medium">
                      Introduction
                    </CardTitle>
                  </div>
                  <Badge
                    variant={"outline"}
                    className={isCompleted ? "bg-green-500" : ""}
                  >
                    Completed
                  </Badge>
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
