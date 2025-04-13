import Header from "../components/Header.jsx";
import Filter from "../components/Filter-f.jsx";
import RecordFolded from "../components/Record-f.jsx";
import { useState } from "react";
function Records() {
    const [filter, setFilter] = useState({
        date: "",
        category: "",
        amount: "",
        currency: "",
    });
    return (
        <div>
            <Header />
            <Filter filter={filter} setFilter={setFilter} onApply={(f) => setFilter(f)}/>
            <p className="pl-5 x-h1">Recorded List</p>
            <RecordFolded filter={filter}/>
        </div>
    );
}

export default Records;