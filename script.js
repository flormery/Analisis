function parseMatrix(text) {
  return text.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
}

function mostrarResultadoMatrix(matrix) {
  const result = matrix.map(row => row.join(' ')).join('<br>');
  document.getElementById('resultadoMatrix').innerHTML = result;
}

function operarMatrices(op) {
  const A = parseMatrix(document.getElementById('matrixA').value);
  const B = parseMatrix(document.getElementById('matrixB').value);
  let result = [];

  try {
    if (op === 'sumar') {
      result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
    } else if (op === 'restar') {
      result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
    } else if (op === 'multiplicar') {
      const colsB = B[0].length;
      for (let i = 0; i < A.length; i++) {
        result[i] = [];
        for (let j = 0; j < colsB; j++) {
          result[i][j] = A[i].reduce((sum, _, k) => sum + A[i][k] * B[k][j], 0);
        }
      }
    }
    mostrarResultadoMatrix(result);
  } catch (e) {
    alert('Error en la operación. Asegúrate de que las matrices sean compatibles.');
  }
}

function graficar() {
  const zX = parseFloat(document.getElementById('zX').value);
  const zY = parseFloat(document.getElementById('zY').value);
  const restricciones = document.getElementById('restricciones').value.trim().split('\n');

  let x = [];
  let y = [];

  for (let i = 0; i <= 10; i++) x.push(i);

  let trazas = restricciones.map((res, i) => {
    const match = res.match(/([+-]?\d*)x\s*([+-]?\d*)y\s*(<=|>=|=)\s*([\d.]+)/i);
    if (!match) return null;

    const a = parseFloat(match[1] || 1);
    const b = parseFloat(match[2] || 1);
    const op = match[3];
    const c = parseFloat(match[4]);

    const yi = x.map(xi => (c - a * xi) / b);

    return {
      x: x,
      y: yi,
      mode: 'lines',
      name: res
    };
  }).filter(Boolean);

  // Graficar función objetivo (línea guía)
  const z = x.map(xi => (zX * xi + 0) / zY);
  trazas.push({ x, y: z, mode: 'lines', name: 'Función Objetivo', line: { dash: 'dot' } });

  Plotly.newPlot('grafico', trazas, {
    margin: { t: 0 }
  });
}
