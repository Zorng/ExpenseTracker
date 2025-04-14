import { useState } from "react";
import AddNewCategory from "./AddNewCategory";
//Create specifically for record page
export default function AddNewRecord({ records, setRecords }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);

  const handleSave = () => {
    if (!title.trim() || !amount || !category) return;

    const now = new Date();
    const parsedAmount = parseFloat(amount);

    const amountUSD = currency === "USD" ? parsedAmount : parsedAmount / 4000;
    const amountRiel = currency === "Riel" ? parsedAmount : parsedAmount * 4000;

    const nextId = records.length > 0 ? Math.max(...records.map((r) => r.id || 0)) + 1 : 1;

    const newRecord = {
      id: nextId,
      title: title.trim(),
      category: category || { name: "Uncategorized", color: "#ccc" },
      amountRiel: Number(amountRiel.toFixed(2)),
      amountUSD: Number(amountUSD.toFixed(2)),
      description: description.trim() || "No description",
      timestamp: now.toISOString(),
    };

    setRecords((prev) => [newRecord, ...prev]); 
    setIsExpanded(false);

    // Reset fields
    setTitle("");
    setAmount("");
    setDescription("");
    setCategory(null);
    setCurrency("USD");
  };

  const today = new Date().toISOString().slice(0, 10);
  const todaysRecords = records.filter((rec) =>
    rec.timestamp.startsWith(today)
  );

  return (
    <div className="px-18 py-2 bg-[#e6fdff]">
      {!isExpanded ? (
        <div className="border-1 rounded-xl">
          <button
            className="w-full text-center text-white x-h3 bg-[var(--color-accent)] rounded-xl px-4 py-2 border-12 border-white"
            onClick={() => setIsExpanded(true)}
          >
            Add a new record
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-4 shadow-md mt-4">
          <h2 className="x-h2 mb-4">Add a new record</h2>

          <label className="x-h4 block mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full border rounded-lg px-3 py-2 mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="x-h4 block mb-1">Category</label>
          <AddNewCategory value={category} onChange={setCategory} />

          <label className="x-h4 block mt-4 mb-1">Amount</label>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="flex-1 border rounded-lg px-3 py-2"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex flex-col gap-1">
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="currency"
                  value="USD"
                  className="mr-1 accent-[var(--color-accent)]"
                  checked={currency === "USD"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                USD
              </label>
              <label className="flex items-center text-sm">
                <input
                  type="radio"
                  name="currency"
                  value="Riel"
                  className="mr-1 accent-[var(--color-accent)]"
                  checked={currency === "Riel"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                Riel
              </label>
            </div>
          </div>

          <label className="x-h4 block mb-1">Description</label>
          <input
            type="text"
            placeholder="Enter description"
            className="w-full border rounded-lg px-3 py-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 rounded-xl text-white"
              style={{ backgroundColor: "var(--color-abort)" }}
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-xl text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
