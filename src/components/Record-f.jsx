import React, { useState, useEffect } from 'react';
import { RECORDS } from '../data/data';
import RecordExpanded from '../components/Record-e';
// import { useState } from 'react';

function RecordsList({ filter }) {
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("records");
    return saved ? JSON.parse(saved) : RECORDS;
  });

  const [filteredRecords, setFilteredRecords] = useState(records);
  const [editingId, setEditingId] = useState(null);
  function parseDDMMYYYY(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return new Date("Invalid");
    const parts = dateStr.split("/");
    if (parts.length !== 3) return new Date("Invalid");
  
    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  }
  
  
  useEffect(() => {
    const filtered = records.filter((record) => {
      const recordDate = parseDDMMYYYY(record.created); 
      const isValidDate = !isNaN(recordDate.getTime());
    
      const matchesDate =
        !filter.date ||
        (isValidDate && recordDate.toISOString().split("T")[0] === filter.date);
    
      const matchesCategory =
        !filter.category || record.category === filter.category;
    
      const matchesAmount =
        !filter.amount || parseFloat(record.amount) === parseFloat(filter.amount);
    
        const matchesCurrency =
        !filter.currency ||
        (record.currency && record.currency.toLowerCase() === filter.currency.toLowerCase());
      
    
      return matchesDate && matchesCategory && matchesAmount && matchesCurrency;
    });
  
    setFilteredRecords(filtered);
  }, [filter, records]);
  
  
  const handleUpdate = (id, updatedRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, ...updatedRecord } : record
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center bg-[color:var(--color-background)]">
      {filteredRecords.map((record) => (
        <div key={record.id} className="w-full flex justify-center">
          {editingId === record.id ? (
            <div className="p-3 border border-black rounded-md bg-white w-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
              <RecordExpanded
                onCancel={() => setEditingId(null)}
                onSave={(updatedData) => handleUpdate(record.id, updatedData)}
              />
            </div>
          ) : (
            <div className="p-3 border border-black rounded-md bg-white w-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
              <div>
                <h1 className="x-h3 leading-none">{record.title}</h1>
                <p className="x-sPara text-gray-500 mt-1">
                  Created: {record.timestamp};
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="x-para font-medium">{record.category}</p>
                <p className="x-para font-medium">
                  {record.currency === "Riel" ? "៛" : "$"}{record.amount}
                </p>
              </div>
              <p className="x-sPara text-gray-700">{record.description}</p>
              <div className="flex justify-end gap-2">
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


export default RecordsList;
