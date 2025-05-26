function generarMatrices() {
  const fA = parseInt(document.getElementById('filasA').value);
  const cA = parseInt(document.getElementById('colsA').value);
  const fB = parseInt(document.getElementById('filasB').value);
  const cB = parseInt(document.getElementById('colsB').value);

  const contA = document.getElementById('matrizA');
  const contB = document.getElementById('matrizB');
  contA.innerHTML = '';
  contB.innerHTML = '';

  contA.style.gridTemplateColumns = `repeat(${cA}, 1fr)`;
  contB.style.gridTemplateColumns = `repeat(${cB}, 1fr)`;

  for (let i = 0; i < fA; i++) {
    for (let j = 0; j < cA; j++) {
      contA.innerHTML += `<input type="number" id="a-${i}-${j}" value="0" />`;
    }
  }

  for (let i = 0; i < fB; i++) {
    for (let j = 0; j < cB; j++) {
      contB.innerHTML += `<input type="number" id="b-${i}-${j}" value="0" />`;
    }
  }
}

function calcularMatrices() {
  const op = document.getElementById('operacion').value;
  const fA = parseInt(document.getElementById('filasA').value);
  const cA = parseInt(document.getElementById('colsA').value);
  const fB = parseInt(document.getElementById('filasB').value);
  const cB = parseInt(document.getElementById('colsB').value);

  let A = [], B = [];

  for (let i = 0; i < fA; i++) {
    A[i] = [];
    for (let j = 0; j < cA; j++) {
      A[i][j] = parseFloat(document.getElementById(`a-${i}-${j}`).value);
    }
  }

  for (let i = 0; i < fB; i++) {
    B[i] = [];
    for (let j = 0; j < cB; j++) {
      B[i][j] = parseFloat(document.getElementById(`b-${i}-${j}`).value);
    }
  }

  let result = [];
  const operacionTexto = {
    sumar: 'Suma (A + B)',
    restar: 'Resta (A - B)',
    multiplicar: 'Multiplicación (A × B)'
  };

  if (op === 'sumar' || op === 'restar') {
    if (fA !== fB || cA !== cB) return alert('Matrices incompatibles');
    for (let i = 0; i < fA; i++) {
      result[i] = [];
      for (let j = 0; j < cA; j++) {
        result[i][j] = op === 'sumar' ? A[i][j] + B[i][j] : A[i][j] - B[i][j];
      }
    }
  }

  if (op === 'multiplicar') {
    if (cA !== fB) return alert('Columnas de A deben coincidir con filas de B');
    for (let i = 0; i < fA; i++) {
      result[i] = [];
      for (let j = 0; j < cB; j++) {
        result[i][j] = 0;
        for (let k = 0; k < cA; k++) {
          result[i][j] += A[i][k] * B[k][j];
        }
      }
    }
  }

  document.getElementById('resultadoMatrices').innerHTML = `
    <div class="resultado-success">
      <h4>📊 Resultado - ${operacionTexto[op]}</h4>
      <pre>${JSON.stringify(result, null, 2)}</pre>
    </div>
  `;
}

function limpiarMatrices() {
  document.getElementById('resultadoMatrices').innerHTML = '';

  const fA = parseInt(document.getElementById('filasA').value);
  const cA = parseInt(document.getElementById('colsA').value);
  const fB = parseInt(document.getElementById('filasB').value);
  const cB = parseInt(document.getElementById('colsB').value);

  for (let i = 0; i < fA; i++) {
    for (let j = 0; j < cA; j++) {
      const inputA = document.getElementById(`a-${i}-${j}`);
      if (inputA) inputA.value = 0;
    }
  }

  for (let i = 0; i < fB; i++) {
    for (let j = 0; j < cB; j++) {
      const inputB = document.getElementById(`b-${i}-${j}`);
      if (inputB) inputB.value = 0;
    }
  }
}
