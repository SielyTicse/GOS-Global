// =============================================================================
// common.js - utilidades compartidas por index.html y supplementary.html
// Debe cargarse ANTES que main.js / supplementary.js: ambos evaluan paletas
// en el nivel superior usando rgb01ToPlotlyScale().
// =============================================================================

// =============================
// Utility functions
// =============================

function rgb01ToPlotlyScale(rgbArray) {
  const n = rgbArray.length;
  return rgbArray.map((rgb, i) => {
    const [r, g, b] = rgb;
    return [
      i / (n - 1),
      `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`
    ];
  });
}

// Construye una escala de Plotly a partir de un CSV de paleta con columnas
// r,g,b en 0-1. Se usa para las paletas que no se pueden reproducir con una
// formula y hay que exportar desde MATLAB (turbo recortada de la S2, y la
// PALETA_dif_prctl_yr50 de la S3, que vive en un .mat).
function paletteFromRows(rows, sourceName) {
  const rgb = rows.map(r => [
    parseNumber(r.r),
    parseNumber(r.g),
    parseNumber(r.b)
  ]).filter(c => c.every(Number.isFinite));

  if (rgb.length < 2) {
    throw new Error(`${sourceName}: needs at least 2 valid r,g,b rows.`);
  }

  return rgb01ToPlotlyScale(rgb);
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i++;
      row.push(cell);
      if (row.some(v => v.trim() !== '')) rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some(v => v.trim() !== '')) rows.push(row);
  }

  const headers = rows.shift().map(h => h.trim());
  return rows.map(r => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = (r[i] ?? '').trim());
    return obj;
  });
}

function parseNumber(value) {
  if (value === null || value === undefined) return NaN;
  return Number(String(value).replace(',', '.'));
}

function showError(elementId, message) {
  const box = document.getElementById(elementId);
  box.style.display = 'block';
  box.textContent = message;
}

function hideError(elementId) {
  const box = document.getElementById(elementId);
  box.style.display = 'none';
  box.textContent = '';
}

// =============================
// Shared map style
// =============================

function getBaseGeoLayout() {
  return {
    projection: { type: 'natural earth' },
    showland: true,
    landcolor: 'rgb(230,235,225)',
    showocean: true,
    oceancolor: 'rgb(245,248,252)',
    showcountries: true,
    countrycolor: 'rgba(120,120,120,0.45)',
    showcoastlines: true,
    coastlinecolor: 'rgba(70,70,70,0.75)',
    lonaxis: {
      showgrid: true,
      gridcolor: 'rgba(120,120,120,0.28)',
      dtick: 60
    },
    lataxis: {
      showgrid: true,
      gridcolor: 'rgba(120,120,120,0.28)',
      dtick: 30
    }
  };
}

// =============================
// Generic map builder
// =============================

function updateStats(statsId, data, metricName, metricConfig) {
  const values = data.map(d => d[metricName]).filter(Number.isFinite);
  const n = values.length;
  const minv = Math.min(...values);
  const maxv = Math.max(...values);
  const mean = values.reduce((s, v) => s + v, 0) / n;
  const outside = values.filter(v => v < metricConfig.cmin || v > metricConfig.cmax).length;
  const unit = metricConfig.unit ? ' ' + metricConfig.unit : '';

  document.getElementById(statsId).innerHTML = `
    <span class="pill">N = ${n} stations</span>
    <span class="pill">min = ${minv.toFixed(metricConfig.decimals)}${unit}</span>
    <span class="pill">max = ${maxv.toFixed(metricConfig.decimals)}${unit}</span>
    <span class="pill">mean = ${mean.toFixed(metricConfig.decimals)}${unit}</span>
    <span class="pill">colour range = [${metricConfig.cmin}, ${metricConfig.cmax}]${unit}</span>
    <!-- <span class="pill">out of range = ${outside}</span> -->
  `;
}

function plotStationMap({
  plotId,
  statsId,
  data,
  metricName,
  metricConfig,
  hoverBuilder,
  // opcional: funcion (statsId, data, metricName, metricConfig) que pinta
  // las pastillas. Si no se pasa, se usan las genericas de updateStats().
  // La Figura 6 pasa la suya para reproducir el cuadro de resumen del paper.
  statsUpdater
}) {
  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(hoverBuilder),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 8,
      color: data.map(d => d[metricName]),
      cmin: metricConfig.cmin,
      cmax: metricConfig.cmax,
      colorscale: metricConfig.colorscale,
      line: { color: 'black', width: 0.7 },
      colorbar: {
        title: metricConfig.unit ? `${metricConfig.label} [${metricConfig.unit}]` : metricConfig.label,
        orientation: 'h',
        x: 0.5,
        y: -0.08,
        xanchor: 'center',
        len: 0.65,
        thickness: 18
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react(plotId, [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  (statsUpdater ?? updateStats)(statsId, data, metricName, metricConfig);
}
