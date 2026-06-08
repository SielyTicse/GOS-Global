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
// Palettes
// =============================

// Figure 4 palettes
const corrPalette = rgb01ToPlotlyScale([
  [0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],
  [0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],
  [0.3313,0.2812,0.4056],[0.3313,0.2812,0.4056],[0.3708,0.3250,0.4442],[0.4229,0.3875,0.4796],
  [0.4750,0.4500,0.5150],[0.5271,0.5125,0.5504],[0.5792,0.5750,0.5858],[0.4393,0.6402,0.4393],
  [0.1714,0.7071,0.1714],[0,0.6844,0],[0,0.5021,0],[0.1375,0.4589,0],
  [0.4500,0.5929,0],[0.7000,0.6687,0],[0.7000,0.5125,0],[0.7000,0.3562,0],
  [0.8200,0.1800,0],[0.9888,0,0],[0.7075,0,0],[0.5795,0,0.1375],
  [0.6464,0,0.4500],[0.6792,0.0417,0.7208],[0.6429,0.2857,0.8214],[0.8214,0.6429,0.9107]
]);

const rmsePalette = rgb01ToPlotlyScale([
  [1.0000,1.0000,1.0000],[1.0000,1.0000,0.8750],[1.0000,1.0000,0.7500],[1.0000,1.0000,0.6250],
  [1.0000,1.0000,0.5000],[1.0000,1.0000,0.3750],[1.0000,1.0000,0.2500],[1.0000,1.0000,0.1250],
  [1.0000,1.0000,0.0000],[1.0000,0.9091,0.0000],[1.0000,0.8182,0.0000],[1.0000,0.7273,0.0000],
  [1.0000,0.6364,0.0000],[1.0000,0.5455,0.0000],[1.0000,0.4545,0.0000],[1.0000,0.3636,0.0000],
  [1.0000,0.2727,0.0000],[1.0000,0.1818,0.0000],[1.0000,0.0909,0.0000],[1.0000,0.0000,0.0000],
  [0.9091,0.0000,0.0000],[0.8182,0.0000,0.0000],[0.7273,0.0000,0.0000],[0.6364,0.0000,0.0000],
  [0.5455,0.0000,0.0000],[0.4545,0.0000,0.0000],[0.3636,0.0000,0.0000],[0.2727,0.0000,0.0000],
  [0.1818,0.0000,0.0000],[0.0909,0.0000,0.0000]
]);

const nrmsePalette = rgb01ToPlotlyScale([
  [0.9500,1.0000,0.0000],[0.8000,1.0000,0.0000],[0.6500,1.0000,0.0000],[0.5000,1.0000,0.0000],
  [0.3500,1.0000,0.0000],[0.2000,1.0000,0.0000],[0.0500,1.0000,0.0000],[0.0000,1.0000,0.1000],
  [0.0000,1.0000,0.2500],[0.0000,1.0000,0.4000],[0.0000,1.0000,0.5500],[0.0000,1.0000,0.7000],
  [0.0000,1.0000,0.8500],[0.0000,1.0000,1.0000],[0.0000,0.8500,1.0000],[0.0000,0.7000,1.0000],
  [0.0000,0.5500,1.0000],[0.0000,0.4000,1.0000],[0.0000,0.2500,1.0000],[0.0000,0.1000,1.0000],
  [0.0500,0.0000,1.0000],[0.2000,0.0000,1.0000],[0.3500,0.0000,1.0000],[0.5000,0.0000,1.0000],
  [0.6500,0.0000,1.0000],[0.8000,0.0000,1.0000],[0.9500,0.0000,1.0000],[1.0000,0.0000,0.9000],
  [1.0000,0.0000,0.7500],[1.0000,0.0000,0.6000],[1.0000,0.0000,0.4500],[1.0000,0.0000,0.3000],
  [1.0000,0.0000,0.1500]
]);

const nbiasPalette = rgb01ToPlotlyScale([
  [0.9500,1.0000,0.0000],[0.8000,1.0000,0.0000],[0.6500,1.0000,0.0000],[0.5000,1.0000,0.0000],
  [0.3500,1.0000,0.0000],[0.2000,1.0000,0.0000],[0.0500,1.0000,0.0000],[0.0000,1.0000,0.1000],
  [0.0000,1.0000,0.2500],[0.0000,1.0000,0.4000],[0.0000,1.0000,0.5500],[0.0000,1.0000,0.7000],
  [0.0000,1.0000,0.8500],[0.0000,1.0000,1.0000],[0.0000,0.8500,1.0000],[0.0000,0.7000,1.0000],
  [0.0000,0.5500,1.0000],[0.0000,0.4000,1.0000],[0.0000,0.2500,1.0000],[0.0000,0.1000,1.0000],
  [0.0500,0.0000,1.0000],[0.2000,0.0000,1.0000],[0.3500,0.0000,1.0000],[0.5000,0.0000,1.0000],
  [0.6500,0.0000,1.0000],[0.8000,0.0000,1.0000],[0.9500,0.0000,1.0000],[1.0000,0.0000,0.9000],
  [1.0000,0.0000,0.7500],[1.0000,0.0000,0.6000],[1.0000,0.0000,0.4500],[1.0000,0.0000,0.3000],
  [1.0000,0.0000,0.1500]
]);

