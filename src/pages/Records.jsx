import Header from "../components/Header.jsx";
import Filter from "../components/Filter-f.jsx";
import RecordFolded from "../components/Record-f.jsx";
import { useState, useEffect } from "react";
import AddNewRecord from "../components/AddNewRecord(Records).jsx";
import { RECORDS as initialData } from "../data/data.jsx";

function Records() {
    const [filter, setFilter] = useState({
        date: "",
        category: "",
        amount: "",
        currency: "",
    });

    const [appliedFilter, setAppliedFilter] = useState({});
    const [records, setRecords] = useState(() => {
        const saved = localStorage.getItem("records");
        const rawRecords = saved ? JSON.parse(saved) : initialData;
    
        return rawRecords.map((record) => ({
            ...record,
            category:
                typeof record.category === "string"
                    ? { name: record.category, color: "#ccc" }
                    : record.category,
        }));
    });    

    useEffect(() => {
        localStorage.setItem("records", JSON.stringify(records));
    }, [records]);    

    const handleApply = (newFilter) => {
        setAppliedFilter(newFilter);
    };

    return (
        <div>
            <header>
                <Header />
            </header>
            <div className="flex flex-col gap-4">
                <div className="mt-10">
                    <Filter
                        filter={filter}
                        setFilter={setFilter}
                        onApply={handleApply}
                    />
                </div>
                <div>
                    <AddNewRecord records={records} setRecords={setRecords} />
                </div>
            </div>

            <p className="pl-5 x-h1">Recorded List</p>
            <div className="w-full">
                <RecordFolded filter={appliedFilter} records={records} setRecords={setRecords} />
            </div>
        </div>
    );
}

export default Records;
