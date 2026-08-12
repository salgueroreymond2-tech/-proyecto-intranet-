// 1. ESTRUCTURA DE DATOS MEDIANTE ARRAYS DE OBJETOS
const listaUsuarios = [
  { user: "admin", nombre: "Administrador General", rol: "admin", pass: "1234" },
  { user: "docente1", nombre: "Prof. Carlos Mendoza", rol: "docente", pass: "1234" },
  { user: "alumno1", nombre: "Lucía Fernández", rol: "estudiante", pass: "1234" }
];

const listaNotas = [
  { estudiante: "Lucía Fernández", materia: "Matemáticas", nota: "9.0" },
  { estudiante: "Lucía Fernández", materia: "Español", nota: "8.5" }
];

// Variable para rastrear qué usuario se está editando directamente en la tabla
let usuarioEnEdicion = null;

// Elementos del DOM
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
const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");
const tablaNotasBody = document.getElementById("tabla-notas-body");
const mensajeFeedback = document.getElementById("mensaje-feedback");

// Función para mostrar mensajes visuales en la pantalla (Sin alert)
function mostrarNotificacion(texto, esError = false) {
  mensajeFeedback.textContent = texto;
  mensajeFeedback.className = `mensaje-banner ${esError ? 'mensaje-error' : 'mensaje-exito'}`;
  
  setTimeout(() => {
    mensajeFeedback.className = "mensaje-banner oculta";
  }, 4000);
}

// 2. INICIAR SESIÓN
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInput = document.getElementById("usuario").value.trim().toLowerCase();
  const passInput = document.getElementById("password").value.trim();

  // Búsqueda dentro del Array mediante find()
  const usuarioEncontrado = listaUsuarios.find(u => u.user === userInput);

  if (usuarioEncontrado && usuarioEncontrado.pass === passInput) {
    cargarEntorno(usuarioEncontrado);
  } else {
    mostrarNotificacion("Usuario o contraseña incorrectos.", true);
  }
});

function cargarEntorno(usuario) {
  vistaLogin.classList.add("oculta");
  infoUsuario.classList.remove("oculta");

  nombreUsuarioSpan.textContent = usuario.nombre;
  rolUsuarioSpan.textContent = usuario.rol.toUpperCase();

  seccionComunicados.classList.remove("oculta");

  if (usuario.rol === "admin") {
    panelAdmin.classList.remove("oculta");
    renderizarTablaUsuarios();
  } else if (usuario.rol === "docente") {
    panelDocente.classList.remove("oculta");
  } else if (usuario.rol === "estudiante") {
    panelEstudiante.classList.remove("oculta");
    renderizarTablaNotas();
  }
}

// 3. TABLA DE USUARIOS (ADMIN) - RENDERIZADO Y EDICIÓN EN LÍNEA (SIN PROMPT)
function renderizarTablaUsuarios() {
  tablaUsuariosBody.innerHTML = "";

  listaUsuarios.forEach((item) => {
    const fila = document.createElement("tr");

    // Si la fila está en modo edición, dibuja inputs en lugar de texto
    if (usuarioEnEdicion === item.user) {
      fila.innerHTML = `
        <td><code>${item.user}</code></td>
        <td><input type="text" id="edit-nombre-${item.user}" class="input-inline" value="${item.nombre}"></td>
        <td>
          <select id="edit-rol-${item.user}" class="input-inline">
            <option value="docente" ${item.rol === 'docente' ? 'selected' : ''}>Docente</option>
            <option value="estudiante" ${item.rol === 'estudiante' ? 'selected' : ''}>Estudiante</option>
          </select>
        </td>
        <td>
          <button type="button" class="btn-primario" onclick="guardarEdicion('${item.user}')" style="padding: 2px 8px; font-size: 0.8rem;">Guardar</button>
          <button type="button" class="btn-secundario" onclick="cancelarEdicion()" style="padding: 2px 8px; font-size: 0.8rem;">Cancelar</button>
        </td>
      `;
    } else {
      fila.innerHTML = `
        <td><code>${item.user}</code></td>
        <td>${item.nombre}</td>
        <td>${item.rol}</td>
        <td>
          <button type="button" class="btn-primario" onclick="activarEdicion('${item.user}')" style="padding: 2px 8px; font-size: 0.8rem;">Editar</button>
          <button type="button" class="btn-secundario" onclick="eliminarUsuario('${item.user}')" style="padding: 2px 8px; font-size: 0.8rem;">Baja</button>
        </td>
      `;
    }
    tablaUsuariosBody.appendChild(fila);
  });
}

