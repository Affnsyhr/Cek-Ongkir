import React from 'react';

function HasilOngkir({ results, error }) {
  if (error) {
    return <div className="hasil-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  const shippingOptions = results || [];

  if (shippingOptions.length === 0) {
    return <div className="hasil-container">Hasil akan ditampilkan di sini.</div>;
  }

  return (
    <div className="hasil-container">
      {/* Header Tabel */}
      <div className="hasil-header">
        <div className="hasil-col-1">Layanan ({shippingOptions[0]?.name})</div>
        <div className="hasil-col-2">Tarif (Rp)</div>
        <div className="hasil-col-3">Estimasi</div>
      </div>

      {/* Baris Data */}
      {shippingOptions.map((option, index) => (
        <div className="hasil-row" key={index}>
          <div className="hasil-col-1">
            <strong>{option.service}</strong> ({option.description})
          </div>
          <div className="hasil-col-2">{option.cost.toLocaleString('id-ID')}</div>
          <div className="hasil-col-3">{option.etd}</div>
        </div>
      ))}
    </div>
  );
}

export default HasilOngkir;
