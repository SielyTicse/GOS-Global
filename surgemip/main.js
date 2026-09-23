'use strict';
const sets = [
  {id: '35278', title: 'Figura 1 · 35.278 puntos · 20 km', period: 'Metadatos del archivo anual de 1993'},
  {id: '3291', title: 'Figura 2 · 3.291 puntos · 200 km', period: 'Metadatos del archivo 1993–2024'},
  {id: '550', title: 'Figura 3 · 550 puntos · GESLA', period: 'Metadatos del archivo 1993–2024'}
];
const fmt = (value, digits = 5) => value === null ? 'Sin dato' : value.toLocaleString('es-ES', {maximumFractionDigits: digits});
const wrapLon = value => value === null ? null : ((value + 180) % 360 + 360) % 360 - 180;
const valid = (row, offset) => Number.isFinite(row[offset]) && Number.isFinite(row[offset + 1]);
const hover = row => `<b>Punto ${row[0]}</b><br>Solicitado: lat ${fmt(row[1])}°, lon ${fmt(row[2])}°<br>Modelo: lat ${fmt(row[3])}°, lon ${fmt(row[4])}°<br>dist_km: ${fmt(row[5], 3)} km<br>depth: ${fmt(row[6], 2)} m`;

// The exported CSVs contain seven numeric columns; empty cells represent missing data.
function readPointCSV(text, expectedCount) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  const fields = ['id', 'lat_req', 'lon_req', 'lat_near', 'lon_near', 'dist_km', 'depth'];
  const header = lines.shift().split(',').map(value => value.trim());
  if (header.join(',') !== fields.join(',')) throw new Error('Las columnas del CSV no coinciden con el formato esperado.');
  const ids = new Set();
  const rows = lines.filter(line => line.trim()).map((line, index) => {
    const cells = line.split(',');
    if (cells.length !== fields.length) throw new Error(`Número de columnas incorrecto en la fila ${index + 2}.`);
    const row = cells.map(cell => cell.trim() === '' ? null : Number(cell));
    if (row.some(value => value !== null && !Number.isFinite(value))) throw new Error(`Valor no numérico en la fila ${index + 2}.`);
    if (!Number.isSafeInteger(row[0]) || row[0] < 1 || ids.has(row[0])) throw new Error(`ID inválido o repetido en la fila ${index + 2}.`);
    for (const col of [1, 3]) {
      if (row[col] !== null && Math.abs(row[col]) > 90) throw new Error(`Latitud fuera de rango en la fila ${index + 2}.`);
    }
    for (const col of [2, 4]) {
      if (row[col] !== null && (row[col] < -180 || row[col] > 360)) throw new Error(`Longitud fuera de rango en la fila ${index + 2}.`);
    }
    ids.add(row[0]);
    return row;
  });
  if (rows.length !== expectedCount) throw new Error('El número de puntos no coincide con el conjunto.');
  return rows;
}

async function render(config, section) {
  const status = section.querySelector('.status');
  try {
    if (!window.Plotly) throw new Error('No se pudo cargar Plotly. Comprueba la conexión a Internet y recarga la página.');
    const response = await fetch(`data/${config.id}.csv`);
    if (!response.ok) throw new Error(`No se pudieron cargar los datos (HTTP ${response.status}).`);
    const rows = readPointCSV(await response.text(), Number(config.id));
    const map = section.querySelector('.map');
    const traces = [[1, 'Solicitados (req)', '#ff0000'], [3, 'Modelo cercano (near)', '#ff00ff']].map(([offset, name, color]) => {
      const points = rows.filter(row => valid(row, offset));
      return {type: 'scattergeo', mode: 'markers', name,
        lat: points.map(row => row[offset]), lon: points.map(row => wrapLon(row[offset + 1])),
        customdata: points.map(row => row[0]), text: points.map(hover), hovertemplate: '%{text}<extra>%{fullData.name}</extra>',
        marker: {size: 3, color, opacity: .88, line: {width: 0}}};
    });
    await Plotly.newPlot(map, traces, {
      margin: {l: 10, r: 10, t: 40, b: 10}, paper_bgcolor: '#ffffff',
      font: {family: 'Arial, Helvetica, sans-serif', color: '#222'},
      legend: {orientation: 'h', x: 0.5, xanchor: 'center', y: 1.06},
      geo: getBaseGeoLayout(),
      uirevision: config.id
    }, {responsive: true, scrollZoom: true, displaylogo: false, toImageButtonOptions: {filename: `GOS_SurgeMIP_${config.id}`, scale: 2}});
    status.hidden = true;
  } catch (error) {
    status.textContent = error.message;
    status.classList.add('failure');
  }
}

for (const config of sets) {
  const section = document.createElement('section');
  section.className = 'figure-card'; section.id = `set-${config.id}`;
  section.innerHTML = `<h2>${config.title}</h2><p class="figure-caption">${config.period}</p><p class="status figure-caption" role="status">Cargando mapa y metadatos…</p><div class="map plot-container" aria-label="${config.title}"></div>`;
  document.getElementById('figures').append(section);
  // Delay the larger SVG maps until they approach the viewport.
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); render(config, section); }
  }, {rootMargin: '150px'});
  observer.observe(section);
}
