import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-gray-700 dark:to-gray-900 py-24 px-4 text-center  ">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Coursess For You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, learn and upskill your self with our wide range of courses
        </p>
        <form
          onSubmit={handleSearch}
          action=""
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            placeholder="Search Courses"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" flex-grow border-none focus-visible:ring-0 px-6 py-3 text-black dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button className="bg-blue-600 dark:bg-gray-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 ">
            Search
          </Button>
        </form>
        <Button
          onClick={() => navigate(`/course/search?query`)}
          className=" dark:bg-gray-700 bg-white text-black rounded-full hover:bg-blue-700 "
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};
export default HeroSection;