// Figure 5 palettes
const difPearsonPalette = rgb01ToPlotlyScale([
  [0.5000,0.0000,0.0000],[0.5424,0.0000,0.0000],[0.5847,0.0000,0.0000],[0.6271,0.0000,0.0000],
  [0.6695,0.0000,0.0000],[0.7119,0.0000,0.0000],[0.7542,0.0000,0.0000],[0.7966,0.0000,0.0000],
  [0.8390,0.0000,0.0000],[0.8814,0.0000,0.0000],[0.9237,0.0000,0.0000],[0.9661,0.0000,0.0000],
  [1.0000,0.0113,0.0113],[1.0000,0.0678,0.0678],[1.0000,0.1243,0.1243],[1.0000,0.1808,0.1808],
  [1.0000,0.2373,0.2373],[1.0000,0.2938,0.2938],[1.0000,0.3503,0.3503],[1.0000,0.4068,0.4068],
  [1.0000,0.4633,0.4633],[1.0000,0.5198,0.5198],[1.0000,0.5763,0.5763],[1.0000,0.6328,0.6328],
  [1.0000,0.6893,0.6893],[1.0000,0.7458,0.7458],[1.0000,0.8023,0.8023],[1.0000,0.8588,0.8588],
  [1.0000,0.9153,0.9153],[1.0000,0.9718,0.9718],[0.9718,0.9718,1.0000],[0.9153,0.9153,1.0000],
  [0.8588,0.8588,1.0000],[0.8023,0.8023,1.0000],[0.7458,0.7458,1.0000]
]);

const difRmsePalette = rgb01ToPlotlyScale([
  [0.8750,1.0000,1.0000],[0.7500,1.0000,1.0000],[0.6250,1.0000,1.0000],[0.5000,1.0000,1.0000],
  [0.3750,1.0000,1.0000],[0.2500,1.0000,1.0000],[0.1250,1.0000,1.0000],[0.0000,1.0000,1.0000],
  [0.0000,0.9432,1.0000],[0.0000,0.8864,1.0000],[0.0000,0.8295,1.0000],[0.0000,0.7727,1.0000],
  [0.0000,0.7159,1.0000],[0.0000,0.6591,1.0000],[0.0000,0.6023,1.0000],[0.0000,0.5455,1.0000],
  [0.0000,0.4886,1.0000],[0.0000,0.4318,1.0000],[0.0000,0.3750,1.0000],[0.0000,0.3182,1.0000],
  [0.0000,0.2614,1.0000],[0.0000,0.2045,1.0000],[0.0000,0.1477,1.0000],[0.0000,0.0909,1.0000],
  [0.0000,0.0341,1.0000],[0.0000,0.0000,0.9688],[0.0000,0.0000,0.8906],[0.0000,0.0000,0.8125],
  [0.0000,0.0000,0.7344],[0.0000,0.0000,0.6562],[0.0000,0.0000,0.5781],[0.0000,0.0000,0.5000]
]);

const nbiasUnfilteredPalette = rgb01ToPlotlyScale([
  [0.0000,0.0000,0.5000],[0.0000,0.0000,0.5862],[0.0000,0.0000,0.6724],[0.0000,0.0000,0.7586],
  [0.0000,0.0000,0.8448],[0.0000,0.0000,0.9310],[0.0230,0.0230,1.0000],[0.1379,0.1379,1.0000],
  [0.2529,0.2529,1.0000],[0.3678,0.3678,1.0000],[0.4828,0.4828,1.0000],[0.5977,0.5977,1.0000],
  [0.7126,0.7126,1.0000],[0.8276,0.8276,1.0000],[0.9425,0.9425,1.0000],[1.0000,0.9425,0.9425],
  [1.0000,0.8276,0.8276],[1.0000,0.7126,0.7126],[1.0000,0.5977,0.5977],[1.0000,0.4828,0.4828],
  [1.0000,0.3678,0.3678],[1.0000,0.2529,0.2529],[1.0000,0.1379,0.1379],[1.0000,0.0230,0.0230],
  [0.9310,0.0000,0.0000],[0.8448,0.0000,0.0000],[0.7586,0.0000,0.0000],[0.6724,0.0000,0.0000],
  [0.5862,0.0000,0.0000],[0.5000,0.0000,0.0000]
]);

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
// Figure 3 configuration
// =============================

const fig3PeriodPalette = rgb01ToPlotlyScale([
  [0.1000,1.0000,1.0000],
  [0.0825,0.8254,1.0000],
  [0.0651,0.6508,1.0000],
  [0.0476,0.4762,1.0000],
  [0.0270,0.2698,1.0000],
  [0.0009,0.1139,0.7628],
  [0.0034,0.5529,0.0034],
  [0.0013,0.8261,0.0013],
  [0.3810,1.0000,0.0254],
  [1.0000,0.9720,0.0711],
  [1.0000,0.9035,0.0821],
  [1.0000,0.8350,0.0931],
  [1.0000,0.7666,0.1040],
  [1.0000,0.6981,0.1150],
  [1.0000,0.6296,0.1259],
  [1.0000,0.5612,0.1369],
  [1.0000,0.4927,0.1478],
  [1.0000,0.4242,0.1588],
  [0.9832,0.5866,0.8633],
  [0.8775,0.1190,0.9378],
  [0.5119,0.1787,0.5748],
  [0.6510,0.6510,0.6510]
]);

const FIG3_METRICS = {
  Period: {
    label: 'Period',
    unit: 'h',
    cmin: 6,
    cmax: 26,
    decimals: 2,
    colorscale: fig3PeriodPalette
  }
};

let FIG3A_DATA = [];
let FIG3B_DATA = [];

function normalisedMarkerSizes(values, minSize = 4, maxSize = 18) {
  const finite = values.filter(Number.isFinite);
  const vmin = Math.min(...finite);
  const vmax = Math.max(...finite);

  return values.map(v => {
    if (!Number.isFinite(v)) return minSize;
    if (vmax === vmin) return (minSize + maxSize) / 2;
    return minSize + ((v - vmin) / (vmax - vmin)) * (maxSize - minSize);
  });
}

