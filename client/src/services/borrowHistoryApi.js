import { API_URL } from "../config";

// ดึงประวัติการยืมทั้งหมดจาก json-server
export const getBorrowHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/borrowHistory`);
    return response.ok ? await response.json() : [];
  } catch (error) {
    console.error("❌ Error fetching borrow history:", error);
    return [];
  }
};

// เพิ่มข้อมูลประวัติการยืมลงใน json-server
export const addBorrowHistory = async (newHistory) => {
  try {
    const response = await fetch(`${API_URL}/borrowHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHistory),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Borrow history added:", result);
      return result;
    } else {
      throw new Error("❌ Failed to add borrow history");
    }
  } catch (error) {
    console.error("❌ Error saving borrow history:", error);
  }
};

// ลบประวัติการยืมตาม ID
export const deleteBorrowHistory = async (id) => {
  try {
    console.log(`🗑️ Trying to delete borrow history with ID: ${id}`);

    const response = await fetch(`${API_URL}/borrowHistory/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`✅ Borrow history with ID ${id} deleted successfully`);
      return true;
    } else {
      throw new Error(`❌ Failed to delete borrow history with ID ${id}`);
    }
  } catch (error) {
    console.error("❌ Error deleting borrow history:", error);
    return false;
  }
};

// อัปเดตข้อมูลประวัติการยืม
export const updateBorrowHistory = async (id, updatedHistory) => {
  try {
    const response = await fetch(`${API_URL}/borrowHistory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHistory),
    });

    if (response.ok) {
      console.log("🔄 Borrow history updated:", updatedHistory);
    } else {
      throw new Error("❌ Failed to update borrow history");
    }
  } catch (error) {
    console.error("❌ Error updating borrow history:", error);
  }
};

// ล้างประวัติการยืมทั้งหมด
export const clearBorrowHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/borrowHistory`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("🧹 Borrow history cleared successfully");
      return true;
    } else {
      throw new Error("❌ Failed to clear borrow history");
    }
  } catch (error) {
    console.error("❌ Error clearing borrow history:", error);
    return false;
  }
};
