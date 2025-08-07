import React, { useState, useEffect } from "react";
import OngkirForm from "./components/OngkirForm";
import HasilOngkir from "./components/HasilOngkir";
import {
  getProvinces,
  getCities,
  getDistricts,
  getSubdistricts,
  calculateCost,
} from "./services/rajaOngkirService";
import "./App.css";

function App() {
  // State untuk menyimpan list data dari API
  const [provinces, setProvinces] = useState([]);
  const [originCities, setOriginCities] = useState([]);
  const [originDistricts, setOriginDistricts] = useState([]);
  const [originSubdistricts, setOriginSubdistricts] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [destinationDistricts, setDestinationDistricts] = useState([]);
  const [destinationSubdistricts, setDestinationSubdistricts] = useState([]);

  // State untuk menyimpan nilai yang dipilih pengguna
  const [formData, setFormData] = useState({
    originProvince: "",
    originCity: "",
    originDistrict: "",
    originSubdistrict: "",
    destinationProvince: "",
    destinationCity: "",
    destinationDistrict: "",
    destinationSubdistrict: "",
    weight: 1000,
    courier: "jne",
  });

  // State untuk hasil & loading
  const [ongkirResults, setOngkirResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --- useEffect untuk memuat data awal ---
  useEffect(() => {
    // Muat semua provinsi saat aplikasi pertama kali dijalankan
    const loadProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data.data || []);
      } catch (err) {
        setError("Gagal memuat data provinsi.");
      }
    };
    loadProvinces();
  }, []);

  // --- useEffect untuk dropdown berantai (ASAL) ---
  useEffect(() => {
    if (!formData.originProvince) return;
    const loadCities = async () => {
      try {
        const data = await getCities(formData.originProvince);
        setOriginCities(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kota.");
      }
    };
    loadCities();
    setFormData((prev) => ({
      ...prev,
      originCity: "",
      originDistrict: "",
      originSubdistrict: "",
    }));
    setOriginDistricts([]);
    setOriginSubdistricts([]);
  }, [formData.originProvince]);

  useEffect(() => {
    if (!formData.originCity) return;
    const loadDistricts = async () => {
      try {
        const data = await getDistricts(formData.originCity);
        setOriginDistricts(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kecamatan.");
      }
    };
    loadDistricts();
    setFormData((prev) => ({
      ...prev,
      originDistrict: "",
      originSubdistrict: "",
    }));
    setOriginSubdistricts([]);
  }, [formData.originCity]);

  useEffect(() => {
    if (!formData.originDistrict) return;
    const loadSubdistricts = async () => {
      try {
        const data = await getSubdistricts(formData.originDistrict);
        setOriginSubdistricts(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kelurahan.");
      }
    };
    loadSubdistricts();
    setFormData((prev) => ({ ...prev, originSubdistrict: "" }));
  }, [formData.originDistrict]);

  // --- useEffect untuk dropdown berantai (TUJUAN) ---
  useEffect(() => {
    if (!formData.destinationProvince) return;
    const loadCities = async () => {
      try {
        const data = await getCities(formData.destinationProvince);
        setDestinationCities(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kota.");
      }
    };
    loadCities();
    setFormData((prev) => ({
      ...prev,
      destinationCity: "",
      destinationDistrict: "",
      destinationSubdistrict: "",
    }));
    setDestinationDistricts([]);
    setDestinationSubdistricts([]);
  }, [formData.destinationProvince]);

  useEffect(() => {
    if (!formData.destinationCity) return;
    const loadDistricts = async () => {
      try {
        const data = await getDistricts(formData.destinationCity);
        setDestinationDistricts(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kecamatan.");
      }
    };
    loadDistricts();
    setFormData((prev) => ({
      ...prev,
      destinationDistrict: "",
      destinationSubdistrict: "",
    }));
    setDestinationSubdistricts([]);
  }, [formData.destinationCity]);

  useEffect(() => {
    if (!formData.destinationDistrict) return;
    const loadSubdistricts = async () => {
      try {
        const data = await getSubdistricts(formData.destinationDistrict);
        setDestinationSubdistricts(data.data || []);
      } catch (err) {
        setError("Gagal memuat data kelurahan.");
      }
    };
    loadSubdistricts();
    setFormData((prev) => ({ ...prev, destinationSubdistrict: "" }));
  }, [formData.destinationDistrict]);

  // Handler untuk mengubah form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk submit
  const handleCalculate = async () => {
    setIsLoading(true);
    setError("");
    setOngkirResults(null);

    try {
      // --- PERUBAHAN DI SINI ---
      // Ubah nama kunci agar sesuai dengan yang diharapkan oleh API akhir.
      const params = {
        origin: formData.originSubdistrict,
        destination: formData.destinationSubdistrict,
        weight: parseInt(formData.weight, 10),
        courier: formData.courier,
      };
      // --- AKHIR PERUBAHAN ---

      console.log("Params to send:", params);

      const results = await calculateCost(params);
       
      if (results.meta.status === 'error') {
        // Tangani pesan error dari API
        setError(results.meta.message);
        setOngkirResults(null);
      } else {
        setOngkirResults(results.data);
      }

    } catch (err) {
      setError(err.message || "Gagal menghitung ongkir.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cek Ongkos Kirim</h1>
      </header>
      <main>
        <OngkirForm
          formData={formData}
          data={{
            provinces,
            originCities,
            originDistricts,
            originSubdistricts,
            destinationCities,
            destinationDistricts,
            destinationSubdistricts,
          }}
          onFormChange={handleFormChange}
          onCalculate={handleCalculate}
          isLoading={isLoading}
        />
        <HasilOngkir results={ongkirResults} error={error} />
      </main>
    </div>
  );
}

export default App;
