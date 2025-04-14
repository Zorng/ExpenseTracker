import { useState, useEffect } from "react";
import AddNewCategory from "./AddNewCategory";
// import { RECORDS as initialData } from "../data/data";
import { useRecords } from "./RecordContext";

export default function AddNewRecord() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currency, setCurrency] = useState("USD");
  // when refresh page or restart app, it will get data from localStorage
  // const [records, setRecords] = useState(() => {
  //   return JSON.parse(localStorage.getItem("RECORDS")) || initialData;
  // });
  const { records, addRecord } = useRecords();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);

  // Sync records with localStorage whenever records state changes
  useEffect(() => {
    localStorage.setItem("RECORDS", JSON.stringify(records));
  }, [records]);

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
      category: typeof category === "object" && category !== null
        ? category
        : { name: "Uncategorized", color: "#ccc" },
      amountRiel: Math.round(amountRiel), 
      amountUSD: Math.round(amountUSD), 
      description: description.trim() || "No description",
      timestamp: now.toISOString(),
    };

    // setRecords((prevRecords) => [...prevRecords, newRecord]); // Updates state with new record
    addRecord(newRecord); // Updates state with new record using context
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
    <div className="px-4 py-2 bg-[#e6fdff] h-auto">
      <h2 className="x-h2 mb-2 font-bold">Quick Action</h2>

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

      {/* Today Record  */}
      <h2 className="x-h2 mt-6 font-bold">Today’s record</h2>
      <div className="bg-white rounded-xl mt-2 p-2 shadow-sm border-1">
        {todaysRecords.length === 0 ? (
          <p className="text-center text-black-700">No records yet</p>
        ) : (
          todaysRecords.map((rec, idx) => (
            <div key={idx} className="p-1 border-b last:border-b-0">
              <div className="font-semibold">{rec.title}</div>
              <div className="text-sm text-gray-400 x-Para">
                Created: {new Date(rec.timestamp).toLocaleDateString()} at {new Date(rec.timestamp).toLocaleTimeString()}
              </div>
              <div className="text-sm text-black-700">
                {currency === "USD" ? rec.amountUSD : rec.amountRiel} {currency}
              </div>
              <div className="text-sm text-gray-600">
                {rec.description || "No description"}
              </div>
              <div className="flex items-center text-sm mt-1 gap-2">
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: rec.category?.color || "#ccc" }}
                ></span>
                <span>{rec.category?.name ?? "Uncategorized"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
