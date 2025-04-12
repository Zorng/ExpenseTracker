import { useState } from "react";

const defaultCategories = [
  { name: "Rent", color: "#9747FF" },
  { name: "Service", color: "#2ECC71" },
  { name: "Food", color: "#E74C3C" },
  { name: "Gas", color: "#00BCD4" }
];

export default function AddNewCategory({ value, onChange }) {
  const [categories, setCategories] = useState(defaultCategories);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState("#9751F2");

  const handleAddCategory = () => {
    if (!newName.trim()) return;
    const newCategory = { name: newName.trim(), color: newColor };
    setCategories([...categories, newCategory]);
    onChange(newCategory);
    setNewName("");
    setNewColor("#9751F2");
    setIsAddingCategory(false);
    setDropdownOpen(false);
  };

  return (
    <div className="relative z-10">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="border rounded-lg px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
      >
        <span>{value?.name || "Select a category"}</span>
        <span>▾</span>
      </div>

      {dropdownOpen && (
        <div className="absolute bg-white border rounded-lg shadow-md mt-1 w-full max-h-60 overflow-y-auto z-50">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(cat);
                setDropdownOpen(false);
              }}
              className="px-3 py-2 flex items-center hover:bg-gray-100 cursor-pointer"
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: cat.color }}
              ></span>
              <span>{cat.name}</span>
            </div>
          ))}

          <div
            onClick={() => setIsAddingCategory(true)}
            className="text-[var(--color-accent)] px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            + Add new category
          </div>

          {isAddingCategory && (
            <div className="px-3 py-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 mb-2"
                placeholder="Enter category name"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-full h-10 mb-2 rounded-md"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="px-4 py-2 rounded-xl text-white"
                  style={{ backgroundColor: "var(--color-abort)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 rounded-xl text-white"
                  style={{ backgroundColor: "var(--color-accent)" }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
