# 🗄️ Configuración de MongoDB

Como no tienes MongoDB instalado localmente, aquí tienes dos opciones:

## Opción 1: MongoDB Atlas (Recomendado - Gratis y sin instalación) ⭐

MongoDB Atlas es un servicio en la nube gratuito que no requiere instalación.

### Pasos:

1. **Crear cuenta en MongoDB Atlas:**
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Regístrate con tu email (es gratis)

2. **Crear un cluster:**
   - Una vez dentro, haz clic en "Build a Database"
   - Selecciona el plan **FREE (M0)**
   - Elige una región cercana a ti
   - Dale un nombre a tu cluster (ej: "Cluster0")
   - Haz clic en "Create"

3. **Configurar acceso:**
   - Te pedirá crear un usuario de base de datos
   - Crea un usuario y contraseña (guárdalos bien)
   - En "Network Access", agrega tu IP o selecciona "Allow Access from Anywhere" (0.0.0.0/0) para desarrollo

4. **Obtener la cadena de conexión:**
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la connection string (se ve así: `mongodb+srv://usuario:password@cluster.mongodb.net/...`)

5. **Configurar en tu proyecto:**
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega tu connection string:
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/crud-vehiculos?retryWrites=true&w=majority
   ```
   - Reemplaza `usuario` y `password` con tus credenciales
   - Reemplaza `crud-vehiculos` con el nombre de tu base de datos (o déjalo así)

6. **Instalar dotenv (si no está instalado):**
   ```bash
   npm install dotenv
   ```

7. **¡Listo!** Ahora puedes ejecutar `npm start`

---

## Opción 2: Instalar MongoDB Localmente

### Windows:

1. **Descargar MongoDB:**
   - Ve a: https://www.mongodb.com/try/download/community
   - Descarga la versión para Windows
   - Ejecuta el instalador

2. **Durante la instalación:**
   - Selecciona "Complete" installation
   - Marca "Install MongoDB as a Service"
   - Marca "Install MongoDB Compass" (opcional, es una GUI)

3. **Verificar instalación:**
   - MongoDB se iniciará automáticamente como servicio
   - Puedes verificar en "Services" (servicios de Windows)

4. **Ejecutar tu aplicación:**
   ```bash
   npm start
   ```

### macOS:

```bash
# Usando Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux (Ubuntu/Debian):

```bash
# Importar clave pública
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Agregar repositorio
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Opción 3: Usar Docker (Si tienes Docker instalado)

```bash
# Ejecutar MongoDB en un contenedor
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Tu aplicación se conectará automáticamente a mongodb://localhost:27017/crud-vehiculos
```

---

## Recomendación

**Para desarrollo rápido:** Usa MongoDB Atlas (Opción 1) - es gratis, no requiere instalación y funciona inmediatamente.

**Para producción local:** Instala MongoDB localmente (Opción 2).