function buildFig3Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Period: ${d.Period.toFixed(4)} h/c<br>` 
  );
}

function plotFig3Map(data, minSize, maxSize) {
  const cfg = FIG3_METRICS.Period;
  const amplitudes = data.map(d => d.Amplit);
  const markerSizes = normalisedMarkerSizes(amplitudes, minSize, maxSize);
  const periods = data.map(d => d.Period);

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig3Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: markerSizes,
      color: periods,
      cmin: cfg.cmin,
      cmax: cfg.cmax,
      colorscale: cfg.colorscale,
      line: { width: 0 },
      opacity: 0.88,
      colorbar: {
        title: `${cfg.label} [${cfg.unit}]`,
        orientation: 'h',
        x: 0.5,
        y: -0.08,
        xanchor: 'center',
        len: 0.85,
        thickness: 18,
        tickmode: 'array',
        tickfont: { size: 13 },
        tickvals: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
        ticktext: ['6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '>26']
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig3-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig3Stats(data);
}

function updateFig3Stats(data) {
  const periods = data.map(d => d.Period).filter(Number.isFinite);
  const amplitudes = data.map(d => d.Amplit).filter(Number.isFinite);

  const n = data.length;
  const pmin = Math.min(...periods);
  const pmax = Math.max(...periods);
  const amin = Math.min(...amplitudes);
  const amax = Math.max(...amplitudes);

  document.getElementById('fig3-stats').innerHTML = `
    <span class="pill">N = ${n} points </span>
    <span class="pill">Period range = [6, >26] hr/c</span>
    <span class="pill">Standardized amplitude = 1–10</span>
  `;
}
 
function parseFig3Rows(rows, hasStationNames) {
  return rows.map((r, i) => ({
    station: hasStationNames ? r.station : `Coastal point ${i + 1}`,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    Period: parseNumber(r.Period),
    Amplit: parseNumber(r['Amplit.'] ?? r.Amplit)
  })).filter(d =>
    d.station &&
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.Period) &&
    Number.isFinite(d.Amplit)
  );
}

function renderFigure3() {
  const selector = document.getElementById('fig3-select');

  if (selector.value === '3a') {
    plotFig3Map(FIG3A_DATA, 4, 18);
  } else {
    plotFig3Map(FIG3B_DATA, 2, 10);
  }
}

function initFigure3Selector() {
  const selector = document.getElementById('fig3-select');

  selector.addEventListener('change', renderFigure3);

  renderFigure3();
}
// =============================
// Figure 4 configuration
// =============================

const FIG4_METRICS = {
  Corr: {
    label: 'Corr.',
    unit: '',
    cmin: -0.2,
    cmax: 1,
    decimals: 3,
    colorscale: corrPalette
  },
  Bias: {
    label: 'Bias',
    unit: 'cm',
    cmin: -2,
    cmax: 2,
    decimals: 2,
    colorscale: [
      [0.00, 'rgb(49,54,149)'],
      [0.20, 'rgb(69,117,180)'],
      [0.40, 'rgb(171,217,233)'],
      [0.50, 'rgb(255,255,255)'],
      [0.60, 'rgb(253,174,97)'],
      [0.80, 'rgb(215,48,39)'],
      [1.00, 'rgb(165,0,38)']
    ]
  },
  RMSE: {
    label: 'RMSE',
    unit: 'cm',
    cmin: 0,
    cmax: 22,
    decimals: 2,
    colorscale: rmsePalette
  },
  NRMSE_prct: {
    label: 'NRMSE_prct',
    unit: '%',
    cmin: 0,
    cmax: 24,
    decimals: 2,
    colorscale: nrmsePalette
  },
  NBias: {
    label: 'NBias',
    unit: '',
    cmin: -5,
    cmax: 5,
    decimals: 2,
    colorscale: nbiasPalette
  }
};

// =============================
// Figure 5 configuration
// =============================

const FIG5_METRICS = {
  Dif_Pearson: {
    label: 'Dif_Pearson',
    unit: '',
    cmin: -0.3,
    cmax: 0.05,
    decimals: 3,
    colorscale: difPearsonPalette
  },
  Dif_RMSE: {
    label: 'Dif_RMSE',
    unit: 'cm',
    cmin: 0,
    cmax: 17,
    decimals: 2,
    colorscale: difRmsePalette
  },
  NBias_Unfiltered: {
    label: 'NBias_Unfiltered',
    unit: '',
    cmin: -5,
    cmax: 5,
    decimals: 2,
    colorscale: nbiasUnfilteredPalette
  }
};

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
  hoverBuilder
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

  updateStats(statsId, data, metricName, metricConfig);
}

// =============================
// Figure 4
// =============================

let FIG4_DATA = [];

function buildFig4Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Corr.: ${d.Corr.toFixed(3)}<br>` +
    `Bias: ${d.Bias.toFixed(2)} cm<br>` +
    `RMSE: ${d.RMSE.toFixed(2)} cm<br>` +
    `NRMSE_prct: ${d.NRMSE_prct.toFixed(2)} %<br>` +
    `NBias: ${d.NBias.toFixed(2)}`
  );
}

function initFigure4(rows) {
  FIG4_DATA = rows.map(r => ({
    station: r.station,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    Corr: parseNumber(r.Corr ?? r['Corr.']),
    Bias: parseNumber(r.Bias),
    RMSE: parseNumber(r.RMSE),
    NRMSE_prct: parseNumber(r.NRMSE_prct),
    NBias: parseNumber(r.NBias)
  })).filter(d =>
    d.station &&
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.Corr) &&
    Number.isFinite(d.Bias) &&
    Number.isFinite(d.RMSE) &&
    Number.isFinite(d.NRMSE_prct) &&
    Number.isFinite(d.NBias)
  );

  if (!FIG4_DATA.length) {
    throw new Error('fig_4.csv has no valid rows.');
  }

  const selector = document.getElementById('fig4-select');

  function render() {
    const metric = selector.value;
    plotStationMap({
      plotId: 'fig4-map',
      statsId: 'fig4-stats',
      data: FIG4_DATA,
      metricName: metric,
      metricConfig: FIG4_METRICS[metric],
      hoverBuilder: buildFig4Hover
    });
  }

  selector.addEventListener('change', render);
  render();
}

// =============================
// Figure 5
// =============================

let FIG5_DATA = [];

