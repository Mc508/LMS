import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

const Course = () => {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src="https://imgs.search.brave.com/ArE9ENVZTgDm7M3V_m1xuEn1H9dT1VY94r3YHR1Iaeg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kM2Yx/aXlmeHh6OGkxZS5j/bG91ZGZyb250Lm5l/dC9jb3Vyc2VzL2Nv/dXJzZV9pbWFnZS8z/NjZlNjViMTNlYTAu/anBn"
            className="w-full h-36 object-cover rounded-t-lg"
            alt="course"
          />
          <CardContent className="px-5 py-4 space-y-3">
            <h1 className="hover:underline font-bold text-lg truncate ">
              Nextjs complete course in hindi 2024
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
                <h1 className="font-medium text-sm">Instuctor Name</h1>
              </div>
              <Badge
                className={
                  "bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
                }
              >
                Advanced
              </Badge>
            </div>
            <div className="text-lg font-bold">
              <span>₹499</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default Course;
