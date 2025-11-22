// Cargar variables de entorno (si existe .env)
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Conexión a MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-vehiculos';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    console.log(`📍 Base de datos: ${MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'MongoDB Local'}`);
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    console.log('\n💡 Tip: Si no tienes MongoDB instalado, usa MongoDB Atlas (gratis)');
    console.log('   Lee MONGODB_SETUP.md para más información\n');
  });

// Esquema del vehículo
const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    trim: true
  },
  año: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  }
}, {
  timestamps: true
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

// Rutas CRUD

// 1. Crear un nuevo vehículo
app.post('/api/vehiculos', async (req, res) => {
  try {
    const { marca, modelo, año, color, placa } = req.body;

    // Validar campos requeridos
    if (!marca || !modelo || !año || !color || !placa) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const vehiculo = new Vehiculo({
      marca,
      modelo,
      año: parseInt(año),
      color,
      placa: placa.toUpperCase()
    });

    await vehiculo.save();
    res.status(201).json({
      success: true,
      message: 'Vehículo creado exitosamente',
      data: vehiculo
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'La placa ya está registrada'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al crear el vehículo',
      error: error.message
    });
  }
});

// 2. Leer todos los vehículos
app.get('/api/vehiculos', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: vehiculos.length,
      data: vehiculos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los vehículos',
      error: error.message
    });
  }
});

// 3. Leer un vehículo por su ID
app.get('/api/vehiculos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const vehiculo = await Vehiculo.findById(id);

    if (!vehiculo) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: vehiculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el vehículo',
      error: error.message
    });
  }
});

// 4. Actualizar los detalles de un vehículo por su ID
app.put('/api/vehiculos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, año, color, placa } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const updateData = {};
    if (marca) updateData.marca = marca;
    if (modelo) updateData.modelo = modelo;
    if (año) updateData.año = parseInt(año);
    if (color) updateData.color = color;
    if (placa) updateData.placa = placa.toUpperCase();

    const vehiculo = await Vehiculo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!vehiculo) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehículo actualizado exitosamente',
      data: vehiculo
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'La placa ya está registrada en otro vehículo'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el vehículo',
      error: error.message
    });
  }
});

// 5. Eliminar un vehículo por su ID
app.delete('/api/vehiculos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID inválido'
      });
    }

    const vehiculo = await Vehiculo.findByIdAndDelete(id);

    if (!vehiculo) {
      return res.status(404).json({
        success: false,
        message: 'Vehículo no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Vehículo eliminado exitosamente',
      data: vehiculo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el vehículo',
      error: error.message
    });
  }
});

// Ruta para servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
