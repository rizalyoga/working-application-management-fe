export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${
    value || ""
  }${expires}; path=/; Secure; SameSite=Strict`;
};

// Simpan tokens
// setCookie('access_token', access_token, 7); // Simpan selama 7 hari
// setCookie('refresh_token', refresh_token, 7); // Simpan selama 7 hari

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  // Cek apakah parts memiliki panjang yang cukup
  if (parts.length === 2) {
    const cookieValue = parts.pop(); // Ambil elemen terakhir
    return cookieValue ? cookieValue.split(";").shift() : undefined; // Cek jika cookieValue tidak undefined
  }

  return undefined; // Kembalikan undefined jika cookie tidak ditemukan
};

// Mengambil token
// const accessToken = getCookie('access_token');
// const refreshToken = getCookie('refresh_token');

export const removeCookie = (name: string) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
