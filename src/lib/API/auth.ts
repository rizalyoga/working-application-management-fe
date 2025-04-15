export async function fetchAPI<T>(
  url: string,
  method: string,
  options = {}
): Promise<T> {
  const defaultOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: unknown) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      console.error("Error:", error);
      throw new Error("Network error: Failed to connect to the server");
    }
    throw error;
  }
}
