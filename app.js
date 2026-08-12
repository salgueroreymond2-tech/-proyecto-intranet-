// Base de datos de usuarios simulada
const usuariosRegistrados = {
  "admin": { nombre: "Administrador General", rol: "admin", pass: "1234" },
  "docente1": { nombre: "Prof. Carlos Mendoza", rol: "docente", pass: "1234" },
  "alumno1": { nombre: "Lucía Fernández", rol: "estudiante", pass: "1234" }
};

// Base de datos de calificaciones simulada (En memoria)
const listaNotas = [
  { id: 1, estudiante: "Lucía Fernández", materia: "Matemática", nota: 9.5 }
];

// Base de datos de comunicados simulada (En memoria)
const listaComunicados = [
  { id: 1, titulo: "Reunión General de Padres de Familia", fecha: "12 de Agosto, 2026", contenido: "Se convoca a todos los encargados legales a la asamblea del primer periodo el próximo viernes a las 5:00 PM." },
  { id: 2, titulo: "Mantenimiento de Plataforma", fecha: "10 de Agosto, 2026", contenido: "El sistema estará en pausa programada durante el fin de semana por actualización de servidores." }
];

// Estado de sesión
let usuarioSesion = null;

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
const tablaUsuariosBody = document.getElementById("tabla-usuarios-body");
const tablaGestionNotasBody = document.getElementById("tabla-gestion-notas-body");
const btnNuevoComunicado = document.getElementById("btn-nuevo-comunicado");
const contenedorComunicados = document.getElementById("contenedor-comunicados");

// 1. EVENTO: Iniciar Sesión
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const userInput = document.getElementById("usuario").value.trim().toLowerCase();
  const passInput = document.getElementById("password").value.trim();

  const usuarioEncontrado = usuariosRegistrados[userInput];

  if (usuarioEncontrado && usuarioEncontrado.pass === passInput) {
    cargarEntorno(usuarioEncontrado);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error de acceso',
      text: 'Usuario o contraseña incorrectos.',
      confirmButtonColor: '#4f46e5'
    });
  }
});

// Función para cambiar de vista según el Rol
function cargarEntorno(usuario) {
  usuarioSesion = usuario;
  vistaLogin.classList.add("oculta");
  infoUsuario.classList.remove("oculta");

  nombreUsuarioSpan.textContent = usuario.nombre;
  rolUsuarioSpan.textContent = usuario.rol.toUpperCase();

  // El tablón siempre se muestra
  seccionComunicados.classList.remove("oculta");

  // Mostrar el botón de nuevo comunicado sólo si es administrador
  if (usuario.rol === "admin") {
    btnNuevoComunicado.classList.remove("oculta");
  } else {
    btnNuevoComunicado.classList.add("oculta");
  }

  // Sincronizar listas y tablas dinámicas
  actualizarTablasNotas();
  actualizarComunicados();

  // Mostrar el panel adecuado
  if (usuario.rol === "admin") {
    panelAdmin.classList.remove("oculta");
    actualizarTablaUsuarios();
  } else if (usuario.rol === "docente") {
    panelDocente.classList.remove("oculta");
  } else if (usuario.rol === "estudiante") {
    panelEstudiante.classList.remove("oculta");
  }
}

