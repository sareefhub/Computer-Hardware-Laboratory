// ฟังก์ชันเพิ่มข้อมูลการยืมใหม่ลงใน localStorage
export const addBorrowedItem = (newItem) => {
    try {
      // ดึงข้อมูลรายการยืมที่มีอยู่จาก localStorage
      const borrowedItems = JSON.parse(localStorage.getItem("borrowedItems")) || [];
  
      // เพิ่มรายการยืมใหม่เข้าไปใน borrowedItems
      borrowedItems.push(newItem);
  
      // บันทึกข้อมูลกลับไปที่ localStorage
      localStorage.setItem("borrowedItems", JSON.stringify(borrowedItems));
  
      console.log('✅ Item added to localStorage:', newItem);
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
    }
  };
  
  // ฟังก์ชันดึงข้อมูลการยืมทั้งหมดจาก localStorage
  export const getAllBorrowedItems = () => {
    try {
      const borrowedItems = JSON.parse(localStorage.getItem("borrowedItems")) || [];
      console.log('📄 All borrowed items from localStorage:', borrowedItems);
      return borrowedItems;
    } catch (error) {
      console.error('❌ Error fetching data from localStorage:', error);
      return [];
    }
  };
  
  // ฟังก์ชันดึงข้อมูลการยืมโดยชื่อผู้ยืมจาก localStorage
  export const getBorrowedItemsByBorrowerName = (borrowerName) => {
    try {
      const borrowedItems = JSON.parse(localStorage.getItem("borrowedItems")) || [];
      const filteredItems = borrowedItems.filter(item => item.borrowerName === borrowerName);
      console.log(`📂 Borrowed items for borrower ${borrowerName}:`, filteredItems);
      return filteredItems;
    } catch (error) {
      console.error('❌ Error fetching data from localStorage:', error);
      return [];
    }
  };
  