// Funciones de gestión de usuarios desde Array
function activarEdicion(userKey) {
  usuarioEnEdicion = userKey;
  renderizarTablaUsuarios();
}

function cancelarEdicion() {
  usuarioEnEdicion = null;
  renderizarTablaUsuarios();
}

function guardarEdicion(userKey) {
  const nuevoNombre = document.getElementById(`edit-nombre-${userKey}`).value.trim();
  const nuevoRol = document.getElementById(`edit-rol-${userKey}`).value;

  if (nuevoNombre === "") {
    mostrarNotificacion("El nombre no puede estar vacío.", true);
    return;
  }

  // Actualiza el elemento dentro del Array de usuarios
  const usuarioObj = listaUsuarios.find(u => u.user === userKey);
  if (usuarioObj) {
    usuarioObj.nombre = nuevoNombre;
    usuarioObj.rol = nuevoRol;
  }

  usuarioEnEdicion = null;
  renderizarTablaUsuarios();
  mostrarNotificacion("Usuario actualizado correctamente.");
}

function eliminarUsuario(userKey) {
  if (userKey === "admin") {
    mostrarNotificacion("No se puede eliminar el usuario administrador principal.", true);
    return;
  }

  // Filtrar el Array eliminando el elemento seleccionado
  const indice = listaUsuarios.findIndex(u => u.user === userKey);
  if (indice !== -1) {
    listaUsuarios.splice(indice, 1);
    renderizarTablaUsuarios();
    mostrarNotificacion(`Usuario "${userKey}" dado de baja correctamente.`);
  }
}

// Agregar nuevo usuario al Array
formCrearUsuario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const usuarioKey = document.getElementById("nuevo-usuario").value.trim().toLowerCase();
  const rol = document.getElementById("nuevo-rol").value;

  if (listaUsuarios.some(u => u.user === usuarioKey)) {
    mostrarNotificacion(`El nombre de usuario "${usuarioKey}" ya existe.`, true);
    return;
  }

  // Insertar en Array
  listaUsuarios.push({
    user: usuarioKey,
    nombre: nombre,
    rol: rol,
    pass: "1234"
  });

  renderizarTablaUsuarios();
  mostrarNotificacion(`Usuario "${nombre}" guardado con éxito (Pass: 1234).`);
  formCrearUsuario.reset();
});

// 4. NOTAS Y CALIFICACIONES EN ARRAY
formNotas.addEventListener("submit", (e) => {
  e.preventDefault();

  const estudiante = document.getElementById("nota-estudiante").value.trim();
  const materia = document.getElementById("nota-materia").value.trim();
  const valorNota = document.getElementById("nota-valor").value.trim();

  // Guardar objeto en el Array de notas
  listaNotas.push({
    estudiante: estudiante,
    materia: materia,
    nota: valorNota
  });

  mostrarNotificacion(`Calificación registrada correctamente para ${estudiante}.`);
  formNotas.reset();
});

function renderizarTablaNotas() {
  tablaNotasBody.innerHTML = "";
  listaNotas.forEach((item) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.estudiante}</td>
      <td>${item.materia}</td>
      <td><strong>${item.nota}</strong></td>
    `;
    tablaNotasBody.appendChild(fila);
  });
}

// 5. CERRAR SESIÓN
btnLogout.addEventListener("click", () => {
  panelAdmin.classList.add("oculta");
  panelDocente.classList.add("oculta");
  panelEstudiante.classList.add("oculta");
  seccionComunicados.classList.add("oculta");
  infoUsuario.classList.add("oculta");

  formLogin.reset();
  vistaLogin.classList.remove("oculta");
  usuarioEnEdicion = null;
});