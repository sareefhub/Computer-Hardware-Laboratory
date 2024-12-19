export const setCurrentUser = (username, role) => {
    const currentUser = { username, role };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  };
  
  export const getCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  };
  
  export const clearCurrentUser = () => {
    localStorage.removeItem('currentUser');
  };
  