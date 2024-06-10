import { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://bib-one.vercel.app/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCurrentCategory({ ...currentCategory, name: e.target.value });
  };

  const handleSave = async () => {
    if (currentCategory.id) {
      // Update existing category
      try {
        const response = await axios.put(
          `https://bib-one.vercel.app/api/categories/${currentCategory.id}`,
          { name: currentCategory.name }
        );
        setCategories(
          categories.map((cat) =>
            cat.id === currentCategory.id ? response.data : cat
          )
        );
        setCurrentCategory({ id: null, name: "" });
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      // Add new category
      try {
        const response = await axios.post(
          "https://bib-one.vercel.app/api/categories",
          { name: currentCategory.name }
        );
        setCategories([...categories, response.data]);
        setCurrentCategory({ id: null, name: "" });
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };

  const startEditCategory = (category) => {
    setCurrentCategory(category);
  };

  const cancelEditCategory = () => {
    setCurrentCategory({ id: null, name: "" });
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`https://bib-one.vercel.app/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-[82vh]">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-gray-600">Manage Categories</h1>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 mb-4 mt-4">
          <div className="w-full sm:w-auto md:w-1/2 lg:w-3/5 xl:w-[70%]">
            <input
              type="text"
              value={currentCategory.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="mb-2 sm:mb-0 p-2 border rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#3bb77e] focus:border-transparent transition w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
            >
              {currentCategory.id ? "Save Changes" : "Add Category"}
            </button>
            {currentCategory.id && (
              <button
                onClick={cancelEditCategory}
                className="px-4 py-2 text-white bg-[#3bb77e] rounded hover:bg-[#29a56c] transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Name
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Edit
                </th>
                <th className="py-2 px-4 border-b border-r bg-gray-100 text-left text-gray-600 font-semibold text-[15px]">
                  Delete
                </th>
              </tr>
            </thead>
            {categories.length > 0 ? (
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 text-sm">
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      {category.name}
                    </td>
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      <button onClick={() => startEditCategory(category)}>
                        Edit
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b border-r text-gray-700">
                      <button onClick={() => deleteCategory(category.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tr className="text-center">
                <td
                  className="text-xl font-bold text-gray-600 py-2"
                  colSpan={3}
                >
                  No categories available at the moment.
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
