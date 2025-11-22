# CRUD de Vehículos

Sistema completo de gestión de vehículos desarrollado con Node.js, Express, MongoDB y un frontend moderno en HTML, CSS y JavaScript.

## 🚀 Características

- ✅ Crear nuevos vehículos
- ✅ Listar todos los vehículos registrados
- ✅ Ver detalles de un vehículo específico
- ✅ Actualizar información de vehículos
- ✅ Eliminar vehículos
- 🎨 Interfaz moderna y responsive
- 🔄 Validación de datos en frontend y backend

## 📋 Campos del Vehículo

- **Marca**: String (requerido)
- **Modelo**: String (requerido)
- **Año**: Number (requerido, entre 1900 y año actual + 1)
- **Color**: String (requerido)
- **Placa**: String (requerido, único)

## 🛠️ Instalación

### Requisitos Previos
- Node.js instalado
- MongoDB (local o en la nube)

### Opción A: MongoDB Atlas (Recomendado si no tienes MongoDB instalado) ⭐

1. **Instala las dependencias:**
```bash
npm install
```

2. **Configura MongoDB Atlas (gratis):**
   - Ve a https://www.mongodb.com/cloud/atlas/register
   - Crea una cuenta gratuita
   - Crea un cluster gratuito
   - Obtén tu connection string

3. **Crea un archivo `.env` en la raíz del proyecto:**
```bash
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/crud-vehiculos?retryWrites=true&w=majority
```
   (Reemplaza `usuario` y `password` con tus credenciales)

4. **Inicia el servidor:**
```bash
npm start
```

📖 **Guía completa:** Lee `MONGODB_SETUP.md` para instrucciones detalladas paso a paso.

### Opción B: MongoDB Local

1. Instala MongoDB en tu sistema
2. Instala las dependencias: `npm install`
3. Inicia el servidor: `npm start`

El servidor se ejecutará en `http://localhost:3000`

## 📡 API Endpoints

### POST `/api/vehiculos`
Crea un nuevo vehículo.

**Body:**
```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2023,
  "color": "Rojo",
  "placa": "ABC-123"
}
```

### GET `/api/vehiculos`
Obtiene todos los vehículos registrados.

### GET `/api/vehiculos/:id`
Obtiene un vehículo específico por su ID.

### PUT `/api/vehiculos/:id`
Actualiza un vehículo existente.

**Body:** (campos opcionales)
```json
{
  "marca": "Honda",
  "modelo": "Civic",
  "año": 2024,
  "color": "Azul",
  "placa": "XYZ-789"
}
```

### DELETE `/api/vehiculos/:id`
Elimina un vehículo por su ID.

## 🎯 Uso

1. Abre tu navegador y ve a `http://localhost:3000`
2. Completa el formulario con los datos del vehículo
3. Haz clic en "Agregar Vehículo"
4. Los vehículos aparecerán en la lista debajo del formulario
5. Puedes editar o eliminar vehículos usando los botones correspondientes

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (puedes usar `env.example.txt` como referencia):

```env
MONGODB_URI=mongodb://localhost:27017/crud-vehiculos
PORT=3000
```

**Para MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/crud-vehiculos?retryWrites=true&w=majority
```

Si no creas el archivo `.env`, la aplicación intentará conectarse a MongoDB local por defecto.

## 📦 Dependencias

- **express**: Framework web para Node.js
- **mongoose**: ODM para MongoDB
- **body-parser**: Middleware para parsear el body de las peticiones
- **cors**: Middleware para habilitar CORS
- **dotenv**: Carga variables de entorno desde archivo .env

## 🎨 Frontend

El frontend incluye:
- Formulario responsive para agregar/editar vehículos
- Lista de vehículos con diseño de tarjetas
- Validación de formularios
- Mensajes de éxito/error
- Interfaz moderna con gradientes y animaciones

## 📝 Notas

- La placa debe ser única en el sistema
- El año debe estar entre 1900 y el año actual + 1
- Todos los campos son requeridos al crear un vehículo
- La placa se convierte automáticamente a mayúsculas

