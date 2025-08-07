import React from "react";

// Komponen helper untuk membuat dropdown agar tidak mengulang kode
const Dropdown = ({
  name,
  label,
  value,
  onChange,
  options,
  optionValueKey,
  optionLabelKey,
  disabled = false,
  defaultLabel,
}) => (
  <div className="form-group">
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange} disabled={disabled}>
      <option value="">{defaultLabel}</option>
      {Array.isArray(options) &&
        options.map((option, index) => (
          <option
            key={option[optionValueKey] || index}
            value={option[optionValueKey]}
          >
            {option[optionLabelKey]}
          </option>
        ))}
    </select>
  </div>
);

function OngkirForm({ formData, data, onFormChange, onCalculate, isLoading }) {
  const {
    provinces,
    originCities,
    originDistricts,
    originSubdistricts,
    destinationCities,
    destinationDistricts,
    destinationSubdistricts,
  } = data;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {/* Kolom Kiri - ASAL */}
      <div className="form-column">
        <h3>Kota Asal</h3>
        <Dropdown
          label="Provinsi"
          name="originProvince"
          value={formData.originProvince}
          onChange={onFormChange}
          options={provinces}
          optionValueKey="id" // ✅ disesuaikan
          optionLabelKey="name" // ✅ disesuaikan
          defaultLabel="Pilih Provinsi"
        />

        <Dropdown
          label="Kota"
          name="originCity"
          value={formData.originCity}
          onChange={onFormChange}
          options={originCities}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kota"
          disabled={!formData.originProvince}
        />

        <Dropdown
          label="Kecamatan"
          name="originDistrict"
          value={formData.originDistrict}
          onChange={onFormChange}
          options={originDistricts}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kecamatan"
          disabled={!formData.originCity}
        />

        <Dropdown
          label="Kelurahan"
          name="originSubdistrict"
          value={formData.originSubdistrict}
          onChange={onFormChange}
          options={originSubdistricts}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kelurahan"
          disabled={!formData.originDistrict}
        />

        <div className="form-group">
          <label>Kurir</label>
          <select
            name="courier"
            value={formData.courier}
            onChange={onFormChange}
          >
            <option value="jne">JNE</option>
            <option value="pos">POS Indonesia</option>
            <option value="tiki">TIKI</option>
            <option value="lion">Lion Parcel</option>
            <option value="jnt">J&T Express</option>
            <option value="ninja">Ninja Xpress</option>
            <option value="sap">Satria Antaran Prima</option>
            <option value="sicepat">SiCepat Express</option>
            <option value="rex">Royal Express Indonesia (REX)</option>
            <option value="ide">ID Express</option>
          </select>
        </div>
      </div>

      {/* Kolom Kanan - TUJUAN */}
      <div className="form-column">
        <h3>Kota Tujuan</h3>
        <Dropdown
          label="Provinsi"
          name="destinationProvince"
          value={formData.destinationProvince}
          onChange={onFormChange}
          options={provinces}
          optionValueKey="id" // ✅ disesuaikan
          optionLabelKey="name" // ✅ disesuaikan
          defaultLabel="Pilih Provinsi"
        />

        <Dropdown
          label="Kota"
          name="destinationCity"
          value={formData.destinationCity}
          onChange={onFormChange}
          options={destinationCities}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kota"
          disabled={!formData.destinationProvince}
        />

        <Dropdown
          label="Kecamatan"
          name="destinationDistrict"
          value={formData.destinationDistrict}
          onChange={onFormChange}
          options={destinationDistricts}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kecamatan"
          disabled={!formData.destinationCity}
        />

        <Dropdown
          label="Kelurahan"
          name="destinationSubdistrict"
          value={formData.destinationSubdistrict}
          onChange={onFormChange}
          options={destinationSubdistricts}
          optionValueKey="id"
          optionLabelKey="name"
          defaultLabel="Pilih Kelurahan"
          disabled={!formData.destinationDistrict}
        />

        <div className="form-group">
          <label>Berat (gram)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={onFormChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={
            isLoading ||
            !formData.originSubdistrict ||
            !formData.destinationSubdistrict
          }
          className="btn-hitung"
        >
          {isLoading ? "Menghitung..." : "Hitung Ongkir"}
        </button>
      </div>
    </form>
  );
}

export default OngkirForm;
