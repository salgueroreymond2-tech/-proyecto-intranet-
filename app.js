// Base de datos de usuarios simulada
const usuariosRegistrados = {
  "admin": { nombre: "Administrador General", rol: "admin", pass: "1234" },
  "docente1": { nombre: "Prof. Carlos Mendoza", rol: "docente", pass: "1234" },
  "alumno1": { nombre: "Lucía Fernández", rol: "estudiante", pass: "1234" }
};

// Referencias de elementos del DOM
const formLogin = document.getElementById("form-login");
const vistaLogin = document.getElementById("vista-login");
const infoUsuario = document.getElementById("info-usuario");
const nombreUsuarioSpan = document.getElementById("nombre-usuario");
const rolUsuarioSpan = document.getElementById("rol-usuario");
const btnLogout = document.getElementById("btn-logout");

const panelAdmin = document.getElementById("panel-admin");
const panelDocente = document.getElementById("panel-docente");
const panelEstudiante = document.getElementById("panel-estudiante");
const seccionComunicados = document.getElementById("seccion-comunicados");

const formCrearUsuario = document.getElementById("form-crear-usuario");
const formNotas = document.getElementById("form-notas");
const tablaNotasBody = document.getElementById("tabla-notas-body");

// 1. EVENTO: Iniciar Sesión
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInput = document.getElementById("usuario").value.trim().toLowerCase();
  const passInput = document.getElementById("password").value.trim();

  const usuarioEncontrado = usuariosRegistrados[userInput];

  if (usuarioEncontrado && usuarioEncontrado.pass === passInput) {
    cargarEntorno(usuarioEncontrado);
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});

// Función para cambiar de vista según el Rol
function cargarEntorno(usuario) {
  vistaLogin.classList.add("oculta");
  infoUsuario.classList.remove("oculta");

  nombreUsuarioSpan.textContent = usuario.nombre;
  rolUsuarioSpan.textContent = usuario.rol.toUpperCase();

  // El tablón siempre se muestra
  seccionComunicados.classList.remove("oculta");

  // Mostrar el panel adecuado
  if (usuario.rol === "admin") {
    panelAdmin.classList.remove("oculta");
  } else if (usuario.rol === "docente") {
    panelDocente.classList.remove("oculta");
  } else if (usuario.rol === "estudiante") {
    panelEstudiante.classList.remove("oculta");
  }
}

// 2. EVENTO: Crear Usuario (Panel Admin)
formCrearUsuario.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene redirigir a inicio de sesión

  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const usuarioKey = document.getElementById("nuevo-usuario").value.trim().toLowerCase();
  const rol = document.getElementById("nuevo-rol").value;

  // Validación de duplicados
  if (usuariosRegistrados[usuarioKey]) {
    alert(`El usuario "${usuarioKey}" ya existe. Intente con otro nombre de usuario.`);
    return;
  }

  // Registra el nuevo usuario
  usuariosRegistrados[usuarioKey] = {
    nombre: nombre,
    rol: rol,
    pass: "1234"
  };

  alert(`¡Usuario guardado con éxito!\nNombre: ${nombre}\nUsuario: ${usuarioKey}\nContraseña: 1234`);
  formCrearUsuario.reset();
});

// 3. EVENTO: Guardar Nota (Panel Docente)
formNotas.addEventListener("submit", (e) => {
  e.preventDefault(); // Previene redirigir a inicio de sesión

  const estudiante = document.getElementById("nota-estudiante").value.trim();
  const materia = document.getElementById("nota-materia").value.trim();
  const valorNota = document.getElementById("nota-valor").value.trim();

  // Crear nueva fila para la tabla del estudiante
  const nuevaFila = document.createElement("tr");
  nuevaFila.innerHTML = `
    <td>${estudiante}</td>
    <td>${materia}</td>
    <td><strong>${valorNota}</strong></td>
  `;

  // Agregar la fila a la tabla
  tablaNotasBody.appendChild(nuevaFila);

  alert(`Calificación guardada exitosamente para ${estudiante}.`);
  formNotas.reset();
});

// 4. EVENTO: Cerrar Sesión
btnLogout.addEventListener("click", () => {
  // Ocultar todos los paneles
  panelAdmin.classList.add("oculta");
  panelDocente.classList.add("oculta");
  panelEstudiante.classList.add("oculta");
  seccionComunicados.classList.add("oculta");
  infoUsuario.classList.add("oculta");

  // Limpiar y mostrar pantalla de Login
  formLogin.reset();
  vistaLogin.classList.remove("oculta");
});
const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");

// Función para renderizar la lista de usuarios en el Panel Admin
function actualizarTablaUsuarios() {
  if (!tablaUsuariosBody) return;
  tablaUsuariosBody.innerHTML = "";

  Object.keys(usuariosRegistrados).forEach((userKey) => {
    const user = usuariosRegistrados[userKey];
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td><code>${userKey}</code></td>
      <td>${user.nombre}</td>
      <td>${user.rol}</td>
      <td>
        <button type="button" class="btn-primario" onclick="editarUsuario('${userKey}')" style="padding: 2px 8px; font-size: 0.8rem;">Editar</button>
        <button type="button" class="btn-secundario" onclick="eliminarUsuario('${userKey}')" style="padding: 2px 8px; font-size: 0.8rem;">Baja</button>
      </td>
    `;
    tablaUsuariosBody.appendChild(fila);
  });
}

// Renderizar tabla al cargar entorno de admin
const cargarEntornoOriginal = cargarEntorno;
cargarEntorno = function(usuario) {
  cargarEntornoOriginal(usuario);
  if (usuario.rol === "admin") {
    actualizarTablaUsuarios();
  }
};

// Función para BAJA de usuario
function eliminarUsuario(userKey) {
  if (userKey === "admin") {
    alert("No se puede dar de baja al administrador principal.");
    return;
  }

  if (confirm(`¿Está seguro de dar de baja al usuario "${userKey}"?`)) {
    delete usuariosRegistrados[userKey];
    actualizarTablaUsuarios();
    alert("Usuario eliminado correctamente.");
  }
}

// Función para EDICIÓN de usuario
function editarUsuario(userKey) {
  const user = usuariosRegistrados[userKey];
  const nuevoNombre = prompt("Editar Nombre completo:", user.nombre);

  if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
    usuariosRegistrados[userKey].nombre = nuevoNombre.trim();
    actualizarTablaUsuarios();
    alert("Usuario actualizado con éxito.");
  }
}

// Actualizar tabla cuando se cree un nuevo usuario
formCrearUsuario.addEventListener("submit", (e) => {
  // ... (tu código previo de validación y registro) ...
  actualizarTablaUsuarios(); // Inserta esta línea al final del evento
});