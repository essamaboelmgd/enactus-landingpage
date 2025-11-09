// API service for connecting to the backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface FormEntry {
  _id: string;
  fullName: string;
  phone: string;
  committee: string;
  membershipType: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface FormEntriesResponse {
  data: FormEntry[];
  pagination: PaginationInfo;
}

// Fetch all form entries with pagination
export const getFormEntries = async (page: number = 1, limit: number = 10): Promise<FormEntriesResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/form?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch form entries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form entries:', error);
    throw error;
  }
};

// Fetch a single form entry by ID
export const getFormEntryById = async (id: string): Promise<FormEntry> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/form/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch form entry');
    }
    const data = await response.json();
    // If the API returns an object with a data property, extract the entry
    return data.data || data;
  } catch (error) {
    console.error('Error fetching form entry:', error);
    throw error;
  }
};

// Export form entries as CSV
export const exportFormEntries = async (): Promise<Blob> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/form/export`);
    if (!response.ok) {
      throw new Error('Failed to export form entries');
    }
    return await response.blob();
  } catch (error) {
    console.error('Error exporting form entries:', error);
    throw error;
  }
};

// Login function
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.success || false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};