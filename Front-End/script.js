// Datos simulados
const clientes = [];
const pacientes = [];

// Selección de elementos del DOM
const clientesContainer = document.getElementById("clientes-container");
const pacientesContainer = document.getElementById("pacientes-container");
const formCliente = document.getElementById("formCliente");
const formPaciente = document.getElementById("formPaciente");
const formVisita = document.getElementById("formVisita");

// Función para renderizar clientes
function renderClientes() {
	clientesContainer.innerHTML = "";
	clientes.forEach((cliente, index) => {
		const clienteCard = document.createElement("div");
		clienteCard.className = "card";
		clienteCard.innerHTML = `
            <h4>${cliente.nombre}</h4>
            <p>ID: ${cliente.id}</p>
            <p>Teléfono: ${cliente.telefono}</p>
            <button onclick="eliminarCliente(${index})">Eliminar</button>
        `;
		clientesContainer.appendChild(clienteCard);
	});
}

// Función para renderizar pacientes
function renderPacientes() {
	pacientesContainer.innerHTML = "";
	pacientes.forEach((paciente, index) => {
		const pacienteCard = document.createElement("div");
		pacienteCard.className = "card";
		pacienteCard.innerHTML = `
            <h4>${paciente.nombre}</h4>
            <p>Especie: ${paciente.especie}</p>
            <p>ID Cliente: ${paciente.idCliente}</p>
            <p>ID Paciente: ${paciente.id}</p>
            <button onclick="eliminarPaciente(${index})">Eliminar</button>
        `;
		pacientesContainer.appendChild(pacienteCard);
	});
}

// Función para evitar que se ingresen valores negativos en los inputs de ID
function validarIDNegativo(inputElement) {
	if (parseInt(inputElement.value) < 1) {
		alert("El ID no puede ser negativo ni cero.");
		inputElement.value = ""; // Limpiamos el valor si es negativo
	}
}

// Agregar cliente
formCliente.addEventListener("submit", (e) => {
	e.preventDefault();
	const nombre = document.getElementById("nombreCliente").value;
	const telefono = document.getElementById("telefonoCliente").value;
	const id = clientes.length + 1; // Generar un ID único para el cliente

	// Validación de números en el nombre
	if (/\d/.test(nombre)) {
		alert("El nombre no puede contener números");
		return;
	}

	clientes.push({ nombre, telefono, id });
	renderClientes();
	formCliente.reset();
});

// Agregar paciente
formPaciente.addEventListener("submit", (e) => {
	e.preventDefault();
	const nombre = document.getElementById("nombrePaciente").value;
	const especie = document.getElementById("especiePaciente").value;
	const idCliente = parseInt(
		document.getElementById("clienteIdPaciente").value
	);

	// Validación de cliente existente
	if (!clientes[idCliente - 1]) {
		alert("ID de cliente no válido");
		return;
	}

	// Generar un ID único para el paciente
	const id = pacientes.length + 1;

	// Validación de números en el nombre
	if (/\d/.test(nombre)) {
		alert("El nombre del paciente no puede contener números");
		return;
	}

	pacientes.push({ nombre, especie, idCliente, id });
	renderPacientes();
	formPaciente.reset();
});

// Asignar visita
formVisita.addEventListener("submit", (e) => {
	e.preventDefault();
	const clienteId = parseInt(
		document.getElementById("clienteIdVisita").value
	);
	const pacienteId = parseInt(
		document.getElementById("pacienteIdVisita").value
	);
	const fecha = document.getElementById("fechaVisita").value;

	// Validación de cliente y paciente válidos
	if (!clientes[clienteId - 1] || !pacientes[pacienteId - 1]) {
		alert("Cliente o paciente no válido");
		return;
	}

	alert(
		`Visita asignada a ${clientes[clienteId - 1].nombre} con el paciente ${
			pacientes[pacienteId - 1].nombre
		} el día ${fecha}`
	);
	formVisita.reset();
});

// Eliminar cliente
function eliminarCliente(index) {
	clientes.splice(index, 1);
	renderClientes();
}

// Eliminar paciente
function eliminarPaciente(index) {
	pacientes.splice(index, 1);
	renderPacientes();
}

// Validaciones para no permitir valores negativos al ingresar IDs
document
	.getElementById("clienteIdPaciente")
	.addEventListener("blur", function () {
		validarIDNegativo(this);
	});
document
	.getElementById("clienteIdVisita")
	.addEventListener("blur", function () {
		validarIDNegativo(this);
	});
document.querySelectorAll("input[type='number']").forEach((input) => {
	input.addEventListener("input", function () {
		validarIDNegativo(this);
	});
});

// Render inicial (vacío)
renderClientes();
renderPacientes();
