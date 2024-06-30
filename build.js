const fs = require('fs');
const path = './js/main.js';

// Leer el contenido actual de script.js
let scriptContent = '';
if (fs.existsSync(path)) {
  scriptContent = fs.readFileSync(path, 'utf8');
}

// Crear el contenido de las variables de entorno
const envVariables = `
const LOGIN_URL = "${process.env.LOGIN_URL}";

console.log("LOGIN_URL:", LOGIN_URL);
console.log("env:", process.env);
// Rest of the script
`;

// Combinar las variables de entorno con el contenido existente
const newContent = envVariables + scriptContent;

// Escribir el contenido combinado en script.js
fs.writeFileSync(path, newContent, 'utf8');