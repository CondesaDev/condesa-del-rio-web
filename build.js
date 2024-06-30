const fs = require('fs');

// Crear el contenido de script.js con variables de entorno
const scriptContent = `
const LOGIN_URL = "${process.env.LOGIN_URL}";

console.log("LOGIN_URL:", LOGIN_URL);
`;

// Escribir el contenido en script.js
fs.writeFileSync('./js/main.js', scriptContent);