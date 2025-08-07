import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = "https://rajaongkir.komerce.id/api/v1";
const API_KEY = process.env.key;

// Proxy GET provinces
app.get("/api/provinces", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/destination/province`, {
      method: "GET",
      headers: {
        accept: "application/json",
        key: API_KEY,
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data provinsi" });
  }
});

// Proxy GET cities by province
app.get("/api/cities", async (req, res) => {
  const { province_id } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/destination/city/${province_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          key: API_KEY,
        },
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data kota" });
  }
});

// Tambahkan setelah endpoint GET cities
// GET districts by city
app.get("/api/districts", async (req, res) => {
  const { city_id } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/destination/district/${city_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          key: API_KEY,
        },
      }
    );
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message: "Terjadi kesalahan saat mengambil data kecamatan (district)",
      });
  }
});

// GET subdistricts by district
app.get("/api/subdistricts", async (req, res) => {
  const { district_id } = req.query;
  try {
    const response = await fetch(
      `${BASE_URL}/destination/sub-district/${district_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          key: API_KEY,
        },
      }
    );
    const text = await response.text(); 

    const data = JSON.parse(text); // baru parse
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message:
          "Terjadi kesalahan saat mengambil data kelurahan (subdistrict)",
      });
  }
});

// Proxy POST calculate cost
app.post('/api/calculate-cost', async (req, res) => {
  try {
    const formBody = new URLSearchParams();
    formBody.append('origin', req.body.origin);
    formBody.append('destination', req.body.destination);
    formBody.append('weight', parseInt(req.body.weight, 10));
    formBody.append('courier', req.body.courier);

    console.log(formBody);
    const response = await fetch(`${BASE_URL}/calculate/district/domestic-cost`, {
      method: 'POST',
      headers: {
        key: API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghitung ongkir' });
  }
});



app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
