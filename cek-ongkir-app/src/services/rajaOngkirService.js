const BASE_URL = 'https://api.komerce.id';
const API_KEY = process.env.REACT_APP_KOMERCE_API_KEY;

// Fungsi dasar untuk memanggil API, agar tidak menulis header berulang kali
const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/v1${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Terjadi kesalahan pada server');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

// 1. Mengambil semua provinsi
export const getProvinces = () => {
  return apiCall('/destination/province');
};

// 2. Mengambil kota berdasarkan ID provinsi
export const getCities = (provinceId) => {
  return apiCall(`/destination/city?province_id=${provinceId}`);
};

// 3. Mengambil kecamatan (district) berdasarkan ID kota
export const getDistricts = (cityId) => {
  return apiCall(`/destination/district?city_id=${cityId}`);
};

// 4. Mengambil kelurahan/desa (subdistrict) berdasarkan ID kecamatan
export const getSubdistricts = (districtId) => {
  return apiCall(`/destination/subdistrict?district_id=${districtId}`);
};

// 5. Menghitung Ongkos Kirim
export const calculateCost = async (data) => {
  const { originSubdistrictId, destinationSubdistrictId, weight, courier } = data;

  const formData = new FormData();
  formData.append('origin_subdistrict_id', originSubdistrictId);
  formData.append('destination_subdistrict_id', destinationSubdistrictId);
  formData.append('weight', weight);
  formData.append('courier', courier);

  // Endpoint ini menggunakan method POST
  return apiCall('/destination/calculate-cost', {
    method: 'POST',
    body: formData,
  });
};