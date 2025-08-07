const BASE_URL = 'http://localhost:5000/api';

export const getProvinces = () => fetch(`${BASE_URL}/provinces`).then(res => res.json());

export const getCities = (province_id) =>
  fetch(`${BASE_URL}/cities?province_id=${province_id}`).then(res => res.json());

export const getDistricts = (city_id) =>
  fetch(`${BASE_URL}/districts?city_id=${city_id}`).then(res => res.json());

export const getSubdistricts = (district_id) =>
  fetch(`${BASE_URL}/subdistricts?district_id=${district_id}`).then(res => res.json());

export const calculateCost = (data) =>
  fetch(`${BASE_URL}/calculate-cost`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());
