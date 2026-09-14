// Utilidades compartidas (rgb01ToPlotlyScale, parseCSV, parseNumber,
// showError, hideError) -> movidas a js/common.js

// =============================
// Palettes
// =============================

// Figure 6 palettes
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

// flip(hot(30)) y luego pal_rmse(2:end,:): el primer color (blanco puro) se
// descarta, por eso esta comentado y quedan 29 en vez de 30.
const rmsePalette = rgb01ToPlotlyScale([
  /* [1.0000,1.0000,1.0000], */ [1.0000,1.0000,0.8750],[1.0000,1.0000,0.7500],[1.0000,1.0000,0.6250],
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

// boonlib('rbmap',30): la usan los dos paneles de sesgo de la Figura 6,
// el (b) bias [cm] y el (e) Nbias. Antes cada uno llevaba una paleta
// distinta y ninguna era esta.
const fig6RbPalette = rgb01ToPlotlyScale([
  [0.0000,0.0000,0.5000],[0.0000,0.0000,0.5862],[0.0000,0.0000,0.6724],[0.0000,0.0000,0.7586],
  [0.0000,0.0000,0.8448],[0.0000,0.0000,0.9310],[0.0230,0.0230,1.0000],[0.1379,0.1379,1.0000],
  [0.2529,0.2529,1.0000],[0.3678,0.3678,1.0000],[0.4828,0.4828,1.0000],[0.5977,0.5977,1.0000],
  [0.7126,0.7126,1.0000],[0.8276,0.8276,1.0000],[0.9425,0.9425,1.0000],[1.0000,0.9425,0.9425],
  [1.0000,0.8276,0.8276],[1.0000,0.7126,0.7126],[1.0000,0.5977,0.5977],[1.0000,0.4828,0.4828],
  [1.0000,0.3678,0.3678],[1.0000,0.2529,0.2529],[1.0000,0.1379,0.1379],[1.0000,0.0230,0.0230],
  [0.9310,0.0000,0.0000],[0.8448,0.0000,0.0000],[0.7586,0.0000,0.0000],[0.6724,0.0000,0.0000],
  [0.5862,0.0000,0.0000],[0.5000,0.0000,0.0000]
]);

// Paletas de la antigua "Figure 6" (difPearson / difRmse / nbiasUnfiltered)
// -> movidas a js/supplementary.js (Supplementary Figure 1)

// getBaseGeoLayout() -> movida a js/common.js
// =============================
// Figure 4 configuration
// =============================
// Panel de 3 estaciones con solo datos GOS. Equivale a
// codigos_GEV_ESTACIONARIO/fig4_panel_GOS_3estaciones.m
// Datos: fig_4_mm.csv, fig_4_rl.csv, fig_4_panels.csv

const FIG4_MONTH_LABELS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

// Posicion de los ticks del eje X: (0.5:1:12)/12, igual que ax.XTick en MATLAB
const FIG4_MONTH_TICKS = FIG4_MONTH_LABELS.map((_, i) => (i + 0.5) / 12);

// Colores tomados del script MATLAB
const FIG4_COL_MM = 'rgb(128,128,128)';   // col_mm  = [0.5 0.5 0.5]
const FIG4_COL_MON = 'rgb(255,0,0)';      // col_mon = 'r'
const FIG4_COL_INT = 'rgb(0,0,255)';      // col_int = 'b'

// Z con macron combinante (U+0305), equivalente al \overline{Z_{50}} del paper
const FIG4_LBL_MON = 'Z̅<sub>50</sub>(t)';
const FIG4_LBL_INT = 'Z̅<sub>50</sub>';

let FIG4_MM = {};       // panel -> [{ date, t, value }]
let FIG4_RL = {};       // panel -> [{ t, z50 }]
let FIG4_PANELS = {};   // panel -> { station, z50_int }

function buildFig4MmHover(d) {
  return (
    `<b>MM-GOS</b><br>` +
    `${d.date}<br>` +
    `Surge: ${d.value.toFixed(3)} m`
  );
}

// Los tres paneles se dibujan a la vez, uno al lado del otro, igual que el
// tiledlayout(1,3) del script MATLAB. Antes habia un selector que mostraba
// solo un panel cada vez (funcion plotFig4(panelKey)).
const FIG4_PANEL_KEYS = ['4a', '4b', '4c'];
const FIG4_PANEL_LETTERS = ['(a)', '(b)', '(c)'];

// separacion horizontal entre paneles, en fraccion del ancho total
const FIG4_PANEL_GAP = 0.06;

const FIG4_AXIS_COMMON = {
  showgrid: true,
  gridcolor: 'rgba(120,120,120,0.25)',
  zeroline: false,
  showline: true,
  mirror: true,
  linecolor: '#444'
};

function plotFig4All() {
  const n = FIG4_PANEL_KEYS.length;
  const width = (1 - FIG4_PANEL_GAP * (n - 1)) / n;

  const traces = [];
  const annotations = [];

  const layout = {
    margin: { l: 62, r: 24, t: 44, b: 84 },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    hovermode: 'closest',
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0.5,
      xanchor: 'center',
      y: -0.16,
      yanchor: 'top'
    },
    annotations: annotations
  };

  FIG4_PANEL_KEYS.forEach((panelKey, i) => {
    // Plotly nombra los ejes xaxis, xaxis2, xaxis3 y las trazas x, x2, x3
    const sfx = i === 0 ? '' : String(i + 1);
    const mm = FIG4_MM[panelKey] ?? [];
    const rl = FIG4_RL[panelKey] ?? [];
    const meta = FIG4_PANELS[panelKey] ?? {};
    const x0 = i * (width + FIG4_PANEL_GAP);

    layout['xaxis' + sfx] = Object.assign({}, FIG4_AXIS_COMMON, {
      domain: [x0, x0 + width],
      anchor: 'y' + sfx,
      range: [0, 1],
      tickmode: 'array',
      tickvals: FIG4_MONTH_TICKS,
      ticktext: FIG4_MONTH_LABELS
    });

    // cada panel conserva su propia escala vertical, como en MATLAB
    layout['yaxis' + sfx] = Object.assign({}, FIG4_AXIS_COMMON, {
      anchor: 'x' + sfx,
      title: i === 0 ? '[m]' : ''
    });

    // titulo de cada panel: letra + nombre de la estacion
    annotations.push({
      text: `${FIG4_PANEL_LETTERS[i]} ${meta.station ?? ''}`.trim(),
      x: x0 + width / 2,
      xref: 'paper',
      xanchor: 'center',
      y: 1.04,
      yref: 'paper',
      yanchor: 'bottom',
      showarrow: false,
      font: { size: 15 }
    });

    // la leyenda es unica para los tres paneles: solo la declara el primero
    const showLegend = i === 0;

    traces.push({
      // maximos mensuales: cuadrados grises con borde negro
      type: 'scatter',
      mode: 'markers',
      name: 'MM-GOS',
      legendgroup: 'mm',
      showlegend: showLegend,
      xaxis: 'x' + sfx,
      yaxis: 'y' + sfx,
      x: mm.map(d => d.t),
      y: mm.map(d => d.value),
      text: mm.map(buildFig4MmHover),
      hovertemplate: '%{text}<extra></extra>',
      marker: {
        symbol: 'square',
        size: 6,
        color: FIG4_COL_MM,
        line: { color: 'black', width: 1 }
      }
    });

    traces.push({
      // nivel de retorno de 50 anios, mes a mes
      type: 'scatter',
      mode: 'lines',
      name: FIG4_LBL_MON,
      legendgroup: 'z50t',
      showlegend: showLegend,
      xaxis: 'x' + sfx,
      yaxis: 'y' + sfx,
      x: rl.map(d => d.t),
      y: rl.map(d => d.z50),
      line: { color: FIG4_COL_MON, width: 2, dash: 'dot' },
      hovertemplate: 'Z50(t) = %{y:.3f} m<extra></extra>'
    });

    traces.push({
      // nivel de retorno de 50 anios integrado en el anio (linea horizontal)
      type: 'scatter',
      mode: 'lines',
      name: FIG4_LBL_INT,
      legendgroup: 'z50',
      showlegend: showLegend,
      xaxis: 'x' + sfx,
      yaxis: 'y' + sfx,
      x: [0, 1],
      y: [meta.z50_int, meta.z50_int],
      line: { color: FIG4_COL_INT, width: 2, dash: 'dashdot' },
      hovertemplate: 'Z50 = %{y:.3f} m<extra></extra>'
    });
  });

  Plotly.react('fig4-plot', traces, layout, {
    responsive: true,
    displaylogo: false
  });

  updateFig4Stats();
}

function updateFig4Stats() {
  const pills = FIG4_PANEL_KEYS.map((panelKey, i) => {
    const meta = FIG4_PANELS[panelKey] ?? {};
    const station = meta.station ?? '—';
    const z50 = Number.isFinite(meta.z50_int) ? meta.z50_int.toFixed(3) : '—';

    return `<span class="pill">${FIG4_PANEL_LETTERS[i]} ${station} &middot; ` +
           `Z&#773;<sub>50</sub> = ${z50} m</span>`;
  });

  const totalMm = FIG4_PANEL_KEYS.reduce(
    (acc, panelKey) => acc + (FIG4_MM[panelKey] ?? []).length, 0);


  document.getElementById('fig4-stats').innerHTML = pills.join('\n');
}

function parseFig4MmRows(rows) {
  const out = {};

  rows.forEach(r => {
    const panel = (r.panel ?? '').trim();
    const d = {
      date: (r.date ?? '').trim(),
      t: parseNumber(r.t),
      value: parseNumber(r.value)
    };

    if (!panel || !Number.isFinite(d.t) || !Number.isFinite(d.value)) return;

    (out[panel] = out[panel] ?? []).push(d);
  });

  return out;
}

function parseFig4RlRows(rows) {
  const out = {};

  rows.forEach(r => {
    const panel = (r.panel ?? '').trim();
    const d = {
      t: parseNumber(r.t),
      z50: parseNumber(r.z50)
    };

    if (!panel || !Number.isFinite(d.t) || !Number.isFinite(d.z50)) return;

    (out[panel] = out[panel] ?? []).push(d);
  });

  // la curva se dibuja como linea: hay que recorrerla en orden de t
  Object.values(out).forEach(series => series.sort((a, b) => a.t - b.t));

  return out;
}

function parseFig4PanelRows(rows) {
  const out = {};

  rows.forEach(r => {
    const panel = (r.panel ?? '').trim();
    if (!panel) return;

    out[panel] = {
      station: (r.station ?? '').trim(),
      z50_int: parseNumber(r.z50_int)
    };
  });

  return out;
}

// Ya no hay selector: los tres paneles se ven a la vez.
// function renderFigure4() {
//   const selector = document.getElementById('fig4-select');
//   plotFig4(selector.value);
// }
//
// function initFigure4Selector() {
//   const selector = document.getElementById('fig4-select');
//   selector.addEventListener('change', renderFigure4);
//   renderFigure4();
// }

function initFigure4() {
  plotFig4All();
}
// =============================
// Figure 5 configuration
// =============================

const fig5PeriodPalette = rgb01ToPlotlyScale([
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

const FIG5_METRICS = {
  Period: {
    label: 'Period',
    // unidades en una linea y con exponente negativo, nunca con '/':
    //   unit: 'h',   -> no reflejaba el denominador (ciclo)
    unit: 'h c<sup>-1</sup>',
    cmin: 6,
    cmax: 26,
    decimals: 2,
    colorscale: fig5PeriodPalette
  }
};

// Panel (a): puntos de malla costeros (antes panel 4b, data/fig_5a.csv).
let FIG5A_DATA = [];
// Panel (b) pasa a ser una imagen estatica, ya no se dibuja con Plotly.
// Los datos siguen en data/fig_5b.csv por si se quiere volver al mapa interactivo.
// let FIG5B_DATA = [];

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

function buildFig5Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Period: ${d.Period.toFixed(4)} h c<sup>-1</sup><br>`
  );
}

function plotFig5Map(data, minSize, maxSize) {
  const cfg = FIG5_METRICS.Period;
  const amplitudes = data.map(d => d.Amplit);
  const markerSizes = normalisedMarkerSizes(amplitudes, minSize, maxSize);
  const periods = data.map(d => d.Period);

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig5Hover),
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

  Plotly.react('fig5-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig5Stats(data);
}

function updateFig5Stats(data) {
  const periods = data.map(d => d.Period).filter(Number.isFinite);
  const amplitudes = data.map(d => d.Amplit).filter(Number.isFinite);

  const n = data.length;
  const pmin = Math.min(...periods);
  const pmax = Math.max(...periods);
  const amin = Math.min(...amplitudes);
  const amax = Math.max(...amplitudes);

  document.getElementById('fig5-stats').innerHTML = `
    <span class="pill">N = ${n} points </span>
    <span class="pill">Period range = [6, >26] h c<sup>-1</sup></span>
    <span class="pill">Standardized amplitude = 1–10</span>
  `;
}
 
function parseFig5Rows(rows, hasStationNames) {
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

function renderFigure5() {
  const selector = document.getElementById('fig5-select');

  // Antes ambos paneles eran mapas interactivos:
  // if (selector.value === '3a') {
  //   plotFig5Map(FIG5A_DATA, 4, 18);
  // } else {
  //   plotFig5Map(FIG5B_DATA, 2, 10);
  // }

  // Ahora el panel (a) es el mapa de puntos costeros y el (b) una imagen.
  const mapPanel = document.getElementById('fig5a-panel');
  const imgPanel = document.getElementById('fig5b-panel');

  if (selector.value === '5a') {
    mapPanel.classList.remove('hidden');
    imgPanel.classList.add('hidden');
    plotFig5Map(FIG5A_DATA, 2, 10);
  } else {
    mapPanel.classList.add('hidden');
    imgPanel.classList.remove('hidden');
  }
}

function initFigure5Selector() {
  const selector = document.getElementById('fig5-select');

  selector.addEventListener('change', renderFigure5);

  renderFigure5();
}
// =============================
// Figure 6 configuration
// =============================

const FIG6_METRICS = {
  // (a) correlacion. La barra iba de -0.2 a 1; ahora va de 0 a 1:
  //   cmin: -0.2,
  Corr: {
    label: 'Pearson',
    unit: '',
    cmin: 0,
    cmax: 1,
    decimals: 3,
    colorscale: corrPalette
  },
  // (b) bias. Antes llevaba una escala RdYlBu puesta a mano; ahora usa la
  // misma rbmap(30) que el script MATLAB:
  //   colorscale: [[0.00,'rgb(49,54,149)'], ... [1.00,'rgb(165,0,38)']]
  Bias: {
    label: 'bias',
    unit: 'cm',
    cmin: -2,
    cmax: 2,
    decimals: 2,
    colorscale: fig6RbPalette
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
    label: 'NRMSE<sub>prct</sub>',
    unit: '%',
    cmin: 0,
    cmax: 24,
    decimals: 2,
    colorscale: nrmsePalette
  },
  // (e) bias normalizado. Llevaba una copia de la hsv del panel (d); en
  // MATLAB comparte la rbmap(30) con el panel (b).
  NBias: {
    label: 'Nbias',
    unit: '',
    cmin: -5,
    cmax: 5,
    decimals: 2,
    colorscale: fig6RbPalette
  }
};

// FIGS1_METRICS -> movida a js/supplementary.js

// updateStats() y plotStationMap() -> movidas a js/common.js

// =============================
// Figure 6
// =============================

let FIG6_DATA = [];

function buildFig6Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `r: ${d.Corr.toFixed(3)}<br>` +
    `bias: ${d.Bias.toFixed(2)} cm<br>` +
    `RMSE: ${d.RMSE.toFixed(2)} cm<br>` +
    `NRMSE<sub>prct</sub>: ${d.NRMSE_prct.toFixed(2)} %<br>` +
    `Nbias: ${d.NBias.toFixed(2)}`
  );
}

// Reproduce, para la variable seleccionada, la linea que le corresponde en el
// cuadro de resumen de la figura del paper (seccion "ESTADISTICOS QUE VAN AL
// CUADRO DE RESUMEN" de fig6_validacion_paneles.m). Alli las seis lineas van
// juntas en un recuadro porque se ven los cinco mapas a la vez; aqui solo se
// ve un mapa cada vez, asi que se muestran las de esa variable.
function updateFig6Stats(statsId, data, metricName, metricConfig) {
  const values = data.map(d => d[metricName]).filter(Number.isFinite);
  const n = values.length;
  const mean = arr => arr.reduce((s, v) => s + v, 0) / arr.length;
  const unit = metricConfig.unit ? ' ' + metricConfig.unit : '';

  // porcentaje de estaciones con valor positivo y con valor negativo
  const pctPos = (values.filter(v => v > 0).length / n) * 100;
  const pctNeg = (values.filter(v => v < 0).length / n) * 100;

  const pills = [`<span class="pill">N = ${n} stations</span>`];

  if (metricName === 'Corr') {
    pills.push(`<span class="pill">r&#773; = ${mean(values).toFixed(2)}</span>`);
  } else if (metricName === 'Bias' || metricName === 'NBias') {
    const absMean = mean(values.map(Math.abs)).toFixed(2);
    const name = metricName === 'Bias' ? 'bias' : 'Nbias';

    pills.push(`<span class="pill">mean |${name}| = ${absMean}${unit}</span>`);
    pills.push(`<span class="pill">p&#8314; = ${pctPos.toFixed(0)}%</span>`);
    pills.push(`<span class="pill">p&#8315; = ${pctNeg.toFixed(0)}%</span>`);
  } else if (metricName === 'RMSE') {
    pills.push(`<span class="pill">mean RMSE = ${mean(values).toFixed(2)}${unit}</span>`);
  } else if (metricName === 'NRMSE_prct') {
    pills.push(`<span class="pill">mean NRMSE<sub>prct</sub> = ${mean(values).toFixed(2)}${unit}</span>`);
    pills.push(`<span class="pill">max NRMSE<sub>prct</sub> = ${Math.max(...values).toFixed(2)}${unit}</span>`);
  }

  pills.push(
    `<span class="pill">colour range = [${metricConfig.cmin}, ${metricConfig.cmax}]${unit}</span>`
  );

  document.getElementById(statsId).innerHTML = pills.join('\n');
}

function initFigure6(rows) {
  FIG6_DATA = rows.map(r => ({
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

  if (!FIG6_DATA.length) {
    throw new Error('fig_6.csv has no valid rows.');
  }

  const selector = document.getElementById('fig6-select');

  function render() {
    const metric = selector.value;
    plotStationMap({
      plotId: 'fig6-map',
      statsId: 'fig6-stats',
      data: FIG6_DATA,
      metricName: metric,
      metricConfig: FIG6_METRICS[metric],
      hoverBuilder: buildFig6Hover,
      statsUpdater: updateFig6Stats
    });
  }

  selector.addEventListener('change', render);
  render();
}

// Codigo de la antigua "Figure 6" -> movido a js/supplementary.js
// (Supplementary Figure 1)
// =============================
// Figure 7 configuration
// =============================

const fig7MomPalette = rgb01ToPlotlyScale([
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

const fig7MaePalette = rgb01ToPlotlyScale([
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

const FIG7_METRICS = {
  MOM: {
    label: 'MOM',
    unit: 'm',
    cmin: 0,
    cmax: 3,
    decimals: 2,
    colorscale: fig7MomPalette
  },
  MAE: {
    label: 'MAE',
    unit: 'cm',
    cmin: -14,
    cmax: 53,
    decimals: 2,
    colorscale: fig7MaePalette
  }
};

let FIG7A_DATA = [];
let FIG7B_DATA = [];

function buildFig7aHover(d) {
  return (
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `MOM: ${d.MOM.toFixed(2)} m`
  );
}

function buildFig7bHover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `MAE: ${d.MAE.toFixed(2)} cm`
  );
}

function getFig7Colorbar(metricName, cfg) {
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

function plotFig7Map({ data, metricName, hoverBuilder, pointSize, lineWidth }) {
  const cfg = FIG7_METRICS[metricName];

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
      colorbar: getFig7Colorbar(metricName, cfg)
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

  updateFig7Stats(metricName, data);
}

function updateFig7Stats(metricName, data) {
  const n = data.length;

  if (metricName === 'MOM') {
    document.getElementById('fig7-stats').innerHTML = `
      <span class="pill">N = ${n} coastal points</span>
      <span class="pill">MOM range = [0, >3] m</span>
    `;
    return;
  }

  document.getElementById('fig7-stats').innerHTML = `
    <span class="pill">N = ${n} stations</span>
    <span class="pill">MAE range = [-14, 53] cm</span>
  `;
}

function parseFig7aRows(rows) {
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

function parseFig7bRows(rows) {
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

function renderFigure7() {
  const selector = document.getElementById('fig7-select');

  if (selector.value === '7a') {
    plotFig7Map({
      data: FIG7A_DATA,
      metricName: 'MOM',
      hoverBuilder: buildFig7aHover,
      pointSize: 3,
      lineWidth: 0
    });
  } else {
    plotFig7Map({
      data: FIG7B_DATA,
      metricName: 'MAE',
      hoverBuilder: buildFig7bHover,
      pointSize: 8,
      lineWidth: 0.5
    });
  }
}

function initFigure7Selector() {
  const selector = document.getElementById('fig7-select');

  selector.addEventListener('change', renderFigure7);

  renderFigure7();
}
// =============================
// Figure 8 configuration
// =============================
// Parametro de forma phi0 de la GEV en los puntos costeros. Equivale a
// codigos_GEV_ESTACIONARIO/fig8_parametro_forma_phi0.m
// Datos: fig_8.csv

// boonlib('bjetmap',30): interpolacion lineal de los 7 puntos de control
// de bjetmap() sobre 30 niveles, tal como hace fleximap() en boonlib.m
const fig8BjetPalette = rgb01ToPlotlyScale([
  [0.0000,0.0000,0.5000],[0.0000,0.0265,0.6326],[0.0000,0.0531,0.7653],[0.0000,0.0796,0.8979],
  [0.0000,0.1297,1.0000],[0.0000,0.2591,1.0000],[0.0000,0.3884,1.0000],[0.0000,0.5177,1.0000],
  [0.0000,0.6470,1.0000],[0.0000,0.7763,1.0000],[0.0000,0.9056,1.0000],[0.0716,1.0000,1.0000],
  [0.3369,1.0000,1.0000],[0.6021,1.0000,1.0000],[0.8674,1.0000,1.0000],[1.0000,1.0000,0.7537],
  [1.0000,1.0000,0.2611],[1.0000,0.9477,0.0000],[1.0000,0.8365,0.0000],[1.0000,0.7253,0.0000],
  [1.0000,0.6140,0.0000],[1.0000,0.5028,0.0000],[1.0000,0.3915,0.0000],[1.0000,0.2803,0.0000],
  [1.0000,0.1691,0.0000],[1.0000,0.0578,0.0000],[0.9310,0.0000,0.0000],[0.7874,0.0000,0.0000],
  [0.6437,0.0000,0.0000],[0.5000,0.0000,0.0000]
]);

const FIG8_METRICS = {
  phi0: {
    // phi0 es el parametro de FORMA de la GEV: es adimensional, no va en metros
    label: 'φ<sub>0</sub>',
    unit: '',
    cmin: -0.31,
    cmax: 0.31,
    decimals: 4,
    colorscale: fig8BjetPalette
  }
};

let FIG8_DATA = [];

function buildFig8Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `φ<sub>0</sub>: ${d.phi0.toFixed(4)}`
  );
}

function plotFig8Map(data) {
  const cfg = FIG8_METRICS.phi0;

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig8Hover),
    hovertemplate: '%{text}<extra></extra>',
    marker: {
      size: 3,
      color: data.map(d => d.phi0),
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
        len: 0.75,
        thickness: 18,
        tickmode: 'array',
        tickvals: [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3],
        ticktext: ['-0.3', '-0.2', '-0.1', '0', '0.1', '0.2', '0.3'],
        tickfont: { size: 13 }
      }
    }
  };

  const layout = {
    margin: { l: 10, r: 10, t: 10, b: 70 },
    paper_bgcolor: '#ffffff',
    geo: getBaseGeoLayout()
  };

  Plotly.react('fig8-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig8Stats(data);
}

function updateFig8Stats(data) {
  const values = data.map(d => d.phi0).filter(Number.isFinite);
  const n = data.length;
  const vmin = Math.min(...values);
  const vmax = Math.max(...values);

  document.getElementById('fig8-stats').innerHTML = `
    <span class="pill">N = ${n} coastal points</span>
    <span class="pill">min = ${vmin.toFixed(4)}</span>
    <span class="pill">max = ${vmax.toFixed(4)}</span>
    <span class="pill">colour range = [-0.31, 0.31]</span>
  `;
}

function parseFig8Rows(rows) {
  return rows.map((r, i) => ({
    station: `Coastal point ${i + 1}`,
    lon: parseNumber(r.lon),
    lat: parseNumber(r.lat),
    phi0: parseNumber(r.phi0)
  })).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat) &&
    Number.isFinite(d.phi0)
  );
}
// =============================
// Figure 9 configuration
// =============================

const fig9RpPalette = rgb01ToPlotlyScale([
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

const fig9MonthPalette = rgb01ToPlotlyScale([
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

const FIG9_METRICS = {
  RP50: {
    label: 'RP-50yr',
    unit: 'm',
    cmin: 0,
    cmax: 4.5,
    decimals: 2,
    colorscale: fig9RpPalette
  },
  Month: {
    label: 'Month',
    unit: '',
    cmin: 1,
    cmax: 12,
    decimals: 0,
    colorscale: fig9MonthPalette
  }
};

let FIG9A_DATA = [];
let FIG9B_DATA = [];

const FIG9_MONTH_NAMES = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

function buildFig9aHover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `RP-50yr: ${d.RP50.toFixed(2)} m`
  );
}

function buildFig9bHover(d) {
  const monthName = FIG9_MONTH_NAMES[d.time - 1] ?? `${d.time}`;
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Month: ${d.time} (${monthName})<br>` +
    `Amplitude: ${d.Ampl.toFixed(2)} m`
  );
}

function plotFig9aMap(data) {
  const cfg = FIG9_METRICS.RP50;

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig9aHover),
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

  Plotly.react('fig9-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig9Stats('9a', data);
}

function plotFig9bMap(data) {
  const cfg = FIG9_METRICS.Month;
  const markerSizes = normalisedMarkerSizes(data.map(d => d.Ampl), 1.5, 12);

  const trace = {
    type: 'scattergeo',
    mode: 'markers',
    lon: data.map(d => d.lon),
    lat: data.map(d => d.lat),
    text: data.map(buildFig9bHover),
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

  Plotly.react('fig9-map', [trace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig9Stats('9b', data);
}

function updateFig9Stats(panel, data) {
  if (panel === '9a') {
    const n = data.length;
    document.getElementById('fig9-stats').innerHTML = `
      <span class="pill">N = ${n} coastal points</span>
      <span class="pill">RP-50yr range = [0, 4.2] m</span>
    `;
    return;
  }

  const n = data.length;
  const amps = data.map(d => d.Ampl).filter(Number.isFinite);
  const amin = Math.min(...amps);
  const amax = Math.max(...amps);

  document.getElementById('fig9-stats').innerHTML = `
    <span class="pill">N = ${n} coastal points</span>
    <span class="pill">Month colours = 1–12</span>
    <span class="pill">Amplitude (size) = ${amin.toFixed(2)}–${amax.toFixed(2)} m</span>
  `;
}

function parseFig9aRows(rows) {
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

function parseFig9bRows(rows) {
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

function renderFigure9() {
  const selector = document.getElementById('fig9-select');

  if (selector.value === '9a') {
    plotFig9aMap(FIG9A_DATA);
  } else {
    plotFig9bMap(FIG9B_DATA);
  }
}

function initFigure9Selector() {
  const selector = document.getElementById('fig9-select');

  selector.addEventListener('change', renderFigure9);

  renderFigure9();
}
// =============================
// Figure 2 configuration
// =============================

let FIG2A_POINTS = [];
let FIG2B_SERIES = [];
let FIG2B_NPOINTS = 0;

// Definicion de los bins del histograma. Antes estaba fijada a mano
// (13.1606 min) y se quedo desfasada cuando cambio 'edges' en MATLAB:
//   const FIG2_BIN_WIDTH = 13.1606 / 60.0; // hr/c
// Ahora se lee de data/fig_2b_bins.csv, que exporta el propio script que
// dibuja la figura, asi que no puede volver a desincronizarse.
// El origen NO es 0: MATLAB arranca los bins en min(h(:)).
let FIG2_BIN_START = 0;      // h   -> edges(1)
let FIG2_BIN_WIDTH = 0;      // h   -> edges(2) - edges(1)

const FIG2B_HIST_RGB = [
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

const FIG2B_HIST_COLOURS = FIG2B_HIST_RGB.map(([r, g, b]) =>
  `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`
);

function buildFig2Hover(d) {
  return (
    `<b>${d.station}</b><br>` +
    `Lon: ${d.lon.toFixed(3)}°<br>` +
    `Lat: ${d.lat.toFixed(3)}°<br>` +
    `Type: ${d.type}`
  );
}

function parseFig2aRows(rows) {
  const nTotal = rows.length;
  const nStations = 216;
  const firstStationIndex = nTotal - nStations;

  return rows.map((r, i) => {
    const isStation = i >= firstStationIndex;

    return {
      station: r.station || (isStation ? `Station ${i - firstStationIndex + 1}` : `Point ${i + 1}`),
      lon: parseNumber(r.lon),
      lat: parseNumber(r.lat),
      // mismo criterio que la leyenda del mapa: no son puntos costeros
      type: isStation ? 'Validation station' : 'Point c/8º',
      isStation: isStation
    };
  }).filter(d =>
    Number.isFinite(d.lon) &&
    Number.isFinite(d.lat)
  );
}

function plotFig2aMap(data) {
  const coastalPoints = data.filter(d => !d.isStation);
  const stationPoints = data.filter(d => d.isStation);

  const coastalTrace = {
    type: 'scattergeo',
    mode: 'markers',
    // no son puntos costeros, sino la malla global espaciada cada 8 grados
    name: 'Points c/8º',
    lon: coastalPoints.map(d => d.lon),
    lat: coastalPoints.map(d => d.lat),
    text: coastalPoints.map(buildFig2Hover),
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
    text: stationPoints.map(buildFig2Hover),
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

  Plotly.react('fig2-map', [coastalTrace, stationTrace], layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig2Stats(coastalPoints.length, stationPoints.length);
}

function updateFig2Stats(nCoastal, nStations) {
  // Los desgloses por tipo se quitan: esa informacion ya la da la leyenda
  // que va debajo del mapa.
  //  <span class="pill">Coastal points = ${nCoastal}</span>
  //  <span class="pill">Stations = ${nStations}</span>
  document.getElementById('fig2-stats').innerHTML = `
    <span class="pill">N = ${nCoastal + nStations} points</span>
  `;
}

// Lee data/fig_2b_bins.csv, que trae una sola fila con la definicion de
// 'edges' tal como la calcula el script MATLAB de la figura. Sin esto el
// histograma de la web no coincide con el panel (b) del paper.
function applyFig2BinDefinition(rows) {
  const row = rows[0];

  if (!row) {
    throw new Error('fig_2b_bins.csv has no rows.');
  }

  const start = parseNumber(row.edge_min);
  const width = parseNumber(row.bin_width_h);

  if (!Number.isFinite(start) || !Number.isFinite(width) || width <= 0) {
    throw new Error('fig_2b_bins.csv: edge_min / bin_width_h are not valid numbers.');
  }

  FIG2_BIN_START = start;
  FIG2_BIN_WIDTH = width;
}

function parseFig2bRows(rows) {
  FIG2B_NPOINTS = rows.length;

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

function plotFig2bHistogram(series) {
  const traces = series.map((values, idx) => ({
    type: 'histogram',
    name: `peak_${idx + 1}`,
    x: values,
    opacity: 0.30,
    marker: {
      color: FIG2B_HIST_COLOURS[idx]
    },
    xbins: {
      // mismo origen y mismo ancho que el 'edges' de MATLAB, para que las
      // barras caigan exactamente donde el panel (b) de la figura del paper
      start: FIG2_BIN_START,
      size: FIG2_BIN_WIDTH
    },
    hovertemplate:
      `<b>peak_${idx + 1}</b><br>` +
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
    // '^-^1' es sintaxis TeX de MATLAB y Plotly la imprime tal cual;
    // aqui el exponente se marca con <sup>:
    //   text: 'Period [hr c^-^1]',
    text: 'Period [h c<sup>-1</sup>]',
    font: { size: 18 }
  },
  range: [5, 25],
  tickfont: { size: 14 },
  tickformat: '.1f'
  },
  yaxis: {
    title: {
      text: 'Occurrence',
      font: { size: 22 }
    },
    tickfont: { size: 16 }
  }
};
  

  Plotly.react('fig2b-hist', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  updateFig2bStats(series);
}

function updateFig2bStats(series) {
  const totalValues = series.reduce((acc, arr) => acc + arr.length, 0);

  document.getElementById('fig2b-stats').innerHTML = `
    <span class="pill">N = ${FIG2B_NPOINTS} points</span>
    <span class="pill">Top periods per point = 10</span>
    <span class="pill">Bin width = ${(FIG2_BIN_WIDTH * 60).toFixed(2)} min</span>
  `;
}

function renderFigure2() {
  plotFig2aMap(FIG2A_POINTS);
  plotFig2bHistogram(FIG2B_SERIES);
}

function initFigure2() {
  renderFigure2();
}

// =============================
// Figure 3 configuration
// =============================

const FIG3_CONFIG = {
  '3a': {
    tsFile: 'data/fig_3a_ts.csv',
    locFile: 'data/fig_3a_locations.csv',
    psdImage: 'images/fig_3a_psd.png',
    label: 'Figure 3a',
    xRange: ['2023-08-18 00:00:00', '2023-09-15 23:00:00'],
    series: ['serie_1', 'serie_2', 'serie_3', 'serie_4'],
    colours: {
      serie_1: 'rgb(122,4,3)',
      serie_2: 'rgb(169,22,1)',
      serie_3: 'rgb(206,45,4)',
      serie_4: 'rgb(232,75,12)'
    }
  },

  '3b': {
    tsFile: 'data/fig_3b_ts.csv',
    locFile: 'data/fig_3b_locations.csv',
    psdImage: 'images/fig_3b_psd.png',
    label: 'Figure 3b',
    xRange: ['2013-11-15 00:00:00', '2013-12-20 23:00:00'],
    series: ['serie_1', 'serie_2', 'serie_3', 'serie_4', 'serie_5'],
    colours: {
      serie_1: 'rgb(249,117,29)',
      serie_2: 'rgb(254,161,48)',
      serie_3: 'rgb(245,197,58)',
      serie_4: 'rgb(219,226,54)',
      serie_5: 'rgb(183,247,53)'
    }
  },

  '3c': {
    tsFile: 'data/fig_3c_ts.csv',
    locFile: 'data/fig_3c_locations.csv',
    psdImage: 'images/fig_3c_psd.png',
    label: 'Figure 3c',
    xRange: ['2018-07-24 00:00:00', '2018-09-25 23:00:00'],
    series: ['serie_1', 'serie_2', 'serie_3', 'serie_4'],
    colours: {
      serie_1: 'rgb(139,255,75)',
      serie_2: 'rgb(82,250,122)',
      serie_3: 'rgb(34,235,170)',
      serie_4: 'rgb(26,212,208)'
    }
  },

  '3d': {
    tsFile: 'data/fig_3d_ts.csv',
    locFile: 'data/fig_3d_locations.csv',
    psdImage: 'images/fig_3d_psd.png',
    label: 'Figure 3d',
    xRange: ['2023-02-15 00:00:00', '2023-03-10 23:00:00'],
    series: ['serie_1', 'serie_2', 'serie_3', 'serie_4', 'serie_5'],
    colours: {
      serie_1: 'rgb(47,178,244)',
      serie_2: 'rgb(69,140,253)',
      serie_3: 'rgb(70,102,221)',
      serie_4: 'rgb(63,62,156)',
      serie_5: 'rgb(48,18,59)'
    }
  }
};
let FIG3_DATA = {};

function parseFig3TimeSeriesRows(rows, panelKey) {
  const cfg = FIG3_CONFIG[panelKey];

  return cfg.series.map(seriesId => {
    const values = rows.map(r => parseNumber(r[seriesId]));
    const times = rows.map(r => r.time);

    return {
      series_id: seriesId,
      series_name: cfg.seriesNames?.[seriesId] ?? seriesId,
      time: times,
      value: values
    };
  });
}

function parseFig3LocationRows(rows) {
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

function plotFig3TimeSeries(panelKey) {
  const cfg = FIG3_CONFIG[panelKey];
  const seriesData = FIG3_DATA[panelKey].ts;

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
      type: 'date',
      range: cfg.xRange,
      tickfont: { size: 12 }
    },
    yaxis: {
      title: {
        text: '[m]',
        font: { size: 16 }
      },
      tickfont: { size: 12 }
    }
  };

  Plotly.react('fig3-ts', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });
}

function plotFig3LocationMap(panelKey) {
  const cfg = FIG3_CONFIG[panelKey];
  const locData = FIG3_DATA[panelKey].locations;

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

  Plotly.react('fig3-map', traces, layout, {
    responsive: true,
    scrollZoom: true,
    displaylogo: false
  });

  document.getElementById('fig3-stats').innerHTML = `
    <span class="pill">N = ${locData.length} stations</span>
    <span class="pill">Panel = ${cfg.label}</span>
  `;
}

function updateFig3PsdImage(panelKey) {
  const cfg = FIG3_CONFIG[panelKey];

  const img = document.getElementById('fig3-psd-img');
  const link = document.querySelector('.fig3-image-link');

  img.src = cfg.psdImage;
  img.alt = `Power spectral density for ${cfg.label}`;
  link.href = cfg.psdImage;
}

function renderFigure3() {
  const selector = document.getElementById('fig3-select');
  const panelKey = selector.value;

  if (!FIG3_DATA[panelKey]) return;

  plotFig3TimeSeries(panelKey);
  plotFig3LocationMap(panelKey);
  updateFig3PsdImage(panelKey);
}

function initFigure3Selector() {
  const selector = document.getElementById('fig3-select');
  selector.addEventListener('change', renderFigure3);
  renderFigure3();
}

// =============================
// Load files
// =============================
// Figure 2
Promise.all([
  fetch('data/fig_2a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2a.csv');
    return response.text();
  }),
  fetch('data/fig_2b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2b.csv');
    return response.text();
  }),
  fetch('data/fig_2b_bins.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_2b_bins.csv');
    return response.text();
  })
])
  .then(([text1a, text1b, textBins]) => {
    hideError('fig2-error');
    hideError('fig2b-error');

    FIG2A_POINTS = parseFig2aRows(parseCSV(text1a));
    FIG2B_SERIES = parseFig2bRows(parseCSV(text1b));

    applyFig2BinDefinition(parseCSV(textBins));

    if (!FIG2A_POINTS.length) {
      throw new Error('fig_2a.csv has no valid rows.');
    }

    if (!FIG2B_SERIES.length) {
      throw new Error('fig_2b.csv has no valid rows.');
    }

    initFigure2();
  })
  .catch(err => {
    showError('fig2-error', err.message);
    showError('fig2b-error', err.message);
  });
// Figure 3
function loadFigure3Panel(panelKey) {
  const cfg = FIG3_CONFIG[panelKey];

  return Promise.all([
    fetch(cfg.tsFile + '?cache=' + Date.now()).then(response => {
      if (!response.ok) throw new Error(`Could not read ${cfg.tsFile}`);
      return response.text();
    }),
    fetch(cfg.locFile + '?cache=' + Date.now()).then(response => {
      if (!response.ok) throw new Error(`Could not read ${cfg.locFile}`);
      return response.text();
    })
  ])
    .then(([textTs, textLoc]) => {
      const locations = parseFig3LocationRows(parseCSV(textLoc));
      const ts = parseFig3TimeSeriesRows(parseCSV(textTs), panelKey);

      const nameMap = Object.fromEntries(
        locations.map(d => [d.series_id, d.series_name])
      );

      ts.forEach(s => {
        if (nameMap[s.series_id]) {
          s.series_name = nameMap[s.series_id];
        }
      });

      FIG3_DATA[panelKey] = {
        ts,
        locations
      };

      if (!FIG3_DATA[panelKey].ts.length) {
        throw new Error(`${cfg.tsFile} has no valid rows.`);
      }

      if (!FIG3_DATA[panelKey].locations.length) {
        throw new Error(`${cfg.locFile} has no valid rows.`);
      }
    });
}

Promise.all(Object.keys(FIG3_CONFIG).map(panelKey => loadFigure3Panel(panelKey)))
  .then(() => {
    hideError('fig3-error');
    initFigure3Selector();
  })
  .catch(err => {
    showError('fig3-error', err.message);
  });
// Figure 5
Promise.all([
  // El panel (b) es ahora una imagen; ya no se descarga su CSV:
  // fetch('data/fig_5b.csv?cache=' + Date.now()).then(response => {
  //   if (!response.ok) throw new Error('Could not read data/fig_5b.csv');
  //   return response.text();
  // }),
  fetch('data/fig_5a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_5a.csv');
    return response.text();
  })
])
  .then(([text5a]) => {
    hideError('fig5-error');

    // El panel (b) ahora es una imagen, por eso ya no se parsea data/fig_5b.csv:
    // FIG5B_DATA = parseFig5Rows(parseCSV(text5b), true);
    FIG5A_DATA = parseFig5Rows(parseCSV(text5a), false);

    if (!FIG5A_DATA.length) {
      throw new Error('fig_5a.csv has no valid rows.');
    }

    initFigure5Selector();
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
  .then(([text6a, text6b]) => {
    hideError('fig7-error');

    FIG7A_DATA = parseFig7aRows(parseCSV(text6a));
    FIG7B_DATA = parseFig7bRows(parseCSV(text6b));

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
// Figure 6
fetch('data/fig_6.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_6.csv');
    return response.text();
  })
  .then(text => {
    hideError('fig6-error');
    initFigure6(parseCSV(text));
  })
  .catch(err => {
    showError('fig6-error', err.message);
  });
// Carga de la antigua "Figure 6" -> movida a js/supplementary.js
// Figure 4
Promise.all([
  fetch('data/fig_4_mm.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_4_mm.csv');
    return response.text();
  }),
  fetch('data/fig_4_rl.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_4_rl.csv');
    return response.text();
  }),
  fetch('data/fig_4_panels.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_4_panels.csv');
    return response.text();
  })
])
  .then(([textMm, textRl, textPanels]) => {
    hideError('fig4-error');

    FIG4_MM = parseFig4MmRows(parseCSV(textMm));
    FIG4_RL = parseFig4RlRows(parseCSV(textRl));
    FIG4_PANELS = parseFig4PanelRows(parseCSV(textPanels));

    if (!Object.keys(FIG4_MM).length) {
      throw new Error('fig_4_mm.csv has no valid rows.');
    }

    if (!Object.keys(FIG4_PANELS).length) {
      throw new Error('fig_4_panels.csv has no valid rows.');
    }

    initFigure4();
  })
  .catch(err => {
    showError('fig4-error', err.message);
  });
// Figure 8
fetch('data/fig_8.csv?cache=' + Date.now())
  .then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_8.csv');
    return response.text();
  })
  .then(text => {
    hideError('fig8-error');

    FIG8_DATA = parseFig8Rows(parseCSV(text));

    if (!FIG8_DATA.length) {
      throw new Error('fig_8.csv has no valid rows.');
    }

    plotFig8Map(FIG8_DATA);
  })
  .catch(err => {
    showError('fig8-error', err.message);
  });
// Figure 9
Promise.all([
  fetch('data/fig_9a.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_9a.csv');
    return response.text();
  }),
  fetch('data/fig_9b.csv?cache=' + Date.now()).then(response => {
    if (!response.ok) throw new Error('Could not read data/fig_9b.csv');
    return response.text();
  })
])
  .then(([text7a, text7b]) => {
    hideError('fig9-error');

    FIG9A_DATA = parseFig9aRows(parseCSV(text7a));
    FIG9B_DATA = parseFig9bRows(parseCSV(text7b));

    if (!FIG9A_DATA.length) {
      throw new Error('fig_9a.csv has no valid rows.');
    }

    if (!FIG9B_DATA.length) {
      throw new Error('fig_9b.csv has no valid rows.');
    }

    initFigure9Selector();
  })
  .catch(err => {
    showError('fig9-error', err.message);
  });
