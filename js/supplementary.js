// =============================================================================
// supplementary.js - Supplementary Figures 1 a 4
// Requiere common.js cargado previamente.
//
// S1  antes era el panel (a) de la Figura 7 (MOM); datos en data/fig_s1.csv
// S2  antes era la seccion "Figure 6" de index.html; datos en data/fig_s2.csv
// S3  amplitudes de los ciclos (figS2_amplitudes_ciclos.m)
// S4  diferencia del retorno de 50 anios (figS3_dif_retorno50_GOSvsTG.m)
// =============================================================================

// =============================
// Figure S1 configuration
// =============================
// Maximo nivel de marea meteorologica (maximum of maxima) en los puntos
// costeros. Era el panel (a) de la Figura 7; al pasar a suplementaria se trajo
// su paleta y su barra de color tal cual.

const figS1MomPalette = rgb01ToPlotlyScale([
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

const FIGS1_METRIC = {
  label: 'MOM',
  unit: 'm',
  cmin: 0,
  cmax: 3,
  decimals: 2,
  colorscale: figS1MomPalette
};

let FIGS1_DATA = [];

function buildFigS1Hover(d) {
  return (
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `MOM: ${d.MOM.toFixed(2)} m`
  );
}

function parseFigS1Rows(rows) {
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

function plotFigS1Map(data) {
  const cfg = FIGS1_METRIC;

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFigS1Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 3,
      color: data.map(d => d.MOM),
      cmin: cfg.cmin,
      cmax: cfg.cmax,
      colorscale: cfg.colorscale,
      line: { color: 'black', width: 0 },
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
        tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3],
        ticktext: ['0', '0.5', '1', '1.5', '2', '2.5', '>3'],
        tickfont: { size: 13 }
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('figs1-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  document.getElementById('figs1-stats').innerHTML = `
    <span class="pill">N = ${data.length} coastal points</span>
    <span class="pill">colour range = [0, >3] m</span>
  `;
}

// Figure S1
fetch('data/fig_s1.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s1.csv');
    return response.text();
  })
  .then(text => {
    hideError('figs1-error');

    FIGS1_DATA = parseFigS1Rows(parseCSV(text));

    if (!FIGS1_DATA.length) {
      throw new Error('fig_s1.csv has no valid rows.');
    }

    plotFigS1Map(FIGS1_DATA);
  })
  .catch(err => {
    showError('figs1-error', err.message);
  });

// Figure S2 palettes
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
// Figure S2 configuration
// =============================

const FIGS2_METRICS = {
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
// Figure S2
// =============================

let FIGS2_DATA = [];

function buildFigS2Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Dif_Pearson: ${d.Dif_Pearson.toFixed(3)}<br>` +
    `Dif_RMSE: ${d.Dif_RMSE.toFixed(2)} cm<br>` +
    `NBias_Unfiltered: ${d.NBias_Unfiltered.toFixed(2)}`
  );
}

function initFigureS2(rows) {
  FIGS2_DATA = rows.map(r => ({
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

  if (!FIGS2_DATA.length) {
    throw new Error('fig_s2.csv has no valid rows.');
  }

  const selector = document.getElementById('figs2-select');

  function render() {
    const metric = selector.value;
    plotStationMap({
      plotId: 'figs2-map',
      statsId: 'figs2-stats',
      data: FIGS2_DATA,
      metricName: metric,
      metricConfig: FIGS2_METRICS[metric],
      hoverBuilder: buildFigS2Hover
    });
  }

  selector.addEventListener('change', render);
  render();
}

// Figure S2
fetch('data/fig_s2.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s2.csv');
    return response.text();
  })
  .then(text => {
    hideError('figs2-error');
    initFigureS2(parseCSV(text));
  })
  .catch(err => {
    showError('figs2-error', err.message);
  });

// =============================
// Figure S3 configuration
// =============================
// Amplitudes de los ciclos anual y semianual de mu y psi, comparando
// mareografos (TG) con GOS. Equivale a
// codigos_GEV_ESTACIONARIO/figS2_amplitudes_ciclos.m
// Datos: fig_s3.csv + fig_s3_palette.csv
//
// En el paper son 8 mapas en 4 filas x 2 columnas. Aqui se elige la fila con
// un selector y se ven los dos mapas de esa fila, TG a la izquierda y GOS a
// la derecha, que es la comparacion que interesa.

// La barra es LA MISMA para los ocho paneles, como en el script.
const FIGS3_CLIM = [0, 0.5];
const FIGS3_TICKS = [0, 0.1, 0.2, 0.3, 0.4, 0.5];

const FIGS3_ROWS = {
  mu_ann: {
    label: 'μ annual Ampl.',
    cols: { tg: 'mu_ann_tg', gos: 'mu_ann_gos' }
  },
  mu_semi: {
    label: 'μ semi-annual Ampl.',
    cols: { tg: 'mu_semi_tg', gos: 'mu_semi_gos' }
  },
  psi_ann: {
    label: 'ψ annual Ampl.',
    cols: { tg: 'psi_ann_tg', gos: 'psi_ann_gos' }
  },
  psi_semi: {
    label: 'ψ semi-annual Ampl.',
    cols: { tg: 'psi_semi_tg', gos: 'psi_semi_gos' }
  }
};

let FIGS3_DATA = [];
let FIGS3_PALETTE = null;

function parseFigS3Rows(rows) {
  return rows.map(r => {
    const d = {
      station: (r.station ?? '').trim(),
      lon: parseNumber(r.lon),
      lat: parseNumber(r.lat)
    };

    // Cada columna puede venir NaN: son las estaciones a las que no se les
    // ajusto ese ciclo. Se conservan en la fila y se descartan panel a panel.
    Object.values(FIGS3_ROWS).forEach(cfg => {
      d[cfg.cols.tg] = parseNumber(r[cfg.cols.tg]);
      d[cfg.cols.gos] = parseNumber(r[cfg.cols.gos]);
    });

    return d;
  }).filter(d => Number.isFinite(d.lon) && Number.isFinite(d.lat));
}

// Los dos mapas de una fila van en UNA sola figura, como subplots geograficos
// (geo y geo2) que comparten una unica barra de color vertical a la derecha.
// Antes eran dos graficos Plotly independientes, cada uno en su tarjeta y con
// su propia barra horizontal, y no se leian como un conjunto.
//
// Reparto horizontal: mapa TG, mapa GOS y el hueco de la barra.
const FIGS3_DOMAINS = {
  tg:  [0.00, 0.45],
  gos: [0.47, 0.92]
};

// rotulo TG/GOS dentro del mapa, en lat 60 / lon 80 como el textm de MATLAB
const FIGS3_TXT_LAT = 60;
const FIGS3_TXT_LON = 80;

function buildFigS3Traces(data, column, sourceLabel, rowLabel, geoId, showColorbar) {
  const points = data.filter(d => Number.isFinite(d[column]));

  const markers = {
    type: 'scattergeo',
    mode: 'markers',
    geo: geoId,
    showlegend: false,
    lon: points.map(d => d.lon),
    lat: points.map(d => d.lat),
    text: points.map(d =>
      `<b>${d.station}</b><br>` +
      `Lon: ${d.lon.toFixed(3)}°<br>` +
      `Lat: ${d.lat.toFixed(3)}°<br>` +
      `${sourceLabel} ${rowLabel}: ${d[column].toFixed(4)} m`
    ),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 7,
      color: points.map(d => d[column]),
      cmin: FIGS3_CLIM[0],
      cmax: FIGS3_CLIM[1],
      colorscale: FIGS3_PALETTE,
      line: { color: 'rgb(128,128,128)', width: 0.6 },
      showscale: showColorbar,
      colorbar: showColorbar ? {
        title: { text: `${rowLabel} [m]`, side: 'right' },
        x: 0.95,
        xanchor: 'left',
        y: 0.5,
        yanchor: 'middle',
        len: 0.9,
        thickness: 18,
        tickmode: 'array',
        tickvals: FIGS3_TICKS,
        ticktext: FIGS3_TICKS.map(v => v.toFixed(1)),
        tickfont: { size: 12 }
      } : undefined
    }
  };

  const label = {
    type: 'scattergeo',
    mode: 'text',
    geo: geoId,
    showlegend: false,
    hoverinfo: 'skip',
    lon: [FIGS3_TXT_LON],
    lat: [FIGS3_TXT_LAT],
    text: [sourceLabel],
    textfont: { size: 14, color: '#000' }
  };

  return { traces: [markers, label], n: points.length };
}

function renderFigureS3() {
  const rowKey = document.getElementById('figs3-select').value;
  const cfg = FIGS3_ROWS[rowKey];

  // la barra de color la declara solo el mapa de GOS, igual que en el script,
  // donde el colorbar cuelga del panel de la columna derecha
  const tg = buildFigS3Traces(FIGS3_DATA, cfg.cols.tg, 'TG', cfg.label,
    'geo', false);
  const gos = buildFigS3Traces(FIGS3_DATA, cfg.cols.gos, 'GOS', cfg.label,
    'geo2', true);

  const geoBase = getBaseGeoLayout();

  // Sin las letras (a) y (b) de la figura del paper: aqui cada mapa ya se
  // identifica con el rotulo TG / GOS de dentro, y la letra no senala nada.
  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 10 },
    paper_bgcolor: '#ffffff',
    showlegend: false,
    geo: Object.assign({}, geoBase, {
      domain: { x: FIGS3_DOMAINS.tg, y: [0, 1] }
    }),
    geo2: Object.assign({}, geoBase, {
      domain: { x: FIGS3_DOMAINS.gos, y: [0, 1] }
    })
  };

  Plotly.react('figs3-map', tg.traces.concat(gos.traces), layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  document.getElementById('figs3-stats').innerHTML = `
    <span class="pill">${cfg.label}</span>
  `;
}

function initFigureS3() {
  const selector = document.getElementById('figs3-select');

  selector.addEventListener('change', renderFigureS3);

  renderFigureS3();
}

// =============================
// Figure S4 configuration
// =============================
// Diferencia porcentual del nivel de retorno de 50 anios entre mareografos y
// GOS. Equivale a codigos_GEV_ESTACIONARIO/figS3_dif_retorno50_GOSvsTG.m
// Datos: fig_s4.csv + fig_s4_palette.csv
//
// OJO al signo: dif_prct = 100*(Z_tg - Z_gos)/Z_tg, positivo donde el
// mareografo es mayor, es decir donde GOS subestima.

const FIGS4_CLIM = [-30, 90];
const FIGS4_TICKS = [-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

let FIGS4_DATA = [];
let FIGS4_PALETTE = null;

function parseFigS4Rows(rows) {
  return rows.map(r => ({
    station: (r.station ?? '').trim(),
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    dif_prct: parseNumber(r.dif_prct),
    z50_tg: parseNumber(r.z50_tg),
    z50_gos: parseNumber(r.z50_gos)
  })).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.dif_prct)
  );
}