// 2. EVENTO: Crear Usuario (Panel Admin)
formCrearUsuario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nuevo-nombre").value.trim();
  const usuarioKey = document.getElementById("nuevo-usuario").value.trim().toLowerCase();
  const rol = document.getElementById("nuevo-rol").value;

  // Validación de duplicados
  if (usuariosRegistrados[usuarioKey]) {
    Swal.fire({
      icon: 'warning',
      title: 'Usuario Duplicado',
      text: `El usuario "${usuarioKey}" ya existe. Intente con otro nombre de usuario.`,
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  // Registra el nuevo usuario
  usuariosRegistrados[usuarioKey] = {
    nombre: nombre,
    rol: rol,
    pass: "1234"
  };

  Swal.fire({
    icon: 'success',
    title: '¡Usuario guardado con éxito!',
    html: `<strong>Nombre:</strong> ${nombre}<br><strong>Usuario:</strong> ${usuarioKey}<br><strong>Contraseña:</strong> 1234`,
    confirmButtonColor: '#4f46e5'
  });
  
  formCrearUsuario.reset();
  actualizarTablaUsuarios();
});

// 3. EVENTO: Guardar Nota (Panel Docente)
formNotas.addEventListener("submit", (e) => {
  e.preventDefault();

  const estudiante = document.getElementById("nota-estudiante").value.trim();
  const materia = document.getElementById("nota-materia").value.trim();
  const valorNota = parseFloat(document.getElementById("nota-valor").value.trim());

  // Agregar nueva nota al array de notas
  const nuevoId = listaNotas.length > 0 ? Math.max(...listaNotas.map(n => n.id)) + 1 : 1;
  listaNotas.push({
    id: nuevoId,
    estudiante: estudiante,
    materia: materia,
    nota: valorNota
  });

  actualizarTablasNotas();

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: `Calificación guardada exitosamente para ${estudiante}.`,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true
  });
  
  formNotas.reset();
});

// 4. EVENTO: Cerrar Sesión
btnLogout.addEventListener("click", () => {
  // Limpiar sesión
  usuarioSesion = null;

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
        <button type="button" class="btn-primario" onclick="editarUsuario('${userKey}')" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size: 1rem;">edit</span> Editar</button>
        <button type="button" class="btn-danger" onclick="eliminarUsuario('${userKey}')" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size: 1rem;">delete</span> Baja</button>
      </td>
    `;
    tablaUsuariosBody.appendChild(fila);
  });
}

// Función para BAJA de usuario
function eliminarUsuario(userKey) {
  if (userKey === "admin") {
    Swal.fire({
      icon: 'error',
      title: 'Acción Denegada',
      text: 'No se puede dar de baja al administrador principal.',
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  Swal.fire({
    title: '¿Confirmar Baja?',
    text: `¿Está seguro de dar de baja al usuario "${userKey}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      delete usuariosRegistrados[userKey];
      actualizarTablaUsuarios();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Usuario eliminado correctamente.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
    }
  });
}

// Función para EDICIÓN de usuario
function editarUsuario(userKey) {
  const user = usuariosRegistrados[userKey];
  Swal.fire({
    title: 'Editar Nombre Completo',
    input: 'text',
    inputValue: user.nombre,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value || value.trim() === "") {
        return '¡El nombre no puede estar vacío!';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      usuariosRegistrados[userKey].nombre = result.value.trim();
      actualizarTablaUsuarios();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Usuario actualizado con éxito.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
    }
  });
}

// --- NUEVA FUNCIONALIDAD: GESTIÓN DE CALIFICACIONES Y COMUNICADOS (SOLO ADMIN) ---

// Renderizar tablas de calificaciones
function actualizarTablasNotas() {
  if (tablaNotasBody) {
    tablaNotasBody.innerHTML = "";
    
    // Si el usuario es estudiante, filtramos las notas para mostrar solo las suyas
    let notasEstudiante = listaNotas;
    if (usuarioSesion && usuarioSesion.rol === "estudiante") {
      notasEstudiante = listaNotas.filter(
        (n) => n.estudiante.trim().toLowerCase() === usuarioSesion.nombre.trim().toLowerCase()
      );
    }

    notasEstudiante.forEach((n) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${n.estudiante}</td>
        <td>${n.materia}</td>
        <td><strong>${n.nota}</strong></td>
      `;
      tablaNotasBody.appendChild(fila);
    });
  }

  if (tablaGestionNotasBody) {
    tablaGestionNotasBody.innerHTML = "";
    listaNotas.forEach((n) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${n.estudiante}</td>
        <td>${n.materia}</td>
        <td><strong>${n.nota}</strong></td>
        <td>
          <button type="button" class="btn-primario" onclick="editarNota(${n.id})" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size: 1rem;">edit</span> Editar</button>
          <button type="button" class="btn-danger" onclick="eliminarNota(${n.id})" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size: 1rem;">delete</span> Eliminar</button>
        </td>
      `;
      tablaGestionNotasBody.appendChild(fila);
    });
  }
}

