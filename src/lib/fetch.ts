// API Response Types
type ApiSuccessResponse<T> = {
  success: true;
  data: T;
  error: null;
};

type ApiErrorResponse = {
  success: false;
  data: null;
  error: {
    code: string;
    message: string;
  };
};

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// API Fetch Options
type ApiFetchOptions = {
    method?: 'GET' | 'POST';
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    body?: Record<string, any>;
};

/**
 * Type-safe API fetch utility that handles standardized backend response format
 * @param url - The API endpoint URL
 * @param options - Fetch options including method and body
 * @returns Promise with typed data on success
 * @throws Error if request fails or response has success: false
 */
export async function apiFetch<T>(
  url: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { method = 'GET', body } = options;

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add body for POST requests
  if (method === 'POST' && body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // Handle non-200 status codes
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const result: ApiResponse<T> = await response.json();

    // Check if response indicates success
    if (!result.success) {
      throw new Error(result.error.message);
    }

    // Return typed data
    return result.data;
  } catch (error) {
    // Re-throw with additional context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`API request failed: ${String(error)}`);
  }
}