function buildFigS4Hover(d) {
  const crudos = (Number.isFinite(d.z50_tg) && Number.isFinite(d.z50_gos))
    ? `Z<sub>50</sub> TG: ${d.z50_tg.toFixed(3)} m<br>` +
      `Z<sub>50</sub> GOS: ${d.z50_gos.toFixed(3)} m<br>`
    : '';

  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    crudos +
    `TG - GOS: ${d.dif_prct.toFixed(2)} %`
  );
}

function plotFigS4Map(data) {
  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFigS4Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 9,
      color: data.map(d => d.dif_prct),
      cmin: FIGS4_CLIM[0],
      cmax: FIGS4_CLIM[1],
      colorscale: FIGS4_PALETTE,
      line: { color: 'rgb(128,128,128)', width: 0.8 },
      colorbar: {
        title: 'TG - GOS relative difference [%]',
        orientation: 'h',
        x: 0.5,
        y: -0.08,
        xanchor: 'center',
        len: 0.75,
        thickness: 18,
        tickmode: 'array',
        tickvals: FIGS4_TICKS,
        ticktext: FIGS4_TICKS.map(String),
        tickfont: { size: 13 }
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('figs4-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFigS4Stats(data);
}

function updateFigS4Stats(data) {
  const values = data.map(d => d.dif_prct);
  const n = values.length;
  const mean = values.reduce((s, v) => s + v, 0) / n;
  // positivo = el mareografo da mas que GOS, o sea GOS subestima
  const pctUnder = (values.filter(v => v > 0).length / n) * 100;

  document.getElementById('figs4-stats').innerHTML = `
    <span class="pill">N = ${n} stations</span>
    <span class="pill">mean = ${mean.toFixed(2)} %</span>
  `;
}

// =============================
// Load files
// =============================
// Figure S3
Promise.all([
  fetch('data/fig_s3.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s3.csv');
    return response.text();
  }),
  fetch('data/fig_s3_palette.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s3_palette.csv');
    return response.text();
  })
])
  .then(([textData, textPalette]) => {
    hideError('figs3-error');

    FIGS3_PALETTE = paletteFromRows(parseCSV(textPalette), 'fig_s3_palette.csv');
    FIGS3_DATA = parseFigS3Rows(parseCSV(textData));

    if (!FIGS3_DATA.length) {
      throw new Error('fig_s3.csv has no valid rows.');
    }

    initFigureS3();
  })
  .catch(err => {
    showError('figs3-error', err.message);
  });
// Figure S4
Promise.all([
  fetch('data/fig_s4.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s4.csv');
    return response.text();
  }),
  fetch('data/fig_s4_palette.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_s4_palette.csv');
    return response.text();
  })
])
  .then(([textData, textPalette]) => {
    hideError('figs4-error');

    FIGS4_PALETTE = paletteFromRows(parseCSV(textPalette), 'fig_s4_palette.csv');
    FIGS4_DATA = parseFigS4Rows(parseCSV(textData));

    if (!FIGS4_DATA.length) {
      throw new Error('fig_s4.csv has no valid rows.');
    }

    plotFigS4Map(FIGS4_DATA);
  })
  .catch(err => {
    showError('figs4-error', err.message);
  });
