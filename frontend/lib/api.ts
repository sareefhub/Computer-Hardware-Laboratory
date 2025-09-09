const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const endpoints = {
  auth: {
    login: `${API_URL}/auth/login`,
  },
  student: {
    equipments: `${API_URL}/equipments`,
    borrowingRequests: `${API_URL}/borrowing-requests`,
  },
  teacher: {
    getAllBorrowing: `${API_URL}/borrowing-requests`,
    approveRequest: (id: string) => `${API_URL}/borrowing-requests/${id}/approve`,
    rejectRequest: (id: string) => `${API_URL}/borrowing-requests/${id}/reject`,
  },
  admin: {
    equipments: {
      create: `${API_URL}/equipments`,
      readAll: `${API_URL}/equipments`,
      readById: (id: string) => `${API_URL}/equipments/${id}`,
      updateById: (id: string) => `${API_URL}/equipments/${id}`,
      deleteById: (id: string) => `${API_URL}/equipments/${id}`,
      readPicture: (id: string) => `${API_URL}/equipments/${id}/picture`,
    },
    borrowing: {
      updatePrepare: (id: string) => `${API_URL}/borrowing/${id}/prepare`,
      updateBorrow: (id: string) => `${API_URL}/borrowing/${id}/borrow`,
      updateReturn: (id: string) => `${API_URL}/borrowing/${id}/return`,
    },
    settings: {
      create: `${API_URL}/settings`,
      read: `${API_URL}/settings`,
      update: (id: string) => `${API_URL}/settings/${id}`,
    },
    users: {
      getAll: `${API_URL}/users`,
    },
  },
};

export default API_URL;