// Editar Nota (Admin únicamente)
function editarNota(id) {
  if (!usuarioSesion || usuarioSesion.rol !== "admin") {
    Swal.fire("Acceso Denegado", "Solo el administrador puede editar notas.", "error");
    return;
  }

  const nota = listaNotas.find(n => n.id === id);
  if (!nota) return;

  Swal.fire({
    title: 'Editar Calificación',
    html: `
      <div style="text-align: left; margin-bottom: 8px;">
        <label style="font-weight:bold;">Estudiante:</label>
        <input id="swal-nota-estudiante" class="swal2-input" value="${nota.estudiante}" style="margin: 4px 0; width: 80%;">
      </div>
      <div style="text-align: left; margin-bottom: 8px;">
        <label style="font-weight:bold;">Materia:</label>
        <input id="swal-nota-materia" class="swal2-input" value="${nota.materia}" style="margin: 4px 0; width: 80%;">
      </div>
      <div style="text-align: left;">
        <label style="font-weight:bold;">Nota (1-10):</label>
        <input id="swal-nota-valor" type="number" step="0.1" min="1" max="10" class="swal2-input" value="${nota.nota}" style="margin: 4px 0; width: 80%;">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    preConfirm: () => {
      const estudiante = document.getElementById('swal-nota-estudiante').value.trim();
      const materia = document.getElementById('swal-nota-materia').value.trim();
      const valor = parseFloat(document.getElementById('swal-nota-valor').value);

      if (!estudiante || !materia || isNaN(valor) || valor < 1 || valor > 10) {
        Swal.showValidationMessage('Por favor completa todos los campos correctamente con nota entre 1 y 10.');
        return false;
      }
      return { estudiante, materia, nota: valor };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      nota.estudiante = result.value.estudiante;
      nota.materia = result.value.materia;
      nota.nota = result.value.nota;
      actualizarTablasNotas();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Calificación actualizada con éxito.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
    }
  });
}

// Eliminar Nota (Admin únicamente)
function eliminarNota(id) {
  if (!usuarioSesion || usuarioSesion.rol !== "admin") return;

  Swal.fire({
    title: '¿Eliminar Calificación?',
    text: '¿Está seguro de eliminar esta calificación?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const index = listaNotas.findIndex(n => n.id === id);
      if (index > -1) {
        listaNotas.splice(index, 1);
        actualizarTablasNotas();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Calificación eliminada correctamente.',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        });
      }
    }
  });
}

// Renderizar comunicados
function actualizarComunicados() {
  if (!contenedorComunicados) return;
  contenedorComunicados.innerHTML = "";

  listaComunicados.forEach((c) => {
    const articulo = document.createElement("article");
    articulo.className = "comunicado";
    
    // Si el usuario actual es admin, mostramos botones de edición/eliminación
    let botonesAdmin = "";
    if (usuarioSesion && usuarioSesion.rol === "admin") {
      botonesAdmin = `
        <div style="margin-top: 0.75rem;">
          <button type="button" class="btn-primario" onclick="editarComunicado(${c.id})" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px; margin-right: 5px;"><span class="material-symbols-outlined" style="font-size: 1rem;">edit</span> Editar</button>
          <button type="button" class="btn-danger" onclick="eliminarComunicado(${c.id})" style="padding: 4px 8px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 4px;"><span class="material-symbols-outlined" style="font-size: 1rem;">delete</span> Eliminar</button>
        </div>
      `;
    }

    articulo.innerHTML = `
      <h4>${c.titulo}</h4>
      <small>Publicado: ${c.fecha}</small>
      <p>${c.contenido}</p>
      ${botonesAdmin}
    `;
    contenedorComunicados.appendChild(articulo);
  });
}

// Crear Comunicado (Admin únicamente)
function crearComunicado() {
  if (!usuarioSesion || usuarioSesion.rol !== "admin") return;

  Swal.fire({
    title: 'Crear Comunicado Oficial',
    html: `
      <div style="text-align: left; margin-bottom: 8px;">
        <label style="font-weight:bold;">Título:</label>
        <input id="swal-com-titulo" class="swal2-input" placeholder="Título del aviso" style="margin: 4px 0; width: 80%;">
      </div>
      <div style="text-align: left;">
        <label style="font-weight:bold;">Contenido:</label>
        <textarea id="swal-com-contenido" class="swal2-textarea" placeholder="Contenido del comunicado..." style="margin: 4px 0; width: 80%; height: 100px;"></textarea>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    preConfirm: () => {
      const titulo = document.getElementById('swal-com-titulo').value.trim();
      const contenido = document.getElementById('swal-com-contenido').value.trim();

      if (!titulo || !contenido) {
        Swal.showValidationMessage('Todos los campos son obligatorios.');
        return false;
      }
      return { titulo, contenido };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const nuevoId = listaComunicados.length > 0 ? Math.max(...listaComunicados.map(c => c.id)) + 1 : 1;
      const hoy = new Date();
      const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
      const fechaFormateada = hoy.toLocaleDateString('es-ES', opciones);

      listaComunicados.unshift({
        id: nuevoId,
        titulo: result.value.titulo,
        fecha: fechaFormateada,
        contenido: result.value.contenido
      });
      actualizarComunicados();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Comunicado publicado con éxito.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
    }
  });
}

