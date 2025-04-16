export async function fetchAPI<T>(
  url: string,
  method: string,
  options = {},
  timeout: number = 7000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  const defaultOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller.signal,
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Periksa apakah error adalah instance dari Error
      if (error.name === "AbortError") {
        throw new Error(
          "Request timed out: Could not connect to the server, check your network"
        );
      }
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        console.error("Error:", error);
        throw new Error("Network error: Failed to connect to the server");
      }
    }
    throw error;
  }
}