function buildFig5Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Dif_Pearson: ${d.Dif_Pearson.toFixed(3)}<br>` +
    `Dif_RMSE: ${d.Dif_RMSE.toFixed(2)} cm<br>` +
    `NBias_Unfiltered: ${d.NBias_Unfiltered.toFixed(2)}`
  );
}

function initFigure5(rows) {
  FIG5_DATA = rows.map(r => ({
    station: r.station,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    Dif_Pearson: parseNumber(r.Dif_Pearson),
    Dif_RMSE: parseNumber(r.Dif_RMSE ?? r.Dif_Rmse),
    NBias_Unfiltered: parseNumber(r.NBias_Unfiltered ?? r.NBias_unfiltered)
  })).filter(d =>
    d.station &&
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.Dif_Pearson) &&
    Number.isFinite(d.Dif_RMSE) &&
    Number.isFinite(d.NBias_Unfiltered)
  );

  if (!FIG5_DATA.length) {
    throw new Error('fig_5.csv has no valid rows.');
  }

  const selector = document.getElementById('fig5-select');

  function render() {
    const metric = selector.value;
    plotStationMap({
      plotId: 'fig5-map',
      statsId: 'fig5-stats',
      data: FIG5_DATA,
      metricName: metric,
      metricConfig: FIG5_METRICS[metric],
      hoverBuilder: buildFig5Hover
    });
  }

  selector.addEventListener('change', render);
  render();
}
// =============================
// Figure 6 configuration
// =============================

const fig6MomPalette = rgb01ToPlotlyScale([
  [0.7545,0.8814,0.9310],
  [0.6317,0.8221,0.8966],
  [0.5090,0.7628,0.8621],
  [0.3862,0.7034,0.8276],
  [0.2634,0.6441,0.7931],
  [0.1407,0.5848,0.7586],
  [0.2021,0.6145,0.7138],
  [0.3248,0.6738,0.6655],
  [0.4476,0.7331,0.6172],
  [0.5703,0.7924,0.5690],
  [0.6931,0.8517,0.5207],
  [0.8159,0.9110,0.4724],
  [0.9386,0.9703,0.4241],
  [1.0000,0.9379,0.3738],
  [1.0000,0.8138,0.3214],
  [1.0000,0.6897,0.2690],
  [1.0000,0.5655,0.2166],
  [1.0000,0.4414,0.1641],
  [1.0000,0.3172,0.1117],
  [1.0000,0.1931,0.0593],
  [0.9897,0.0966,0.0193],
  [0.9483,0.0828,0.0166],
  [0.9069,0.0690,0.0138],
  [0.8655,0.0552,0.0110],
  [0.8241,0.0414,0.0083],
  [0.7828,0.0276,0.0055],
  [0.7414,0.0138,0.0028],
  [0.7000,0.0000,0.0000]
]);

const fig6MaePalette = rgb01ToPlotlyScale([
  [0.3020,0.7451,0.9333],
  [0.3780,0.7544,0.9086],
  [0.5024,0.8035,0.9269],
  [0.6268,0.8526,0.9452],
  [0.7512,0.9018,0.9635],
  [0.8756,0.9509,0.9817],
  [1.0000,1.0000,1.0000],
  [0.9763,0.9885,0.8893],
  [0.9525,0.9771,0.7787],
  [0.9288,0.9656,0.6680],
  [0.9050,0.9541,0.5574],
  [0.8813,0.9426,0.4467],
  [0.9358,0.9174,0.4035],
  [0.9903,0.8922,0.3603],
  [0.9989,0.7985,0.3155],
  [1.0000,0.6934,0.2705],
  [1.0000,0.5867,0.2255],
  [1.0000,0.4800,0.1805],
  [1.0000,0.3734,0.1354],
  [0.9991,0.2691,0.0915],
  [0.9936,0.1771,0.0530],
  [0.9776,0.1132,0.0272],
  [0.9489,0.0830,0.0166],
  [0.8839,0.0974,0.0938],
  [0.8190,0.1119,0.1710],
  [0.7540,0.1264,0.2481],
  [0.6890,0.1409,0.3253],
  [0.6241,0.1554,0.4025],
  [0.5591,0.1698,0.4797],
  [0.4941,0.1843,0.5569]
]);

const FIG6_METRICS = {
  MOM: {
    label: 'MOM',
    unit: 'm',
    cmin: 0,
    cmax: 3,
    decimals: 2,
    colorscale: fig6MomPalette
  },
  MAE: {
    label: 'MAE',
    unit: 'cm',
    cmin: -14,
    cmax: 53,
    decimals: 2,
    colorscale: fig6MaePalette
  }
};

let FIG6A_DATA = [];
let FIG6B_DATA = [];

function buildFig6aHover(d) {
  return (
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `MOM: ${d.MOM.toFixed(2)} m`
  );
}

function buildFig6bHover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `MAE: ${d.MAE.toFixed(2)} cm`
  );
}

function getFig6Colorbar(metricName, cfg) {
  if (metricName === 'MOM') {
    return {
      title: `${cfg.label} [${cfg.unit}]`,
      orientation: 'h',
      x: 0.5,
      y: -0.08,
      xanchor: 'center',
      len: 0.75,
      thickness: 18,
      tickmode: 'array',
      tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      ticktext: ['0', '0.5', '1', '1.5', '2', '2.5', '>3'],
      tickfont: { size: 13 }
    };
  }

  return {
    title: `${cfg.label} [${cfg.unit}]`,
    orientation: 'h',
    x: 0.5,
    y: -0.08,
    xanchor: 'center',
    len: 0.75,
    thickness: 18,
    tickmode: 'array',
    tickvals: [-10, 0, 10, 20, 30, 40, 50],
    ticktext: ['-10', '0', '10', '20', '30', '40', '50'],
    tickfont: { size: 13 }
  };
}

function plotFig6Map({ data, metricName, hoverBuilder, pointSize, lineWidth }) {
  const cfg = FIG6_METRICS[metricName];

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(hoverBuilder),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: pointSize,
      color: data.map(d => d[metricName]),
      cmin: cfg.cmin,
      cmax: cfg.cmax,
      colorscale: cfg.colorscale,
      line: { color: 'black', width: lineWidth },
      opacity: 0.88,
      colorbar: getFig6Colorbar(metricName, cfg)
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig6-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig6Stats(metricName, data);
}

function updateFig6Stats(metricName, data) {
  const n = data.length;

  if (metricName === 'MOM') {
    document.getElementById('fig6-stats').innerHTML = `
      <span class="pill">N = ${n} coastal points</span>
      <span class="pill">MOM range = [0, >3] m</span>
    `;
    return;
  }

  document.getElementById('fig6-stats').innerHTML = `
    <span class="pill">N = ${n} stations</span>
    <span class="pill">MAE range = [-14, 53] cm</span>
  `;
}

function parseFig6aRows(rows) {
  return rows.map((r, i) => ({
    station: `Coastal point ${i + 1}`,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    MOM: parseNumber(r.MOM)
  })).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.MOM)
  );
}

function parseFig6bRows(rows) {
  return rows.map(r => ({
    station: r.station,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    MAE: parseNumber(r.MAE)
  })).filter(d =>
    d.station &&
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.MAE)
  );
}

function renderFigure6() {
  const selector = document.getElementById('fig6-select');

  if (selector.value === '6a') {
    plotFig6Map({
      data: FIG6A_DATA,
      metricName: 'MOM',
      hoverBuilder: buildFig6aHover,
      pointSize: 3,
      lineWidth: 0
    });
  } else {
    plotFig6Map({
      data: FIG6B_DATA,
      metricName: 'MAE',
      hoverBuilder: buildFig6bHover,
      pointSize: 8,
      lineWidth: 0.5
    });
  }
}

function initFigure6Selector() {
  const selector = document.getElementById('fig6-select');

  selector.addEventListener('change', renderFigure6);

  renderFigure6();
}
// =============================
// Figure 7 configuration
// =============================

const fig7RpPalette = rgb01ToPlotlyScale([
  [0.1000,1.0000,1.0000],
  [0.0800,0.8000,0.9500],
  [0.0600,0.6000,0.9000],
  [0.0400,0.4000,0.8500],
  [0.0200,0.2000,0.8000],
  [0.0000,0.0000,0.7500],
  [0.0000,1.0000,0.0000],
  [0.0000,0.8750,0.0000],
  [0.0000,0.7500,0.0000],
  [0.0000,0.6250,0.0000],
  [0.0000,0.5000,0.0000],
  [1.0000,1.0000,0.0000],
  [1.0000,0.9000,0.0000],
  [1.0000,0.8000,0.0000],
  [1.0000,0.7000,0.0000],
  [1.0000,0.6000,0.0000],
  [1.0000,0.5000,0.0000],
  [1.0000,0.0000,0.0000],
  [0.9000,0.0000,0.0000],
  [0.8000,0.0000,0.0000],
  [0.7000,0.0000,0.0000],
  [0.6000,0.0000,0.0000],
  [0.5000,0.0000,0.0000],
  [1.0000,0.0000,1.0000],
  [0.9000,0.0500,0.9500],
  [0.8000,0.1000,0.9000],
  [0.7000,0.1500,0.8500],
  [0.6000,0.2000,0.8000]
]);

const fig7MonthPalette = rgb01ToPlotlyScale([
  [0.0000,0.2000,0.5000],
  [0.4000,0.3000,0.8000],
  [0.0000,0.5000,0.1000],
  [0.3000,0.7000,0.0000],
  [0.7000,0.9000,0.0000],
  [1.0000,0.9000,0.0000],
  [1.0000,0.6000,0.0000],
  [0.9000,0.0000,0.0000],
  [0.6000,0.0000,0.3000],
  [0.0000,0.7000,0.7000],
  [0.4000,0.8000,1.0000],
  [0.0000,0.4000,0.8000]
]);

const FIG7_METRICS = {
  RP50: {
    label: 'RP-50yr',
    unit: 'm',
    cmin: 0,
    cmax: 4.5,
    decimals: 2,
    colorscale: fig7RpPalette
  },
  Month: {
    label: 'Month',
    unit: '',
    cmin: 1,
    cmax: 12,
    decimals: 0,
    colorscale: fig7MonthPalette
  }
};

let FIG7A_DATA = [];
let FIG7B_DATA = [];

const FIG7_MONTH_NAMES = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

function buildFig7aHover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `RP-50yr: ${d.RP50.toFixed(2)} m`
  );
}

function buildFig7bHover(d) {
  const monthName = FIG7_MONTH_NAMES[d.time - 1] ?? `${d.time}`;
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Month: ${d.time} (${monthName})<br>` +
    `Amplitude: ${d.Ampl.toFixed(2)} m`
  );
}

