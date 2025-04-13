import { useState } from "react";
import FilterExpanded from "../components/Filter-e.jsx"; 

function FilterFolded({ filter, setFilter, onApply }) {
    const [isExpanded, setIsExpanded] = useState(false); 

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleCancel = () => {
        setIsExpanded(false);
    };

    const handleApply = () => {
        onApply(filter); // Pass the filter object from parent
        setIsExpanded(false); // Then collapse back to folded
    };

    return (
        <div className="p-3 border border-black rounded-md bg-white w-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
            {!isExpanded ? (
                <button
                    onClick={handleToggle}
                    className="bg-secondary hover:bg-secondary-hover text-white font-semibold w-full py-1 rounded-md"
                >
                    Filter
                </button>
            ) : (
                <FilterExpanded
                    handleApplyFilter={handleApply}
                    filter={filter}
                    setFilter={setFilter}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default FilterFolded;
