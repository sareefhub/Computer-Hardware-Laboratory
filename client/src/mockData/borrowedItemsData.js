// This file will manage the borrowed items data in localStorage

// Function to get borrowed items from localStorage
export const getBorrowedItems = () => {
    return JSON.parse(localStorage.getItem("borrowedItems")) || [];  // Return an empty array if no data exists
  };
  
  // Function to set borrowed items to localStorage
  export const setBorrowedItems = (items) => {
    localStorage.setItem("borrowedItems", JSON.stringify(items));  // Store the items as a JSON string
  };
  