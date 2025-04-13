import { useState } from "react";
import AddNewCategory from "./AddNewCategory.jsx";

function RecordExpanded({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!category?.name) {
      alert("Please select a category.");
      return;
    }

    if (!amount.trim()) {
      alert("Amount is required.");
      return;
    }

    if (!currency) {
      alert("Please select a currency.");
      return;
    }

    const newRecord = {
      title: title.trim(),
      category: category.name,
      amount: parseFloat(amount),
      currency,
      description: description.trim() || "No description provided",
      timestamp: new Date().toISOString(),
    };

    onSave(newRecord);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="x-h2 text-center">Update record</h1>

      {/* Title */}
      <div className="flex items-center gap-2">
        <label className="x-h4 w-[90px]">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
        />
      </div>

      {/* Category */}
      <div className="mb-4 flex items-center gap-4">
        <p className="x-h4 mb-0">Category</p>
        <div className="w-xs">
          <AddNewCategory value={category} onChange={setCategory} />
        </div>
      </div>

      {/* Amount + Currency */}
      <div className="flex items-start gap-2">
        <label className="x-h4 w-[90px] pt-2">Amount</label>
        <div className="flex-1 flex gap-2">
          <input
            type="number"
            placeholder="Enter Amount (Number Only)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
            min="0"
          />
          <div className="flex flex-col gap-1">
            {["USD", "Riel"].map((cur) => (
              <label key={cur} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="currency"
                  value={cur}
                  checked={currency === cur}
                  onChange={() => setCurrency(cur)}
                  className="accent-[color:var(--color-accent)]"
                />
                <span className="x-sPara">{cur}</span>
              </label>
            ))}
          </div>
        </div>
      </div>


      {/* Description */}
      <div className="flex items-center gap-2">
        <label className="x-h4 w-[90px]">Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="bg-[color:var(--color-abort)] hover:bg-[color:var(--color-abort-hover)] text-white px-4 py-1 rounded-md x-sPara"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white px-4 py-1 rounded-md x-sPara"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default RecordExpanded;
