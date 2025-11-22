// Script temporal para ayudar a crear el archivo .env
// Ejecuta: node crear-env.js

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Configuración de MongoDB Atlas\n');
console.log('Pega tu connection string de MongoDB Atlas');
console.log('(Formato: mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/...)\n');

rl.question('Connection String: ', (connectionString) => {
  // Extraer usuario y password si están en el string
  let mongoUri = connectionString.trim();
  
  // Si no incluye el nombre de la base de datos, agregarlo
  if (!mongoUri.includes('/crud-vehiculos')) {
    // Reemplazar el ? o agregar /crud-vehiculos antes del ?
    if (mongoUri.includes('?')) {
      mongoUri = mongoUri.replace('?', '/crud-vehiculos?');
    } else {
      mongoUri = mongoUri + '/crud-vehiculos';
    }
  }
  
  const envContent = `# MongoDB Connection String
MONGODB_URI=${mongoUri}

# Puerto del servidor (opcional)
PORT=3000
`;
  
  fs.writeFileSync('.env', envContent);
  console.log('\n✅ Archivo .env creado exitosamente!');
  console.log('📁 Ubicación: ' + process.cwd() + '\\.env\n');
  console.log('🚀 Ahora puedes ejecutar: npm start\n');
  
  rl.close();
});

