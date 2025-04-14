import { createContext, useState, useEffect, useContext } from "react";
import { RECORDS as initialData } from "../data/data";

const RecordsContext = createContext();

export function RecordsProvider({ children }) {
  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("RECORDS")) || initialData;
  });

  useEffect(() => {
    localStorage.setItem("RECORDS", JSON.stringify(records));
  }, [records]);

  const addRecord = (newRecord) => {
    setRecords((prev) => [...prev, newRecord]);
  };

  return (
    <RecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </RecordsContext.Provider>
  );
}

export const useRecords = () => useContext(RecordsContext);
