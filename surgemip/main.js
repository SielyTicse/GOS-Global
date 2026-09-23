// Utilidades compartidas: getBaseGeoLayout, showError y hideError
// se cargan desde ../js/common.js, igual que en la pagina principal.
// Titulos y pies de figura: index.html. Fuentes y tamanos: ../style.css.

// =============================
// Figure 1 configuration - 35278 puntos
// EDITAR AQUI los marcadores de la figura 1.
// symbol: 'circle' (punto), 'x', 'cross', 'square', 'diamond'.
// size: diametro en pixeles; opacity: 0 (invisible) a 1 (opaco).
// =============================
const FIG1_MARKERS = {
  req:  {symbol: 'circle', size: 3, color: '#ff0000', opacity: 0.95, line: {width: 0}},
  near: {symbol: 'diamond-open', size: 4.5, color: '#ae00ff', opacity: 0.95, line: {width: 1.5}},
  nan:  {symbol: 'circle', size: 4, color: 'rgba(186,180,180,0.5)', opacity: 1.0}
};
let FIG1_DATA = [];

function plotFig1Map() {
  return plotPointMap('fig1-map', FIG1_DATA, FIG1_MARKERS, buildFig1Hover);
}

// =============================
// Figure 2 configuration - 3291 puntos
// EDITAR AQUI los marcadores de la figura 2.
// =============================
const FIG2_MARKERS = {
  req:  {symbol: 'circle', size: 3, color: '#ff0000', opacity: 0.95, line: {width: 0}},
  near: {symbol: 'diamond-open', size: 6, color: '#ae00ff', opacity: 0.95, line: {width: 1.5}},
  nan:  {symbol: 'circle', size: 3, color: 'rgba(186,180,180,0.5)', opacity: 1.0}
};
let FIG2_DATA = [];

function plotFig2Map() {
  return plotPointMap('fig2-map', FIG2_DATA, FIG2_MARKERS, buildFig2Hover);
}

// =============================
// Figure 3 configuration - 550 puntos GESLA
// EDITAR AQUI los marcadores de la figura 3.
// =============================
const FIG3_MARKERS = {
  req:  {symbol: 'circle', size: 3, color: '#ff0000', opacity: 0.95, line: {width: 0}},
  near: {symbol: 'diamond-open', size: 6, color: '#ae00ff', opacity: 0.95, line: {width: 1.5}},
  nan:  {symbol: 'circle', size: 3, color: 'rgba(186,180,180,0.12549)', opacity: 0.6}
};
let FIG3_DATA = [];

function plotFig3Map() {
  return plotPointMap('fig3-map', FIG3_DATA, FIG3_MARKERS, buildFig3Hover);
}

// =============================
// Hover builders - texto al pasar el cursor
// EDITAR buildPointHover para cambiar las tres figuras.
// Para cambiar solo una, editar su buildFigNHover.
// =============================
function formatValue(value, decimals = 5) {
  return value === null ? 'NaN' : value.toLocaleString('en-GB', {maximumFractionDigits: decimals});
}

function buildPointHover(d) {
  return (
    `<b>Point ${d.id}</b><br>` +
    `point_lat: ${formatValue(d.lat_req)}°, point_lon: ${formatValue(d.lon_req)}°<br>` +
    `node_lat: ${formatValue(d.lat_near)}°, node_lon: ${formatValue(d.lon_near)}°<br>` +
    `dist_km: ${formatValue(d.dist_km, 3)} km<br>` +
    `node_depth: ${formatValue(d.depth, 2)} m<br>` +
    `node_max_max: ${formatValue(d.max_max, 3)} m<br>` +
    `time: ${d.ti_max_max === null ? 'NaT' : d.ti_max_max.replace('T', ' ')}`
  );
}

function buildFig1Hover(d) { return buildPointHover(d); }
function buildFig2Hover(d) { return buildPointHover(d); }
function buildFig3Hover(d) { return buildPointHover(d); }

// =============================
// Map layout - proyeccion, margenes, fuente y leyenda
// EDITAR AQUI para las tres figuras de SurgeMIP.
// getBaseGeoLayout reutiliza el mapa de la pagina principal.
// =============================
function getPointMapLayout(plotId) {
  return {
    margin: {l: 10, r: 10, t: 60, b: 10},
    paper_bgcolor: '#ffffff',
    font: {family: 'Arial, Helvetica, sans-serif', color: '#222'},
    legend: {orientation: 'h', x: 0.5, xanchor: 'center', y: 1.06, font: {family: 'Arial, Helvetica, sans-serif', size: 15, color: '#222'}, itemsizing: 'constant', itemdoubleclick: false},
    geo: getBaseGeoLayout(),
    uirevision: plotId
  };
}

// =============================
// Map builder - tres grupos de puntos, sin paleta
// Datos con nombres de columna: d.lat_req, d.depth, etc.
// =============================
function wrapLongitude(value) {
  return ((value + 180) % 360 + 360) % 360 - 180;
}

function hasRequestedLocation(d) {
  return Number.isFinite(d.lat_req) && Number.isFinite(d.lon_req);
}

function hasModelLocation(d) {
  return Number.isFinite(d.lat_near) && Number.isFinite(d.lon_near);
}

