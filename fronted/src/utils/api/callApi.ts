
export const callApi = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) => {
    
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };    
    const options: RequestInit = {
    method,
    headers,
  };    
    if (data) {
    options.body = JSON.stringify(data);
    }
    try {
    const response = await fetch(`${API_BASE_URL}/${url}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }   
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('API call error:', error);
    throw error instanceof Error ? error.message : 'שגיאה לא ידועה';
  }
};