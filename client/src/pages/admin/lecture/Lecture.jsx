const Lecture = ({ lecture, courseId, index }) => {
  console.log(lecture.lectureTitle);
  return (
    <div className="flex items-center justify-center bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2 ">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        {lecture.lectureTitle}
      </h1>
    </div>
  );
};
export default Lecture;