function plotPointMap(plotId, data, markers, hoverBuilder) {
  const requested = data.filter(d => hasRequestedLocation(d) && hasModelLocation(d));
  const model = data.filter(hasModelLocation);
  const missing = data.filter(d => hasRequestedLocation(d) && !hasModelLocation(d));

  const requestedTrace = {
    type: 'scattergeo', mode: 'markers', name: 'Requested points',
    lat: requested.map(d => d.lat_req),
    lon: requested.map(d => wrapLongitude(d.lon_req)),
    text: requested.map(hoverBuilder),
    hovertemplate: '%{text}<extra></extra>',
    hoverlabel: {bgcolor: markers.req.color},
    marker: markers.req
  };
  const modelTrace = {
    type: 'scattergeo', mode: 'markers', name: 'GOS nodes',
    lat: model.map(d => d.lat_near),
    lon: model.map(d => wrapLongitude(d.lon_near)),
    text: model.map(hoverBuilder),
    hovertemplate: '%{text}<extra></extra>',
    hoverlabel: {bgcolor: markers.near.color},
    marker: markers.near
  };
  const missingTrace = {
    type: 'scattergeo', mode: 'markers', name: 'No model data',
    lat: missing.map(d => d.lat_req),
    lon: missing.map(d => wrapLongitude(d.lon_req)),
    text: missing.map(hoverBuilder),
    hovertemplate: '%{text}<extra></extra>',
    hoverlabel: {bgcolor: markers.nan.color},
    marker: markers.nan,
    showlegend: false
  };

  return Plotly.react(plotId, [requestedTrace, modelTrace, missingTrace], getPointMapLayout(plotId), {
    responsive: true,
    scrollZoom: true,
    displaylogo: false,
    toImageButtonOptions: {filename: `GOS_SurgeMIP_${plotId}`, scale: 2}
  });
}

// =============================
// CSV parsers - lectura y validacion de datos
// No hace falta modificar esta seccion para cambiar el aspecto.
// =============================
// Eight numeric columns and one ISO date string; retain NaN/NaT as missing data.
function readPointCSV(text, expectedCount) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/);
  const fields = ['id', 'lat_req', 'lon_req', 'lat_near', 'lon_near', 'dist_km', 'depth', 'max_max', 'ti_max_max'];
  const header = lines.shift().split(',').map(value => value.trim());
  if (header.join(',') !== fields.join(',')) throw new Error('The CSV columns do not match the expected format.');
  const ids = new Set();
  const rows = lines.filter(line => line.trim()).map((line, index) => {
    const cells = line.split(',');
    if (cells.length !== fields.length) throw new Error(`Incorrect number of columns in row ${index + 2}.`);
    const row = cells.slice(0, 8).map(cell => /^(nan)?$/i.test(cell.trim()) ? null : Number(cell));
    if (row.some(value => value !== null && !Number.isFinite(value))) throw new Error(`Non-numeric value in row ${index + 2}.`);
    if (!Number.isSafeInteger(row[0]) || row[0] < 1 || ids.has(row[0])) throw new Error(`Invalid or duplicate ID in row ${index + 2}.`);
    for (const col of [1, 3]) {
      if (row[col] !== null && Math.abs(row[col]) > 90) throw new Error(`Latitude out of range in row ${index + 2}.`);
    }
    for (const col of [2, 4]) {
      if (row[col] !== null && (row[col] < -180 || row[col] > 360)) throw new Error(`Longitude out of range in row ${index + 2}.`);
    }
    const time = cells[8].trim();
    const missingTime = /^(nat|nan)?$/i.test(time);
    if (!missingTime && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(time) ||
        !Number.isFinite(Date.parse(time + 'Z')) || new Date(time + 'Z').toISOString().slice(0, 19) !== time)) {
      throw new Error(`Invalid date in row ${index + 2}.`);
    }
    if ((row[7] === null) !== missingTime) throw new Error(`Maximum and date do not match in row ${index + 2}.`);
    // Keep source clock time as text, without browser timezone conversion.
    row.push(missingTime ? null : time);
    ids.add(row[0]);
    return Object.fromEntries(fields.map((field, column) => [field, row[column]]));
  });
  if (rows.length !== expectedCount) throw new Error('The point count does not match the dataset.');
  return rows;
}

// =============================
// Data loading - un bloque por figura, como en la pagina principal
// La carga se retrasa hasta acercarse al mapa para no dibujar todo a la vez.
// =============================
function loadFigureWhenVisible(sectionId, statusId, errorId, load) {
  async function start() {
    const status = document.getElementById(statusId);
    try {
      if (!window.Plotly) throw new Error('Could not load Plotly. Please check your internet connection.');
      hideError(errorId);
      await load();
    } catch (error) {
      showError(errorId, error.message);
    } finally {
      status.hidden = true;
    }
  }
  if (!('IntersectionObserver' in window)) { start(); return; }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      start();
    }
  }, {rootMargin: '150px'});
  observer.observe(document.getElementById(sectionId));
}

// Figure 1 - 35278 puntos
loadFigureWhenVisible('set-35278', 'fig1-status', 'fig1-error', async () => {
  const response = await fetch('data/35278.csv');
  if (!response.ok) throw new Error('Could not read data/35278.csv');
  FIG1_DATA = readPointCSV(await response.text(), 35278);
  await plotFig1Map();
});

// Figure 2 - 3291 puntos
loadFigureWhenVisible('set-3291', 'fig2-status', 'fig2-error', async () => {
  const response = await fetch('data/3291.csv');
  if (!response.ok) throw new Error('Could not read data/3291.csv');
  FIG2_DATA = readPointCSV(await response.text(), 3291);
  await plotFig2Map();
});

// Figure 3 - 550 puntos
loadFigureWhenVisible('set-550', 'fig3-status', 'fig3-error', async () => {
  const response = await fetch('data/550.csv');
  if (!response.ok) throw new Error('Could not read data/550.csv');
  FIG3_DATA = readPointCSV(await response.text(), 550);
  await plotFig3Map();
});
