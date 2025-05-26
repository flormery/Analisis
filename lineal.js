// ✅ Versión mejorada con detección completa de vértices para cualquier ejercicio real
function agregarRestriccion() {
  const cont = document.getElementById('restricciones');
  const div = document.createElement('div');
  div.classList.add('restriccion-row');
  div.innerHTML = `
    <input type="number" value="1" class="coefX" /> x₁ +
    <input type="number" value="1" class="coefY" /> x₂
    <select class="operador">
      <option value="<=">≤</option>
      <option value=">=">≥</option>
      <option value="=">=</option>
    </select>
    <input type="number" value="5" class="limite" />
    <button onclick="this.parentElement.remove()">✖</button>
  `;
  cont.appendChild(div);
}

function resolverPL() {
  const zX = parseFloat(document.getElementById('zX').value);
  const zY = parseFloat(document.getElementById('zY').value);
  const tipo = document.getElementById('tipoZ').value;
  const incluirNoNeg = document.getElementById('noNegatividad').checked;

  const anterior = document.querySelector('.resultado-lineal');
  if (anterior) anterior.remove();
  Plotly.purge('grafico');

  const restricciones = Array.from(document.querySelectorAll('.restriccion-row')).map(div => ({
    a: parseFloat(div.querySelector('.coefX').value),
    b: parseFloat(div.querySelector('.coefY').value),
    op: div.querySelector('.operador').value,
    c: parseFloat(div.querySelector('.limite').value)
  }));

  if (incluirNoNeg) {
    restricciones.push({ a: 1, b: 0, op: '>=', c: 0 });
    restricciones.push({ a: 0, b: 1, op: '>=', c: 0 });
  }

  function cumpleTodas(x, y) {
    return restricciones.every(r => {
      const val = r.a * x + r.b * y;
      if (r.op === '<=') return val <= r.c + 1e-6;
      if (r.op === '>=') return val >= r.c - 1e-6;
      if (r.op === '=') return Math.abs(val - r.c) <= 1e-6;
    });
  }

  // Generar todos los puntos de intersección posibles
  const puntos = [];
  for (let i = 0; i < restricciones.length; i++) {
    for (let j = i + 1; j < restricciones.length; j++) {
      const r1 = restricciones[i];
      const r2 = restricciones[j];
      const det = r1.a * r2.b - r2.a * r1.b;
      if (Math.abs(det) > 1e-6) {
        const x = (r2.b * r1.c - r1.b * r2.c) / det;
        const y = (r1.a * r2.c - r2.a * r1.c) / det;
        if (isFinite(x) && isFinite(y)) puntos.push([x, y]);
      }
    }
  }

  // Añadir los ejes como bordes (opcional pero mejora cobertura)
  const limites = [0, 1000];
  for (let x of limites) {
    for (let r of restricciones) {
      if (r.b !== 0) {
        const y = (r.c - r.a * x) / r.b;
        if (isFinite(y)) puntos.push([x, y]);
      }
    }
  }
  for (let y of limites) {
    for (let r of restricciones) {
      if (r.a !== 0) {
        const x = (r.c - r.b * y) / r.a;
        if (isFinite(x)) puntos.push([x, y]);
      }
    }
  }

  const factibles = puntos.filter(([x, y]) => cumpleTodas(x, y));
  const evaluados = factibles.map(([x, y]) => ({ x, y, z: zX * x + zY * y }));

  const optimo = evaluados.reduce((best, curr) => {
    if (!best) return curr;
    return (tipo === 'max' ? curr.z > best.z : curr.z < best.z) ? curr : best;
  }, null);

  const trazas = restricciones.map((r, i) => {
    const x = Array.from({ length: 400 }, (_, k) => k);
    const y = x.map(xi => r.b !== 0 ? (r.c - r.a * xi) / r.b : NaN);
    return {
      x, y,
      mode: 'lines',
      name: `${r.a}x₁ ${r.b >= 0 ? '+' : '-'} ${Math.abs(r.b)}x₂ ${r.op} ${r.c}`,
      line: { width: 2 }
    };
  });

  if (factibles.length >= 3) {
    const centro = factibles.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]).map(v => v / factibles.length);
    const poligono = factibles.sort((p1, p2) => Math.atan2(p1[1] - centro[1], p1[0] - centro[0]) - Math.atan2(p2[1] - centro[1], p2[0] - centro[0]));
    trazas.push({
      x: poligono.map(p => p[0]).concat([poligono[0][0]]),
      y: poligono.map(p => p[1]).concat([poligono[0][1]]),
      fill: 'toself',
      name: 'Región Factible',
      fillcolor: 'rgba(0,255,0,0.2)',
      line: { color: 'green' }
    });
  }

  if (optimo) {
    trazas.push({
      x: [optimo.x],
      y: [optimo.y],
      mode: 'markers',
      name: 'Punto Óptimo',
      marker: { color: 'red', size: 10, symbol: 'circle-open' }
    });
  }

  document.getElementById('grafico').insertAdjacentHTML('beforebegin', `
    <div class="resultado-lineal">
      <h4>📌 Resultado de Programación Lineal</h4>
      <pre>
Función Objetivo: ${tipo === 'max' ? 'Maximizar' : 'Minimizar'} Z = ${zX}x₁ + ${zY}x₂

Z óptimo = ${optimo?.z.toFixed(2)}
Punto óptimo: (x₁ = ${optimo?.x.toFixed(2)}, x₂ = ${optimo?.y.toFixed(2)})

Vértices evaluados:
${evaluados.map(e => `(${e.x.toFixed(2)}, ${e.y.toFixed(2)}) → Z = ${e.z.toFixed(2)}`).join('\n')}
      </pre>
    </div>
  `);

  const maxX = Math.max(...evaluados.map(e => e.x)) * 1.2 || 10;
  const maxY = Math.max(...evaluados.map(e => e.y)) * 1.2 || 10;

  Plotly.newPlot('grafico', trazas, {
    title: `Gráfico de Programación Lineal - Función Objetivo: ${zX}x₁ + ${zY}x₂`,
    xaxis: { title: 'x₁', range: [0, maxX] },
    yaxis: { title: 'x₂', range: [0, maxY] },
    showlegend: true
  });
}
