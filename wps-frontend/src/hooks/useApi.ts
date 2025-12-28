/**
 * Hook для работы с API
 *
 * Использует VITE_API_BASE_URL из переменных окружения
 * В режиме разработки используется proxy через vite.config.ts
 */

export const useApi = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost/api';

  const fetchData = async (endpoint: string, options?: RequestInit) => {
    const url = `${apiUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  const get = (endpoint: string) => {
    return fetchData(endpoint, { method: 'GET' });
  };

  const post = (endpoint: string, data: any) => {
    return fetchData(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const put = (endpoint: string, data: any) => {
    return fetchData(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  const delete_ = (endpoint: string) => {
    return fetchData(endpoint, { method: 'DELETE' });
  };

  return { apiUrl, fetchData, get, post, put, delete: delete_ };
};
