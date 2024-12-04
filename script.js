const clientes = []; // Array para almacenar los clientes
const pacientes = []; // Array para almacenar los pacientes

let idCliente = 1; // Contador para los IDs de los clientes
let idPaciente = 1; // Contador para los IDs de los pacientes

// Selección de elementos del DOM
const contenedorClientes = document.getElementById("clientes-container"); // Contenedor donde se mostrarán las tarjetas de clientes
const contenedorPacientes = document.getElementById("pacientes-container"); // Contenedor donde se mostrarán las tarjetas de pacientes
const formularioCliente = document.getElementById("formCliente"); // Formulario de agregar un nuevo cliente
const formularioPaciente = document.getElementById("formPaciente"); // Formulario de agregar un nuevo paciente
const formularioVisita = document.getElementById("formVisita"); // Formulario de asignar una nueva visita

// Función para renderizar la lista de clientes en tarjetas
function renderizarClientes() {
	contenedorClientes.innerHTML = ""; // Limpiar el contenedor de clientes antes de renderizar
	clientes.forEach((cliente, indice) => {
		const tarjetaCliente = document.createElement("div");
		tarjetaCliente.className = "card"; // Clase CSS para dar estilo a las tarjetas
		tarjetaCliente.innerHTML = `
            <h4>${cliente.nombre}</h4>
            <p>ID: ${cliente.id}</p>
            <p>Teléfono: ${cliente.telefono}</p>
            <button onclick="eliminarCliente(${indice})">Eliminar</button>
        `;
		contenedorClientes.appendChild(tarjetaCliente); // Agregar las tarjetas al contenedor
	});
}

// Función para renderizar la lista de pacientes en tarjetas
function renderizarPacientes() {
	contenedorPacientes.innerHTML = ""; // Limpiar el contenedor de pacientes antes de renderizar
	pacientes.forEach((paciente, indice) => {
		const tarjetaPaciente = document.createElement("div");
		tarjetaPaciente.className = "card"; // Clase CSS para dar estilos a las tarjetas
		tarjetaPaciente.innerHTML = `
            <h4>${paciente.nombre}</h4>
            <p>Especie: ${paciente.especie}</p>
            <p>ID Cliente: ${paciente.idCliente}</p>
            <p>ID Paciente: ${paciente.id}</p>
            <button onclick="eliminarPaciente(${indice})">Eliminar</button>
        `;
		contenedorPacientes.appendChild(tarjetaPaciente); // Agregar las tarjetas al contenedor
	});
}

// Función para eliminar un cliente y sus pacientes asociados
function eliminarCliente(indice) {
	// Obtener el ID del cliente que se va a eliminar
	const clienteId = clientes[indice].id;

	// Eliminar el cliente del array de clientes
	clientes.splice(indice, 1); // Splice elimina 1 elemento desde la posición del indice proporcionada

	// Eliminar los pacientes asociados a este cliente
	// Aquí modificamos directamente el contenido del array
	for (let i = pacientes.length - 1; i >= 0; i--) {
		// Recorremos el array `pacientes` desde el último elemento hacia el primero.
		// Esto evita problemas al modificar el array mientras lo recorremos.
		if (pacientes[i].idCliente === clienteId) {
			// Comprobamos si el `idCliente` del paciente actual coincide
			// con el `id` del cliente eliminado.
			pacientes.splice(i, 1);
			// Si coincide, eliminamos el paciente del array `pacientes` usando `splice`.
			// Aquí `i` es el índice del paciente que queremos eliminar.
		}
	}

	// Si no hay más clientes, reiniciar el contador de IDs
	if (clientes.length === 0) {
		idCliente = 1; // Reiniciar el contador de ID a 1
	}

	// Si no hay más pacientes, reiniciar el contador de IDs
	if (pacientes.length === 0) {
		idPaciente = 1; // Reiniciar el contador de ID a 1
	}

	// Renderizar las listas actualizadas
	renderizarClientes();
	renderizarPacientes();
}

// Función para eliminar un paciente
function eliminarPaciente(indice) {
	pacientes.splice(indice, 1); // Eliminar paciente del array
	// Si no hay más pacientes, reiniciar el contador de IDs
	if (pacientes.length === 0) {
		idPaciente = 1; // Reiniciar el contador de ID a 1
	}
	renderizarPacientes(); // Volver a renderizar la lista de pacientes
}

