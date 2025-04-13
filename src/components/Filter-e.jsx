function FilterExpanded({ filter = {}, setFilter, handleApplyFilter, onCancel }) {
    const { date = "", category = "", amount = "", currency = "" } = filter || {};

    return (
        <div className="w-full">
            <h1 className="x-h2 text-center mb-6">Filter by</h1>
            {/* Recorded Date */}
            <div className="mb-4 flex items-center gap-4">
                <p className="x-h4 mb-0">Recorded Date</p>
                <input
                    type="date"
                    value={date || ""}
                    onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                    className="w-2xs border border-gray-300 rounded-md px-3 py-2"
                />
            </div>
            {/* Category */}
            <div className="mb-4 flex items-center gap-4">
                <p className="x-h4 mb-0">Category</p>
                <select
                    value={category}
                    onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                    className="w-xs border border-gray-300 rounded-md px-3 py-2"
                >
                    <option value="">Select a Category</option>
                    <option value="rent">Rent</option>
                    <option value="service">Service</option>
                    <option value="food">Food</option>
                    <option value="gas">Gas</option>
                </select>
            </div>
            {/* Amount and Currency */}
            <div className="mb-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <p className="x-h4 mb-0">Amount</p>
                    <input
                        type="number"
                        value={amount || ""}
                        onChange={(e) => setFilter({ ...filter, amount: e.target.value })}
                        placeholder="Enter Amount"
                        className="w-2xs border border-gray-300 rounded-md px-3 py-2"
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