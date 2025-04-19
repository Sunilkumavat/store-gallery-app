import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = ({ onSelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="bg-slate-100 rounded-2xl  grid grid-cols-[250px_1fr] gap-6 p-4">
      <ul className="list-none list-inside mb-4 space-y-4">
        <li
          onClick={() => onSelect(null)}
          className="cursor-pointer text-red-500 hover:underline text-lg font-medium mx-80"
        >
          Clear
        </li>
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="cursor-pointer text-black hover:text-gray-500 text-lg font-medium"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