// Función para mostrar los mensajes de error debajo de los campos de entrada
function mostrarError(input, mensaje) {
	const errorContainer = input.nextElementSibling; // El <span> está después del input (siguiente elemento hermano)

	// Verifica si elemento <span> existe
	if (errorContainer) {
		// Si existe
		errorContainer.textContent = mensaje; // Asigna el mensaje de error
		errorContainer.style.display = "block"; // Cambia la propiedad CSS para que sea visible
	}
}

// Función para ocultar los mensajes de error
function ocultarError(input) {
	const errorContainer = input.nextElementSibling; // El <span> está después del input
	if (errorContainer) {
		errorContainer.textContent = ""; // Vaciar el mensaje de error
		errorContainer.style.display = "none"; // Oculta el mensaje
	}
}

// --- Eventos para los formularios --- //

// Evento para agregar un nuevo cliente cuando se envía el formulario de cliente
formularioCliente.addEventListener("submit", (e) => {
	e.preventDefault(); // Previene que el formulario envíe la información y recargue la página
	const nombre = document.getElementById("nombreCliente"); // Campo de nombre
	const telefono = document.getElementById("telefonoCliente"); // Campo de teléfono

	let formValido = true;

	// Validación de que el nombre no contenga números y sea obligatorio
	if (nombre.value === "") {
		mostrarError(nombre, "Este campo es obligatorio.");
		formValido = false; // Si el campo de nombre está vacío, el formulario no es válido
	} else if (/\d/.test(nombre.value)) {
		mostrarError(nombre, "El nombre no puede contener números."); // Mostrar error si hay números
		formValido = false; // Si el campo de nombre contiene números , el formulario no es válido
	} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre.value)) {
		mostrarError(
			nombre,
			"El nombre solamente puede contener caracteres a-z, letras con acento, ñ y espacios."
		);
		formValido = false; // Si el campo contiene caracteres no correspondientes a un nombre real, el formulario no es válido
	} else {
		ocultarError(nombre); // Ocultar error si es válido
	}

	// Validación de que el teléfono no esté vacío y sea obligatorio
	if (telefono.value === "") {
		mostrarError(telefono, "Este campo es obligatorio");
		formValido = false; // Si el campo de teléfono está vacío, el formulario no es válido
	} else if (!/^[0-9\-]*$/.test(telefono.value)) {
		// Valida que solo se permitan numeros del 0 al 9 y guiones
		mostrarError(
			telefono,
			"Solamente se permiten números enteros y guiones"
		);
		formValido = false; // Si el campo de teléfono contiene letras o caracteres que no sean numeros 0-9 o guiones, el formulario no es válido
	} else if (telefono.value.length < 11) {
		// Falto validar maximo de digitos
		mostrarError(telefono, "El teléfono debe tener al menos 11 dígitos");
		formValido = false; // Si el campo de teléfono no contiene 11 digitos, el formulario no es válido
	} else {
		ocultarError(telefono); // Ocultar error si es válido
	}

	// Si el formulario es válido (true), se agrega el cliente
	if (formValido) {
		// Crea un objeto con la información del cliente (nombre, telefono, id) y lo agrega al array de clientes
		clientes.push({
			nombre: nombre.value, // Nombre del cliente
			telefono: telefono.value, // Teléfono del cliente
			id: idCliente, // ID único del cliente
		});
		idCliente++; // Incrementar el contador del ID para el siguiente cliente
		renderizarClientes(); // Renderizar la lista de clientes
		formularioCliente.reset(); // Reiniciar los campos del formulario
	}
});

// Validación en tiempo real mientras el usuario escribe (solo actualización de visibilidad de los errores)
// -- Validacion en tiempo real de Nombre del Cliente -- //
document.getElementById("nombreCliente").addEventListener("input", (e) => {
	const nombre = e.target;
	if (nombre.value === "") {
		ocultarError(nombre); // Si el campo está vacío, eliminamos el error momentaneamente
	} else if (/\d/.test(nombre.value)) {
		// Si el nombre tiene numero mostramos el error en el momento
		mostrarError(nombre, "El nombre no puede contener números.");
	} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre.value)) {
		mostrarError(
			nombre,
			"El nombre solamente puede contener caracteres a-z, letras con acento, ñ y espacios."
		);
	} else if (nombre.value.length < 3) {
		// Si el nombre tiene menos 3 caracteres mostrar error en el momento
		mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
	} else {
		ocultarError(nombre); // Si el nombre es válido, ocultamos el error
	}
});

