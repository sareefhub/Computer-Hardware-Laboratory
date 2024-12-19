// ฟังก์ชันเพื่อบันทึกข้อมูลลงใน localStorage
export const saveUserToLocalStorage = (username) => {
    localStorage.setItem("username", username);
  };
  
  // ฟังก์ชันเพื่อดึงข้อมูลจาก localStorage
  export const getUserFromLocalStorage = () => {
    return localStorage.getItem("username");
  };
  
  // ฟังก์ชันเพื่อลบข้อมูลจาก localStorage
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("username");
  };
  