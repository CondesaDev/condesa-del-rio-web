const fs = require('fs');
const path = './js/main.js';

// Leer el contenido actual de script.js
let scriptContent = '';
if (fs.existsSync(path)) {
  scriptContent = fs.readFileSync(path, 'utf8');
}

// Crear el contenido de las variables de entorno
const envVariables = `
const ENV = "${process.env}"
const LOGIN_URL = "${process.env.LOGIN_URL}";//'https://ap-southeast-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/data-agbvuip/auth/providers/local-userpass/login';
const BASE_URL = "${process.env.BASE_URL}";//'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-agbvuip/endpoint/data/v1/action';
const DATABASE = "${process.env.DATABASE}";//'development';
const COLLECTION = "${process.env.COLLECTION}";//'reviews';
const DATASOURSE = "${process.env.DATASOURSE}";//'condesa-dev';
const USER = "${process.env.USER}";//'rulorules99';
const PASS = "${process.env.PASS}";//'cloud192';

console.log("ENV:", ENV);
console.log("LOGIN_URL:", LOGIN_URL);
console.log("BASE_URL:", BASE_URL);
console.log("DATABASE:", DATABASE);
console.log("COLLECTION:", COLLECTION);
console.log("DATASOURSE:", DATASOURSE);
console.log("USER:", USER);
console.log("PASS:", PASS);

// Rest of the script
`;

// Combinar las variables de entorno con el contenido existente
const newContent = envVariables + scriptContent;

// Escribir el contenido combinado en script.js
fs.writeFileSync(path, newContent, 'utf8');