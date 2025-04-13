import Header from "../components/Header.jsx";
import Filter from "../components/Filter-f.jsx";
import RecordFolded from "../components/Record-f.jsx";
import { useState } from "react";

function Records() {
    // const [filter, setFilter] = useState({
    //     date: "",
    //     category: "",
    //     amount: "",
    //     currency: "",
    // });

    // const [appliedFilter, setAppliedFilter] = useState({});

    // const handleApply = (newFilter) => {
    //     setAppliedFilter(newFilter);
    // };

    // return (
    //     <div>
    //         <Header />
    //         <Filter
    //             filter={filter}
    //             setFilter={setFilter}
    //             onApply={handleApply}
    //         />
    //         <p className="pl-5 x-h1">Recorded List</p>
    //         <RecordFolded filter={appliedFilter} />
    //     </div>
    // );
}

export default Records;
