import { getCookie, setCookie, removeCookie } from "../cookies/cookies";

// Interface untuk response refresh token
interface RefreshTokenResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    tokens: {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };
  };
}

// Interface untuk error response dari API
interface ApiErrorResponse {
  status?: string;
  status_code?: number;
  message?: string;
}

export async function fetchRefreshToken() {
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const refreshToken = getCookie("refresh_token");
  const dataBody = JSON.stringify({ refresh_token: refreshToken });

  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataBody,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    const data = (await response.json()) as RefreshTokenResponse;

    // Simpan token baru ke cookies
    if (data?.data?.tokens) {
      removeCookie("access_token");
      removeCookie("refresh_token");
      setCookie("access_token", data.data.tokens.access_token, 1);
      setCookie("refresh_token", data.data.tokens.refresh_token, 7);
    }

    return data;
  } catch (error) {
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

// Flag untuk menghindari multiple refresh token calls secara bersamaan
let isRefreshing = false;
let refreshPromise: Promise<RefreshTokenResponse> | null = null;

export async function fetchAPI<T>(
  url: string,
  method: string,
  needToken: boolean,
  options = {}
): Promise<T> {
  const controller = new AbortController();
  const timeout = 7000;
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // Fungsi untuk membuat options request dengan token terbaru
  const createRequestOptions = (token?: string) => {
    const accessToken = token || (needToken ? getCookie("access_token") : "");

    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(needToken && accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
      },
      signal: controller.signal,
      ...options,
    };
  };

  // Fungsi untuk melakukan request
  const performRequest = async (requestOptions: any): Promise<T> => {
    const response = await fetch(url, requestOptions);
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => ({}))) as ApiErrorResponse;

      // Cek jika token invalid
      if (
        response.status === 401 &&
        errorData?.message?.toLowerCase().includes("invalid token") &&
        needToken
      ) {
        // Handle refresh token
        return await handleTokenRefresh();
      }

      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    return await response.json();
  };

  // Fungsi untuk handle refresh token dan retry request
  const handleTokenRefresh = async (): Promise<T> => {
    try {
      // Gunakan singleton promise untuk refresh token untuk mencegah multiple calls
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = fetchRefreshToken();
      }

      // Tunggu refresh token selesai
      const result = await refreshPromise;

      // Reset flag dan promise setelah token di-refresh
      isRefreshing = false;
      refreshPromise = null;

      // Retry request dengan token baru
      const newToken = result?.data.tokens.access_token;
      const newRequestOptions = createRequestOptions(newToken);

      return await performRequest(newRequestOptions);
    } catch (refreshError) {
      // Jika refresh token gagal, user perlu login ulang
      console.error("Failed to refresh token:", refreshError);
      // Clear cookies
      removeCookie("access_token");
      removeCookie("refresh_token");

      // Throw special error untuk handle di UI
      throw new Error("AUTH_REQUIRED");
    }
  };

  try {
    const requestOptions = createRequestOptions();
    return await performRequest(requestOptions);
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
      // Handle khusus untuk AUTH_REQUIRED
      if (error.message === "AUTH_REQUIRED") {
        window.location.href = "/login";
        // Redirect user ke halaman login atau tampilkan pesan
        throw error;
      }
    }
    throw error;
  }
}