// -- Validacion en tiempo real del Teléfono del Cliente -- //
document.getElementById("telefonoCliente").addEventListener("input", (e) => {
	const telefono = e.target;
	if (telefono.value === "") {
		ocultarError(telefono); // Si el campo está vacío, eliminamos el error
	} else if (!/^[0-9\-]*$/.test(telefono.value)) {
		// Valida si no se cumple la condicion de que el usuario no coloque numeros del 0-9 o guiones -
		mostrarError(
			telefono,
			"Solamente se permiten números enteros y guiones"
		); // Si completa el campo con otras caracteres que no sean numeros 0-9 o guiones, muestra el error en el momento
	} else if (telefono.value.length < 11) {
		mostrarError(telefono, "El teléfono debe tener al menos 11 dígitos"); // Si completa el campo de teléfono con menos de 11 digitos incluyendo guiones, muestra error en el momento
	} else {
		ocultarError(telefono); // Si el teléfono es válido ocultamos el error
	}
});

// Evento para agregar un nuevo paciente cuando se envía el formulario de paciente
formularioPaciente.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
	const nombre = document.getElementById("nombrePaciente"); // Campo de nombre del paciente
	const especie = document.getElementById("especiePaciente"); // Campo de especie del paciente
	const idClienteInput = document.getElementById("clienteIdPaciente"); // Campo de ID del cliente

	let formValido = true;

	// Validación de que el nombre del paciente no contenga números
	if (nombre.value === "") {
		// Valida que el campo no este vacío
		mostrarError(nombre, "Este campo es obligatorio");
		formValido = false; // El formulario no se envia, si el campo no está completo
	} else if (/\d/.test(nombre.value)) {
		mostrarError(
			nombre,
			"El nombre del paciente no puede contener números."
		); // Mostrar error si hay números
		formValido = false; // El formulario se invalida si contiene numeros el nombre del paciente
	} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre.value)) {
		mostrarError(
			nombre,
			"El nombre solamente puede contener caracteres a-z, letras con acento, ñ y espacios."
		);
		formValido = false;
	} else if (nombre.value.length < 3) {
		mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
		formValido = false;
	} else {
		ocultarError(nombre); // Ocultar error si es válido
	}

	// Validación para que el usuario complete obligatoriamente el campo de la especie del paciente
	if (especie.value === "") {
		mostrarError(especie, "Este campo es obligatorio");
		formValido = false; // Si no se selecciona una opción para la especie, el formulario se invalida
	} else {
		ocultarError(especie); // Si la especie es válida, se oculta el error
	}

	/// Validacion para que el campo de ID del cliente sea obligatorio
	const valorNumericoIdCliente = parseInt(idClienteInput.value);
	if (idClienteInput.value.trim() === "") {
		mostrarError(idClienteInput, "Este campo es obligatorio");
		formValido = false;
	} else if (isNaN(valorNumericoIdCliente) || valorNumericoIdCliente <= 0) {
		mostrarError(
			idClienteInput,
			"El ID del cliente debe ser un número mayor a 0"
		);
		formValido = false;
	} else if (
		!clientes.some((cliente) => cliente.id === valorNumericoIdCliente)
	) {
		mostrarError(idClienteInput, "ID del cliente no válido");
		formValido = false; // Si el ID del cliente no coincide, muestra error y el formulario no se valida
	} else {
		ocultarError(idClienteInput);
	}

	// Agregar el paciente al array de pacientes con el ID único
	if (formValido) {
		pacientes.push({
			nombre: nombre.value, //Nombre del paciente
			especie: especie.value, // Especie del paciente
			idCliente: parseInt(idClienteInput.value), // ID del cliente asociado
			id: idPaciente, // ID único del paciente
		});
		idPaciente++; // Incrementar el contador del ID para el siguiente paciente
		renderizarPacientes(); // Renderizar la lista de pacientes
		formularioPaciente.reset(); // Reiniciar los campos del formulario
	}
});

// Validación en tiempo real mientras el usuario escribe (solo actualización de visibilidad de los errores)

// --- Validacion en tiempo real del nombre del Paciente -- //
document.getElementById("nombrePaciente").addEventListener("input", (e) => {
	const nombre = e.target;

	if (nombre.value === "") {
		// Si el nombre aun está vacío desaparece el error en el momento
		ocultarError(nombre);
	} else if (/\d/.test(nombre.value)) {
		// Si el nombre contiene numeros, muestra el error en el momento
		mostrarError(nombre, "El nombre no puede contener números");
	} else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(nombre.value)) {
		mostrarError(
			nombre,
			"El nombre solamente puede contener caracteres a-z, letras con acento, ñ y espacios."
		);
	} else if (nombre.value.length < 3) {
		// Si el nombre contiene menos 3 caracteres, muestra el error en el momento
		mostrarError(nombre, "El nombre debe tener al menos 3 caracteres");
	} else {
		// Si el nombre es correcto, el error desaparece
		ocultarError(nombre);
	}
});

