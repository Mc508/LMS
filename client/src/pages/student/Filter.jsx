import { useState } from "react";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";

const Filter = ({ handleFilterChange }) => {
  const categories = [];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Option</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By Price</SelectLabel>
              <SelectItem value="low">Low To High</SelectItem>
              <SelectItem value="high">High To Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold">CATEGORY</h1>
        {categories.map((category) => (
          <div key="" className="flex items-center gap-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leadng-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Filter;
