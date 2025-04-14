import React, { useState, useEffect } from 'react';
import { RECORDS } from '../data/data';
import RecordExpanded from '../components/Record-e';

function RecordsFolded({ records, setRecords, filter }) {
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const filtered = records.filter((record) => {
      // Record timestamp (assumed in ISO format)
      const recordTimestamp = record.timestamp; 

      const matchesDate =
        !filter.date ||
        (recordTimestamp && recordTimestamp.split("T")[0] === filter.date); // Compare only the date part of the timestamp

      const matchesCategory =
        !filter.category || record.category?.name === filter.category.name;
      
      const targetAmount =
        filter.currency === "Riel"
          ? record.amountRiel
          : record.amountUSD;
      
      const matchesAmount =
        !filter.amount ||
        (targetAmount != null &&
          Math.abs(Number(filter.amount) - Number(targetAmount)) < 0.001);      
      
      const matchesCurrency =
        !filter.currency ||
        filter.currency === "All" ||
        (filter.currency === "Riel" && record.amountRiel != null) ||
        (filter.currency === "USD" && record.amountUSD != null);
      
      return matchesDate && matchesCategory && matchesAmount && matchesCurrency;
    });

    setFilteredRecords(filtered);
  }, [filter, records]);

  const handleUpdate = (id, updatedRecord) => {
    const updatedRecords = records.map((record) =>
      record.id === id ? { ...record, ...updatedRecord } : record
    );
  
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords)); 
    setEditingId(null);
  };  

  const handleDelete = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-stretch bg-[color:var(--color-background)]">
      {filteredRecords.map((record) => (
        <div key={record.id} className="w-full flex ">
          {editingId === record.id ? (
            <div className="p-3 border border-black rounded-md bg-white w-full mx-4 sm:mx-6 md:mx-10">
              <RecordExpanded
                onCancel={() => setEditingId(null)}
                onSave={(updatedData) => handleUpdate(record.id, updatedData)}
              />
            </div>
          ) : (
            <div className="p-3 border border-black rounded-md bg-white w-full mx-4 sm:mx-6 md:mx-10">
              <div>
                <h1 className="x-h3 leading-none">{record.title}</h1>
                <p className="x-sPara text-gray-500 mt-1">
                  Created: {record.timestamp};
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="x-para font-medium">{record.category.name}</p>
                <p className="x-para font-medium">
                {filter.currency === "Riel" ? "៛" : "$"}
                {filter.currency === "Riel" 
                  ? (record.amountRiel ?? 0) 
                  : (record.amountUSD ?? 0)
                }
                </p>
              </div>
              <p className="x-sPara text-gray-700">{record.description}</p>
              <div className="w-full flex justify-end gap-2">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="bg-[color:var(--color-abort)] hover:bg-[color:var(--color-abort-hover)] text-white px-3 py-1 rounded-[4px] x-sPara"
                >
                  Delete
                </button>
                <button
                  onClick={() => setEditingId(record.id)}
                  className="bg-[color:var(--color-secondary)] hover:bg-[color:var(--color-secondary-hover)] text-white px-3 py-1 rounded-[4px] x-sPara"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecordsFolded;