// --- Validación de la especie del paciente en tiempo real --- //
document.getElementById("especiePaciente").addEventListener("input", (e) => {
	const especie = e.target;

	if (especie.value === "") {
		// Si no se selecciona un opción correcta, muestra error en el momento
		mostrarError(especie, "Este campo es obligatorio");
	} else {
		ocultarError(especie); // Si selecciona una opcion válida, el error desaparece
	}
});

document.getElementById("clienteIdPaciente").addEventListener("input", (e) => {
	const idClienteInput = e.target; // Referencia al elemento input
	const idCliente = parseInt(e.target.value.trim()); // Convertir el valor a número

	if (e.target.value.trim() === "") {
		// Validar si el campo está vacío
		ocultarError(e.target);
	} else if (isNaN(idCliente) || idCliente <= 0) {
		// Validar si no es un número válido o si es <= 0
		mostrarError(
			idClienteInput,
			"El ID del cliente debe ser un número mayor a 0"
		);
	} else if (!clientes.some((cliente) => cliente.id === idCliente)) {
		// Validar si no existe un cliente con ese ID
		mostrarError(idClienteInput, "ID del cliente no válido");
	} else {
		// Si todo es válido, ocultar el error
		ocultarError(idClienteInput);
	}
});

// Evento para asignar una visita
formularioVisita.addEventListener("submit", (e) => {
	e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (recargar la página)

	// Obtener elementos del DOM correspondientes a los campos del formulario
	const idClienteInput = document.getElementById("clienteIdVisita");
	const idPacienteInput = document.getElementById("pacienteIdVisita");
	const fechaInput = document.getElementById("fechaVisita");

	// Variable para controlar si existen errores en la validación
	let formValido = true;

	/// Validacion para que el campo de ID del cliente sea obligatorio
	const valorNumericoIdCliente = parseInt(idClienteInput.value);
	if (idClienteInput.value.trim() === "") {
		mostrarError(idClienteInput, "Este campo es obligatorio");
		formValido = false;
	} else if (isNaN(valorNumericoIdCliente) || valorNumericoIdCliente <= 0) {
		mostrarError(
			idClienteInput,
			"El ID del cliente debe ser un número mayor a 0"
		);
		formValido = false;
	} else if (
		!clientes.some((cliente) => cliente.id === valorNumericoIdCliente)
	) {
		mostrarError(idClienteInput, "ID del cliente no válido");
		formValido = false; // Si el ID del cliente no coincide, muestra error y el formulario no se valida
	} else {
		ocultarError(idClienteInput);
	}

	// Validación del campo Paciente ID
	const valorNumericoIdPaciente = parseInt(idPacienteInput.value);
	if (idPacienteInput.value.trim() === "") {
		// Mostrar menaje de error si el campo está vacío
		mostrarError(idPacienteInput, "Este campo es obligatorio.");
		formValido = false;
	} else if (isNaN(valorNumericoIdPaciente) || valorNumericoIdPaciente <= 0) {
		mostrarError(
			idPacienteInput,
			"El ID del paciente debe ser un número mayor a 0"
		);
		formValido = false;
	} else if (
		!pacientes.some((paciente) => paciente.id === valorNumericoIdPaciente)
	) {
		// Validar si el paciente con el ID proporcionado existe
		mostrarError(idPacienteInput, "ID del paciente no válido.");
		formValido = false;
	} else {
		// Ocultar el mensaje de error si la validación es correcta
		ocultarError(idPacienteInput);
	}

	// Validación de fecha: no permitir fechas anteriores a la fecha actual
	const fechaIngresada = new Date(fechaInput.value); // Convertir el valor ingresado a un objeto Date
	const hoy = new Date(); // Obtener la fecha actual

	if (fechaInput.value.trim() === "") {
		mostrarError(fechaInput, "Este campo es obligatorio");
		formValido = false;
	} else if (fechaIngresada <= hoy) {
		mostrarError(
			fechaInput,
			"La fecha no puede ser anterior o igual a hoy"
		);
		formValido = false;
	} else {
		ocultarError(fechaInput);
	}

	// Obtener los objetos cliente y paciente correspondientes a los IDs proporcionados
	const cliente = clientes.find(
		(cliente) => cliente.id === valorNumericoIdCliente
	);
	const paciente = pacientes.find(
		(paciente) => paciente.id === valorNumericoIdPaciente
	);

	// Si los datos ingresados son válidos se agenda la visita y se muestra el modal
	if (formValido) {
		// Llamar a la función para mostrar un modal con los detalles de la vista asignada
		mostrarModalVisita(cliente, paciente, fechaInput.value.trim());
	}
});

