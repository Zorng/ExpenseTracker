import React, { useState } from "react";
import Header from "../components/Header.jsx";

const months = ["January", "February", "March", "April", "May", "June", 
               "July", "August", "September", "October", "November", "December"];

function Summary() {
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState("June");
    const [currency, setCurrency] = useState("USD");
    
    // Sample expense data
    const expenseData = {
        Rent: { amount: 200, color: "#9747FF" },
        Food: { amount: 100, color: "#D53538" },
        Subscription: { amount: 70, color: "#8BE323" },
        Gas: { amount: 50, color: "#37A8FF" }
    };
    
    // Calculate total expenses
    const totalExpenses = Object.values(expenseData).reduce((sum, item) => sum + item.amount, 0);
    
    // Function to navigate year
    const changeYear = (increment) => {
        setSelectedYear(prevYear => prevYear + increment);
    };
    
    // Function to navigate month
    const changeMonth = (increment) => {
        const currentIndex = months.indexOf(selectedMonth);
        let newIndex = (currentIndex + increment) % 12;
        if (newIndex < 0) newIndex = 11;
        setSelectedMonth(months[newIndex]);
        setShowMonthDropdown(false);
    };
    
    // Toggle month dropdown
    const toggleMonthDropdown = () => {
        setShowMonthDropdown(prev => !prev);
    };
    
    // Select month from dropdown
    const selectMonth = (month) => {
        setSelectedMonth(month);
        setShowMonthDropdown(false);
    };
    
    // Function to draw pie chart with SVG
    const renderPieChart = () => {
        const radius = 70;
        const centerX = 100;
        const centerY = 100;
        
        let startAngle = 0;
        const paths = [];
        
        // Calculate angles for each expense category
        Object.entries(expenseData).forEach(([category, data]) => {
            const percentage = data.amount / totalExpenses;
            const endAngle = startAngle + percentage * 2 * Math.PI;
            
            // Calculate SVG arc path
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            // Determine if the arc should take the long path (large-arc-flag)
            const largeArcFlag = percentage > 0.5 ? 1 : 0;
            
            // SVG path for the arc
            const pathData = `
                M ${centerX} ${centerY}
                L ${x1} ${y1}
                A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
            `;
            
            paths.push(
                <path 
                    key={category} 
                    d={pathData} 
                    fill={data.color} 
                    stroke="none"
                />
            );
            
            startAngle = endAngle;
        });
        
        return (
            <svg width="200" height="200" viewBox="0 0 200 200">
                {paths}
                {/* Inner white circle to create donut effect */}
                <circle cx={centerX} cy={centerY} r={radius/2} fill="white" />
            </svg>
        );
    };
    
    return (
        <div>
            <Header />
            
            <div className="px-2 py-4 mx-auto max-w-full bg-transparent">
                {/* Year Navigation */}
                <div className="flex justify-center items-center mb-2">
                    <button
                        className="border border-gray-400 rounded-md p-1 mx-2 w-8 h-8 flex items-center justify-center shadow-sm"
                        onClick={() => changeYear(-1)}
                    >
                        &lt;
                    </button>
                    <div className="w-24 text-center border border-gray-200 rounded-md py-1 px-2 bg-white shadow-sm">
                        {selectedYear}
                    </div>
                    <button
                        className="border border-gray-400 rounded-md p-1 mx-2 w-8 h-8 flex items-center justify-center shadow-sm"
                        onClick={() => changeYear(1)}
                    >
                        &gt;
                    </button>
                </div>
                
                {/* Month Navigation with Dropdown */}
                <div className="flex justify-center items-center mb-4 relative">
                    <button
                        className="border border-gray-400 rounded-md p-1 mx-2 w-8 h-8 flex items-center justify-center shadow-sm"
                        onClick={() => changeMonth(-1)}
                    >
                        &lt;
                    </button>
                    <div className="relative w-24">
                        <button
                            className="w-full text-center border border-gray-200 rounded-md py-1 px-2 bg-white shadow-sm"
                            onClick={toggleMonthDropdown}
                        >
                            {selectedMonth}
                        </button>
                        
                        {/* Month Dropdown */}
                        {showMonthDropdown && (
                            <div className="absolute z-10 w-full max-h-32 overflow-y-auto bg-white border border-gray-200 rounded-md mt-1 shadow-md">
                                {months.map((month, index) => (
                                    <div 
                                        key={index}
                                        className="py-2 px-1 hover:bg-gray-100 cursor-pointer text-center"
                                        onClick={() => selectMonth(month)}
                                    >
                                        {month}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button
                        className="border border-gray-400 rounded-md p-1 mx-2 w-8 h-8 flex items-center justify-center shadow-sm"
                        onClick={() => changeMonth(1)}
                    >
                        &gt;
                    </button>
                </div>
                
                {/* Card Container */}
                <div className="border border-gray-200 rounded-lg bg-white shadow mx-auto max-w-xs">
                    {/* Monthly Summary Title */}
                    <div className="text-center x-h2 py-2 border-b border-gray-200">
                        Monthly Summary
                    </div>
                    
                    {/* Currency Selection */}
                    <div className="flex justify-end px-4 pt-3">
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                checked={currency === "USD"}
                                onChange={() => setCurrency("USD")}
                                className="form-radio h-4 w-4 text-accent"
                            />
                            <span className="ml-1 x-para">USD</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                checked={currency === "Riel"}
                                onChange={() => setCurrency("Riel")}
                                className="form-radio h-4 w-4 text-accent"
                            />
                            <span className="ml-1 x-para">Riel</span>
                        </label>
                    </div>
                    
                    {/* Pie Chart */}
                    <div className="flex justify-center py-2">
                        {renderPieChart()}
                    </div>
                    
                    {/* Details */}
                    <div className="px-4 pb-4">
                        <div className="text-center x-h3 mb-2 border-t border-gray-200 pt-2">Details</div>
                        
                        <div className="grid grid-cols-2 gap-y-2">
                            {Object.entries(expenseData).map(([category, data]) => (
                                <div key={category} className="flex items-center">
                                    <div 
                                        className="w-4 h-4 mr-2 rounded-sm" 
                                        style={{ backgroundColor: data.color }}
                                    ></div>
                                    <span className="x-h4">{category}</span>
                                    <span className="x-h4 ml-auto">${data.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Summary;