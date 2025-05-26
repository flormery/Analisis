# Análisis
# 📊 Programación Lineal y Operaciones con Matrices

Este proyecto es una aplicación web interactiva que permite al usuario realizar operaciones con matrices y resolver problemas de programación lineal mediante el **método gráfico**. Está desarrollado con HTML, CSS y JavaScript.

## 🌐 Vista general

La aplicación ofrece dos funcionalidades principales:

- **Operaciones con Matrices**
  - Suma, resta y multiplicación de matrices A y B con dimensiones personalizadas.
- **Programación Lineal**
  - Ingreso de función objetivo y restricciones.
  - Visualización gráfica del área factible y solución óptima usando Plotly.js.

## 📁 Estructura del Proyecto

📁 ProgramacionLineal  
├── index.html         → Página principal del proyecto  
├── style.css          → Estilos personalizados  
├── matrices.js        → Lógica para operaciones de matrices  
├── lineal.js          → (Requerido) Lógica para programación lineal  
├── utils.js           → (Requerido) Funciones auxiliares  
└── libs/  
  └── plotly.min.js    → Librería para gráficos (opcional si se usa CDN)

> Si no tienes `lineal.js` y `utils.js`, puedes usar las versiones disponibles desde el CDN en el HTML o implementar tu propia lógica.

## ▶️ Cómo ejecutar el proyecto

1. Descarga todos los archivos del repositorio.
2. Asegúrate de mantener la estructura de carpetas como se muestra arriba.
3. Abre el archivo `index.html` en tu navegador.

> No se necesita servidor. Todo funciona desde el navegador (cliente).

## ✨ Funcionalidades

### 🔹 Matrices

- Ingreso dinámico del tamaño de las matrices.
- Generación automática de campos.
- Operaciones: Suma, Resta y Multiplicación.
- Validaciones básicas de dimensiones.

### 🔹 Programación Lineal

- Ingreso de función objetivo y restricciones.
- Inclusión opcional de condiciones de no negatividad.
- Resolución gráfica con Plotly.js.

## 📦 Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (puro)
- Plotly.js (para gráficos)

## 📄 Licencia

Este proyecto es de uso libre para fines académicos y educativos.

## 🙋‍♀️ Autor

**flormery**  
Estudiante de [Universidad Peruana Unión ]