// --- Validación en tiempo real formulario Visitas --- //
// Validación en tiempo real del input ID del cliente
document.getElementById("clienteIdVisita").addEventListener("input", (e) => {
	const idClienteInput = e.target; // Referencia al elemento input
	const idCliente = parseInt(e.target.value.trim()); // Convertir el valor a número

	if (e.target.value === "") {
		// Validar si el campo está vacío
		ocultarError(idClienteInput);
	} else if (isNaN(idCliente) || idCliente <= 0) {
		// Validar si no es un número válido o si es menor o igual a 0
		mostrarError(
			idClienteInput,
			"El ID del cliente debe ser un número mayor a 0"
		);
	} else if (!clientes.some((cliente) => cliente.id === idCliente)) {
		// Validar si no existe un cliente con ese ID
		mostrarError(idClienteInput, "ID del cliente no válido");
	} else {
		// Si todo es válido, ocultar el error
		ocultarError(idClienteInput);
	}
});

// Validacion en tiempo real del ID del paciente en el formulario de agendar Visita
document.getElementById("pacienteIdVisita").addEventListener("input", (e) => {
	const idPacienteInput = e.target;
	const idPaciente = parseInt(e.target.value.trim());

	if (e.target.value === "") {
		ocultarError(idPacienteInput);
	} else if (isNaN(idPaciente) || idPaciente <= 0) {
		mostrarError(
			idPacienteInput,
			"El ID del paciente debe ser un número mayor a 0"
		);
	} else if (!pacientes.some((paciente) => paciente.id === idPaciente)) {
		mostrarError(idPacienteInput, "ID del paciente no válido");
	} else {
		ocultarError(idPacienteInput);
	}
});

// Validación en tiempo real de la fecha para agendar visita
document.getElementById("fechaVisita").addEventListener("input", (e) => {
	// Obtener el input donde se disparó el evento
	const fechaInput = e.target;
	const fechaIngresada = new Date(fechaInput.value); // Obtener la fecha ingresada como un objeto Date
	const hoy = new Date(); // Obtener la fecha actual

	// Comprobar si el valor ingresado está vacío
	if (fechaInput.value.trim() === "") {
		mostrarError(fechaInput, "Este campo es obligatorio");
	}
	// Verificar si la fecha ingresada es anterior a la fecha actual
	else if (fechaIngresada <= hoy) {
		mostrarError(
			fechaInput,
			"La fecha no puede ser anterior o igual a hoy"
		);
	}
	// Si la fecha es válida
	else {
		ocultarError(fechaInput);
	}
});

// Función para mostrar un modal con los detalles de la visita asignada
function mostrarModalVisita(cliente, paciente, fecha) {
	// Crear un contenedor para la superposición del menú
	const superPosicionModal = document.createElement("div");
	superPosicionModal.className = "modal-superposicion"; // Clase para dar estilos al contenedor del modal

	// Crear el contenedor para el contenido del modal
	const contenidoModal = document.createElement("div");
	contenidoModal.className = "modal-contenido"; // Clase para dar estilos al contenido del modal

	// Crear el titulo para el model
	const tituloModal = document.createElement("h2");
	tituloModal.textContent = "Visita Asignada";

	// Crear un párrafo para mostrar los detalles de la visita
	const mensajeModal = document.createElement("p");
	mensajeModal.innerHTML = `
	- Cliente: ${cliente.nombre} <br> 
    - Paciente: ${paciente.nombre} <br> 
    - Fecha de la visita: ${fecha}
	`;

	// Crear un botón para cerrar el modal
	const botonCerrarModal = document.createElement("button");
	//Contenido del botón
	botonCerrarModal.textContent = "Cerrar";
	botonCerrarModal.className = "modal-cierre"; // Clase para dar estilo CSS al botón del modal

	// Agregar un escuchador de evento al botón al hacer "click" para cerrar el modal
	botonCerrarModal.addEventListener("click", () => {
		superPosicionModal.remove(); // Eliminar el modal del DOM
	});

	// Agregar los elementos al contenido del modal
	contenidoModal.appendChild(tituloModal);
	contenidoModal.appendChild(mensajeModal);
	contenidoModal.appendChild(botonCerrarModal);

	// Agregar el contenido del modal al contenedor de superposición
	superPosicionModal.appendChild(contenidoModal);

	// Agregar la superposicion del modal al cuerpo del documento
	document.body.appendChild(superPosicionModal);
}
