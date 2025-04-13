import React, { useState, useEffect } from "react";
import { RECORDS } from "../data/data.jsx";
import Header from "../components/Header.jsx";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


const categoryColors = {
    "Health": "#9747FF",
    "Transportation": "#37A8FF",
    "Education": "#8BE323",
    "Utilities": "#D53538",
    "Entertainment": "#FF5733",
    "Food": "#FFC300",
    "Shopping": "#C70039",
};

function Summary() {
    const [showMonthDropdown, setShowMonthDropdown] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
    const [currency, setCurrency] = useState("USD");
    const [expenses, setExpenses] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Fetch and process expense data when month/year changes
    useEffect(() => {
        setIsLoading(true);

        // Filter records based on month and year
        const filteredExpenses = RECORDS.filter((record) => {
            const recordDate = new Date(record.timestamp);
            return (
                recordDate.getFullYear() === selectedYear &&
                recordDate.toLocaleString("default", { month: "long" }) === selectedMonth
            );
        });

        // Process the filtered data into a format suitable for the chart
        const processedExpenses = {};
        filteredExpenses.forEach((record) => {
            if (!processedExpenses[record.category]) {
                processedExpenses[record.category] = {
                    amount: 0,
                    color: categoryColors[record.category] || "#A1B196",
                };
            }
            processedExpenses[record.category].amount += currency === "USD" ? record.amountUSD : record.amountRiel;
        });

        setExpenses(processedExpenses);
        setIsLoading(false);
    }, [selectedMonth, selectedYear, currency]);

    // Calculate total expenses
    const totalExpenses = Object.values(expenses).reduce((sum, item) => sum + item.amount, 0) || 0;

    // Function to navigate year
    const changeYear = (increment) => {
        setSelectedYear((prevYear) => prevYear + increment);
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
        setShowMonthDropdown((prev) => !prev);
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

        // If no expenses, render empty circle
        if (totalExpenses === 0) {
            return (
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx={centerX} cy={centerY} r={radius} fill="#e2e8f0" stroke="#cbd5e1" />
                    <circle cx={centerX} cy={centerY} r={radius / 2} fill="white" />
                    <text x={centerX} y={centerY} textAnchor="middle" dominantBaseline="middle" className="text-gray-500">
                        No data
                    </text>
                </svg>
            );
        }

        // Calculate angles for each expense category
        Object.entries(expenses).forEach(([category, data]) => {
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
                <circle cx={centerX} cy={centerY} r={radius / 2} fill="white" />
            </svg>
        );
    };

    // Convert currency value
    const formatCurrency = (amount) => {
        if (currency === "USD") {
            return `$${amount}`;
        } else {
            return `៛${amount.toLocaleString()}`;
        }
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

                {/* Month Navigation */}
                <div className="flex justify-center items-center mb-4 relative">
                    <button
                        className="border border-gray-400 rounded-md p-1 mx-2 w-8 h-8 flex items-center justify-center shadow-sm"
                        onClick={() => changeMonth(-1)}
                    >
                        &lt;
                    </button>
                    <div className="relative">
                        <button
                            className="w-32 text-center border border-gray-200 rounded-md py-1 px-2 bg-white shadow-sm flex items-center justify-center"
                            onClick={toggleMonthDropdown}
                        >
                            {selectedMonth} ▼
                        </button>
                        {showMonthDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-10">
                                {months.map((month) => (
                                    <div
                                        key={month}
                                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
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

                {/* Chart and Expenses */}
                <div className="max-w-md mx-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                {renderPieChart()}
                            </div>

                            <div className="mb-4 flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Expenses</h2>
                                <button
                                    className="text-sm border border-gray-300 rounded-md px-2 py-1"
                                    onClick={() => setCurrency(currency === "USD" ? "KHR" : "USD")}
                                >
                                    {currency === "USD" ? "Show in Riel" : "Show in USD"}
                                </button>
                            </div>

                            <div className="space-y-2">
                                {Object.entries(expenses).map(([category, data]) => (
                                    <div key={category} className="flex justify-between items-center p-3 bg-white rounded-lg shadow">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: data.color }}></div>
                                            <span>{category}</span>
                                        </div>
                                        <span className="font-medium">{formatCurrency(data.amount)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-3 bg-gray-100 rounded-lg shadow">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold">{formatCurrency(totalExpenses)}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Summary;