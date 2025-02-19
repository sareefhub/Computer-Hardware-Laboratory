import { API_URL } from "../config";

// ดึงข้อมูลการยืมทั้งหมด
export const getBorrowedItems = async () => {
  try {
    const response = await fetch(`${API_URL}/borrowedItems`);
    return response.ok ? await response.json() : [];
  } catch (error) {
    console.error("❌ Error fetching borrowed items:", error);
    return [];
  }
};

// ลบข้อมูลการยืมตาม ID โดยใช้ DELETE
export const deleteBorrowedItem = async (id) => {
    try {
      console.log(`🗑️ Trying to delete item with ID: ${id}`);
  
      // ใช้ DELETE request เพื่อให้ json-server จัดการให้
      const response = await fetch(`${API_URL}/borrowedItems/${id}`, {
        method: "DELETE",
      });
  
      console.log("Response Status:", response.status);
  
      if (response.ok) {
        console.log(`✅ Item with ID ${id} deleted successfully`);
        return true;
      } else {
        throw new Error(`❌ Failed to delete item with ID ${id}`);
      }
    } catch (error) {
      console.error("❌ Error deleting data from json-server:", error);
      return false;
    }
  };
  
  export const addBorrowedItem = async (newItem) => {
    try {
      const response = await fetch(`${API_URL}/borrowedItems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
  
      if (response.ok) {
        const result = await response.json(); // รับข้อมูลที่ถูกเพิ่มใหม่
        console.log("✅ Item added to json-server:", result);
      } else {
        throw new Error("❌ Failed to add item to json-server");
      }
    } catch (error) {
      console.error("❌ Error saving to json-server:", error);
    }
  };  

// ดึงข้อมูลการยืมทั้งหมดจาก json-server
export const getAllBorrowedItems = async () => {
  try {
    const response = await fetch(`${API_URL}/borrowedItems`);
    const borrowedItems = await response.json();
    console.log("📄 All borrowed items from json-server:", borrowedItems);
    return borrowedItems;
  } catch (error) {
    console.error("❌ Error fetching data from json-server:", error);
    return [];
  }
};

// ดึงข้อมูลการยืมโดยใช้ชื่อผู้ยืม
export const getBorrowedItemsByBorrowerName = async (borrowerName) => {
  try {
    const response = await fetch(`${API_URL}/borrowedItems?borrowerName=${borrowerName}`);
    const filteredItems = await response.json();
    console.log(`📂 Borrowed items for borrower ${borrowerName}:`, filteredItems);
    return filteredItems;
  } catch (error) {
    console.error("❌ Error fetching data from json-server:", error);
    return [];
  }
};

// อัปเดตข้อมูลการยืม
export const updateBorrowedItem = async (id, updatedItem) => {
  try {
    const response = await fetch(`${API_URL}/borrowedItems/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    if (response.ok) {
      console.log("🔄 Item updated in json-server:", updatedItem);
    } else {
      throw new Error("❌ Failed to update item in json-server");
    }
  } catch (error) {
    console.error("❌ Error updating data in json-server:", error);
  }
};
