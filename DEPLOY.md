# 🚀 Guía de Despliegue - CRUD de Vehículos

Esta guía te ayudará a desplegar tu aplicación en diferentes plataformas.

## 📋 Requisitos Previos

- ✅ Cuenta en MongoDB Atlas (ya configurada)
- ✅ Connection string de MongoDB Atlas
- ✅ Cuenta en GitHub (recomendado para despliegue automático)

---

## Opción 1: Render (Recomendado - Gratis) ⭐

Render ofrece un plan gratuito perfecto para aplicaciones pequeñas.

### Pasos:

1. **Crear cuenta en Render:**
   - Ve a: https://render.com
   - Regístrate con GitHub (recomendado) o email

2. **Conectar tu repositorio:**
   - Si no tienes repositorio en GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/crud-vehiculos.git
     git push -u origin main
     ```
   - En Render, haz clic en "New +" → "Web Service"
   - Conecta tu repositorio de GitHub

3. **Configurar el servicio:**
   - **Name**: `crud-vehiculos` (o el que prefieras)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Configurar variables de entorno:**
   - En la sección "Environment Variables", agrega:
     - `MONGODB_URI`: Tu connection string completa de MongoDB Atlas
     - `NODE_ENV`: `production`
     - `PORT`: Render lo asigna automáticamente, pero puedes dejarlo vacío

5. **Desplegar:**
   - Haz clic en "Create Web Service"
   - Render construirá y desplegará tu aplicación automáticamente
   - Espera 2-3 minutos para que termine el despliegue

6. **Obtener tu URL:**
   - Una vez desplegado, obtendrás una URL como: `https://crud-vehiculos.onrender.com`
   - ¡Tu aplicación estará en línea! 🎉

### Notas importantes:
- El plan gratuito de Render "duerme" la aplicación después de 15 minutos de inactividad
- El primer inicio después de dormir puede tardar 30-60 segundos
- Para producción, considera el plan de pago ($7/mes) para evitar el "sleep"

---

## Opción 2: Railway (Gratis con límites)

Railway es otra excelente opción gratuita.

### Pasos:

1. **Crear cuenta:**
   - Ve a: https://railway.app
   - Regístrate con GitHub

2. **Crear nuevo proyecto:**
   - Haz clic en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Conecta tu repositorio

3. **Configurar variables de entorno:**
   - En "Variables", agrega:
     - `MONGODB_URI`: Tu connection string de MongoDB Atlas
     - `PORT`: Railway lo asigna automáticamente

4. **Desplegar:**
   - Railway detectará automáticamente que es una app Node.js
   - El despliegue comenzará automáticamente
   - Obtendrás una URL como: `https://crud-vehiculos.up.railway.app`

---

## Opción 3: Vercel (Para Frontend + API Routes)

Vercel es excelente pero requiere ajustar el código para usar serverless functions.

### Pasos:

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Desplegar:**
   ```bash
   vercel
   ```

3. **Configurar variables de entorno:**
   - En el dashboard de Vercel, agrega `MONGODB_URI`

**Nota:** Vercel funciona mejor con serverless functions. Para una app Express completa, Render o Railway son mejores opciones.

---

## Opción 4: Heroku (Plan de Pago)

Heroku ya no tiene plan gratuito, pero es una opción estable.

### Pasos:

1. **Instalar Heroku CLI:**
   ```bash
   # Descarga desde: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Crear app:**
   ```bash
   heroku create crud-vehiculos
   ```

4. **Configurar variables:**
   ```bash
   heroku config:set MONGODB_URI=tu_connection_string
   ```

5. **Desplegar:**
   ```bash
   git push heroku main
   ```

---

## 🔧 Configuración de MongoDB Atlas para Producción

Asegúrate de que en MongoDB Atlas:

1. **Network Access:**
   - Agrega `0.0.0.0/0` para permitir conexiones desde cualquier IP (necesario para servicios en la nube)

2. **Database User:**
   - Usa el mismo usuario y contraseña que configuraste localmente

---

## ✅ Verificación Post-Despliegue

Después de desplegar, verifica:

1. ✅ La aplicación carga correctamente
2. ✅ Puedes crear un vehículo
3. ✅ Puedes ver la lista de vehículos
4. ✅ Puedes editar y eliminar vehículos
5. ✅ Los datos se guardan en MongoDB Atlas

---

## 🐛 Solución de Problemas

### Error de conexión a MongoDB:
- Verifica que `MONGODB_URI` esté configurada correctamente
- Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP

### Error 503 o aplicación no carga:
- Verifica los logs en la plataforma de despliegue
- Asegúrate de que el comando `start` esté correcto en `package.json`

### La aplicación "duerme":
- Esto es normal en planes gratuitos (Render)
- Considera un plan de pago para producción

---

## 📝 Recomendación Final

**Para desarrollo/pruebas:** Render (gratis, fácil de usar)
**Para producción:** Render ($7/mes) o Railway ($5/mes)

¿Necesitas ayuda con algún paso específico? ¡Avísame!

