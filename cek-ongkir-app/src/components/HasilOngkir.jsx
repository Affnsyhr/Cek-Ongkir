import React from 'react';

function HasilOngkir({ results, error }) {
  if (error) {
    return <div className="hasil-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  // Ganti `rajaongkir.results` menjadi `results` saja
  const shippingOptions = results?.[0]?.costs || [];
  const courierName = results?.[0]?.name || null;

  if (!courierName) {
    return <div className="hasil-container">Hasil akan ditampilkan di sini.</div>;
  }

  return (
    <div className="hasil-container">
      {/* Header Tabel */}
      <div className="hasil-header">
        <div className="hasil-col-1">Layanan ({courierName})</div>
        <div className="hasil-col-2">Tarif (Rp)</div>
        <div className="hasil-col-3">Estimasi</div>
      </div>

      {/* Baris Data */}
      {shippingOptions.length > 0 ? (
        shippingOptions.map((option, index) => (
          <div className="hasil-row" key={index}>
            <div className="hasil-col-1">
              <strong>{option.service}</strong> ({option.description})
            </div>
            <div className="hasil-col-2">{option.cost[0].value.toLocaleString('id-ID')}</div>
            <div className="hasil-col-3">{option.cost[0].etd}</div>
          </div>
        ))
      ) : (
        <div className="hasil-row">
          Tidak ada layanan pengiriman yang tersedia untuk rute ini.
        </div>
      )}
    </div>
  );
}

export default HasilOngkir;