function plotFig7aMap(data) {
  const cfg = FIG7_METRICS.RP50;

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig7aHover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 3,
      color: data.map(d => d.RP50),
      cmin: cfg.cmin,
      cmax: cfg.cmax,
      colorscale: cfg.colorscale,
      line: { width: 0 },
      opacity: 0.88,
      colorbar: {
        title: `${cfg.label} [${cfg.unit}]`,
        orientation: 'h',
        x: 0.5,
        y: -0.08,
        xanchor: 'center',
        len: 0.75,
        thickness: 18,
        tickmode: 'array',
        tickvals: [0, 0.5,1, 1.5, 2, 2.5,3, 3.5,4, 4.5],
        ticktext: ['0', '0.5','1', '1.5','2', '2.5', '3', '3.5','4', '4.5'],
        tickfont: { size: 13 }
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig7-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig7Stats('7a', data);
}

function plotFig7bMap(data) {
  const cfg = FIG7_METRICS.Month;
  const markerSizes = normalisedMarkerSizes(data.map(d => d.Ampl), 1.5, 12);

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig7bHover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: markerSizes,
      color: data.map(d => d.time),
      cmin: cfg.cmin,
      cmax: cfg.cmax,
      colorscale: cfg.colorscale,
      line: { width: 0 },
      opacity: 0.88,
      colorbar: {
        title: cfg.label,
        orientation: 'h',
        x: 0.5,
        y: -0.08,
        xanchor: 'center',
        len: 0.80,
        thickness: 18,
        tickmode: 'array',
        tickvals: [1,2,3,4,5,6,7,8,9,10,11,12],
        ticktext: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        tickfont: { size: 13 }
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig7-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig7Stats('7b', data);
}

function updateFig7Stats(panel, data) {
  if (panel === '7a') {
    const n = data.length;
    document.getElementById('fig7-stats').innerHTML = `
      <span class="pill">N = ${n} coastal points</span>
      <span class="pill">RP-50yr range = [0, 4.2] m</span>
    `;
    return;
  }

  const n = data.length;
  const amps = data.map(d => d.Ampl).filter(Number.isFinite);
  const amin = Math.min(...amps);
  const amax = Math.max(...amps);

  document.getElementById('fig7-stats').innerHTML = `
    <span class="pill">N = ${n} coastal points</span>
    <span class="pill">Month colours = 1–12</span>
    <span class="pill">Amplitude (size) = ${amin.toFixed(2)}–${amax.toFixed(2)} m</span>
  `;
}

function parseFig7aRows(rows) {
  return rows.map((r, i) => ({
    station: `Coastal point ${i + 1}`,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    RP50: parseNumber(r['RP-50yr'] ?? r.RP_50yr ?? r.RP50yr)
  })).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.RP50)
  );
}

