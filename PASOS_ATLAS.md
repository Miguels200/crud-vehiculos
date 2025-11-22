# 🚀 Pasos para Configurar MongoDB Atlas

## Paso 1: Crear el Cluster ✅
1. Haz clic en el botón verde **"Build a Cluster"** que ves en la pantalla
2. Selecciona el plan **FREE (M0)** - es completamente gratuito
3. Elige una región cercana a tu ubicación (por ejemplo: N. Virginia, Oregon, etc.)
4. Puedes dejar el nombre del cluster como "Cluster0" o ponerle otro nombre
5. Haz clic en **"Create"** o **"Create Cluster"**

## Paso 2: Crear Usuario de Base de Datos
Después de crear el cluster, te pedirá crear un usuario:
1. **Username**: Crea un nombre de usuario (ej: `admin` o `miguel`)
2. **Password**: Crea una contraseña segura (GUÁRDALA BIEN, la necesitarás)
3. Haz clic en **"Create Database User"**

## Paso 3: Configurar Acceso de Red
Te pedirá configurar el acceso de red:
1. Selecciona **"Add My Current IP Address"** O
2. Para desarrollo, puedes seleccionar **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Haz clic en **"Finish and Close"**

## Paso 4: Obtener Connection String
1. Una vez que el cluster esté listo (puede tardar 1-3 minutos)
2. Haz clic en el botón **"Connect"** (junto a tu cluster)
3. Selecciona **"Connect your application"**
4. Copia la connection string que aparece (se ve así):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Paso 5: Configurar en tu Proyecto
1. En la raíz de tu proyecto, crea un archivo llamado `.env`
2. Agrega esta línea (reemplaza `<username>` y `<password>` con tus credenciales):
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/crud-vehiculos?retryWrites=true&w=majority
   ```
   ⚠️ **IMPORTANTE**: Reemplaza `usuario` y `password` con los que creaste en el Paso 2
   ⚠️ También agrega `/crud-vehiculos` antes del `?` para especificar el nombre de la base de datos

## Paso 6: Ejecutar tu Aplicación
```bash
npm start
```

¡Listo! Tu aplicación debería conectarse a MongoDB Atlas. 🎉

