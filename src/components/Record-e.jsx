import { useState } from "react";

function RecordExpanded({ onSave, onCancel }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const newRecord = {
      title,
      category,
      amount,
      currency,
      description,
      created: new Date().toLocaleString(), 
    };

    onSave(newRecord);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="x-h2 text-center">Update record</h1>

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

      <div className="flex items-center gap-2">
        <label className="x-h4 w-[90px]">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select a category</option>
          <option value="rent">Rent</option>
          <option value="service">Service</option>
          <option value="food">Food</option>
          <option value="gas">Gas</option>
        </select>
      </div>

      <div className="flex items-start gap-2">
        <label className="x-h4 w-[90px] pt-2">Amount</label>
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400"
          />
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="currency"
                value="USD"
                checked={currency === "USD"}
                onChange={() => setCurrency("USD")}
                className="accent-[color:var(--color-accent)]"
              />
              <span className="x-sPara">USD</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="currency"
                value="Riel"
                checked={currency === "Riel"}
                onChange={() => setCurrency("Riel")}
                className="accent-[color:var(--color-accent)]"
              />
              <span className="x-sPara">Riel</span>
            </label>
          </div>
        </div>
      </div>

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