// Editar Comunicado (Admin únicamente)
function editarComunicado(id) {
  if (!usuarioSesion || usuarioSesion.rol !== "admin") return;

  const com = listaComunicados.find(c => c.id === id);
  if (!com) return;

  Swal.fire({
    title: 'Editar Comunicado',
    html: `
      <div style="text-align: left; margin-bottom: 8px;">
        <label style="font-weight:bold;">Título:</label>
        <input id="swal-com-titulo" class="swal2-input" value="${com.titulo}" style="margin: 4px 0; width: 80%;">
      </div>
      <div style="text-align: left;">
        <label style="font-weight:bold;">Contenido:</label>
        <textarea id="swal-com-contenido" class="swal2-textarea" style="margin: 4px 0; width: 80%; height: 100px;">${com.contenido}</textarea>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonColor: '#4f46e5',
    cancelButtonColor: '#6b7280',
    preConfirm: () => {
      const titulo = document.getElementById('swal-com-titulo').value.trim();
      const contenido = document.getElementById('swal-com-contenido').value.trim();

      if (!titulo || !contenido) {
        Swal.showValidationMessage('Todos los campos son obligatorios.');
        return false;
      }
      return { titulo, contenido };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      com.titulo = result.value.titulo;
      com.contenido = result.value.contenido;
      actualizarComunicados();

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Comunicado actualizado con éxito.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });
    }
  });
}

// Eliminar Comunicado (Admin únicamente)
function eliminarComunicado(id) {
  if (!usuarioSesion || usuarioSesion.rol !== "admin") return;

  Swal.fire({
    title: '¿Eliminar Comunicado?',
    text: '¿Está seguro de eliminar este comunicado del tablón?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      const index = listaComunicados.findIndex(c => c.id === id);
      if (index > -1) {
        listaComunicados.splice(index, 1);
        actualizarComunicados();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Comunicado eliminado.',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true
        });
      }
    }
  });
}