function parseFig7bRows(rows) {
  return rows.map((r, i) => ({
    station: `Coastal point ${i + 1}`,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    time: parseNumber(r.time),
    Ampl: parseNumber(r.Ampl)
  })).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.time) &&
    d.time >= 1 && d.time <= 12 &&
    Number.isFinite(d.Ampl)
  );
}

function renderFigure7() {
  const selector = document.getElementById('fig7-select');

  if (selector.value === '7a') {
    plotFig7aMap(FIG7A_DATA);
  } else {
    plotFig7bMap(FIG7B_DATA);
  }
}

function initFigure7Selector() {
  const selector = document.getElementById('fig7-select');

  selector.addEventListener('change', renderFigure7);

  renderFigure7();
}
// =============================
// Figure 1 configuration
// =============================

let FIG1A_POINTS = [];
let FIG1B_SERIES = [];
let FIG1B_NPOINTS = 0;

const FIG1_BIN_WIDTH = 13.1606 / 60.0; // hr/c

const FIG1B_HIST_RGB = [
  [0.4796,0.0158,0.0106],
  [0.7941,0.1660,0.0143],
  [0.9643,0.4186,0.0964],
  [0.9800,0.7300,0.2216],
  [0.7824,0.9376,0.2033],
  [0.4483,0.9959,0.3694],
  [0.1034,0.8960,0.7150],
  [0.2093,0.6654,0.9760],
  [0.2737,0.3835,0.8449],
  [0.1900,0.0718,0.2322]
];

const FIG1B_HIST_COLOURS = FIG1B_HIST_RGB.map(([r, g, b]) =>
  `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
);

function buildFig1Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Type: ${d.type}`
  );
}

function parseFig1aRows(rows) {
  const nTotal = rows.length;
  const nStations = 216;
  const firstStationIndex = nTotal - nStations;

  return rows.map((r, i) => {
    const isStation = i >= firstStationIndex;

    return {
      station: r.station || (isStation ? `Station ${i - firstStationIndex + 1}` : `Point ${i + 1}`),
      lon: parseNumber(r.lon),
      lat: parseNumber(r.lat),
      type: isStation ? 'Validation station' : 'Coastal point',
      isStation: isStation
    };
  }).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat)
  );
}

function plotFig1aMap(data) {
  const coastalPoints = data.filter(d => !d.isStation);
  const stationPoints = data.filter(d => d.isStation);

  const coastalTrace = {
    type: 'scattergeo',
    mode: 'markers',
    name: 'Coastal points',
    lon: coastalPoints.map(d => d.lon),
    lat: coastalPoints.map(d => d.lat),
    text: coastalPoints.map(buildFig1Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      symbol: 'circle',
      size: 5,
      color: 'turquoise',
      opacity: 0.75,
      line: { color: 'black', width: 0.7 }
    }
  };

  const stationTrace = {
    type: 'scattergeo',
    mode: 'markers',
    name: 'Validation stations',
    lon: stationPoints.map(d => d.lon),
    lat: stationPoints.map(d => d.lat),
    text: stationPoints.map(buildFig1Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      symbol: 'triangle-up',
      size: 8,
      color: 'magenta',
      opacity: 0.95,
      line: { color: 'black', width: 0.7 }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 20 },
    paper_bgcolor: '#ffffff',
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.05,
      xanchor: 'center'
    },
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig1-map', [coastalTrace, stationTrace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig1Stats(coastalPoints.length, stationPoints.length);
}

function updateFig1Stats(nCoastal, nStations) {
  document.getElementById('fig1-stats').innerHTML = `
    <span class="pill">N = ${nCoastal + nStations} points</span>
    <span class="pill">Coastal points = ${nCoastal}</span>
    <span class="pill">Stations = ${nStations}</span>
  `;
}

function parseFig1bRows(rows) {
  FIG1B_NPOINTS = rows.length;

  const series = Array.from({ length: 10 }, () => []);

  rows.forEach(r => {
    for (let k = 1; k <= 10; k++) {
      const value = parseNumber(r[`period_${k}`]);
      if (Number.isFinite(value)) {
        series[k - 1].push(value);
      }
    }
  });

  return series;
}

