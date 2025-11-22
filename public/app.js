const API_URL = '/api/vehiculos';
let editingId = null;

// Elementos del DOM
const form = document.getElementById('vehiculo-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const messageDiv = document.getElementById('message');
const vehiculosList = document.getElementById('vehiculos-list');
const loadingDiv = document.getElementById('loading');
const countBadge = document.getElementById('vehiculos-count');

// Event Listeners
form.addEventListener('submit', handleSubmit);
cancelBtn.addEventListener('click', cancelEdit);

// Cargar vehículos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadVehiculos();
});

// Función para manejar el envío del formulario
async function handleSubmit(e) {
    e.preventDefault();
    hideMessage();

    const formData = new FormData(form);
    const vehiculo = {
        marca: formData.get('marca').trim(),
        modelo: formData.get('modelo').trim(),
        año: parseInt(formData.get('año')),
        color: formData.get('color').trim(),
        placa: formData.get('placa').trim().toUpperCase()
    };

    try {
        if (editingId) {
            await updateVehiculo(editingId, vehiculo);
        } else {
            await createVehiculo(vehiculo);
        }
        form.reset();
        loadVehiculos();
    } catch (error) {
        showMessage('Error al procesar la solicitud: ' + error.message, 'error');
    }
}

// Crear un nuevo vehículo
async function createVehiculo(vehiculo) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al crear el vehículo');
    }

    showMessage('Vehículo creado exitosamente', 'success');
}

// Leer todos los vehículos
async function loadVehiculos() {
    try {
        loadingDiv.style.display = 'block';
        vehiculosList.innerHTML = '';

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al cargar los vehículos');
        }

        loadingDiv.style.display = 'none';
        countBadge.textContent = data.count || 0;

        if (data.data && data.data.length > 0) {
            data.data.forEach(vehiculo => {
                renderVehiculo(vehiculo);
            });
        } else {
            vehiculosList.innerHTML = `
                <div class="empty-state">
                    <p>📭 No hay vehículos registrados</p>
                    <p>Agrega tu primer vehículo usando el formulario</p>
                </div>
            `;
        }
    } catch (error) {
        loadingDiv.style.display = 'none';
        vehiculosList.innerHTML = `
            <div class="empty-state">
                <p>❌ Error al cargar los vehículos: ${error.message}</p>
            </div>
        `;
    }
}

// Leer un vehículo por ID
async function getVehiculoById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el vehículo');
    }

    return data.data;
}

// Actualizar un vehículo
async function updateVehiculo(id, vehiculo) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehiculo)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el vehículo');
    }

    showMessage('Vehículo actualizado exitosamente', 'success');
    cancelEdit();
}

// Eliminar un vehículo
async function deleteVehiculo(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este vehículo?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al eliminar el vehículo');
        }

        showMessage('Vehículo eliminado exitosamente', 'success');
        loadVehiculos();
    } catch (error) {
        showMessage('Error al eliminar: ' + error.message, 'error');
    }
}

// Editar un vehículo
async function editVehiculo(id) {
    try {
        const vehiculo = await getVehiculoById(id);
        
        // Llenar el formulario con los datos del vehículo
        document.getElementById('marca').value = vehiculo.marca;
        document.getElementById('modelo').value = vehiculo.modelo;
        document.getElementById('año').value = vehiculo.año;
        document.getElementById('color').value = vehiculo.color;
        document.getElementById('placa').value = vehiculo.placa;

        // Cambiar el modo del formulario a edición
        editingId = id;
        formTitle.textContent = 'Editar Vehículo';
        submitBtn.textContent = 'Actualizar Vehículo';
        cancelBtn.style.display = 'block';

        // Scroll al formulario
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showMessage('Error al cargar el vehículo: ' + error.message, 'error');
    }
}

// Cancelar edición
function cancelEdit() {
    editingId = null;
    form.reset();
    formTitle.textContent = 'Agregar Nuevo Vehículo';
    submitBtn.textContent = 'Agregar Vehículo';
    cancelBtn.style.display = 'none';
    hideMessage();
}

// Renderizar un vehículo en la lista
function renderVehiculo(vehiculo) {
    const card = document.createElement('div');
    card.className = 'vehiculo-card';
    card.id = `vehiculo-${vehiculo._id}`;

    card.innerHTML = `
        <div class="vehiculo-info">
            <div class="vehiculo-field">
                <label>Marca</label>
                <span>${vehiculo.marca}</span>
            </div>
            <div class="vehiculo-field">
                <label>Modelo</label>
                <span>${vehiculo.modelo}</span>
            </div>
            <div class="vehiculo-field">
                <label>Año</label>
                <span>${vehiculo.año}</span>
            </div>
            <div class="vehiculo-field">
                <label>Color</label>
                <span>${vehiculo.color}</span>
            </div>
            <div class="vehiculo-field">
                <label>Placa</label>
                <span><strong>${vehiculo.placa}</strong></span>
            </div>
        </div>
        <div class="vehiculo-actions">
            <button class="btn btn-edit" onclick="editVehiculo('${vehiculo._id}')">
                ✏️ Editar
            </button>
            <button class="btn btn-delete" onclick="deleteVehiculo('${vehiculo._id}')">
                🗑️ Eliminar
            </button>
        </div>
    `;

    vehiculosList.appendChild(card);
}

// Mostrar mensaje
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// Ocultar mensaje
function hideMessage() {
    messageDiv.style.display = 'none';
    messageDiv.className = 'message';
}

