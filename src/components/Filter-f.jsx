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
        onApply(filter); 

    };

    return (
        <div className="px-18 bg-[#e6fdff] ">
            {!isExpanded ? (
                <div className="border black rounded-xl">
                    <button
                        onClick={handleToggle}
                        className="w-full text-center text-white x-h3 bg-secondary hover:bg-secondary-hover rounded-xl px-4 py-2 border-12 border-white"
                    >
                        Filter
                    </button>
                </div>

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