function plotFig1bHistogram(series) {
  const traces = series.map((values, idx) => ({
    type: 'histogram',
    name: `period_${idx + 1}`,
    x: values,
    opacity: 0.30,
    marker: {
      color: FIG1B_HIST_COLOURS[idx]
    },
    xbins: {
      start: 0,
      size: FIG1_BIN_WIDTH
    },
    hovertemplate:
      `<b>period_${idx + 1}</b><br>` +
      `Period bin: %{x}<br>` +
      `Occurrence: %{y}<extra></extra>`
  }));

  const layout = {
  barmode: 'overlay',
  margin: { l: 90, r: 20, t: 40, b: 90 },
  paper_bgcolor: '#ffffff',
  plot_bgcolor: '#ffffff',
  legend: {
    orientation: 'h',
    x: 0.5,
    y: 1.12,
    xanchor: 'center',
    font: { size: 13 }
  },
  xaxis: {
  title: {
    text: 'period [h/c]',
    font: { size: 18 }
  },
  range: [5, 25],
  tickfont: { size: 14 },
  tickformat: '.1f'
  },
  yaxis: {
    title: {
      text: 'ocurrence',
      font: { size: 22 }
    },
    tickfont: { size: 16 }
  }
};
  

  Plotly.react('fig1b-hist', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig1bStats(series);
}

function updateFig1bStats(series) {
  const totalValues = series.reduce((acc, arr) => acc + arr.length, 0);

  document.getElementById('fig1b-stats').innerHTML = `
    <span class="pill">N = ${FIG1B_NPOINTS} points</span>
    <span class="pill">Top periods per point = 10</span>
    <span class="pill">Total values plotted = ${totalValues}</span>
    <span class="pill">Bin width = 13.1606 min</span>
  `;
}

function renderFigure1() {
  const selector = document.getElementById('fig1-select');
  const panel1a = document.getElementById('fig1a-panel');
  const panel1b = document.getElementById('fig1b-panel');
  const note = document.getElementById('fig1-note');

  if (selector.value === '1a') {
    panel1a.classList.remove('hidden');
    panel1b.classList.add('hidden');

    note.innerHTML =
      'Propiedad de Elsy Ticse - IHCANTABRIA';

    plotFig1aMap(FIG1A_POINTS);
  } else {
    panel1a.classList.add('hidden');
    panel1b.classList.remove('hidden');

    note.innerHTML =
      'Propiedad de Elsy Ticse - IHCANTABRIA';

    plotFig1bHistogram(FIG1B_SERIES);
  }
}

function initFigure1Selector() {
  const selector = document.getElementById('fig1-select');
  selector.addEventListener('change', renderFigure1);
  renderFigure1();
}

// =============================
// Figure 2 configuration
// =============================

const FIG2_CONFIG = {
  '2a': {
    tsFile: 'data/fig_2a_ts.csv',
    locFile: 'data/fig_2a_locations.csv',
    psdImage: 'images/fig_2a_psd.png',
    label: 'Figure 3a',
    series: ['serie_1', 'serie_2', 'serie_3', 'serie_4'],
    seriesNames: {
      serie_1: 'Galveston Pier',
      serie_2: 'Key West FL',
      serie_3: 'Newport',
      serie_4: 'Virginia Key'
    },
    colours: {
      serie_1: 'rgb(122,4,3)',
      serie_2: 'rgb(169,22,1)',
      serie_3: 'rgb(206,45,4)',
      serie_4: 'rgb(232,75,12)'
    }
  }
};

let FIG2_DATA = {};

function parseFig2TimeSeriesRows(rows, panelKey) {
  const cfg = FIG2_CONFIG[panelKey];

  return cfg.series.map(seriesId => {
    const values = rows.map(r => parseNumber(r[seriesId]));
    const times = rows.map(r => r.time);

    return {
      series_id: seriesId,
      series_name: cfg.seriesNames[seriesId] ?? seriesId,
      time: times,
      value: values
    };
  });
}

function parseFig2LocationRows(rows) {
  return rows.map(r => ({
    station: r.station,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    series_id: r.series_id,
    series_name: r.series_name || r.station
  })).filter(d =>
    d.station &&
    d.series_id &&
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat)
  );
}

function plotFig2TimeSeries(panelKey) {
  const cfg = FIG2_CONFIG[panelKey];
  const seriesData = FIG2_DATA[panelKey].ts;

  const traces = seriesData.map(s => ({
    type: 'scatter',
    mode: 'lines',
    name: s.series_name,
    x: s.time,
    y: s.value,
    line: {
      color: cfg.colours[s.series_id],
      width: 1.4
    },
    hovertemplate:
      `<b>${s.series_name}</b><br>` +
      `Time: %{x}<br>` +
      `Value: %{y:.3f} m<extra></extra>`
  }));

  const layout = {
    margin: { l: 65, r: 20, t: 15, b: 60 },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    legend: {
      orientation: 'h',
      x: 0.5,
      y: 1.12,
      xanchor: 'center',
      font: { size: 12 }
    },
    xaxis: {
      title: {
        text: 'Time',
        font: { size: 16 }
      },
      tickfont: { size: 12 }
    },
    yaxis: {
      title: {
        text: 'Surge [m]',
        font: { size: 16 }
      },
      tickfont: { size: 12 }
    }
  };

  Plotly.react('fig2-ts', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });
}

