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
    const byId = new Map(rows.map(row => [row[0], row]));
    const map = section.querySelector('.map');
    const input = section.querySelector('input');
    input.min = Math.min(...byId.keys());
    input.max = Math.max(...byId.keys());
    input.value = rows[0][0];
    const traces = [[1, 'Solicitados (req)', '#087ba4'], [3, 'Modelo cercano (near)', '#e47725']].map(([offset, name, color]) => {
      const points = rows.filter(row => valid(row, offset));
      return {type: 'scattergeo', mode: 'markers', name,
        lat: points.map(row => row[offset]), lon: points.map(row => wrapLon(row[offset + 1])),
        customdata: points.map(row => row[0]), text: points.map(hover), hovertemplate: '%{text}<extra>%{fullData.name}</extra>',
        marker: {size: offset === 1 ? 5 : 3, color, opacity: .8}};
    });
    traces.push({type: 'scattergeo', mode: 'lines+markers', name: 'Pareja seleccionada', lat: [], lon: [],
      line: {color: '#54278f', width: 2}, marker: {size: 10, color: '#54278f', symbol: 'circle-open'}, hoverinfo: 'skip', showlegend: false});
    await Plotly.newPlot(map, traces, {
      margin: {l: 0, r: 0, t: 15, b: 0}, paper_bgcolor: '#fff',
      legend: {orientation: 'h', x: 0, y: 1.08},
      geo: {projection: {type: 'equirectangular'}, showland: true, landcolor: '#e6eceb', showocean: true,
        oceancolor: '#f5fafc', showcountries: false, coastlinecolor: '#8da4ae', showframe: false,
        lonaxis: {showgrid: true, gridcolor: '#e1ebef'}, lataxis: {showgrid: true, gridcolor: '#e1ebef'}},
      uirevision: config.id
    }, {responsive: true, scrollZoom: true, displaylogo: false, toImageButtonOptions: {filename: `GOS_SurgeMIP_${config.id}`, scale: 2}});
    status.textContent = `${rows.length.toLocaleString('es-ES')} registros · ${traces[0].lat.length.toLocaleString('es-ES')} ubicaciones solicitadas · ${traces[1].lat.length.toLocaleString('es-ES')} ubicaciones del modelo. Profundidad sin dato: ${rows.filter(row => row[6] === null).length}.`;
    section.querySelector('.source').textContent = `Datos: ${config.id}.csv. Las longitudes se representan entre −180° y 180°; el panel y el CSV conservan los valores originales. ID = idx_csv cuando está disponible; en los otros archivos, posición MATLAB (desde 1).`;
    function select(id) {
      const row = byId.get(id);
      if (!row) { input.setCustomValidity('Introduce un ID que exista en este conjunto.'); input.reportValidity(); return; }
      input.setCustomValidity(''); input.value = id;
      section.querySelector('.details').innerHTML = `<strong>Punto ${id}</strong><table><thead><tr><th>Ubicación</th><th>Latitud (°)</th><th>Longitud (°)</th></tr></thead><tbody><tr><th>Solicitada (req)</th><td>${fmt(row[1])}</td><td>${fmt(row[2])}</td></tr><tr><th>Modelo cercano (near)</th><td>${fmt(row[3])}</td><td>${fmt(row[4])}</td></tr></tbody></table><b>dist_km:</b> ${fmt(row[5], 3)} km &nbsp; · &nbsp; <b>depth:</b> ${fmt(row[6], 2)} m`;
      const offsets = [1, 3].filter(offset => valid(row, offset));
      Plotly.restyle(map, {lat: [offsets.map(offset => row[offset])], lon: [offsets.map(offset => wrapLon(row[offset + 1]))]}, [2]);
    }
    map.on('plotly_click', event => { const id = event.points[0].customdata; if (byId.has(id)) select(id); });
    section.querySelector('form').addEventListener('submit', event => { event.preventDefault(); select(Number(input.value)); });
    input.addEventListener('input', () => input.setCustomValidity(''));
    section.querySelector('.reset').addEventListener('click', () => Plotly.relayout(map, {'geo.projection.scale': 1, 'geo.center.lon': 0, 'geo.center.lat': 0}));
    section.querySelectorAll('button, input').forEach(element => { element.disabled = false; });
    select(rows[0][0]);
  } catch (error) {
    status.textContent = error.message + ' Los datos siguen disponibles en el enlace CSV.';
    status.classList.add('failure');
  }
}

for (const config of sets) {
  const section = document.createElement('section');
  section.className = 'figure-card'; section.id = `set-${config.id}`;
  section.innerHTML = `<h2>${config.title}</h2><p>${config.period}</p><p class="status" role="status">Cargando mapa y metadatos…</p><form class="toolbar"><label for="point-${config.id}">Número de punto</label><input id="point-${config.id}" type="number" step="1" required disabled><button type="submit" disabled>Mostrar punto</button><button class="reset" type="button" disabled>Vista global</button><a class="download" href="data/${config.id}.csv" download>Descargar CSV</a></form><div class="map" aria-label="${config.title}"></div><div class="details" aria-live="polite">Selecciona un punto para consultar sus coordenadas, distancia y profundidad.</div><p class="source"></p>`;
  document.getElementById('figures').append(section);
  // Delay the larger SVG maps until they approach the viewport.
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); render(config, section); }
  }, {rootMargin: '150px'});
  observer.observe(section);
}
