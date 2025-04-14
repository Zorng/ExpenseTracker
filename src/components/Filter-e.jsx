import AddNewCategory from "../components/AddNewCategory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../styles/datepicker.css";


function FilterExpanded({ filter = {}, setFilter, handleApplyFilter, onCancel }) {
    const { date = "", category = "", amount = "", currency = "" } = filter || {};
    const handleClearFilter = () => {
        const cleared = { date: "", category: "", amount: "", currency: "" };
        setFilter(cleared);
        handleApplyFilter(cleared);
    };
    return (
      <div className="w-full bg-white rounded-xl p-4 shadow-md mt-4">
        <h1 className="x-h2 text-center mb-6">Filter by</h1>
        
        {/* Recorded Date */}
        <div className="w-full mb-4 flex items-center gap-4">
          <p className="x-h4 mb-0">Recorded Date</p>
          <div className="w-full">
            <DatePicker
              selected={date ? new Date(date) : null}
              onChange={(dateObj) => {
                const formatted = format(dateObj, "yyyy-MM-dd");
                setFilter({ ...filter, date: formatted });
              }}
              placeholderText="yyyy/mm/dd"
              dateFormat="yyyy/MM/dd"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              popperPlacement="bottom-start"
            />
          </div>
        </div>

  
        {/* Category */}
        <div className="mb-4 flex items-center gap-4">
          <p className="x-h4 mb-0">Category</p>
          <div className="w-full">
            <AddNewCategory value={category} onChange={(val) => setFilter({ ...filter, category: val })} />
          </div>
        </div>
  
        {/* Amount and Currency */}
        <div className="mb-4 flex items-center gap-6">
          <div className="flex items-center gap-2 w-full">
            <p className="x-h4 mb-0">Amount</p>
            <input
              type="number"
              value={amount || ""}
              onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
              placeholder="Enter Amount"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="flex flex-col justify-between">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="currency"
                value="USD"
                checked={currency === "USD"}
                onChange={(e) => setFilter({ ...filter, currency: e.target.value })}
                className="accent-[color:var(--color-accent)]"
              />
              <span className="x-para">USD</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="currency"
                value="Riel"
                checked={currency === "Riel"}
                onChange={(e) => setFilter({ ...filter, currency: e.target.value })}
                className="accent-[color:var(--color-accent)]"
              />
              <span className="x-para">Riel</span>
            </label>
          </div>
        </div>
  
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-2">
            <button
                onClick={onCancel}
                className="bg-[color:var(--color-abort)] hover:bg-[color:var(--color-abort-hover)] text-white px-4 py-2 rounded-md"
            >
                Cancel
            </button>
            <button
                onClick={handleClearFilter}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
            >
                Clear
            </button>
            <button
                onClick={handleApplyFilter}
                className="bg-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-hover)] text-white px-4 py-2 rounded-md"
            >
                Filter
            </button>
        </div>
    </div>
    );
  }

export default FilterExpanded;