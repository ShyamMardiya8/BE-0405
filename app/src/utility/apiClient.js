/**
 * Reusable client-side fetch wrapper
 * Handles authorization tokens, formats responses using ResponseHandler specs,
 * and throws standard errors with proper status details.
 */
export async function apiFetch(endpoint, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Retrieve token from localStorage if in client context
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(endpoint, config);
    let result;

    try {
      result = await response.json();
    } catch (parseError) {
      throw new Error(`Failed to parse response JSON: ${parseError.message}`);
    }

    // Check HTTP status or standard success flag in response payload
    if (!response.ok || (result && result.success === false)) {
      const errorMessage =
        result?.message || `API request failed with status ${response.status}`;
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = result?.data || null;
      throw error;
    }

    return result; // Returns ResponseHandler { message, status, data, success }
  } catch (error) {
    console.error(`[API Error] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}