function plotFig2LocationMap(panelKey) {
  const cfg = FIG2_CONFIG[panelKey];
  const locData = FIG2_DATA[panelKey].locations;

  const traces = locData.map(d => ({
    type: 'scattergeo',
    mode: 'markers',
    name: d.series_name,
    lon: [d.lon],
    lat: [d.lat],
    text: [
      `<b>${d.series_name}</b><br>` +
      `Lon: ${d.lon.toFixed(3)}°<br>` +
      `Lat: ${d.lat.toFixed(3)}°`
    ],
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      symbol: 'circle',
      size: 10,
      color: cfg.colours[d.series_id],
      line: {
        color: 'black',
        width: 0.5
      }
    },
    showlegend: true
  }));

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 25 },
    paper_bgcolor: '#ffffff',
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      y: -0.05,
      xanchor: 'center',
      font: { size: 12 }
    },
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig2-map', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  document.getElementById('fig2-stats').innerHTML = `
    <span class="pill">N = ${locData.length} stations</span>
    <span class="pill">Panel = ${cfg.label}</span>
  `;
}

function updateFig2PsdImage(panelKey) {
  const cfg = FIG2_CONFIG[panelKey];

  const img = document.getElementById('fig2-psd-img');
  const link = document.querySelector('.fig2-image-link');

  img.src = cfg.psdImage;
  img.alt = `Power spectral density for ${cfg.label}`;
  link.href = cfg.psdImage;
}

function renderFigure2() {
  const selector = document.getElementById('fig2-select');
  const panelKey = selector.value;

  if (!FIG2_DATA[panelKey]) return;

  plotFig2TimeSeries(panelKey);
  plotFig2LocationMap(panelKey);
  updateFig2PsdImage(panelKey);
}

function initFigure2Selector() {
  const selector = document.getElementById('fig2-select');
  selector.addEventListener('change', renderFigure2);
  renderFigure2();
}

// =============================
// Load files
// =============================
// Figure 1
Promise.all([
  fetch('data/fig_2a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2a.csv');
    return response.text();
  }),
  fetch('data/fig_1b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_1b.csv');
    return response.text();
  })
])
  .then(([text1a, text1b]) => {
    hideError('fig1-error');
    hideError('fig1b-error');

    FIG1A_POINTS = parseFig1aRows(parseCSV(text1a));
    FIG1B_SERIES = parseFig1bRows(parseCSV(text1b));

    if (!FIG1A_POINTS.length) {
      throw new Error('fig_2a.csv has no valid rows.');
    }

    if (!FIG1B_SERIES.length) {
      throw new Error('fig_1b.csv has no valid rows.');
    }

    initFigure1Selector();
  })
  .catch(err => {
    showError('fig1-error', err.message);
    showError('fig1b-error', err.message);
  });
// Figure 2
Promise.all([
  fetch('data/fig_2a_ts.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2a_ts.csv');
    return response.text();
  }),
  fetch('data/fig_2a_locations.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2a_locations.csv');
    return response.text();
  })
])
  .then(([textTs, textLoc]) => {
    hideError('fig2-error');

    FIG2_DATA['2a'] = {
      ts: parseFig2TimeSeriesRows(parseCSV(textTs), '2a'),
      locations: parseFig2LocationRows(parseCSV(textLoc))
    };

    if (!FIG2_DATA['2a'].ts.length) {
      throw new Error('fig_2a_ts.csv has no valid rows.');
    }

    if (!FIG2_DATA['2a'].locations.length) {
      throw new Error('fig_2a_locations.csv has no valid rows.');
    }

    initFigure2Selector();
  })
  .catch(err => {
    showError('fig2-error', err.message);
  });
// Figure 3
Promise.all([
  fetch('data/fig_3a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_3a.csv');
    return response.text();
  }),
  fetch('data/fig_3b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_3b.csv');
    return response.text();
  })
])
  .then(([text3a, text3b]) => {
    hideError('fig3-error');

    FIG3A_DATA = parseFig3Rows(parseCSV(text3a), true);
    FIG3B_DATA = parseFig3Rows(parseCSV(text3b), false);

    if (!FIG3A_DATA.length) {
      throw new Error('fig_3a.csv has no valid rows.');
    }

    if (!FIG3B_DATA.length) {
      throw new Error('fig_3b.csv has no valid rows.');
    }

    initFigure3Selector();
  })
  .catch(err => {
    showError('fig3-error', err.message);
  });
// Figure 6
Promise.all([
  fetch('data/fig_6a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_6a.csv');
    return response.text();
  }),
  fetch('data/fig_6b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_6b.csv');
    return response.text();
  })
])
  .then(([text6a, text6b]) => {
    hideError('fig6-error');

    FIG6A_DATA = parseFig6aRows(parseCSV(text6a));
    FIG6B_DATA = parseFig6bRows(parseCSV(text6b));

    if (!FIG6A_DATA.length) {
      throw new Error('fig_6a.csv has no valid rows.');
    }

    if (!FIG6B_DATA.length) {
      throw new Error('fig_6b.csv has no valid rows.');
    }

    initFigure6Selector();
  })
  .catch(err => {
    showError('fig6-error', err.message);
  });
// Figure 4
fetch('data/fig_4.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_4.csv');
    return response.text();
  })
  .then(text => {
    hideError('fig4-error');
    initFigure4(parseCSV(text));
  })
  .catch(err => {
    showError('fig4-error', err.message);
  });
// Figure 5
fetch('data/fig_5.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_5.csv');
    return response.text();
  })
  .then(text => {
    hideError('fig5-error');
    initFigure5(parseCSV(text));
  })
  .catch(err => {
    showError('fig5-error', err.message);
  });
// Figure 7
Promise.all([
  fetch('data/fig_7a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_7a.csv');
    return response.text();
  }),
  fetch('data/fig_7b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_7b.csv');
    return response.text();
  })
])
  .then(([text7a, text7b]) => {
    hideError('fig7-error');

    FIG7A_DATA = parseFig7aRows(parseCSV(text7a));
    FIG7B_DATA = parseFig7bRows(parseCSV(text7b));

    if (!FIG7A_DATA.length) {
      throw new Error('fig_7a.csv has no valid rows.');
    }

    if (!FIG7B_DATA.length) {
      throw new Error('fig_7b.csv has no valid rows.');
    }

    initFigure7Selector();
  })
  .catch(err => {
    showError('fig7-error', err.message);
  });
